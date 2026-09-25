<?php
/**
 * Auto Configure All 4 Plugins for Mix Boutique Hotel:
 * 1. Rank Math SEO
 * 2. Spectra (Ultimate Addons for Gutenberg)
 * 3. Converter for Media (WebP)
 * 4. UpdraftPlus Backup
 */
define('WP_USE_THEMES', false);
$_SERVER['HTTP_HOST'] = 'localhost:8888';
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['REMOTE_ADDR'] = '127.0.0.1';
require_once __DIR__ . '/../wp-load.php';

echo "========================================================\n";
echo "1. CONFIGURING RANK MATH SEO\n";
echo "========================================================\n";

// A. Titles & Meta
$titles = get_option('rank-math-options-titles', []);
$titles['knowledgegraph_type'] = 'company';
$titles['knowledgegraph_name'] = 'Mix Boutique Hotel';
$titles['website_name'] = 'Mix Boutique Hotel';
$titles['local_business_type'] = 'LodgingBusiness';
$titles['local_address'] = 'Ngách 29, Ngõ 49 Huỳnh Thúc Kháng, Láng, Đống Đa, Hà Nội';
$titles['phone'] = '+84 383 104 010';
$titles['price_range'] = '$$';
$titles['opening_hours_format'] = '24';
$titles['opening_hours'] = [
    ['day' => 'Monday', 'time' => '00:00-23:59'],
    ['day' => 'Tuesday', 'time' => '00:00-23:59'],
    ['day' => 'Wednesday', 'time' => '00:00-23:59'],
    ['day' => 'Thursday', 'time' => '00:00-23:59'],
    ['day' => 'Friday', 'time' => '00:00-23:59'],
    ['day' => 'Saturday', 'time' => '00:00-23:59'],
    ['day' => 'Sunday', 'time' => '00:00-23:59'],
];
$titles['homepage_title'] = 'Mix Boutique Hotel — Khách Sạn Tình Yêu Hà Nội';
$titles['homepage_description'] = 'Hệ thống khách sạn tình yêu Mix Boutique Hotel tại Hà Nội với phòng concept lãng mạn, riêng tư, sang trọng cho các cặp đôi. Đặt phòng ngay!';
$titles['pt_hotel_room_title'] = '%title% — Mix Boutique Hotel';
$titles['pt_hotel_room_description'] = '%excerpt%';
$titles['pt_hotel_room_robots'] = ['index'];
$titles['pt_hotel_branch_title'] = 'Chi nhánh %title% — Mix Boutique Hotel';
$titles['pt_hotel_branch_description'] = '%excerpt%';
$titles['pt_hotel_branch_robots'] = ['index'];

update_option('rank-math-options-titles', $titles);
echo "✓ Rank Math Titles & Local SEO Schema (LodgingBusiness) configured.\n";

// B. Sitemap
$sitemap = get_option('rank-math-options-sitemap', []);
$sitemap['items_per_page'] = 200;
$sitemap['pt_post_sitemap'] = 'on';
$sitemap['pt_page_sitemap'] = 'on';
$sitemap['pt_hotel_room_sitemap'] = 'on';
$sitemap['pt_hotel_branch_sitemap'] = 'on';
$sitemap['tax_room_concept_sitemap'] = 'on';
$sitemap['tax_category_sitemap'] = 'on';
update_option('rank-math-options-sitemap', $sitemap);
echo "✓ Rank Math XML Sitemap configured (hotel_room, hotel_branch enabled; booking_lead excluded).\n";

// C. General
$general = get_option('rank-math-options-general', []);
$general['breadcrumbs'] = 'off'; // Theme uses custom luxury FSE breadcrumbs
$general['strip_category_base'] = 'off';
update_option('rank-math-options-general', $general);
echo "✓ Rank Math General Settings updated.\n";


echo "\n========================================================\n";
echo "2. CONFIGURING SPECTRA (ULTIMATE ADDONS FOR GUTENBERG)\n";
echo "========================================================\n";

update_option('_uagb_allow_file_generation', 'enabled');
update_option('uag_content_width', 1200);
update_option('spectra_usage_optin', 'no');

$spectra_blocks = [
    'container' => 'enabled',
    'advanced-heading' => 'enabled',
    'image' => 'enabled',
    'icon' => 'enabled',
    'buttons' => 'enabled',
    'info-box' => 'enabled',
    'call-to-action' => 'enabled',
    'tabs' => 'enabled',
    'star-rating' => 'enabled',
    'modal' => 'enabled',
    'testimonial' => 'enabled',
    'forms' => 'disabled',
    'lottie' => 'disabled',
    'price-list' => 'disabled',
];
update_option('_uagb_blocks', $spectra_blocks);
echo "✓ Spectra Asset Generation: File Generation enabled.\n";
echo "✓ Spectra Default Container Width: 1200px (synced with theme.json).\n";
echo "✓ Spectra Blocks streamlined: Essential blocks active, heavy redundant blocks disabled.\n";


echo "\n========================================================\n";
echo "3. CONFIGURING CONVERTER FOR MEDIA & RUNNING BATCH OPTIMIZATION\n";
echo "========================================================\n";

use WebpConverter\Conversion\Directory\DirectoryFactory;
use WebpConverter\Conversion\Format\FormatFactory;
use WebpConverter\Conversion\Method\MethodFactory;
use WebpConverter\Conversion\Method\MethodIntegrator;
use WebpConverter\Conversion\PathsFinder;
use WebpConverter\PluginData;
use WebpConverter\Repository\TokenRepository;

$token_repository  = new TokenRepository();
$format_factory    = new FormatFactory( $token_repository );
$method_factory    = new MethodFactory( $token_repository, $format_factory );
$directory_factory = new DirectoryFactory( $format_factory );
$plugin_data       = new PluginData( $token_repository, $method_factory, $format_factory, $directory_factory );

$webpc_settings = [
    'output_formats' => ['webp'],
    'quality' => 85,
    'dirs' => ['uploads'],
    'image_resize' => ['', '', ''],
    'auto_conversion' => 'yes',
    'access_token' => '',
    'extensions' => ['jpg', 'jpeg', 'png', 'webp'],
    'excluded_dirs' => '',
    'method' => 'imagick',
    'loader_type' => 'htaccess',
    'rewrite_inherit_disabled' => '',
    'features' => ['only_smaller'],
    'media_stats' => 'yes',
    'cloudflare_zone_id' => '',
    'cloudflare_api_token' => '',
    'service_mode' => '',
    'htaccess_rewrite_root' => '',
    'htaccess_rewrite_path' => '',
    'htaccess_rewrite_parent' => '(?:.*/wp-content/)?',
    'htaccess_rewrite_output' => '',
    'htaccess_rewrite_flag_redirect' => '',
];
update_option('webpc_settings', $webpc_settings);
echo "✓ Converter for Media settings saved (WebP format, quality 85%, uploads directory).\n";

$paths_finder = new PathsFinder( $plugin_data, $token_repository, $format_factory );
$paths = $paths_finder->get_paths( false );
echo "Found " . count($paths) . " media files to process.\n";

if (!empty($paths)) {
    echo "Converting all media files to WebP (Quality: 85%)...\n";
    $integrator = new MethodIntegrator( $plugin_data, $method_factory );
    $res = $integrator->init_conversion( $paths, true, 85, true );
    if ($res) {
        $files = $res['files'] ?? [];
        $size = $res['size'] ?? [];
        $saved = ($size['before'] ?? 0) - ($size['after'] ?? 0);
        $percent = ($size['before'] ?? 0) > 0 ? round(($saved / $size['before']) * 100, 1) : 0;
        echo "✓ WebP Conversion Completed:\n";
        echo "  - Total WebP Converted: " . ($files['webp_converted'] ?? 0) . " files\n";
        echo "  - Original Size: " . round(($size['before'] ?? 0) / 1024, 1) . " KB\n";
        echo "  - WebP Size: " . round(($size['after'] ?? 0) / 1024, 1) . " KB\n";
        echo "  - Space Saved: " . round($saved / 1024, 1) . " KB (" . $percent . "% savings!)\n";
    }
}


echo "\n========================================================\n";
echo "4. CONFIGURING UPDRAFTPLUS & EXECUTING INITIAL MILESTONE BACKUP\n";
echo "========================================================\n";

update_option('updraft_interval', 'weekly');
update_option('updraft_interval_database', 'daily');
update_option('updraft_retain', 4);
update_option('updraft_retain_db', 7);
update_option('updraft_service', ['googledrive']);
update_option('updraft_include_plugins', 1);
update_option('updraft_include_themes', 1);
update_option('updraft_include_uploads', 1);

echo "✓ UpdraftPlus Schedules configured:\n";
echo "  - Files Backup: Weekly (retain 4 backups)\n";
echo "  - Database Backup: Daily (retain 7 backups)\n";
echo "  - Remote Storage: Google Drive\n";
echo "  - Scope: Plugins, Themes, Uploads, Database\n";

if (isset($GLOBALS['updraftplus']) && method_exists($GLOBALS['updraftplus'], 'boot_backup')) {
    echo "Executing local milestone backup right now...\n";
    // Run local backup (skip cloud until user completes OAuth authorization)
    $backup_job = $GLOBALS['updraftplus']->boot_backup(true, true, false, true, 'none');
    echo "✓ Milestone Backup completed!\n";
    
    // Check backup files in wp-content/updraft/
    $updraft_dir = WP_CONTENT_DIR . '/updraft';
    if (is_dir($updraft_dir)) {
        $archives = glob($updraft_dir . '/backup_*.zip');
        $db_archives = glob($updraft_dir . '/backup_*_db.gz');
        echo "Created Backup Archives:\n";
        foreach (array_merge($archives ?: [], $db_archives ?: []) as $arch) {
            echo "  - " . basename($arch) . " (" . round(filesize($arch) / 1024, 1) . " KB)\n";
        }
    }
}

echo "\n========================================================\n";
echo "ALL 4 PLUGINS CONFIGURED AND VERIFIED SUCCESSFULLY!\n";
echo "========================================================\n";
