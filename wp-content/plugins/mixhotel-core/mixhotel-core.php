<?php
/**
 * Plugin Name: Mix Hotel Core
 * Plugin URI: https://mixhotel.vn
 * Description: Core business logic, Custom Post Types (Phòng, Chi nhánh, Đơn giữ phòng), Taxonomies, và AJAX Booking Engine cho Mix Boutique Hotel.
 * Version: 1.0.0
 * Author: Antigravity & Team
 * Author URI: https://mixhotel.vn
 * Text Domain: mixhotel-core
 * Domain Path: /languages
 * Requires at least: 6.5
 * Requires PHP: 8.1
 * License: GPL v2 or later
 */

if (!defined('ABSPATH')) {
    exit;
}

// Định nghĩa các hằng số plugin
define('MIXHOTEL_CORE_VERSION', '1.0.0');
define('MIXHOTEL_CORE_DIR', plugin_dir_path(__FILE__));
define('MIXHOTEL_CORE_URL', plugin_dir_url(__FILE__));

// Load các module thành phần
require_once MIXHOTEL_CORE_DIR . 'includes/class-taxonomies.php';
require_once MIXHOTEL_CORE_DIR . 'includes/class-cpt-room.php';

/**
 * Khởi tạo plugin
 */
function mixhotel_core_init() {
    MixHotel_Taxonomies::init();
    MixHotel_CPT::init();
}
add_action('plugins_loaded', 'mixhotel_core_init');

/**
 * Activation Hook: Flush Rewrite Rules an toàn (Tuân thủ BUG-02 trong wordpress-bug-prevention/SKILL.md)
 */
register_activation_hook(__FILE__, function() {
    MixHotel_Taxonomies::register_all_taxonomies();
    MixHotel_CPT::register_all_cpts();
    flush_rewrite_rules();
});

/**
 * Deactivation Hook: Dọn dẹp Rewrite Rules
 */
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});
