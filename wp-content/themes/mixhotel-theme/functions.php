<?php
/**
 * Mix Boutique Hotel Theme functions and definitions
 *
 * @package MixHotelTheme
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Setup theme defaults and register support for various WordPress features.
 */
function mixhotel_theme_setup() {
    add_theme_support('wp-block-styles');
    add_theme_support('editor-styles');
    add_theme_support('html5', array(
        'comment-list',
        'comment-form',
        'search-form',
        'gallery',
        'caption',
        'style',
        'script'
    ));
    add_theme_support('responsive-embeds');
}
add_action('after_setup_theme', 'mixhotel_theme_setup');

/**
 * Register block pattern category
 */
function mixhotel_register_pattern_category() {
    if (function_exists('register_block_pattern_category')) {
        register_block_pattern_category(
            'mixhotel',
            array(
                'label' => __('Mix Boutique Hotel', 'mixhotel-theme'),
                'description' => __('Các khối giao diện mẫu của Mix Boutique Hotel', 'mixhotel-theme')
            )
        );
    }
}
add_action('init', 'mixhotel_register_pattern_category');

/**
 * Enqueue scripts and styles.
 */
function mixhotel_enqueue_assets() {
    $theme_version = wp_get_theme()->get('Version');
    $theme_uri     = get_template_directory_uri();

    // 1. Base Stylesheet
    wp_enqueue_style(
        'mixhotel-style',
        get_stylesheet_uri(),
        array(),
        $theme_version
    );

    // 2. Modular CSS files
    wp_enqueue_style(
        'mixhotel-header',
        $theme_uri . '/assets/css/header.css',
        array('mixhotel-style'),
        $theme_version
    );

    wp_enqueue_style(
        'mixhotel-mobile-bar',
        $theme_uri . '/assets/css/mobile-bar.css',
        array('mixhotel-style'),
        $theme_version
    );

    wp_enqueue_style(
        'mixhotel-desktop-bar',
        $theme_uri . '/assets/css/desktop-contact-bar.css',
        array('mixhotel-style'),
        $theme_version
    );

    wp_enqueue_style(
        'mixhotel-modal',
        $theme_uri . '/assets/css/modal.css',
        array('mixhotel-style'),
        $theme_version
    );

    wp_enqueue_style(
        'mixhotel-hero',
        $theme_uri . '/assets/css/hero.css',
        array('mixhotel-style'),
        $theme_version
    );

    wp_enqueue_style(
        'mixhotel-sections',
        $theme_uri . '/assets/css/sections.css',
        array('mixhotel-style'),
        $theme_version
    );

    // 3. JavaScript files
    wp_enqueue_script(
        'mixhotel-header-scroll',
        $theme_uri . '/assets/js/header-scroll.js',
        array(),
        $theme_version,
        array('in_footer' => true, 'strategy' => 'defer')
    );

    wp_enqueue_script(
        'mixhotel-contact-modal',
        $theme_uri . '/assets/js/contact-modal.js',
        array(),
        $theme_version,
        array('in_footer' => true, 'strategy' => 'defer')
    );

    wp_enqueue_script(
        'mixhotel-faq-accordion',
        $theme_uri . '/assets/js/faq-accordion.js',
        array(),
        $theme_version,
        array('in_footer' => true, 'strategy' => 'defer')
    );

    wp_enqueue_script(
        'mixhotel-youtube-lite',
        $theme_uri . '/assets/js/youtube-lite.js',
        array(),
        $theme_version,
        array('in_footer' => true, 'strategy' => 'defer')
    );

    wp_enqueue_script(
        'mixhotel-booking-engine',
        $theme_uri . '/assets/js/booking-engine.js',
        array(),
        $theme_version,
        array('in_footer' => true, 'strategy' => 'defer')
    );

    // Localize data for scripts
    $is_demo = get_option('mixhotel_demo_sandbox_mode', '1') === '1';
    $localize_data = array(
        'themeUri' => $theme_uri,
        'ajaxUrl'  => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('mixhotel_booking_nonce'),
        'isDemo'   => $is_demo,
    );

    wp_localize_script('mixhotel-contact-modal', 'MixHotelData', $localize_data);
    wp_localize_script('mixhotel-booking-engine', 'MixHotelData', $localize_data);

    // 4. Conditional CSS/JS for Room Pages (T006, T011, T012)
    if ( is_singular('hotel_room') ) {
        wp_enqueue_style(
            'mixhotel-room-detail',
            $theme_uri . '/assets/css/room-detail.css',
            array('mixhotel-style'),
            $theme_version
        );
        wp_enqueue_script(
            'mixhotel-room-gallery',
            $theme_uri . '/assets/js/room-gallery.js',
            array(),
            $theme_version,
            array('in_footer' => true, 'strategy' => 'defer')
        );
    }

    if ( is_post_type_archive('hotel_room') ) {
        wp_enqueue_style(
            'mixhotel-room-archive',
            $theme_uri . '/assets/css/room-archive.css',
            array('mixhotel-style'),
            $theme_version
        );
        wp_enqueue_script(
            'mixhotel-room-filter',
            $theme_uri . '/assets/js/room-filter.js',
            array(),
            $theme_version,
            array('in_footer' => true, 'strategy' => 'defer')
        );
    }
}
add_action('wp_enqueue_scripts', 'mixhotel_enqueue_assets');
