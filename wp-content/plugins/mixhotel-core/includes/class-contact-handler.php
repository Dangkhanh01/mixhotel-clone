<?php
/**
 * AJAX Contact Form Handler
 *
 * Xử lý tiếp nhận form liên hệ qua AJAX, xác thực Nonce, chống bot honeypot,
 * rate limiting, sanitize & validate, Demo Sandbox log.
 *
 * @package MixHotelCore
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class MixHotel_Contact_Handler {

    /**
     * Khởi tạo hooks
     */
    public static function init() {
        add_action('wp_ajax_nopriv_mixhotel_submit_contact', [__CLASS__, 'handle_contact_submission']);
        add_action('wp_ajax_mixhotel_submit_contact', [__CLASS__, 'handle_contact_submission']);
    }

    /**
     * Lấy địa chỉ IP client (hỗ trợ proxy/load balancer)
     *
     * @return string
     */
    public static function get_client_ip() {
        $ip = '';
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = sanitize_text_field(wp_unslash($_SERVER['HTTP_CLIENT_IP']));
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $forwarded = sanitize_text_field(wp_unslash($_SERVER['HTTP_X_FORWARDED_FOR']));
            $parts = explode(',', $forwarded);
            $ip = trim($parts[0]);
        } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
            $ip = sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR']));
        }
        return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '127.0.0.1';
    }

    /**
     * Xử lý gửi form liên hệ AJAX
     * Tuân thủ AGENTS.md §3: Nonce, Honeypot, Rate-limiting, Sanitize, Escape
     * Tuân thủ BUG-03 wordpress-bug-prevention/SKILL.md: Luôn kết thúc bằng wp_send_json_*
     */
    public static function handle_contact_submission() {
        $ip = self::get_client_ip();

        // 1. Honeypot check — Nếu bot điền trường bẫy thì giả lập thành công
        if (!empty($_POST['mixhotel_hp_email']) || !empty($_POST['website_url'])) {
            wp_send_json_success([
                'message' => __('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.', 'mixhotel-core'),
                'is_demo' => true,
            ]);
        }

        // 2. Rate-limiting: Tối đa 3 lượt / 10 phút từ một IP (strict hơn booking)
        $rate_key = 'mixhotel_contact_rate_' . md5($ip);
        $attempts = (int) get_transient($rate_key);
        if ($attempts >= 3) {
            wp_send_json_error([
                'code'    => 'rate_limited',
                'message' => __('Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng chờ 10 phút và thử lại.', 'mixhotel-core'),
            ]);
        }
        set_transient($rate_key, $attempts + 1, 10 * MINUTE_IN_SECONDS);

        // 3. Xác thực Nonce CSRF (Tuân thủ BUG-03 SKILL.md)
        $nonce = isset($_POST['_mixhotel_contact_nonce'])
            ? sanitize_text_field(wp_unslash($_POST['_mixhotel_contact_nonce']))
            : '';

        if (!wp_verify_nonce($nonce, 'mixhotel_contact_nonce')) {
            wp_send_json_error([
                'code'    => 'invalid_nonce',
                'message' => __('Phiên làm việc đã hết hạn. Vui lòng tải lại trang và thử lại.', 'mixhotel-core'),
            ]);
        }

        // 4. Sanitize input (AGENTS.md §3.2)
        $contact_name    = isset($_POST['contact_name'])    ? sanitize_text_field(wp_unslash($_POST['contact_name']))    : '';
        $contact_phone   = isset($_POST['contact_phone'])   ? sanitize_text_field(wp_unslash($_POST['contact_phone']))   : '';
        $contact_email   = isset($_POST['contact_email'])   ? sanitize_email(wp_unslash($_POST['contact_email']))         : '';
        $contact_message = isset($_POST['contact_message']) ? sanitize_textarea_field(wp_unslash($_POST['contact_message'])) : '';

        // 5. Validate — Họ tên
        if (empty($contact_name) || mb_strlen($contact_name) < 2) {
            wp_send_json_error([
                'code'    => 'invalid_name',
                'message' => __('Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự).', 'mixhotel-core'),
            ]);
        }

        // Validate — Số điện thoại Việt Nam (10 số, đầu 03/05/07/08/09)
        $clean_phone = preg_replace('/[^0-9]/', '', $contact_phone);
        if (!preg_match('/^(0[3|5|7|8|9])+([0-9]{8})$/', $clean_phone)) {
            wp_send_json_error([
                'code'    => 'invalid_phone',
                'message' => __('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, bắt đầu 03, 05, 07, 08, 09).', 'mixhotel-core'),
            ]);
        }

        // Validate — Email
        if (!empty($contact_email) && !is_email($contact_email)) {
            wp_send_json_error([
                'code'    => 'invalid_email',
                'message' => __('Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.', 'mixhotel-core'),
            ]);
        }

        // 6. Kiểm tra chế độ Demo Sandbox
        $is_demo = get_option('mixhotel_demo_sandbox_mode', '1') === '1';

        // 7. Lưu log demo hoặc gửi email thật
        $log_entry = [
            'time'    => current_time('mysql'),
            'name'    => $contact_name,
            'phone'   => $clean_phone,
            'email'   => $contact_email,
            'message' => $contact_message,
            'ip'      => $ip,
            'is_demo' => $is_demo,
        ];

        if ($is_demo) {
            // Demo Sandbox: Lưu vào mixhotel_demo_contact_log
            $logs = get_option('mixhotel_demo_contact_log', []);
            if (!is_array($logs)) {
                $logs = [];
            }
            array_unshift($logs, $log_entry);
            $logs = array_slice($logs, 0, 50); // Giữ 50 log gần nhất
            update_option('mixhotel_demo_contact_log', $logs, false);

            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log(sprintf(
                    '[MixHotel Contact Demo] Từ: %s (%s) — %s',
                    $contact_name,
                    $clean_phone,
                    current_time('Y-m-d H:i:s')
                ));
            }
        } else {
            // Production: Gửi email thật tới admin
            $admin_email = get_option('admin_email');
            $subject = sprintf(
                __('[Mix Boutique Hotel] Liên hệ mới từ %s', 'mixhotel-core'),
                $contact_name
            );
            $body = sprintf(
                "Họ tên: %s\nSĐT: %s\nEmail: %s\n\nNội dung:\n%s\n\n---\nIP: %s",
                $contact_name,
                $clean_phone,
                $contact_email,
                $contact_message,
                $ip
            );
            wp_mail($admin_email, $subject, $body);
        }

        // 8. Trả về kết quả thành công (Tuân thủ BUG-03: dùng wp_send_json_success)
        wp_send_json_success([
            'message' => __('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.', 'mixhotel-core'),
            'is_demo' => $is_demo,
        ]);
    }
}
