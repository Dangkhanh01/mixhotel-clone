<?php
/**
 * AJAX Booking Handler & Lead Engine
 *
 * Xử lý tiếp nhận đơn giữ phòng qua AJAX, xác thực Nonce, chống bot spam honeypot,
 * rate limiting, lưu CPT booking_lead và thông báo Telegram / Demo Sandbox.
 *
 * @package MixHotelCore
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class MixHotel_Booking_Handler {

    /**
     * Khởi tạo hooks
     */
    public static function init() {
        // Đăng ký AJAX action cho cả khách vãng lai và user đã đăng nhập
        add_action('wp_ajax_nopriv_mixhotel_submit_booking', [__CLASS__, 'handle_booking_submission']);
        add_action('wp_ajax_mixhotel_submit_booking', [__CLASS__, 'handle_booking_submission']);
    }

    /**
     * Lấy địa chỉ IP của client (hỗ trợ proxy/load balancer)
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
     * Xử lý gửi form giữ phòng AJAX
     */
    public static function handle_booking_submission() {
        $ip = self::get_client_ip();

        // 1. Chống bot spam bằng Honeypot (AGENTS.md §3.1)
        // Nếu bất kỳ trường bẫy nào có dữ liệu -> bot đã tự động điền -> chặn ngay
        if (!empty($_POST['mixhotel_hp_email']) || !empty($_POST['website_url'])) {
            // Giả lập thành công để đánh lừa bot mà không lưu rác vào DB
            wp_send_json_success([
                'lead_id'      => 0,
                'lead_code'    => '#LEAD-' . date('Ymd') . '-BOT',
                'message'      => __('Yêu cầu giữ phòng đã được ghi nhận!', 'mixhotel-core'),
                'is_demo'      => true,
                'hold_minutes' => 15
            ]);
        }

        // 2. Rate-limiting: Tối đa 5 lượt gửi trong 10 phút từ một IP
        $rate_key = 'mixhotel_rate_' . md5($ip);
        $attempts = (int) get_transient($rate_key);
        if ($attempts >= 5) {
            wp_send_json_error([
                'code'    => 'rate_limited',
                'message' => __('Bạn đã gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng chờ 10 phút hoặc liên hệ trực tiếp hotline!', 'mixhotel-core')
            ]);
        }
        set_transient($rate_key, $attempts + 1, 10 * MINUTE_IN_SECONDS);

        // 3. Xác thực Nonce bảo mật CSRF (Tuân thủ BUG-03 trong SKILL.md)
        $nonce = '';
        if (!empty($_POST['mixhotel_booking_security'])) {
            $nonce = sanitize_text_field(wp_unslash($_POST['mixhotel_booking_security']));
        } elseif (!empty($_POST['mixhotel_booking_nonce'])) {
            $nonce = sanitize_text_field(wp_unslash($_POST['mixhotel_booking_nonce']));
        } elseif (!empty($_POST['_ajax_nonce'])) {
            $nonce = sanitize_text_field(wp_unslash($_POST['_ajax_nonce']));
        }

        $valid_nonce = wp_verify_nonce($nonce, 'mixhotel_booking_nonce') ||
                       wp_verify_nonce($nonce, 'mixhotel_submit_booking');

        if (!$valid_nonce) {
            wp_send_json_error([
                'code'    => 'invalid_nonce',
                'message' => __('Phiên làm việc đã hết hạn. Vui lòng tải lại trang và thử lại.', 'mixhotel-core')
            ]);
        }

        // 4. Lọc và kiểm tra tính hợp lệ của dữ liệu đầu vào (Input Sanitization)
        $customer_name  = isset($_POST['customer_name']) ? sanitize_text_field(wp_unslash($_POST['customer_name'])) : '';
        $customer_phone = isset($_POST['customer_phone']) ? sanitize_text_field(wp_unslash($_POST['customer_phone'])) : '';
        $branch_raw     = isset($_POST['branch_id']) ? sanitize_text_field(wp_unslash($_POST['branch_id'])) : '';
        $room_id        = isset($_POST['room_id']) ? absint($_POST['room_id']) : 0;
        $room_name      = isset($_POST['room_name']) ? sanitize_text_field(wp_unslash($_POST['room_name'])) : '';
        $demand_raw     = isset($_POST['booking_demand']) ? sanitize_text_field(wp_unslash($_POST['booking_demand'])) : '';
        $booking_date   = isset($_POST['booking_date']) ? sanitize_text_field(wp_unslash($_POST['booking_date'])) : date('Y-m-d');
        $booking_time   = isset($_POST['booking_time']) ? sanitize_text_field(wp_unslash($_POST['booking_time'])) : '';
        $booking_note   = isset($_POST['booking_note']) ? sanitize_textarea_field(wp_unslash($_POST['booking_note'])) : '';

        // Kiểm tra Họ tên
        if (empty($customer_name) || mb_strlen($customer_name) < 2) {
            wp_send_json_error([
                'code'    => 'invalid_name',
                'message' => __('Vui lòng nhập họ và tên hợp lệ (tối thiểu 2 ký tự).', 'mixhotel-core')
            ]);
        }

        // Kiểm tra Số điện thoại Việt Nam (10 chữ số, đầu 03/05/07/08/09)
        $clean_phone = preg_replace('/[^0-9]/', '', $customer_phone);
        if (!preg_match('/^(0[3|5|7|8|9])+([0-9]{8})$/', $clean_phone)) {
            wp_send_json_error([
                'code'    => 'invalid_phone',
                'message' => __('Vui lòng nhập số điện thoại Việt Nam hợp lệ (10 chữ số, bắt đầu 03, 05, 07, 08, 09).', 'mixhotel-core')
            ]);
        }

        // 5. Chuẩn hóa thông tin Chi nhánh & Nhu cầu
        $branch_info = self::resolve_branch_info($branch_raw, $room_id);
        $demand_label = self::resolve_demand_label($demand_raw);

        // 6. Sinh mã đơn giữ phòng duy nhất (#LEAD-YYYYMMDD-XXX)
        $today_str = date('Ymd');
        $counter_key = 'mixhotel_counter_' . $today_str;
        $counter = (int) get_transient($counter_key);
        $counter++;
        set_transient($counter_key, $counter, DAY_IN_SECONDS * 2);
        $lead_code = sprintf('#LEAD-%s-%03d', $today_str, $counter);

        // Kiểm tra chế độ Demo Sandbox
        $is_demo = get_option('mixhotel_demo_sandbox_mode', '1') === '1';

        // 7. Lưu vào WordPress CPT booking_lead
        $post_data = [
            'post_title'   => $lead_code,
            'post_type'    => 'booking_lead',
            'post_status'  => 'publish',
            'meta_input'   => [
                '_mixhotel_lead_code'           => $lead_code,
                '_mixhotel_lead_customer_name'  => $customer_name,
                '_mixhotel_lead_customer_phone' => $clean_phone,
                '_mixhotel_lead_branch_id'      => $branch_raw,
                '_mixhotel_lead_branch_name'    => $branch_info['name'],
                '_mixhotel_lead_room_id'        => $room_id,
                '_mixhotel_lead_room_name'      => $room_name,
                '_mixhotel_lead_demand'         => $demand_label,
                '_mixhotel_lead_booking_date'   => $booking_date,
                '_mixhotel_lead_booking_time'   => $booking_time,
                '_mixhotel_lead_note'           => $booking_note,
                '_mixhotel_lead_status'         => 'pending',
                '_mixhotel_lead_ip'             => $ip,
                '_mixhotel_lead_is_demo'        => $is_demo ? 1 : 0,
            ]
        ];

        $post_id = wp_insert_post($post_data, true);

        if (is_wp_error($post_id)) {
            wp_send_json_error([
                'code'    => 'db_error',
                'message' => __('Không thể lưu yêu cầu giữ phòng. Vui lòng thử lại!', 'mixhotel-core')
            ]);
        }

        // 8. Bắn thông báo Telegram / Kích hoạt Demo Sandbox Alert Simulator
        $lead_payload = [
            'id'           => $post_id,
            'code'         => $lead_code,
            'name'         => $customer_name,
            'phone'        => $clean_phone,
            'branch'       => $branch_info['name'],
            'room'         => $room_name ?: __('Theo phân bổ lễ tân', 'mixhotel-core'),
            'demand'       => $demand_label,
            'date'         => $booking_date,
            'time'         => $booking_time ?: 'N/A',
            'note'         => $booking_note,
            'is_demo'      => $is_demo,
            'created_at'   => current_time('mysql'),
        ];

        self::dispatch_notifications($lead_payload);

        // 9. Trả về kết quả thành công cho frontend
        wp_send_json_success([
            'lead_id'        => $post_id,
            'lead_code'      => $lead_code,
            'message'        => __('Yêu cầu giữ phòng của bạn đã được ghi nhận thành công!', 'mixhotel-core'),
            'is_demo'        => $is_demo,
            'branch_name'    => $branch_info['name'],
            'branch_hotline' => $branch_info['hotline'],
            'branch_zalo'    => $branch_info['zalo'],
            'hold_minutes'   => 15
        ]);
    }

    /**
     * Phân giải thông tin chi nhánh từ ID hoặc slug
     */
    private static function resolve_branch_info($branch_raw, $room_id = 0) {
        $default_hotline = get_option('mixhotel_default_hotline', '038 310 4010');
        $default_zalo    = 'https://zalo.me/+84383104010';

        // Nếu có room_id và helper có sẵn
        if ($room_id > 0 && class_exists('MixHotel_Helpers')) {
            $room_branch_id = get_post_meta($room_id, '_mixhotel_room_branch_id', true);
            if ($room_branch_id) {
                $bdata = MixHotel_Helpers::get_branch_data($room_branch_id);
                if ($bdata) {
                    $bname = ! empty($bdata['name']) ? $bdata['name'] : (! empty($bdata['title']) ? $bdata['title'] : '');
                    $bzalo = ! empty($bdata['zalo']) ? $bdata['zalo'] : (! empty($bdata['zalo_url']) ? $bdata['zalo_url'] : $default_zalo);
                    return [
                        'name'    => $bname,
                        'hotline' => ! empty($bdata['hotline']) ? $bdata['hotline'] : $default_hotline,
                        'zalo'    => $bzalo,
                    ];
                }
            }
        }

        // Nếu là số ID của post hotel_branch
        if (is_numeric($branch_raw) && $branch_raw > 0) {
            if (class_exists('MixHotel_Helpers')) {
                $bdata = MixHotel_Helpers::get_branch_data((int)$branch_raw);
                if ($bdata) {
                    $bname = ! empty($bdata['name']) ? $bdata['name'] : (! empty($bdata['title']) ? $bdata['title'] : '');
                    $bzalo = ! empty($bdata['zalo']) ? $bdata['zalo'] : (! empty($bdata['zalo_url']) ? $bdata['zalo_url'] : $default_zalo);
                    return [
                        'name'    => $bname,
                        'hotline' => ! empty($bdata['hotline']) ? $bdata['hotline'] : $default_hotline,
                        'zalo'    => $bzalo,
                    ];
                }
            }
        }

        // Nếu là slug của post hotel_branch
        if (!empty($branch_raw) && !is_numeric($branch_raw) && class_exists('MixHotel_Helpers')) {
            $branch_post = get_page_by_path($branch_raw, OBJECT, 'hotel_branch');
            if ($branch_post) {
                $bdata = MixHotel_Helpers::get_branch_data($branch_post->ID);
                if ($bdata) {
                    $bname = ! empty($bdata['name']) ? $bdata['name'] : (! empty($bdata['title']) ? $bdata['title'] : '');
                    $bzalo = ! empty($bdata['zalo']) ? $bdata['zalo'] : (! empty($bdata['zalo_url']) ? $bdata['zalo_url'] : $default_zalo);
                    return [
                        'name'    => $bname,
                        'hotline' => ! empty($bdata['hotline']) ? $bdata['hotline'] : $default_hotline,
                        'zalo'    => $bzalo,
                    ];
                }
            }
        }

        // Mappings từ slug form trang chủ sang thông tin chi nhánh
        $slug_maps = [
            'branch-premium' => [
                'name'    => 'CS1: Mix Huỳnh Thúc Kháng (Mix Premium)',
                'hotline' => '038 310 4010',
                'zalo'    => 'https://zalo.me/+84383104010',
            ],
            'cs1-huynh-thuc-khang' => [
                'name'    => 'CS1: Mix Huỳnh Thúc Kháng (Mix Premium)',
                'hotline' => '038 310 4010',
                'zalo'    => 'https://zalo.me/+84383104010',
            ],
            'branch-dangtiendong' => [
                'name'    => 'CS2: 256B Đặng Tiến Đông, Đống Đa',
                'hotline' => '039 330 7030',
                'zalo'    => 'https://zalo.me/+84393307030',
            ],
            'cs2-dang-tien-dong' => [
                'name'    => 'CS2: 256B Đặng Tiến Đông, Đống Đa',
                'hotline' => '039 330 7030',
                'zalo'    => 'https://zalo.me/+84393307030',
            ],
            'branch-phucla' => [
                'name'    => 'CS3: 20 Phúc La, Hà Đông',
                'hotline' => '038 310 4010',
                'zalo'    => 'https://zalo.me/+84383104010',
            ],
            'cs3-phuc-la' => [
                'name'    => 'CS3: 20 Phúc La, Hà Đông',
                'hotline' => '038 310 4010',
                'zalo'    => 'https://zalo.me/+84383104010',
            ],
        ];

        if (isset($slug_maps[$branch_raw])) {
            return $slug_maps[$branch_raw];
        }

        return [
            'name'    => 'Mix Boutique Hotel Hà Nội',
            'hotline' => $default_hotline,
            'zalo'    => $default_zalo,
        ];
    }

    /**
     * Chuẩn hóa text hiển thị nhu cầu đặt phòng
     */
    private static function resolve_demand_label($demand_raw) {
        $labels = [
            'rest-hourly'      => 'Nghỉ giờ (từ 2h)',
            '2h'               => 'Nghỉ giờ (2 giờ đầu)',
            'overnight'        => 'Nghỉ qua đêm (22h - 12h)',
            'allday'           => 'Cả ngày đêm (14h - 12h)',
            'event-decoration' => 'Trang trí sinh nhật / Kỷ niệm lãng mạn',
            'consult-concept'  => 'Tư vấn concept phòng phù hợp',
        ];

        return isset($labels[$demand_raw]) ? $labels[$demand_raw] : ($demand_raw ?: 'Nghỉ giờ');
    }

    /**
     * Gửi thông báo Telegram hoặc chạy Demo Sandbox Alert Simulator
     */
    private static function dispatch_notifications(array $lead) {
        $bot_token = get_option('mixhotel_telegram_bot_token', '');
        $chat_id   = get_option('mixhotel_telegram_chat_id', '');

        $message = "🛎️ *YÊU CẦU GIỮ PHÒNG MỚI*\n";
        $message .= "━━━━━━━━━━━━━━━━━━\n";
        $message .= "📋 *Mã đơn:* `{$lead['code']}`\n";
        $message .= "👤 *Khách hàng:* {$lead['name']}\n";
        $message .= "📞 *Điện thoại:* [{$lead['phone']}](tel:{$lead['phone']})\n";
        $message .= "🏢 *Chi nhánh:* {$lead['branch']}\n";
        $message .= "🚪 *Phòng:* {$lead['room']}\n";
        $message .= "⏳ *Nhu cầu:* {$lead['demand']}\n";
        $message .= "📅 *Thời gian:* {$lead['time']} - {$lead['date']}\n";
        if (!empty($lead['note'])) {
            $message .= "📝 *Ghi chú:* {$lead['note']}\n";
        }
        $message .= "━━━━━━━━━━━━━━━━━━\n";
        $message .= $lead['is_demo'] 
            ? "⚠️ *MÔ PHỎNG DEMO SANDBOX (Clone Kỹ Thuật)*" 
            : "⚡ *Vui lòng liên hệ khách trong vòng 15 phút!*";

        // Gửi Telegram thật nếu có token và chat ID
        if (!empty($bot_token) && !empty($chat_id)) {
            $api_url = "https://api.telegram.org/bot{$bot_token}/sendMessage";
            wp_remote_post($api_url, [
                'timeout' => 5,
                'body'    => [
                    'chat_id'    => $chat_id,
                    'text'       => $message,
                    'parse_mode' => 'Markdown',
                ]
            ]);
        }

        // Cơ chế Demo Sandbox Simulator: Lưu nhật ký mô phỏng cho quản trị viên xem lại
        if ($lead['is_demo'] || empty($bot_token)) {
            $log_entry = [
                'time'    => current_time('mysql'),
                'code'    => $lead['code'],
                'name'    => $lead['name'],
                'phone'   => $lead['phone'],
                'branch'  => $lead['branch'],
                'message' => $message,
                'status'  => 'simulated_success'
            ];

            $logs = get_option('mixhotel_demo_telegram_log', []);
            if (!is_array($logs)) {
                $logs = [];
            }
            array_unshift($logs, $log_entry);
            // Giữ tối đa 25 logs gần nhất
            $logs = array_slice($logs, 0, 25);
            update_option('mixhotel_demo_telegram_log', $logs, false);

            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log("[MixHotel Demo Sandbox] Booking Lead {$lead['code']} from {$lead['phone']} recorded successfully.");
            }
        }
    }
}
