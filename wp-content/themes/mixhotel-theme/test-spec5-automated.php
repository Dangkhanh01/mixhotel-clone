<?php
/**
 * Automated Verification & Testing Suite for Feature 05: Auxiliary Pages & Polish
 * Run via: docker exec store_app php /var/www/html/wp-content/themes/mixhotel-theme/test-spec5-automated.php
 */

if (!defined('ABSPATH')) {
    $wp_load = '/var/www/html/wp-load.php';
    if (file_exists($wp_load)) {
        require_once $wp_load;
    } elseif (file_exists(dirname(__DIR__, 3) . '/wp-load.php')) {
        require_once dirname(__DIR__, 3) . '/wp-load.php';
    } else {
        die("ABSPATH not defined and wp-load.php not found.\n");
    }
}

class MixHotel_Spec5_TestSuite {
    private $passed = 0;
    private $failed = 0;
    private $warnings = 0;

    public function run() {
        echo "\n";
        echo "====================================================================\n";
        echo "   MIX HOTEL — AUTOMATED TEST SUITE: FEATURE 05 (AUXILIARY PAGES)   \n";
        echo "====================================================================\n\n";

        $this->test_1_created_pages();
        $this->test_2_fse_templates_integrity();
        $this->test_3_pattern_files_and_rendering();
        $this->test_4_theme_enqueues_and_tokens();
        $this->test_5_contact_form_ajax_handler();
        $this->test_6_http_endpoints();

        echo "\n====================================================================\n";
        echo sprintf("   TEST SUMMARY: %d PASSED | %d FAILED | %d WARNINGS\n", $this->passed, $this->failed, $this->warnings);
        echo "====================================================================\n\n";

        if ($this->failed > 0) {
            echo "❌ SOME TESTS FAILED. Please review the details above.\n\n";
            return false;
        } else {
            echo "🎉 ALL AUTOMATED TESTS FOR FEATURE 05 PASSED SUCCESSFULLY!\n\n";
            return true;
        }
    }

    private function assert($condition, $message) {
        if ($condition) {
            echo "  ✅ [PASS] " . $message . "\n";
            $this->passed++;
        } else {
            echo "  ❌ [FAIL] " . $message . "\n";
            $this->failed++;
        }
    }

    private function warn($message) {
        echo "  ⚠️ [WARN] " . $message . "\n";
        $this->warnings++;
    }

    /**
     * TEST GROUP 1: Pages & Settings
     */
    private function test_1_created_pages() {
        echo "--- GROUP 1: WordPress Pages & Reading Settings ---\n";

        $pages = [
            'gioi-thieu'                 => ['title' => 'Giới thiệu', 'template' => 'page-gioi-thieu'],
            'gallery'                    => ['title' => 'Gallery', 'template' => 'page-gallery'],
            'lien-he'                    => ['title' => 'Liên hệ', 'template' => 'page-lien-he'],
            'chinh-sach-thanh-toan'      => ['title' => 'Chính sách thanh toán', 'template' => null],
            'chinh-sach-bao-mat-thong-tin' => ['title' => 'Chính sách bảo mật thông tin', 'template' => null],
            'chinh-sach-dat-tra-phong'   => ['title' => 'Chính sách đặt trả phòng', 'template' => null],
            'tin-tuc'                    => ['title' => 'Tin tức', 'template' => null],
        ];

        foreach ($pages as $slug => $data) {
            $page = get_page_by_path($slug, OBJECT, 'page');
            $this->assert($page !== null && $page->post_status === 'publish', "Page '{$data['title']}' (slug: '{$slug}') exists and is published (ID: " . ($page ? $page->ID : 'NONE') . ")");
            
            if ($page && $data['template']) {
                $assigned_tpl = get_post_meta($page->ID, '_wp_page_template', true);
                $this->assert($assigned_tpl === $data['template'], "Page '{$slug}' has correct template assigned: '{$assigned_tpl}' (expected: '{$data['template']}')");
            }
        }

        // Check posts page
        $page_for_posts = (int) get_option('page_for_posts');
        $news_page = get_page_by_path('tin-tuc', OBJECT, 'page');
        $this->assert($page_for_posts > 0 && $news_page && $page_for_posts === (int)$news_page->ID, "Reading setting 'page_for_posts' is correctly set to 'tin-tuc' (Page ID: {$page_for_posts})");
        echo "\n";
    }

    /**
     * TEST GROUP 2: FSE Template Integrity (BUG-07 Prevention)
     */
    private function test_2_fse_templates_integrity() {
        echo "--- GROUP 2: FSE HTML Templates Integrity (Strict BUG-07 Check) ---\n";

        $theme_dir = get_template_directory();
        $templates = [
            'page-gioi-thieu.html',
            'page-gallery.html',
            'page-lien-he.html',
            'single-hotel_branch.html',
            'home.html',
            'single.html',
            'page.html',
            '404.html',
        ];

        foreach ($templates as $tpl) {
            $path = $theme_dir . '/templates/' . $tpl;
            $this->assert(file_exists($path), "Template file '{$tpl}' exists in templates/");

            if (file_exists($path)) {
                $content = file_get_contents($path);
                // CRITICAL: Ensure NO <?php or <? exists in FSE HTML template
                $has_php = (strpos($content, '<?php') !== false) || (strpos($content, '<?') !== false);
                $this->assert(!$has_php, "Template '{$tpl}' contains pure block grammar (NO PHP tags, conforms to BUG-07)");

                // Verify wp:pattern reference exists
                $has_pattern = strpos($content, 'wp:pattern') !== false;
                $this->assert($has_pattern, "Template '{$tpl}' references block patterns correctly");
            }
        }
        echo "\n";
    }

    /**
     * TEST GROUP 3: Pattern Files & Rendering
     */
    private function test_3_pattern_files_and_rendering() {
        echo "--- GROUP 3: Pattern Files Existence & Output Rendering ---\n";

        $theme_dir = get_template_directory();
        $patterns = [
            'about-intro.php',
            'about-amenities.php',
            'about-testimonials.php',
            'about-cta.php',
            'gallery-grid.php',
            'branch-detail.php',
            'blog-archive-content.php',
            'blog-single-content.php',
            'contact-page-content.php',
            'contact-maps.php',
            'policy-payment.php',
            'policy-privacy.php',
            'policy-booking.php',
            'page-content.php',
            'page-404.php',
        ];

        foreach ($patterns as $pattern_file) {
            $path = $theme_dir . '/patterns/' . $pattern_file;
            $this->assert(file_exists($path), "Pattern file '{$pattern_file}' exists in patterns/");

            if (file_exists($path)) {
                $content = file_get_contents($path);
                
                // Check docblock header
                $has_title = strpos($content, 'Title:') !== false;
                $has_slug = strpos($content, 'Slug:') !== false;
                $this->assert($has_title && $has_slug, "Pattern '{$pattern_file}' has valid WordPress Block Pattern docblock");

                // Execute pattern in output buffer to verify no fatal errors / notices occur
                ob_start();
                try {
                    include $path;
                    $output = ob_get_clean();
                    $this->assert(strlen($output) > 10, "Pattern '{$pattern_file}' renders successfully without errors (" . strlen($output) . " bytes generated)");
                } catch (\Throwable $e) {
                    ob_end_clean();
                    $this->assert(false, "Pattern '{$pattern_file}' threw exception on render: " . $e->getMessage());
                }
            }
        }
        echo "\n";
    }

    /**
     * TEST GROUP 4: Assets Enqueue, Tokens & Navigation
     */
    private function test_4_theme_enqueues_and_tokens() {
        echo "--- GROUP 4: Assets Enqueue, Design Tokens & Fonts ---\n";

        $theme_dir = get_template_directory();

        // 1. Philosopher Fonts
        $font_reg = $theme_dir . '/assets/fonts/Philosopher-Regular.ttf';
        $font_bold = $theme_dir . '/assets/fonts/Philosopher-Bold.ttf';
        $this->assert(file_exists($font_reg), "Font 'Philosopher-Regular.ttf' exists in assets/fonts/");
        $this->assert(file_exists($font_bold), "Font 'Philosopher-Bold.ttf' exists in assets/fonts/");

        // 2. theme.json Philosopher font declaration
        $theme_json_path = $theme_dir . '/theme.json';
        $this->assert(file_exists($theme_json_path), "theme.json exists");
        if (file_exists($theme_json_path)) {
            $theme_json = file_get_contents($theme_json_path);
            $this->assert(strpos($theme_json, 'Philosopher') !== false, "theme.json declares 'Philosopher' font family");
        }

        // 3. pages-luxury.css
        $css_luxury_path = $theme_dir . '/assets/css/pages-luxury.css';
        $this->assert(file_exists($css_luxury_path), "Asset 'assets/css/pages-luxury.css' exists");
        if (file_exists($css_luxury_path)) {
            $css = file_get_contents($css_luxury_path);
            $size = strlen($css);
            $this->assert($size > 50000, "pages-luxury.css has full Dark Luxury rules ({$size} bytes)");
            $this->assert(strpos($css, 'Philosopher') !== false, "pages-luxury.css defines @font-face for Philosopher");
            $this->assert(strpos($css, '.block404') !== false, "pages-luxury.css contains .block404 styles");
        }

        // 4. contact-form.js
        $js_path = $theme_dir . '/assets/js/contact-form.js';
        $this->assert(file_exists($js_path), "Asset 'assets/js/contact-form.js' exists");
        if (file_exists($js_path)) {
            $js = file_get_contents($js_path);
            $this->assert(strpos($js, 'mixhotel-contact-form') !== false, "contact-form.js targets '#mixhotel-contact-form'");
            $this->assert(strpos($js, 'mixhotel_submit_contact') !== false, "contact-form.js uses 'mixhotel_submit_contact' action");
        }

        // 5. functions.php verification
        $func_path = $theme_dir . '/functions.php';
        $func = file_get_contents($func_path);
        $this->assert(strpos($func, "'mixhotel-pages-luxury'") !== false, "functions.php enqueues 'mixhotel-pages-luxury' style");
        $this->assert(strpos($func, "'mixhotel-contact-form'") !== false, "functions.php enqueues 'mixhotel-contact-form' script");
        $this->assert(strpos($func, "'contactNonce'") !== false, "functions.php localizes 'contactNonce' in MixHotelData");

        // 6. Header navigation
        $header_path = $theme_dir . '/parts/header.html';
        $header = file_get_contents($header_path);
        $this->assert(strpos($header, '/gioi-thieu') !== false, "Header has link to /gioi-thieu");
        $this->assert(strpos($header, '/gallery') !== false, "Header has link to /gallery");
        $this->assert(strpos($header, '/lien-he') !== false, "Header has link to /lien-he");
        $this->assert(strpos($header, '/tin-tuc') !== false, "Header has link to /tin-tuc");

        // 7. Footer navigation
        $footer_path = $theme_dir . '/parts/footer.html';
        $footer = file_get_contents($footer_path);
        $this->assert(strpos($footer, '/chinh-sach-thanh-toan') !== false, "Footer links to /chinh-sach-thanh-toan");
        $this->assert(strpos($footer, '/chinh-sach-bao-mat-thong-tin') !== false, "Footer links to /chinh-sach-bao-mat-thong-tin");
        $this->assert(strpos($footer, '/chinh-sach-dat-tra-phong') !== false, "Footer links to /chinh-sach-dat-tra-phong");
        echo "\n";
    }

    /**
     * TEST GROUP 5: Contact AJAX Handler Real HTTP Integration Verification
     */
    private function test_5_contact_form_ajax_handler() {
        echo "--- GROUP 5: Contact AJAX Handler Real HTTP Integration Verification ---\n";

        // Verify class exists
        $this->assert(class_exists('MixHotel_Contact_Handler'), "Class 'MixHotel_Contact_Handler' is loaded in mixhotel-core");

        // Clear transient rate limit for 127.0.0.1 to start clean
        delete_transient('mixhotel_contact_rate_' . md5('127.0.0.1'));

        // Case 5.1: Honeypot trap test
        $res = $this->post_ajax([
            'action' => 'mixhotel_submit_contact',
            '_mixhotel_contact_nonce' => wp_create_nonce('mixhotel_contact_nonce'),
            'contact_name' => 'Spam Bot',
            'contact_phone' => '0912345678',
            'website_url' => 'http://spam.com', // honeypot triggered
        ]);
        $this->assert(!empty($res['success']) && isset($res['data']['is_demo']), "Case 5.1 (Honeypot): Bot trapped, fake success returned gracefully");

        // Case 5.2: Invalid Nonce test
        $res = $this->post_ajax([
            'action' => 'mixhotel_submit_contact',
            '_mixhotel_contact_nonce' => 'invalid_fake_nonce_123',
            'contact_name' => 'Nguyễn Văn A',
            'contact_phone' => '0912345678',
        ]);
        $this->assert(isset($res['success']) && $res['success'] === false && isset($res['data']['code']) && $res['data']['code'] === 'invalid_nonce', "Case 5.2 (Security): Invalid Nonce properly rejected with code 'invalid_nonce'");

        // Case 5.3: Invalid Phone test
        $valid_nonce = wp_create_nonce('mixhotel_contact_nonce');
        $res = $this->post_ajax([
            'action' => 'mixhotel_submit_contact',
            '_mixhotel_contact_nonce' => $valid_nonce,
            'contact_name' => 'Nguyễn Văn A',
            'contact_phone' => '123456', // Invalid VN phone
        ]);
        $this->assert(isset($res['success']) && $res['success'] === false && isset($res['data']['code']) && $res['data']['code'] === 'invalid_phone', "Case 5.3 (Validation): Invalid phone rejected with code 'invalid_phone'");

        // Case 5.4: Short / Empty Name test
        $res = $this->post_ajax([
            'action' => 'mixhotel_submit_contact',
            '_mixhotel_contact_nonce' => $valid_nonce,
            'contact_name' => 'A', // Too short
            'contact_phone' => '0912345678',
        ]);
        $this->assert(isset($res['success']) && $res['success'] === false && isset($res['data']['code']) && $res['data']['code'] === 'invalid_name', "Case 5.4 (Validation): Short name rejected with code 'invalid_name'");

        // Case 5.5: Valid Submission in Demo Sandbox Mode
        update_option('mixhotel_demo_sandbox_mode', '1');
        delete_transient('mixhotel_contact_rate_' . md5('127.0.0.1'));
        
        $test_phone = '0988776655';
        $test_name = 'Trần Thị Thử Nghiệm';
        $test_msg = 'Tin nhắn thử nghiệm tự động từ Spec 5 test suite.';
        $res = $this->post_ajax([
            'action' => 'mixhotel_submit_contact',
            '_mixhotel_contact_nonce' => $valid_nonce,
            'contact_name' => $test_name,
            'contact_phone' => $test_phone,
            'contact_email' => 'test@example.com',
            'contact_message' => $test_msg,
        ]);
        $this->assert(isset($res['success']) && $res['success'] === true && isset($res['data']['is_demo']) && $res['data']['is_demo'] === true, "Case 5.5 (Success): Valid contact submission processed successfully via HTTP");

        // Verify Demo Log was recorded in WordPress Option
        $demo_logs = get_option('mixhotel_demo_contact_log', []);
        $found = false;
        if (is_array($demo_logs) && !empty($demo_logs)) {
            $latest = $demo_logs[0];
            if ($latest['phone'] === $test_phone && $latest['name'] === $test_name) {
                $found = true;
            }
        }
        $this->assert($found, "Case 5.6 (Audit): Demo Sandbox recorded contact lead into option 'mixhotel_demo_contact_log'");

        // Case 5.7: Rate Limiting Test (Send multiple, then verify blocked)
        $blocked = false;
        for ($i = 0; $i < 4; $i++) {
            $r = $this->post_ajax([
                'action' => 'mixhotel_submit_contact',
                '_mixhotel_contact_nonce' => $valid_nonce,
                'contact_name' => 'Rate Tester',
                'contact_phone' => '0912345678',
            ]);
            if (isset($r['data']['code']) && $r['data']['code'] === 'rate_limited') {
                $blocked = true;
                break;
            }
        }
        $this->assert($blocked, "Case 5.7 (Rate Limiting): Submissions exceeding 3/10min blocked with code 'rate_limited'");

        // Clean up transient
        delete_transient('mixhotel_contact_rate_' . md5('127.0.0.1'));
        echo "\n";
    }

    /**
     * TEST GROUP 6: Real HTTP Endpoints Status Code & Content Verification
     */
    private function test_6_http_endpoints() {
        echo "--- GROUP 6: Real HTTP Endpoints & Page Status Checks ---\n";

        $endpoints = [
            '/'                             => ['expected' => 200, 'must_contain' => 'mixhotel'],
            '/gioi-thieu/'                  => ['expected' => 200, 'must_contain' => 'Boutique Mood'],
            '/gallery/'                     => ['expected' => 200, 'must_contain' => 'mixGalleryBranchTabs'],
            '/lien-he/'                     => ['expected' => 200, 'must_contain' => 'mixhotel-contact-form'],
            '/tin-tuc/'                     => ['expected' => 200, 'must_contain' => 'mixBlogCatTabs'],
            '/chinh-sach-thanh-toan/'       => ['expected' => 200, 'must_contain' => 'Chính Sách Thanh Toán'],
            '/chinh-sach-bao-mat-thong-tin/' => ['expected' => 200, 'must_contain' => 'Chính Sách Bảo Mật'],
            '/chinh-sach-dat-tra-phong/'    => ['expected' => 200, 'must_contain' => 'QUY ĐỊNH LƯU TRÚ'],
            '/khach-san-tinh-yeu/'          => ['expected' => 200, 'must_contain' => 'cateMixHero'],
            '/mix-boutique-premium-hotel/'  => ['expected' => 200, 'must_contain' => 'Mix Boutique Premium'],
            '/mix-boutique-hotel-256b-dang-tien-dong/' => ['expected' => 200, 'must_contain' => 'Mix Boutique Hotel 256B Đặng Tiến Đông'],
            '/mix-boutique-hotel-20-phuc-la-ha-dong/' => ['expected' => 200, 'must_contain' => 'Mix Boutique Hotel 20 Phúc La'],
            '/khach-san-tinh-yeu/mix-boutique-premium-hotel/' => ['expected' => 200, 'must_contain' => 'Mix Boutique Premium'],
            '/khach-san-tinh-yeu/mix-boutique-hotel-256b-dang-tien-dong/' => ['expected' => 200, 'must_contain' => 'Mix Boutique Hotel 256B Đặng Tiến Đông'],
            '/khach-san-tinh-yeu/mix-boutique-hotel-20-phuc-la-ha-dong/' => ['expected' => 200, 'must_contain' => 'Mix Boutique Hotel 20 Phúc La'],
            '/non-existent-page-404-test/'  => ['expected' => 404, 'must_contain' => 'block404'],
        ];

        foreach ($endpoints as $uri => $check) {
            $url = 'http://127.0.0.1' . $uri;
            $res = wp_remote_get($url, [
                'headers' => ['Host' => 'localhost:8888'],
                'timeout' => 15,
            ]);

            if (is_wp_error($res)) {
                $this->assert(false, "Endpoint '{$uri}' failed HTTP request: " . $res->get_error_message());
                continue;
            }

            $code = wp_remote_retrieve_response_code($res);
            $body = wp_remote_retrieve_body($res);

            $this->assert($code === $check['expected'], "Endpoint '{$uri}' returned expected HTTP {$check['expected']} (Got: {$code})");

            if ($check['must_contain']) {
                $contains = stripos($body, $check['must_contain']) !== false;
                $this->assert($contains, "Endpoint '{$uri}' response body contains keyword '{$check['must_contain']}'");
            }
        }
        echo "\n";
    }

    /**
     * Send real HTTP POST request to admin-ajax.php inside container
     */
    private function post_ajax($body) {
        $url = 'http://127.0.0.1/wp-admin/admin-ajax.php';
        $res = wp_remote_post($url, [
            'headers' => [
                'Host' => 'localhost:8888',
            ],
            'body'    => $body,
            'timeout' => 15,
        ]);

        if (is_wp_error($res)) {
            return ['success' => false, 'error' => $res->get_error_message()];
        }

        $raw = wp_remote_retrieve_body($res);
        $data = json_decode($raw, true);
        return is_array($data) ? $data : ['success' => false, 'raw' => $raw];
    }
}

$suite = new MixHotel_Spec5_TestSuite();
$success = $suite->run();
exit($success ? 0 : 1);
