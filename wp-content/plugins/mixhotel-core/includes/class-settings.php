<?php
/**
 * Mix Hotel Admin Settings & Demo Sandbox Management
 *
 * Cung cấp trang cấu hình quản trị cho Telegram Bot, Hotline và chế độ Demo Sandbox.
 *
 * @package MixHotelCore
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class MixHotel_Settings {

    /**
     * Khởi tạo hooks
     */
    public static function init() {
        add_action('admin_menu', [__CLASS__, 'register_admin_menus']);
        add_action('admin_init', [__CLASS__, 'register_settings']);
        add_action('admin_post_mixhotel_clear_logs', [__CLASS__, 'handle_clear_logs']);
    }

    /**
     * Đăng ký menu trong WP Admin
     */
    public static function register_admin_menus() {
        add_menu_page(
            __('Mix Hotel', 'mixhotel-core'),
            __('Mix Hotel', 'mixhotel-core'),
            'manage_options',
            'mixhotel-settings',
            [__CLASS__, 'render_settings_page'],
            'dashicons-building',
            26
        );

        add_submenu_page(
            'mixhotel-settings',
            __('Cài đặt Lead & Bot', 'mixhotel-core'),
            __('Cài đặt Lead & Bot', 'mixhotel-core'),
            'manage_options',
            'mixhotel-settings',
            [__CLASS__, 'render_settings_page']
        );

        add_submenu_page(
            'mixhotel-settings',
            __('Nhật Ký Demo Sandbox', 'mixhotel-core'),
            __('Nhật Ký Sandbox', 'mixhotel-core'),
            'manage_options',
            'mixhotel-sandbox-logs',
            [__CLASS__, 'render_logs_page']
        );
    }

    /**
     * Đăng ký các options với Settings API
     */
    public static function register_settings() {
        register_setting('mixhotel_settings_group', 'mixhotel_demo_sandbox_mode', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '1',
        ]);

        register_setting('mixhotel_settings_group', 'mixhotel_telegram_bot_token', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '',
        ]);

        register_setting('mixhotel_settings_group', 'mixhotel_telegram_chat_id', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '',
        ]);

        register_setting('mixhotel_settings_group', 'mixhotel_default_hotline', [
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '038 310 4010',
        ]);
    }

    /**
     * Xóa nhật ký mô phỏng Demo Sandbox
     */
    public static function handle_clear_logs() {
        if (!current_user_can('manage_options')) {
            wp_die(__('Bạn không có quyền thực hiện thao tác này.', 'mixhotel-core'));
        }
        check_admin_referer('mixhotel_clear_logs_action');

        delete_option('mixhotel_demo_telegram_log');
        wp_safe_redirect(admin_url('admin.php?page=mixhotel-sandbox-logs&cleared=1'));
        exit;
    }

    /**
     * Render trang Cài đặt chính
     */
    public static function render_settings_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $demo_mode = get_option('mixhotel_demo_sandbox_mode', '1');
        $bot_token = get_option('mixhotel_telegram_bot_token', '');
        $chat_id   = get_option('mixhotel_telegram_chat_id', '');
        $hotline   = get_option('mixhotel_default_hotline', '038 310 4010');
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

            <?php if (isset($_GET['settings-updated']) && $_GET['settings-updated'] === 'true') : ?>
                <div class="notice notice-success is-dismissible">
                    <p><?php esc_html_e('Đã lưu cấu hình Mix Hotel thành công!', 'mixhotel-core'); ?></p>
                </div>
            <?php endif; ?>

            <!-- Banner giải thích Demo Sandbox -->
            <div class="card" style="max-width: 800px; margin-top: 20px; border-left: 4px solid #c5a880; background: #fff;">
                <h2 style="margin-top: 0; color: #17171c;">
                    <span class="dashicons dashicons-shield-alt" style="color: #c5a880; font-size: 24px; vertical-align: middle;"></span>
                    <?php esc_html_e('Cơ chế Demo Sandbox (Technical Clone)', 'mixhotel-core'); ?>
                </h2>
                <p style="font-size: 14px; line-height: 1.6; color: #444;">
                    <?php esc_html_e('Dự án này là một Technical Clone phục vụ mục đích học tập và xây dựng Portfolio chuẩn Agency. Khi kích hoạt chế độ Demo Sandbox, mọi đơn giữ phòng vẫn được lưu thật vào CSDL WordPress (CPT Đơn Giữ Phòng), nhưng thông báo gửi đến lễ tân sẽ được mô phỏng an toàn mà không cần Telegram Bot Token thật.', 'mixhotel-core'); ?>
                </p>
            </div>

            <form method="post" action="options.php" style="max-width: 800px; margin-top: 20px;">
                <?php
                settings_fields('mixhotel_settings_group');
                do_settings_sections('mixhotel_settings_group');
                ?>

                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row">
                            <label for="mixhotel_demo_sandbox_mode"><?php esc_html_e('Chế độ Demo Sandbox', 'mixhotel-core'); ?></label>
                        </th>
                        <td>
                            <label>
                                <input type="checkbox" id="mixhotel_demo_sandbox_mode" name="mixhotel_demo_sandbox_mode" value="1" <?php checked('1', $demo_mode); ?> />
                                <strong><?php esc_html_e('Kích hoạt Demo Sandbox Mode (Khuyên dùng)', 'mixhotel-core'); ?></strong>
                            </label>
                            <p class="description">
                                <?php esc_html_e('Khi bật, hệ thống sẽ lưu thông báo đặt phòng vào Nhật Ký Sandbox và hiển thị phản hồi thân thiện cho khách thử nghiệm.', 'mixhotel-core'); ?>
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">
                            <label for="mixhotel_default_hotline"><?php esc_html_e('Hotline Tổng Đài Mặc Định', 'mixhotel-core'); ?></label>
                        </th>
                        <td>
                            <input type="text" id="mixhotel_default_hotline" name="mixhotel_default_hotline" value="<?php echo esc_attr($hotline); ?>" class="regular-text" />
                            <p class="description"><?php esc_html_e('Số hotline chung hiển thị khi phòng hoặc chi nhánh chưa có số riêng.', 'mixhotel-core'); ?></p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">
                            <label for="mixhotel_telegram_bot_token"><?php esc_html_e('Telegram Bot Token', 'mixhotel-core'); ?></label>
                        </th>
                        <td>
                            <input type="password" id="mixhotel_telegram_bot_token" name="mixhotel_telegram_bot_token" value="<?php echo esc_attr($bot_token); ?>" class="regular-text" placeholder="123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ" autocomplete="off" />
                            <p class="description"><?php esc_html_e('Token tạo từ @BotFather trên Telegram. Để trống nếu chỉ dùng Demo Sandbox.', 'mixhotel-core'); ?></p>
                        </td>
                    </tr>

                    <tr>
                        <th scope="row">
                            <label for="mixhotel_telegram_chat_id"><?php esc_html_e('Telegram Chat ID', 'mixhotel-core'); ?></label>
                        </th>
                        <td>
                            <input type="text" id="mixhotel_telegram_chat_id" name="mixhotel_telegram_chat_id" value="<?php echo esc_attr($chat_id); ?>" class="regular-text" placeholder="-1001234567890 hoặc ID cá nhân" />
                            <p class="description"><?php esc_html_e('ID của nhóm lễ tân hoặc người nhận thông báo trên Telegram.', 'mixhotel-core'); ?></p>
                        </td>
                    </tr>
                </table>

                <?php submit_button(__('Lưu Cấu Hình', 'mixhotel-core')); ?>
            </form>
        </div>
        <?php
    }

    /**
     * Render trang Nhật ký mô phỏng Demo Sandbox
     */
    public static function render_logs_page() {
        if (!current_user_can('manage_options')) {
            return;
        }

        $logs = get_option('mixhotel_demo_telegram_log', []);
        if (!is_array($logs)) {
            $logs = [];
        }
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('Nhật Ký Mô Phỏng Demo Sandbox (Telegram Alerts)', 'mixhotel-core'); ?></h1>

            <?php if (isset($_GET['cleared']) && $_GET['cleared'] === '1') : ?>
                <div class="notice notice-success is-dismissible">
                    <p><?php esc_html_e('Đã xóa sạch nhật ký mô phỏng!', 'mixhotel-core'); ?></p>
                </div>
            <?php endif; ?>

            <p><?php esc_html_e('Dưới đây là 25 thông báo đặt phòng mô phỏng mới nhất do hệ thống Demo Sandbox ghi nhận:', 'mixhotel-core'); ?></p>

            <?php if (!empty($logs)) : ?>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="margin-bottom: 15px;">
                    <?php wp_nonce_field('mixhotel_clear_logs_action'); ?>
                    <input type="hidden" name="action" value="mixhotel_clear_logs" />
                    <?php submit_button(__('Xóa Toàn Bộ Nhật Ký', 'mixhotel-core'), 'delete', 'submit', false); ?>
                </form>

                <table class="wp-list-table widefat fixed striped">
                    <thead>
                        <tr>
                            <th style="width: 150px;"><?php esc_html_e('Thời Gian', 'mixhotel-core'); ?></th>
                            <th style="width: 160px;"><?php esc_html_e('Mã Đơn', 'mixhotel-core'); ?></th>
                            <th style="width: 150px;"><?php esc_html_e('Khách Hàng', 'mixhotel-core'); ?></th>
                            <th style="width: 130px;"><?php esc_html_e('Số Điện Thoại', 'mixhotel-core'); ?></th>
                            <th style="width: 200px;"><?php esc_html_e('Chi Nhánh', 'mixhotel-core'); ?></th>
                            <th><?php esc_html_e('Nội Dung Telegram Đã Tạo', 'mixhotel-core'); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($logs as $log) : ?>
                            <tr>
                                <td><?php echo esc_html($log['time']); ?></td>
                                <td><strong><code><?php echo esc_html($log['code']); ?></code></strong></td>
                                <td><?php echo esc_html($log['name']); ?></td>
                                <td><a href="<?php echo esc_url('tel:' . $log['phone']); ?>"><?php echo esc_html($log['phone']); ?></a></td>
                                <td><?php echo esc_html($log['branch']); ?></td>
                                <td><pre style="margin: 0; background: #f6f7f7; padding: 6px; font-size: 11px; white-space: pre-wrap;"><?php echo esc_html($log['message']); ?></pre></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else : ?>
                <div class="notice notice-info">
                    <p><?php esc_html_e('Chưa có bản ghi mô phỏng nào. Hãy thử gửi một đơn đặt phòng từ Hero form hoặc trang Chi tiết phòng để xem dữ liệu xuất hiện tại đây!', 'mixhotel-core'); ?></p>
                </div>
            <?php endif; ?>
        </div>
        <?php
    }
}
