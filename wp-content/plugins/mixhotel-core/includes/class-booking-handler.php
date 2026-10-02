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

        // AJAX Real-time Availability Check (T019)
        add_action('wp_ajax_nopriv_mixhotel_check_availability', [__CLASS__, 'handle_check_availability']);
        add_action('wp_ajax_mixhotel_check_availability', [__CLASS__, 'handle_check_availability']);

        // Custom WP-Cron interval & task cho Auto-Expire Bookings (T010)
        add_filter('cron_schedules', [__CLASS__, 'add_cron_interval']);
        add_action('mixhotel_check_expired_bookings', [__CLASS__, 'cron_expire_bookings']);

        // Lên lịch định kỳ nếu chưa có
        if (!wp_next_scheduled('mixhotel_check_expired_bookings')) {
            wp_schedule_event(time(), 'mixhotel_five_minutes', 'mixhotel_check_expired_bookings');
        }
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

        // 3. Xác thực Nonce bảo mật CSRF (Tuân thủ BUG-03 trong SKILL.md & BUG-17)
        $nonce = '';
        if (!empty($_POST['mixhotel_booking_nonce'])) {
            $nonce = sanitize_text_field(wp_unslash($_POST['mixhotel_booking_nonce']));
        } elseif (!empty($_POST['mixhotel_booking_security'])) {
            $nonce = sanitize_text_field(wp_unslash($_POST['mixhotel_booking_security']));
        } elseif (!empty($_POST['_ajax_nonce'])) {
            $nonce = sanitize_text_field(wp_unslash($_POST['_ajax_nonce']));
        }

        $valid_nonce = wp_verify_nonce($nonce, 'mixhotel_booking_nonce');

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

        // 5. Chuẩn hóa thông tin Chi nhánh, Nhu cầu & Thời gian lưu trú
        $branch_info   = self::resolve_branch_info($branch_raw, $room_id);
        $demand_label  = self::resolve_demand_label($demand_raw);
        $booking_times = self::resolve_booking_datetimes($booking_date, $booking_time, $demand_raw);
        $check_in_dt   = $booking_times['check_in'];
        $check_out_dt  = $booking_times['check_out'];

        // 6. Kiểm tra phòng trống theo khung giờ & Race Condition Prevention (NFR-001, T008)
        $room_lock_key = '';
        if ($room_id > 0) {
            $room_lock_key = 'mixhotel_room_lock_' . $room_id;
            $locked = get_transient($room_lock_key);
            if ($locked) {
                // Đợi 200ms nếu đang có request khác cùng phòng
                usleep(200000);
            }
            set_transient($room_lock_key, 1, 3);

            $is_available = self::check_room_availability($room_id, $check_in_dt, $check_out_dt);
            if (!$is_available) {
                delete_transient($room_lock_key);
                wp_send_json_error([
                    'code'    => 'room_unavailable',
                    'message' => __('Phòng đã hết trong khung giờ bạn chọn. Vui lòng chọn phòng khác hoặc liên hệ hotline!', 'mixhotel-core')
                ]);
            }
        }

        // 7. Xác định trạng thái đơn (Auto-Confirm hay Pending duyệt tay)
        $auto_confirm_enabled = get_option('mixhotel_auto_confirm_enabled', '1') === '1';
        $status = $auto_confirm_enabled ? 'confirmed' : 'pending';
        $hold_minutes = (int) get_option('mixhotel_hold_duration_minutes', 30);
        if ($hold_minutes <= 0) {
            $hold_minutes = 30;
        }
        $confirmed_at = ($status === 'confirmed') ? current_time('mysql') : '';

        // 8. Sinh mã đơn giữ phòng duy nhất (#LEAD-YYYYMMDD-XXX)
        $today_str = date('Ymd');
        $counter_key = 'mixhotel_counter_' . $today_str;
        $counter = (int) get_transient($counter_key);
        $counter++;
        set_transient($counter_key, $counter, DAY_IN_SECONDS * 2);
        $lead_code = sprintf('#LEAD-%s-%03d', $today_str, $counter);

        // Kiểm tra chế độ Demo Sandbox
        $is_demo = get_option('mixhotel_demo_sandbox_mode', '1') === '1';

        // 9. Lưu vào WordPress CPT booking_lead (T009)
        $post_data = [
            'post_title'   => $lead_code,
            'post_type'    => 'booking_lead',
            'post_status'  => 'publish',
            'meta_input'   => [
                '_mixhotel_lead_code'                => $lead_code,
                '_mixhotel_lead_customer_name'       => $customer_name,
                '_mixhotel_lead_customer_phone'      => $clean_phone,
                '_mixhotel_lead_branch_id'           => $branch_raw,
                '_mixhotel_lead_branch_name'         => $branch_info['name'],
                '_mixhotel_lead_room_id'             => $room_id,
                '_mixhotel_lead_room_name'           => $room_name,
                '_mixhotel_lead_demand'              => $demand_label,
                '_mixhotel_lead_booking_date'        => $booking_date,
                '_mixhotel_lead_booking_time'        => $booking_time,
                '_mixhotel_lead_check_in_datetime'   => $check_in_dt->format('Y-m-d H:i:s'),
                '_mixhotel_lead_check_out_datetime'  => $check_out_dt->format('Y-m-d H:i:s'),
                '_mixhotel_lead_duration_type'       => $demand_raw ?: '2h',
                '_mixhotel_lead_confirmed_at'        => $confirmed_at,
                '_mixhotel_lead_note'                => $booking_note,
                '_mixhotel_lead_status'              => $status,
                '_mixhotel_lead_ip'                  => $ip,
                '_mixhotel_lead_is_demo'             => $is_demo ? 1 : 0,
            ]
        ];

        $post_id = wp_insert_post($post_data, true);

        if (!empty($room_lock_key)) {
            delete_transient($room_lock_key);
        }

        if (is_wp_error($post_id)) {
            wp_send_json_error([
                'code'    => 'db_error',
                'message' => __('Không thể lưu yêu cầu giữ phòng. Vui lòng thử lại!', 'mixhotel-core')
            ]);
        }

        // 10. Bắn thông báo Telegram / Kích hoạt Demo Sandbox Alert Simulator
        $lead_payload = [
            'id'           => $post_id,
            'code'         => $lead_code,
            'status'       => $status,
            'name'         => $customer_name,
            'phone'        => $clean_phone,
            'branch'       => $branch_info['name'],
            'room'         => $room_name ?: __('Theo phân bổ lễ tân', 'mixhotel-core'),
            'demand'       => $demand_label,
            'date'         => $booking_date,
            'time'         => $booking_time ?: 'N/A',
            'check_in'     => $check_in_dt->format('Y-m-d H:i'),
            'check_out'    => $check_out_dt->format('Y-m-d H:i'),
            'hold_minutes' => $hold_minutes,
            'note'         => $booking_note,
            'is_demo'      => $is_demo,
            'created_at'   => current_time('mysql'),
        ];

        self::dispatch_notifications($lead_payload);

        // 11. Trả về kết quả thành công cho frontend theo Contract 1
        $success_message = ($status === 'confirmed')
            ? __('Phòng đã được xác nhận tự động! Nhân viên sẽ liên hệ bạn ngay.', 'mixhotel-core')
            : __('Yêu cầu giữ phòng của bạn đã được ghi nhận thành công!', 'mixhotel-core');

        wp_send_json_success([
            'lead_id'        => $post_id,
            'lead_code'      => $lead_code,
            'message'        => $success_message,
            'status'         => $status,
            'is_demo'        => $is_demo,
            'branch_name'    => $branch_info['name'],
            'branch_hotline' => $branch_info['hotline'],
            'branch_zalo'    => $branch_info['zalo'],
            'hold_minutes'   => $hold_minutes,
            'check_in'       => $check_in_dt->format('Y-m-d H:i'),
            'check_out'      => $check_out_dt->format('Y-m-d H:i'),
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

    /**
     * Tính thời gian check-out dự kiến dựa trên thời gian check-in và loại nhu cầu nghỉ (T007)
     *
     * @param DateTime|string $check_in_dt DateTime object hoặc chuỗi 'Y-m-d H:i:s'
     * @param string          $demand_type Loại nhu cầu ('2h', 'rest-hourly', 'overnight', 'allday', ...)
     * @return DateTime
     */
    public static function calculate_checkout_time($check_in_dt, $demand_type = '2h') {
        if (!($check_in_dt instanceof DateTime)) {
            $check_in_dt = new DateTime((string) $check_in_dt);
        }

        $check_out = clone $check_in_dt;
        $hour = (int) $check_in_dt->format('H');

        switch ($demand_type) {
            case 'overnight':
                // Check-out cố định 12:00 trưa
                // Nếu khách nhận phòng buổi sáng (trước 12h trưa) -> Trả phòng 12:00 cùng ngày
                // Nếu khách nhận phòng chiều/tối/đêm (từ 12h trở đi) -> Trả phòng 12:00 trưa hôm sau
                if ($hour < 12) {
                    $check_out->setTime(12, 0, 0);
                } else {
                    $check_out->modify('+1 day');
                    $check_out->setTime(12, 0, 0);
                }
                break;

            case 'allday':
                // Cả ngày đêm: Đến 12:00 hôm sau
                $check_out->modify('+1 day');
                $check_out->setTime(12, 0, 0);
                break;

            case '2h':
            case 'rest-hourly':
            default:
                // Nghỉ giờ: +2 tiếng
                $check_out->modify('+2 hours');
                break;
        }

        return $check_out;
    }

    /**
     * Chuẩn hóa và xác định cặp DateTime check-in & check-out
     *
     * @param string $booking_date
     * @param string $booking_time
     * @param string $demand_type
     * @return array ['check_in' => DateTime, 'check_out' => DateTime]
     */
    public static function resolve_booking_datetimes($booking_date, $booking_time, $demand_type) {
        $booking_date = !empty($booking_date) ? $booking_date : current_time('Y-m-d');

        // Nếu booking_time rỗng thì gán mặc định theo loại nhu cầu
        if (empty($booking_time)) {
            if ($demand_type === 'overnight') {
                $booking_time = '22:00';
            } elseif ($demand_type === 'allday') {
                $booking_time = '14:00';
            } else {
                $booking_time = '14:00';
            }
        }

        // Đảm bảo định dạng giờ có cả phút
        if (preg_match('/^\d{1,2}$/', $booking_time)) {
            $booking_time = sprintf('%02d:00', (int)$booking_time);
        }

        try {
            $check_in = new DateTime($booking_date . ' ' . $booking_time);
        } catch (Exception $e) {
            $check_in = new DateTime(current_time('mysql'));
        }

        // Tôn trọng chính xác giờ nhận phòng do khách chọn để phát hiện trùng lịch (Overbooking)
        $check_out = self::calculate_checkout_time($check_in, $demand_type);

        return [
            'check_in'  => $check_in,
            'check_out' => $check_out,
        ];
    }

    /**
     * Kiểm tra phòng trống theo khung giờ cụ thể (Overbooking Prevention - T008)
     *
     * @param int             $room_id         ID phòng
     * @param DateTime|string $check_in_dt     Thời gian nhận phòng
     * @param DateTime|string $check_out_dt    Thời gian trả phòng
     * @param int             $exclude_lead_id ID đơn loại trừ khi kiểm tra
     * @return bool True nếu còn slot, False nếu trùng lịch
     */
    public static function check_room_availability($room_id, $check_in_dt, $check_out_dt, $exclude_lead_id = 0) {
        global $wpdb;

        $room_id = absint($room_id);
        if ($room_id <= 0) {
            // Không chọn phòng cụ thể (form nhanh trang chủ) -> Lễ tân phân bổ
            return true;
        }

        $check_in_str  = ($check_in_dt instanceof DateTime) ? $check_in_dt->format('Y-m-d H:i:s') : (string) $check_in_dt;
        $check_out_str = ($check_out_dt instanceof DateTime) ? $check_out_dt->format('Y-m-d H:i:s') : (string) $check_out_dt;

        // Truy vấn kiểm tra trùng lịch (time-range overlap theo Contract 2)
        // Đơn trùng nếu: (existing_checkin < new_checkout) VÀ (existing_checkout > new_checkin)
        $sql = "SELECT COUNT(*) FROM {$wpdb->posts} p
            INNER JOIN {$wpdb->postmeta} pm_room ON p.ID = pm_room.post_id 
                AND pm_room.meta_key = '_mixhotel_lead_room_id'
            INNER JOIN {$wpdb->postmeta} pm_status ON p.ID = pm_status.post_id 
                AND pm_status.meta_key = '_mixhotel_lead_status'
            INNER JOIN {$wpdb->postmeta} pm_checkin ON p.ID = pm_checkin.post_id 
                AND pm_checkin.meta_key = '_mixhotel_lead_check_in_datetime'
            INNER JOIN {$wpdb->postmeta} pm_checkout ON p.ID = pm_checkout.post_id 
                AND pm_checkout.meta_key = '_mixhotel_lead_check_out_datetime'
            WHERE p.post_type = 'booking_lead'
              AND p.post_status = 'publish'
              AND pm_room.meta_value = %d
              AND pm_status.meta_value IN ('confirmed', 'checked_in')
              AND pm_checkin.meta_value < %s
              AND pm_checkout.meta_value > %s";

        $params = [$room_id, $check_out_str, $check_in_str];

        if ($exclude_lead_id > 0) {
            $sql .= " AND p.ID != %d";
            $params[] = $exclude_lead_id;
        }

        $prepared = $wpdb->prepare($sql, ...$params);
        $conflicts = (int) $wpdb->get_var($prepared);

        return $conflicts === 0;
    }

    /**
     * Đăng ký cron schedule interval 5 phút (T010)
     */
    public static function add_cron_interval($schedules) {
        if (!isset($schedules['mixhotel_five_minutes'])) {
            $schedules['mixhotel_five_minutes'] = [
                'interval' => 300,
                'display'  => __('Mỗi 5 phút (Mix Hotel)', 'mixhotel-core'),
            ];
        }
        return $schedules;
    }

    /**
     * Tự động quét và chuyển trạng thái 'expired' cho các đơn quá hạn giữ phòng (T011)
     *
     * @return int Số lượng đơn đã chuyển sang expired
     */
    public static function cron_expire_bookings() {
        global $wpdb;

        $hold_minutes = (int) get_option('mixhotel_hold_duration_minutes', 30);
        if ($hold_minutes <= 0) {
            $hold_minutes = 30;
        }

        // Lấy danh sách các đơn CPT booking_lead đang ở trạng thái 'confirmed'
        // Chỉ đơn 'confirmed' mới có thể hết hạn giữ phòng!
        $sql = "SELECT p.ID FROM {$wpdb->posts} p
            INNER JOIN {$wpdb->postmeta} pm_status ON p.ID = pm_status.post_id 
                AND pm_status.meta_key = '_mixhotel_lead_status'
            WHERE p.post_type = 'booking_lead'
              AND p.post_status = 'publish'
              AND pm_status.meta_value = 'confirmed'
            LIMIT 100";

        $lead_ids = $wpdb->get_col($sql);

        if (empty($lead_ids)) {
            return 0;
        }

        $now = current_time('mysql');
        $now_timestamp = current_time('timestamp');
        $count = 0;

        foreach ($lead_ids as $lead_id) {
            $lead_id = (int) $lead_id;

            // KIỂM TRA BẢO VỆ CHẶT CHẼ 1:
            // Chỉ DUY NHẤT đơn có status chính xác là 'confirmed' mới được phép chuyển sang 'expired'!
            // TUYỆT ĐỐI không bao giờ chuyển các đơn đã 'checked_in', 'completed', 'cancelled', 'no_show', 'contacted'!
            $current_status = get_post_meta($lead_id, '_mixhotel_lead_status', true);
            if ($current_status !== 'confirmed') {
                continue;
            }

            // KIỂM TRA BẢO VỆ CHẶT CHẼ 2:
            // Thời điểm hết hạn giữ phòng:
            // Khách có giờ check-in hẹn trước -> Đơn chỉ hết hạn khi: hiện tại >= (check_in_datetime + hold_minutes).
            // Nếu không có check_in_datetime -> Đơn hết hạn khi: hiện tại >= (confirmed_at + hold_minutes).
            $cin_str = get_post_meta($lead_id, '_mixhotel_lead_check_in_datetime', true);
            $confirmed_str = get_post_meta($lead_id, '_mixhotel_lead_confirmed_at', true);

            $base_time_str = !empty($cin_str) ? $cin_str : $confirmed_str;
            if (!empty($base_time_str)) {
                $base_timestamp = strtotime($base_time_str);
                $expire_timestamp = $base_timestamp + ($hold_minutes * MINUTE_IN_SECONDS);
                if ($now_timestamp < $expire_timestamp) {
                    // Chưa đến thời điểm hết hạn giữ phòng -> Bỏ qua
                    continue;
                }
            }

            update_post_meta($lead_id, '_mixhotel_lead_status', 'expired');
            update_post_meta($lead_id, '_mixhotel_lead_expired_at', $now);
            $count++;

            $code = get_post_meta($lead_id, '_mixhotel_lead_code', true);
            if (defined('WP_DEBUG') && WP_DEBUG) {
                error_log("[MixHotel Cron] Booking Lead {$code} (ID: {$lead_id}) expired after {$hold_minutes} minutes.");
            }
        }

        return $count;
    }

    /**
     * AJAX Endpoint: Kiểm tra phòng trống theo thời gian thực (T019)
     */
    public static function handle_check_availability() {
        $room_id      = isset($_GET['room_id']) ? absint($_GET['room_id']) : (isset($_POST['room_id']) ? absint($_POST['room_id']) : 0);
        $booking_date = isset($_REQUEST['booking_date']) ? sanitize_text_field(wp_unslash($_REQUEST['booking_date'])) : current_time('Y-m-d');
        $booking_time = isset($_REQUEST['booking_time']) ? sanitize_text_field(wp_unslash($_REQUEST['booking_time'])) : '14:00';
        $demand_type  = isset($_REQUEST['booking_demand']) ? sanitize_text_field(wp_unslash($_REQUEST['booking_demand'])) : '2h';

        if ($room_id <= 0) {
            wp_send_json_success(['available' => true, 'message' => '']);
        }

        $times = self::resolve_booking_datetimes($booking_date, $booking_time, $demand_type);
        $is_available = self::check_room_availability($room_id, $times['check_in'], $times['check_out']);

        wp_send_json_success([
            'available' => $is_available,
            'check_in'  => $times['check_in']->format('Y-m-d H:i'),
            'check_out' => $times['check_out']->format('Y-m-d H:i'),
            'message'   => $is_available
                ? __('Khung giờ này đang còn phòng trống', 'mixhotel-core')
                : __('Khung giờ này đã kín lịch giữ phòng', 'mixhotel-core'),
        ]);
    }
}
