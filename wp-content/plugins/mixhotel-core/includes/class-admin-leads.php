<?php
/**
 * Admin Lead Management & Custom Columns
 *
 * Tùy biến giao diện quản lý CPT booking_lead trong WP Admin:
 * Custom columns, Meta Box chi tiết, Quick Call/Zalo, Quick Action buttons và Cập nhật trạng thái.
 *
 * @package MixHotelCore
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class MixHotel_Admin_Leads {

    /**
     * Khởi tạo hooks
     */
    public static function init() {
        // Tùy biến cột danh sách booking_lead (T013)
        add_filter('manage_booking_lead_posts_columns', [__CLASS__, 'customize_columns']);
        add_action('manage_booking_lead_posts_custom_column', [__CLASS__, 'render_column_content'], 10, 2);
        add_filter('manage_edit-booking_lead_sortable_columns', [__CLASS__, 'sortable_columns']);

        // Bộ lọc trạng thái trên danh sách đơn (T015)
        add_action('restrict_manage_posts', [__CLASS__, 'filter_leads_by_status']);
        add_filter('parse_query', [__CLASS__, 'apply_status_filter']);

        // Meta Box chi tiết đơn
        add_action('add_meta_boxes', [__CLASS__, 'register_lead_meta_boxes']);
        add_action('save_post_booking_lead', [__CLASS__, 'save_lead_meta']);

        // Admin CSS & JS cho badges và quick action buttons
        add_action('admin_head', [__CLASS__, 'output_admin_styles']);
        add_action('admin_footer', [__CLASS__, 'output_admin_scripts']);

        // Quick Action AJAX Handlers (T014, Contract 5)
        add_action('wp_ajax_mixhotel_quick_update_status', [__CLASS__, 'handle_quick_update_status']);
        add_action('wp_ajax_mixhotel_checkin_booking', [__CLASS__, 'handle_checkin_booking']);
        add_action('wp_ajax_mixhotel_complete_booking', [__CLASS__, 'handle_complete_booking']);
        add_action('wp_ajax_mixhotel_cancel_booking', [__CLASS__, 'handle_cancel_booking']);
        add_action('wp_ajax_mixhotel_noshow_booking', [__CLASS__, 'handle_noshow_booking']);
    }

    /**
     * Tùy biến danh sách cột
     */
    public static function customize_columns($columns) {
        $new_columns = [];
        $new_columns['cb']              = $columns['cb'];
        $new_columns['title']           = __('Mã Đơn Giữ Phòng', 'mixhotel-core');
        $new_columns['customer']        = __('Khách Hàng', 'mixhotel-core');
        $new_columns['branch_room']     = __('Chi Nhánh & Phòng', 'mixhotel-core');
        $new_columns['demand_schedule'] = __('Nhu Cầu & Lịch Hẹn', 'mixhotel-core');
        $new_columns['checkin_out']     = __('Check-in / Check-out', 'mixhotel-core');
        $new_columns['lead_status']     = __('Trạng Thái', 'mixhotel-core');
        $new_columns['date']            = __('Thời Gian Gửi', 'mixhotel-core');

        return $new_columns;
    }

    /**
     * Render nội dung từng cột tùy biến
     */
    public static function render_column_content($column, $post_id) {
        switch ($column) {
            case 'customer':
                $name  = get_post_meta($post_id, '_mixhotel_lead_customer_name', true);
                $phone = get_post_meta($post_id, '_mixhotel_lead_customer_phone', true);
                $is_demo = get_post_meta($post_id, '_mixhotel_lead_is_demo', true);

                echo '<strong>' . esc_html($name ?: 'Khách hàng') . '</strong><br>';
                if ($phone) {
                    echo '<a href="' . esc_url('tel:' . $phone) . '" class="button button-small" style="margin-top:4px;">';
                    echo '<span class="dashicons dashicons-phone" style="font-size:14px;line-height:1.6;"></span> ' . esc_html($phone);
                    echo '</a> ';
                    echo '<a href="' . esc_url('https://zalo.me/' . $phone) . '" target="_blank" class="button button-small" style="margin-top:4px;color:#0068ff;" title="Nhắn Zalo">';
                    echo 'Zalo';
                    echo '</a>';
                }
                if ($is_demo) {
                    echo '<br><span class="mix-badge mix-badge--demo" style="margin-top:4px;display:inline-block;">Sandbox</span>';
                }
                break;

            case 'branch_room':
                $branch = get_post_meta($post_id, '_mixhotel_lead_branch_name', true);
                $room   = get_post_meta($post_id, '_mixhotel_lead_room_name', true);

                echo '<span class="dashicons dashicons-location" style="font-size:14px;color:#888;"></span> ' . esc_html($branch ?: 'Chưa chọn chi nhánh') . '<br>';
                if ($room) {
                    echo '<strong><span class="dashicons dashicons-admin-home" style="font-size:14px;color:#c5a880;"></span> ' . esc_html($room) . '</strong>';
                } else {
                    echo '<span style="color:#888;font-size:12px;">' . esc_html__('Lễ tân sắp xếp phòng', 'mixhotel-core') . '</span>';
                }
                break;

            case 'demand_schedule':
                $demand = get_post_meta($post_id, '_mixhotel_lead_demand', true);
                $date   = get_post_meta($post_id, '_mixhotel_lead_booking_date', true);
                $time   = get_post_meta($post_id, '_mixhotel_lead_booking_time', true);

                echo '<strong>' . esc_html($demand ?: 'Nghỉ giờ') . '</strong><br>';
                if ($date || $time) {
                    echo '<span style="color:#555;font-size:12px;">' . esc_html(trim($time . ' ' . $date)) . '</span>';
                }
                break;

            case 'checkin_out':
                $cin  = get_post_meta($post_id, '_mixhotel_lead_check_in_datetime', true);
                $cout = get_post_meta($post_id, '_mixhotel_lead_check_out_datetime', true);
                if ($cin || $cout) {
                    echo '<span style="font-size:12px;display:block;"><strong style="color:#2b6cb0;">Vào:</strong> ' . esc_html($cin ? date_i18n('d/m/Y H:i', strtotime($cin)) : '—') . '</span>';
                    echo '<span style="font-size:12px;display:block;"><strong style="color:#718096;">Ra:</strong> ' . esc_html($cout ? date_i18n('d/m/Y H:i', strtotime($cout)) : '—') . '</span>';
                } else {
                    echo '<span style="color:#999;font-size:12px;">' . esc_html__('Chưa đặt giờ', 'mixhotel-core') . '</span>';
                }
                break;

            case 'lead_status':
                $status = get_post_meta($post_id, '_mixhotel_lead_status', true) ?: 'pending';
                self::render_status_badge($status);
                break;
        }
    }

    /**
     * Cột có thể sắp xếp
     */
    public static function sortable_columns($columns) {
        $columns['customer']    = 'customer';
        $columns['lead_status'] = 'lead_status';
        return $columns;
    }

    /**
     * Render badge trạng thái (T013)
     */
    public static function render_status_badge($status) {
        $status_labels = [
            'confirmed'  => ['label' => __('✅ Đã giữ phòng', 'mixhotel-core'), 'class' => 'mix-badge--confirmed'],
            'checked_in' => ['label' => __('🏨 Đã nhận phòng', 'mixhotel-core'), 'class' => 'mix-badge--checkedin'],
            'completed'  => ['label' => __('✔️ Hoàn thành', 'mixhotel-core'), 'class' => 'mix-badge--completed'],
            'expired'    => ['label' => __('⏰ Hết hạn', 'mixhotel-core'), 'class' => 'mix-badge--expired'],
            'no_show'    => ['label' => __('🚫 Không đến', 'mixhotel-core'), 'class' => 'mix-badge--noshow'],
            'cancelled'  => ['label' => __('❌ Đã hủy', 'mixhotel-core'), 'class' => 'mix-badge--cancelled'],
            'pending'    => ['label' => __('⏳ Chờ xác nhận', 'mixhotel-core'), 'class' => 'mix-badge--pending'],
            'contacted'  => ['label' => __('🔵 Đã gọi tư vấn', 'mixhotel-core'), 'class' => 'mix-badge--contacted'],
        ];

        $current = isset($status_labels[$status]) ? $status_labels[$status] : $status_labels['pending'];
        echo '<span class="mix-badge ' . esc_attr($current['class']) . '">' . esc_html($current['label']) . '</span>';
    }

    /**
     * Bộ lọc trạng thái trên danh sách đơn (T015)
     */
    public static function filter_leads_by_status() {
        global $typenow;
        if ($typenow === 'booking_lead') {
            $current = isset($_GET['lead_status_filter']) ? sanitize_text_field(wp_unslash($_GET['lead_status_filter'])) : '';
            ?>
            <select name="lead_status_filter">
                <option value=""><?php esc_html_e('Tất cả trạng thái', 'mixhotel-core'); ?></option>
                <option value="confirmed" <?php selected('confirmed', $current); ?>>✅ <?php esc_html_e('Đã giữ phòng', 'mixhotel-core'); ?></option>
                <option value="checked_in" <?php selected('checked_in', $current); ?>>🏨 <?php esc_html_e('Đã nhận phòng', 'mixhotel-core'); ?></option>
                <option value="completed" <?php selected('completed', $current); ?>>✔️ <?php esc_html_e('Hoàn thành', 'mixhotel-core'); ?></option>
                <option value="pending" <?php selected('pending', $current); ?>>⏳ <?php esc_html_e('Chờ xác nhận', 'mixhotel-core'); ?></option>
                <option value="contacted" <?php selected('contacted', $current); ?>>🔵 <?php esc_html_e('Đã gọi tư vấn', 'mixhotel-core'); ?></option>
                <option value="expired" <?php selected('expired', $current); ?>>⏰ <?php esc_html_e('Hết hạn giữ phòng', 'mixhotel-core'); ?></option>
                <option value="no_show" <?php selected('no_show', $current); ?>>🚫 <?php esc_html_e('Khách không đến', 'mixhotel-core'); ?></option>
                <option value="cancelled" <?php selected('cancelled', $current); ?>>❌ <?php esc_html_e('Đã hủy', 'mixhotel-core'); ?></option>
            </select>
            <?php
        }
    }

    /**
     * Áp dụng bộ lọc trạng thái vào query
     */
    public static function apply_status_filter($query) {
        global $pagenow;
        if (is_admin() && $pagenow === 'edit.php' && isset($query->query_vars['post_type']) && $query->query_vars['post_type'] === 'booking_lead') {
            if (!empty($_GET['lead_status_filter'])) {
                $status = sanitize_text_field(wp_unslash($_GET['lead_status_filter']));
                $query->query_vars['meta_key'] = '_mixhotel_lead_status';
                $query->query_vars['meta_value'] = $status;
            }
        }
    }

    /**
     * Đăng ký Meta Box cho màn hình chỉnh sửa booking_lead
     */
    public static function register_lead_meta_boxes() {
        add_meta_box(
            'mixhotel_lead_details_meta_box',
            __('Chi Tiết Đơn Giữ Phòng & Tiếp Nhận', 'mixhotel-core'),
            [__CLASS__, 'render_lead_meta_box'],
            'booking_lead',
            'normal',
            'high'
        );
    }

    /**
     * Render nội dung Meta Box chi tiết (T014)
     */
    public static function render_lead_meta_box($post) {
        wp_nonce_field('mixhotel_save_lead_meta', 'mixhotel_lead_meta_nonce');

        $name          = get_post_meta($post->ID, '_mixhotel_lead_customer_name', true);
        $phone         = get_post_meta($post->ID, '_mixhotel_lead_customer_phone', true);
        $branch        = get_post_meta($post->ID, '_mixhotel_lead_branch_name', true);
        $room          = get_post_meta($post->ID, '_mixhotel_lead_room_name', true);
        $demand        = get_post_meta($post->ID, '_mixhotel_lead_demand', true);
        $date          = get_post_meta($post->ID, '_mixhotel_lead_booking_date', true);
        $time          = get_post_meta($post->ID, '_mixhotel_lead_booking_time', true);
        $check_in_dt   = get_post_meta($post->ID, '_mixhotel_lead_check_in_datetime', true);
        $check_out_dt  = get_post_meta($post->ID, '_mixhotel_lead_check_out_datetime', true);
        $confirmed_at  = get_post_meta($post->ID, '_mixhotel_lead_confirmed_at', true);
        $expired_at    = get_post_meta($post->ID, '_mixhotel_lead_expired_at', true);
        $note          = get_post_meta($post->ID, '_mixhotel_lead_note', true);
        $status        = get_post_meta($post->ID, '_mixhotel_lead_status', true) ?: 'pending';
        $ip            = get_post_meta($post->ID, '_mixhotel_lead_ip', true);
        $is_demo       = get_post_meta($post->ID, '_mixhotel_lead_is_demo', true);
        $staff_note    = get_post_meta($post->ID, '_mixhotel_lead_staff_note', true);
        ?>
        <div class="mixhotel-admin-lead-box" style="padding: 10px 0;">
            <?php if ($is_demo) : ?>
                <div style="background: #fff8e5; border-left: 4px solid #f0b840; padding: 8px 12px; margin-bottom: 16px;">
                    <strong><?php esc_html_e('Đơn đặt thử nghiệm (Demo Sandbox Mode)', 'mixhotel-core'); ?></strong>
                    <p style="margin: 4px 0 0; font-size: 13px; color: #555;">
                        <?php esc_html_e('Đơn này được gửi trong chế độ Demo Sandbox phục vụ kiểm thử kỹ thuật.', 'mixhotel-core'); ?>
                    </p>
                </div>
            <?php endif; ?>

            <!-- Quick Action Buttons Bar (T014, Contract 5) -->
            <div class="mix-quick-actions" style="margin-bottom: 20px; padding: 12px 16px; background: #f0f4f8; border: 1px solid #cbd5e0; border-radius: 6px; display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
                <strong style="color: #2d3748;"><?php esc_html_e('Thao tác nhanh:', 'mixhotel-core'); ?></strong>

                <?php if (in_array($status, ['confirmed', 'pending', 'contacted'], true)) : ?>
                    <button type="button" class="button button-primary mix-lead-action-btn" data-action="mixhotel_checkin_booking" data-lead-id="<?php echo esc_attr($post->ID); ?>">
                        🏨 <?php esc_html_e('Check-in Nhận Phòng', 'mixhotel-core'); ?>
                    </button>
                    <button type="button" class="button mix-lead-action-btn" data-action="mixhotel_noshow_booking" data-lead-id="<?php echo esc_attr($post->ID); ?>" style="color: #c53030;">
                        🚫 <?php esc_html_e('Khách Không Đến', 'mixhotel-core'); ?>
                    </button>
                <?php endif; ?>

                <?php if ($status === 'checked_in') : ?>
                    <button type="button" class="button button-primary mix-lead-action-btn" data-action="mixhotel_complete_booking" data-lead-id="<?php echo esc_attr($post->ID); ?>">
                        ✔️ <?php esc_html_e('Trả Phòng / Hoàn Thành', 'mixhotel-core'); ?>
                    </button>
                <?php endif; ?>

                <?php if (in_array($status, ['confirmed', 'checked_in', 'pending', 'contacted'], true)) : ?>
                    <button type="button" class="button mix-lead-action-btn" data-action="mixhotel_cancel_booking" data-lead-id="<?php echo esc_attr($post->ID); ?>" style="color: #e53e3e;">
                        ❌ <?php esc_html_e('Hủy Giữ Phòng', 'mixhotel-core'); ?>
                    </button>
                <?php endif; ?>

                <span class="mix-action-feedback" style="margin-left: 10px; font-weight: bold; color: #276749;"></span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 20px;">
                <!-- Khối Khách hàng -->
                <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; border: 1px solid #e2e4e7;">
                    <h4 style="margin-top:0; color:#17171c;"><?php esc_html_e('Thông Tin Khách Hàng', 'mixhotel-core'); ?></h4>
                    <p><strong><?php esc_html_e('Họ và tên:', 'mixhotel-core'); ?></strong> <?php echo esc_html($name); ?></p>
                    <p>
                        <strong><?php esc_html_e('Số điện thoại:', 'mixhotel-core'); ?></strong> 
                        <a href="<?php echo esc_url('tel:' . $phone); ?>" style="font-size:15px; font-weight:bold; color:#0073aa;"><?php echo esc_html($phone); ?></a>
                    </p>
                    <div style="margin-top: 10px;">
                        <a href="<?php echo esc_url('tel:' . $phone); ?>" class="button button-primary">
                            <span class="dashicons dashicons-phone" style="vertical-align:text-bottom;"></span> <?php esc_html_e('Bấm Gọi Ngay', 'mixhotel-core'); ?>
                        </a>
                        <a href="<?php echo esc_url('https://zalo.me/' . $phone); ?>" target="_blank" class="button" style="color:#0068ff;">
                            <?php esc_html_e('Nhắn Zalo', 'mixhotel-core'); ?>
                        </a>
                    </div>
                </div>

                <!-- Khối Phòng & Chi nhánh -->
                <div style="background: #f9f9f9; padding: 14px; border-radius: 6px; border: 1px solid #e2e4e7;">
                    <h4 style="margin-top:0; color:#17171c;"><?php esc_html_e('Thông Tin Phòng Đặt', 'mixhotel-core'); ?></h4>
                    <p><strong><?php esc_html_e('Chi nhánh:', 'mixhotel-core'); ?></strong> <?php echo esc_html($branch); ?></p>
                    <p><strong><?php esc_html_e('Phòng đã chọn:', 'mixhotel-core'); ?></strong> <?php echo esc_html($room ?: __('Khách chưa chọn phòng cụ thể', 'mixhotel-core')); ?></p>
                    <p><strong><?php esc_html_e('Nhu cầu:', 'mixhotel-core'); ?></strong> <?php echo esc_html($demand); ?></p>
                    <p><strong><?php esc_html_e('Dự kiến nhận:', 'mixhotel-core'); ?></strong> <?php echo esc_html(trim($time . ' ' . $date)); ?></p>
                    <?php if ($check_in_dt || $check_out_dt) : ?>
                        <p style="margin-top: 6px; font-size: 13px;">
                            <strong><?php esc_html_e('Khung giờ giữ phòng:', 'mixhotel-core'); ?></strong><br>
                            <span style="color:#2b6cb0;">Check-in: <?php echo esc_html($check_in_dt ? date_i18n('d/m/Y H:i', strtotime($check_in_dt)) : '—'); ?></span><br>
                            <span style="color:#718096;">Check-out: <?php echo esc_html($check_out_dt ? date_i18n('d/m/Y H:i', strtotime($check_out_dt)) : '—'); ?></span>
                        </p>
                    <?php endif; ?>
                </div>
            </div>

            <?php if (!empty($note)) : ?>
                <div style="background: #fdfaf4; border-left: 4px solid #c5a880; padding: 10px 14px; margin-bottom: 20px;">
                    <strong><?php esc_html_e('Ghi chú của khách hàng:', 'mixhotel-core'); ?></strong>
                    <p style="margin: 4px 0 0; font-style: italic;"><?php echo esc_html($note); ?></p>
                </div>
            <?php endif; ?>

            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #e2e4e7;" />

            <!-- Tiếp nhận & Quản lý trạng thái -->
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row">
                        <label for="mixhotel_lead_status"><strong><?php esc_html_e('Trạng thái xử lý', 'mixhotel-core'); ?></strong></label>
                    </th>
                    <td>
                        <select name="mixhotel_lead_status" id="mixhotel_lead_status" style="min-width: 260px; font-weight: bold; font-size: 14px;">
                            <option value="confirmed" <?php selected('confirmed', $status); ?>>✅ <?php esc_html_e('Đã giữ phòng (Auto-Confirm)', 'mixhotel-core'); ?></option>
                            <option value="checked_in" <?php selected('checked_in', $status); ?>>🏨 <?php esc_html_e('Đã nhận phòng (Checked-in)', 'mixhotel-core'); ?></option>
                            <option value="completed" <?php selected('completed', $status); ?>>✔️ <?php esc_html_e('Hoàn thành (Trả phòng)', 'mixhotel-core'); ?></option>
                            <option value="pending" <?php selected('pending', $status); ?>>⏳ <?php esc_html_e('Chờ xác nhận (Pending)', 'mixhotel-core'); ?></option>
                            <option value="contacted" <?php selected('contacted', $status); ?>>🔵 <?php esc_html_e('Đã gọi tư vấn', 'mixhotel-core'); ?></option>
                            <option value="expired" <?php selected('expired', $status); ?>>⏰ <?php esc_html_e('Hết hạn giữ phòng (Expired)', 'mixhotel-core'); ?></option>
                            <option value="no_show" <?php selected('no_show', $status); ?>>🚫 <?php esc_html_e('Khách không đến (No-show)', 'mixhotel-core'); ?></option>
                            <option value="cancelled" <?php selected('cancelled', $status); ?>>❌ <?php esc_html_e('Đã hủy đơn (Cancelled)', 'mixhotel-core'); ?></option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label for="mixhotel_lead_check_in_datetime"><?php esc_html_e('Thời gian Check-in', 'mixhotel-core'); ?></label>
                    </th>
                    <td>
                        <input type="text" name="mixhotel_lead_check_in_datetime" id="mixhotel_lead_check_in_datetime" value="<?php echo esc_attr($check_in_dt); ?>" class="regular-text" placeholder="YYYY-MM-DD HH:MM:SS" />
                        <p class="description"><?php esc_html_e('Định dạng: YYYY-MM-DD HH:MM:SS', 'mixhotel-core'); ?></p>
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label for="mixhotel_lead_check_out_datetime"><?php esc_html_e('Thời gian Check-out', 'mixhotel-core'); ?></label>
                    </th>
                    <td>
                        <input type="text" name="mixhotel_lead_check_out_datetime" id="mixhotel_lead_check_out_datetime" value="<?php echo esc_attr($check_out_dt); ?>" class="regular-text" placeholder="YYYY-MM-DD HH:MM:SS" />
                    </td>
                </tr>

                <tr>
                    <th scope="row">
                        <label for="mixhotel_lead_staff_note"><?php esc_html_e('Ghi chú của lễ tân', 'mixhotel-core'); ?></label>
                    </th>
                    <td>
                        <textarea name="mixhotel_lead_staff_note" id="mixhotel_lead_staff_note" rows="3" class="large-text" placeholder="<?php esc_attr_e('Nhập ghi chú tiếp nhận nội bộ (VD: Đã hẹn khách 20h nhận phòng 302, cần chuẩn bị thêm set nến...)', 'mixhotel-core'); ?>"><?php echo esc_textarea($staff_note); ?></textarea>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><?php esc_html_e('Thời điểm liên quan', 'mixhotel-core'); ?></th>
                    <td>
                        <?php if ($confirmed_at) : ?>
                            <span style="font-size:12px;display:inline-block;margin-right:15px;"><strong>Xác nhận:</strong> <?php echo esc_html($confirmed_at); ?></span>
                        <?php endif; ?>
                        <?php if ($expired_at) : ?>
                            <span style="font-size:12px;display:inline-block;color:#c53030;"><strong>Hết hạn lúc:</strong> <?php echo esc_html($expired_at); ?></span>
                        <?php endif; ?>
                        <span style="font-size:12px;color:#888;">(IP: <code><?php echo esc_html($ip ?: 'N/A'); ?></code>)</span>
                    </td>
                </tr>
            </table>
        </div>
        <?php
    }

    /**
     * Lưu thông tin Meta Box
     */
    public static function save_lead_meta($post_id) {
        if (!isset($_POST['mixhotel_lead_meta_nonce']) || !wp_verify_nonce($_POST['mixhotel_lead_meta_nonce'], 'mixhotel_save_lead_meta')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (isset($_POST['mixhotel_lead_status'])) {
            $status = sanitize_text_field(wp_unslash($_POST['mixhotel_lead_status']));
            update_post_meta($post_id, '_mixhotel_lead_status', $status);

            if ($status === 'confirmed' && !get_post_meta($post_id, '_mixhotel_lead_confirmed_at', true)) {
                update_post_meta($post_id, '_mixhotel_lead_confirmed_at', current_time('mysql'));
            }
            if ($status === 'expired' && !get_post_meta($post_id, '_mixhotel_lead_expired_at', true)) {
                update_post_meta($post_id, '_mixhotel_lead_expired_at', current_time('mysql'));
            }
        }

        if (isset($_POST['mixhotel_lead_check_in_datetime'])) {
            $cin = sanitize_text_field(wp_unslash($_POST['mixhotel_lead_check_in_datetime']));
            update_post_meta($post_id, '_mixhotel_lead_check_in_datetime', $cin);
        }

        if (isset($_POST['mixhotel_lead_check_out_datetime'])) {
            $cout = sanitize_text_field(wp_unslash($_POST['mixhotel_lead_check_out_datetime']));
            update_post_meta($post_id, '_mixhotel_lead_check_out_datetime', $cout);
        }

        if (isset($_POST['mixhotel_lead_staff_note'])) {
            $staff_note = sanitize_textarea_field(wp_unslash($_POST['mixhotel_lead_staff_note']));
            update_post_meta($post_id, '_mixhotel_lead_staff_note', $staff_note);
        }
    }

    /**
     * Helper cập nhật trạng thái đơn qua AJAX
     */
    private static function transition_lead_status($lead_id, $target_status) {
        if (!current_user_can('edit_posts')) {
            wp_send_json_error(['message' => __('Bạn không có quyền thực hiện thao tác này.', 'mixhotel-core')]);
        }

        $lead_id = absint($lead_id);
        if (!$lead_id) {
            wp_send_json_error(['message' => __('Mã đơn không hợp lệ.', 'mixhotel-core')]);
        }

        update_post_meta($lead_id, '_mixhotel_lead_status', $target_status);
        if ($target_status === 'confirmed' && !get_post_meta($lead_id, '_mixhotel_lead_confirmed_at', true)) {
            update_post_meta($lead_id, '_mixhotel_lead_confirmed_at', current_time('mysql'));
        } elseif ($target_status === 'expired') {
            update_post_meta($lead_id, '_mixhotel_lead_expired_at', current_time('mysql'));
        }

        wp_send_json_success([
            'lead_id' => $lead_id,
            'status'  => $target_status,
            'message' => __('Cập nhật trạng thái thành công!', 'mixhotel-core')
        ]);
    }

    /**
     * AJAX Action: Check-in (confirmed -> checked_in)
     */
    public static function handle_checkin_booking() {
        check_ajax_referer('mixhotel_admin_lead_action', 'security');
        $lead_id = isset($_POST['lead_id']) ? absint($_POST['lead_id']) : 0;
        self::transition_lead_status($lead_id, 'checked_in');
    }

    /**
     * AJAX Action: Hoàn thành / Trả phòng (checked_in -> completed)
     */
    public static function handle_complete_booking() {
        check_ajax_referer('mixhotel_admin_lead_action', 'security');
        $lead_id = isset($_POST['lead_id']) ? absint($_POST['lead_id']) : 0;
        self::transition_lead_status($lead_id, 'completed');
    }

    /**
     * AJAX Action: Hủy đơn (-> cancelled)
     */
    public static function handle_cancel_booking() {
        check_ajax_referer('mixhotel_admin_lead_action', 'security');
        $lead_id = isset($_POST['lead_id']) ? absint($_POST['lead_id']) : 0;
        self::transition_lead_status($lead_id, 'cancelled');
    }

    /**
     * AJAX Action: Khách không đến (-> no_show)
     */
    public static function handle_noshow_booking() {
        check_ajax_referer('mixhotel_admin_lead_action', 'security');
        $lead_id = isset($_POST['lead_id']) ? absint($_POST['lead_id']) : 0;
        self::transition_lead_status($lead_id, 'no_show');
    }

    /**
     * AJAX Action tổng quát
     */
    public static function handle_quick_update_status() {
        check_ajax_referer('mixhotel_admin_lead_action', 'security');
        $lead_id = isset($_POST['lead_id']) ? absint($_POST['lead_id']) : 0;
        $status  = isset($_POST['status']) ? sanitize_text_field(wp_unslash($_POST['status'])) : '';
        self::transition_lead_status($lead_id, $status);
    }

    /**
     * Thêm CSS admin cho badges
     */
    public static function output_admin_styles() {
        $screen = get_current_screen();
        if ($screen && $screen->post_type === 'booking_lead') {
            ?>
            <style>
                .mix-badge {
                    display: inline-block;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .mix-badge--pending {
                    background: #fff8e5;
                    color: #b7791f;
                    border: 1px solid #f6e05e;
                }
                .mix-badge--contacted {
                    background: #ebf8ff;
                    color: #2b6cb0;
                    border: 1px solid #90cdf4;
                }
                .mix-badge--confirmed {
                    background: #f0fff4;
                    color: #276749;
                    border: 1px solid #9ae6b4;
                }
                .mix-badge--checkedin {
                    background: #e6fffa;
                    color: #234e52;
                    border: 1px solid #81e6d9;
                }
                .mix-badge--completed {
                    background: #edf2f7;
                    color: #2d3748;
                    border: 1px solid #cbd5e0;
                }
                .mix-badge--expired {
                    background: #fffaf0;
                    color: #7b341e;
                    border: 1px solid #fbd38d;
                }
                .mix-badge--noshow {
                    background: #fed7d7;
                    color: #742a2a;
                    border: 1px solid #feb2b2;
                }
                .mix-badge--cancelled {
                    background: #fff5f5;
                    color: #c53030;
                    border: 1px solid #feb2b2;
                }
                .mix-badge--demo {
                    background: #edf2f7;
                    color: #4a5568;
                    border: 1px solid #cbd5e0;
                    font-size: 10px;
                }
            </style>
            <?php
        }
    }

    /**
     * Script xử lý Quick Action buttons trong Meta Box
     */
    public static function output_admin_scripts() {
        $screen = get_current_screen();
        if ($screen && $screen->post_type === 'booking_lead') {
            $admin_nonce = wp_create_nonce('mixhotel_admin_lead_action');
            ?>
            <script>
            (function($) {
                $(document).ready(function() {
                    $('.mix-lead-action-btn').on('click', function(e) {
                        e.preventDefault();
                        var $btn = $(this);
                        var action = $btn.data('action');
                        var leadId = $btn.data('lead-id');
                        var $feedback = $('.mix-action-feedback');

                        if (!confirm('Bạn có chắc chắn muốn thực hiện thao tác này?')) {
                            return;
                        }

                        $btn.prop('disabled', true);
                        $feedback.text('Đang xử lý...');

                        $.post(ajaxurl, {
                            action: action,
                            security: '<?php echo esc_js($admin_nonce); ?>',
                            lead_id: leadId
                        }, function(res) {
                            $btn.prop('disabled', false);
                            if (res && res.success) {
                                $feedback.text('✓ ' + (res.data.message || 'Thành công!')).css('color', '#276749');
                                setTimeout(function() {
                                    window.location.reload();
                                }, 600);
                            } else {
                                var msg = (res && res.data && res.data.message) ? res.data.message : 'Có lỗi xảy ra.';
                                $feedback.text('✕ ' + msg).css('color', '#c53030');
                            }
                        }).fail(function() {
                            $btn.prop('disabled', false);
                            $feedback.text('✕ Không thể kết nối tới server.').css('color', '#c53030');
                        });
                    });
                });
            })(jQuery);
            </script>
            <?php
        }
    }
}
