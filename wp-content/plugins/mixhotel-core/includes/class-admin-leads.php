<?php
/**
 * Admin Lead Management & Custom Columns
 *
 * Tùy biến giao diện quản lý CPT booking_lead trong WP Admin:
 * Custom columns, Meta Box chi tiết, Quick Call/Zalo, và Cập nhật trạng thái.
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
        // Tùy biến cột danh sách booking_lead
        add_filter('manage_booking_lead_posts_columns', [__CLASS__, 'customize_columns']);
        add_action('manage_booking_lead_posts_custom_column', [__CLASS__, 'render_column_content'], 10, 2);
        add_filter('manage_edit-booking_lead_sortable_columns', [__CLASS__, 'sortable_columns']);

        // Meta Box chi tiết đơn
        add_action('add_meta_boxes', [__CLASS__, 'register_lead_meta_boxes']);
        add_action('save_post_booking_lead', [__CLASS__, 'save_lead_meta']);

        // Admin CSS cho badges trạng thái
        add_action('admin_head', [__CLASS__, 'output_admin_styles']);
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
     * Render badge trạng thái
     */
    public static function render_status_badge($status) {
        $status_labels = [
            'pending'   => ['label' => __('Chờ xác nhận', 'mixhotel-core'), 'class' => 'mix-badge--pending'],
            'contacted' => ['label' => __('Đã gọi tư vấn', 'mixhotel-core'), 'class' => 'mix-badge--contacted'],
            'confirmed' => ['label' => __('Đã giữ phòng', 'mixhotel-core'), 'class' => 'mix-badge--confirmed'],
            'cancelled' => ['label' => __('Đã hủy / Khách hủy', 'mixhotel-core'), 'class' => 'mix-badge--cancelled'],
        ];

        $current = isset($status_labels[$status]) ? $status_labels[$status] : $status_labels['pending'];
        echo '<span class="mix-badge ' . esc_attr($current['class']) . '">' . esc_html($current['label']) . '</span>';
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
     * Render nội dung Meta Box chi tiết
     */
    public static function render_lead_meta_box($post) {
        wp_nonce_field('mixhotel_save_lead_meta', 'mixhotel_lead_meta_nonce');

        $name       = get_post_meta($post->ID, '_mixhotel_lead_customer_name', true);
        $phone      = get_post_meta($post->ID, '_mixhotel_lead_customer_phone', true);
        $branch     = get_post_meta($post->ID, '_mixhotel_lead_branch_name', true);
        $room       = get_post_meta($post->ID, '_mixhotel_lead_room_name', true);
        $demand     = get_post_meta($post->ID, '_mixhotel_lead_demand', true);
        $date       = get_post_meta($post->ID, '_mixhotel_lead_booking_date', true);
        $time       = get_post_meta($post->ID, '_mixhotel_lead_booking_time', true);
        $note       = get_post_meta($post->ID, '_mixhotel_lead_note', true);
        $status     = get_post_meta($post->ID, '_mixhotel_lead_status', true) ?: 'pending';
        $ip         = get_post_meta($post->ID, '_mixhotel_lead_ip', true);
        $is_demo    = get_post_meta($post->ID, '_mixhotel_lead_is_demo', true);
        $staff_note = get_post_meta($post->ID, '_mixhotel_lead_staff_note', true);
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
                        <select name="mixhotel_lead_status" id="mixhotel_lead_status" style="min-width: 220px; font-weight: bold;">
                            <option value="pending" <?php selected('pending', $status); ?>>🟡 <?php esc_html_e('Chờ xác nhận (Mới)', 'mixhotel-core'); ?></option>
                            <option value="contacted" <?php selected('contacted', $status); ?>>🔵 <?php esc_html_e('Đã gọi tư vấn', 'mixhotel-core'); ?></option>
                            <option value="confirmed" <?php selected('confirmed', $status); ?>>🟢 <?php esc_html_e('Đã giữ phòng thành công', 'mixhotel-core'); ?></option>
                            <option value="cancelled" <?php selected('cancelled', $status); ?>>🔴 <?php esc_html_e('Đã hủy / Không liên lạc được', 'mixhotel-core'); ?></option>
                        </select>
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
                    <th scope="row"><?php esc_html_e('IP & Bảo mật', 'mixhotel-core'); ?></th>
                    <td>
                        <code style="font-size:12px;"><?php echo esc_html($ip ?: 'N/A'); ?></code>
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
        }

        if (isset($_POST['mixhotel_lead_staff_note'])) {
            $staff_note = sanitize_textarea_field(wp_unslash($_POST['mixhotel_lead_staff_note']));
            update_post_meta($post_id, '_mixhotel_lead_staff_note', $staff_note);
        }
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
}
