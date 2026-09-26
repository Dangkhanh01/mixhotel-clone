<?php
/**
 * Meta Boxes Registration for Mix Boutique Hotel CPTs
 *
 * Đăng ký Custom Meta Boxes cho CPT hotel_room và hotel_branch.
 * Tuân thủ AGENTS.md: Nonce verification, sanitize input, escape output.
 *
 * @package MixHotel_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class MixHotel_Meta_Boxes {

    /**
     * Prefix cho tất cả meta keys
     */
    const PREFIX = '_mixhotel_';

    /**
     * Khởi tạo hooks
     */
    public static function init() {
        add_action( 'init', [ __CLASS__, 'register_post_meta_fields' ] );
        add_action( 'admin_enqueue_scripts', [ __CLASS__, 'enqueue_admin_scripts' ] );
        add_action( 'add_meta_boxes', [ __CLASS__, 'register_meta_boxes' ] );
        add_action( 'save_post_hotel_room', [ __CLASS__, 'save_room_meta' ], 10, 2 );
        add_action( 'save_post_hotel_branch', [ __CLASS__, 'save_branch_meta' ], 10, 2 );
        add_action( 'wp_ajax_mixhotel_save_room_gallery', [ __CLASS__, 'ajax_save_gallery' ] );
    }

    /**
     * Đăng ký post meta với REST API để hỗ trợ Gutenberg dirty tracking và auto-save
     */
    public static function register_post_meta_fields() {
        register_post_meta( 'hotel_room', self::PREFIX . 'room_gallery', [
            'show_in_rest' => [
                'schema' => [
                    'type'  => 'array',
                    'items' => [
                        'type' => 'integer',
                    ],
                ],
            ],
            'single'        => true,
            'type'          => 'array',
            'auth_callback' => function() {
                return current_user_can( 'edit_posts' );
            },
        ] );
    }

    /**
     * Enqueue wp.media và admin gallery script trên trang edit hotel_room
     *
     * @param string $hook_suffix Hook suffix của trang admin hiện tại.
     */
    public static function enqueue_admin_scripts( $hook_suffix ) {
        if ( in_array( $hook_suffix, [ 'post.php', 'post-new.php' ], true ) ) {
            $screen = get_current_screen();
            if ( $screen && 'hotel_room' === $screen->post_type ) {
                wp_enqueue_media();

                wp_enqueue_script(
                    'mixhotel-admin-gallery',
                    plugins_url( 'assets/js/admin-gallery.js', dirname( __FILE__ ) ),
                    [ 'jquery', 'jquery-ui-sortable' ],
                    '1.1.0',
                    true
                );

                global $post;
                $post_id = $post ? $post->ID : ( isset( $_GET['post'] ) ? absint( $_GET['post'] ) : 0 );

                wp_localize_script( 'mixhotel-admin-gallery', 'mixhotelGalleryConfig', [
                    'ajaxUrl'     => admin_url( 'admin-ajax.php' ),
                    'postId'      => $post_id,
                    'nonce'       => wp_create_nonce( 'mixhotel_room_gallery_ajax' ),
                    'mediaTitle'  => __( 'Chọn ảnh Gallery Phòng', 'mixhotel-core' ),
                    'mediaButton' => __( 'Thêm vào Gallery', 'mixhotel-core' ),
                    'savingText'  => __( 'Đang lưu gallery...', 'mixhotel-core' ),
                    'savedText'   => __( '✓ Đã lưu thay đổi gallery', 'mixhotel-core' ),
                ] );
            }
        }
    }

    /**
     * Đăng ký tất cả Meta Boxes
     */
    public static function register_meta_boxes() {
        // === Meta Boxes cho hotel_room ===
        add_meta_box(
            'mixhotel_room_info',
            __( 'Thông Tin Phòng', 'mixhotel-core' ),
            [ __CLASS__, 'render_room_info_box' ],
            'hotel_room',
            'normal',
            'high'
        );

        add_meta_box(
            'mixhotel_room_pricing',
            __( 'Bảng Giá Phòng', 'mixhotel-core' ),
            [ __CLASS__, 'render_room_pricing_box' ],
            'hotel_room',
            'normal',
            'high'
        );

        add_meta_box(
            'mixhotel_room_gallery',
            __( 'Gallery Ảnh Phòng', 'mixhotel-core' ),
            [ __CLASS__, 'render_room_gallery_box' ],
            'hotel_room',
            'normal',
            'default'
        );

        // === Meta Boxes cho hotel_branch ===
        add_meta_box(
            'mixhotel_branch_info',
            __( 'Thông Tin Chi Nhánh', 'mixhotel-core' ),
            [ __CLASS__, 'render_branch_info_box' ],
            'hotel_branch',
            'normal',
            'high'
        );
    }

    // =========================================================================
    // RENDER: hotel_room Meta Boxes
    // =========================================================================

    /**
     * Render meta box: Thông tin cơ bản phòng
     *
     * @param WP_Post $post Current post object.
     */
    public static function render_room_info_box( $post ) {
        wp_nonce_field( 'mixhotel_room_meta_nonce', 'mixhotel_room_nonce' );

        $room_code   = get_post_meta( $post->ID, self::PREFIX . 'room_code', true );
        $branch_id   = get_post_meta( $post->ID, self::PREFIX . 'room_branch_id', true );
        $youtube_id  = get_post_meta( $post->ID, self::PREFIX . 'room_youtube_id', true );
        $is_featured = get_post_meta( $post->ID, self::PREFIX . 'room_featured', true );

        // Lấy danh sách chi nhánh
        $branches = get_posts( [
            'post_type'      => 'hotel_branch',
            'posts_per_page' => -1,
            'post_status'    => 'publish',
            'orderby'        => 'title',
            'order'          => 'ASC',
        ] );
        ?>
        <table class="form-table">
            <tr>
                <th><label for="mixhotel_room_code"><?php esc_html_e( 'Mã Phòng', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="text" id="mixhotel_room_code" name="mixhotel_room_code"
                           value="<?php echo esc_attr( $room_code ); ?>"
                           class="regular-text" placeholder="VD: KARMA-01">
                    <p class="description"><?php esc_html_e( 'Mã nội bộ để phân biệt phòng.', 'mixhotel-core' ); ?></p>
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_room_branch_id"><?php esc_html_e( 'Chi Nhánh', 'mixhotel-core' ); ?></label></th>
                <td>
                    <select id="mixhotel_room_branch_id" name="mixhotel_room_branch_id">
                        <option value="0"><?php esc_html_e( '— Chọn chi nhánh —', 'mixhotel-core' ); ?></option>
                        <?php foreach ( $branches as $branch ) : ?>
                            <option value="<?php echo esc_attr( $branch->ID ); ?>"
                                <?php selected( $branch_id, $branch->ID ); ?>>
                                <?php echo esc_html( $branch->post_title ); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                    <p class="description"><?php esc_html_e( 'Chi nhánh quản lý phòng này (để lấy thông tin liên hệ).', 'mixhotel-core' ); ?></p>
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_room_youtube_id"><?php esc_html_e( 'YouTube Video ID', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="text" id="mixhotel_room_youtube_id" name="mixhotel_room_youtube_id"
                           value="<?php echo esc_attr( $youtube_id ); ?>"
                           class="regular-text" placeholder="VD: dQw4w9WgXcQ">
                    <p class="description"><?php esc_html_e( 'Chỉ nhập ID video (phần sau v= trong URL YouTube).', 'mixhotel-core' ); ?></p>
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_room_featured"><?php esc_html_e( 'Phòng Nổi Bật', 'mixhotel-core' ); ?></label></th>
                <td>
                    <label>
                        <input type="checkbox" id="mixhotel_room_featured" name="mixhotel_room_featured"
                               value="1" <?php checked( $is_featured, '1' ); ?>>
                        <?php esc_html_e( 'Đánh dấu phòng này là nổi bật (hiển thị ưu tiên trên trang chủ)', 'mixhotel-core' ); ?>
                    </label>
                </td>
            </tr>
        </table>
        <?php
    }

    /**
     * Render meta box: Bảng giá phòng (4 mức)
     *
     * @param WP_Post $post Current post object.
     */
    public static function render_room_pricing_box( $post ) {
        $price_2h      = get_post_meta( $post->ID, self::PREFIX . 'room_price_2h', true );
        $price_extra   = get_post_meta( $post->ID, self::PREFIX . 'room_price_extra_hour', true );
        $price_night   = get_post_meta( $post->ID, self::PREFIX . 'room_price_overnight', true );
        $price_allday  = get_post_meta( $post->ID, self::PREFIX . 'room_price_allday', true );
        ?>
        <table class="form-table">
            <tr>
                <th><label for="mixhotel_price_2h"><?php esc_html_e( '2 Giờ Đầu (VNĐ)', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="number" id="mixhotel_price_2h" name="mixhotel_price_2h"
                           value="<?php echo esc_attr( $price_2h ); ?>"
                           class="regular-text" min="0" step="1000" placeholder="350000">
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_price_extra"><?php esc_html_e( 'Thêm Giờ (VNĐ)', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="number" id="mixhotel_price_extra" name="mixhotel_price_extra"
                           value="<?php echo esc_attr( $price_extra ); ?>"
                           class="regular-text" min="0" step="1000" placeholder="100000">
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_price_night"><?php esc_html_e( 'Qua Đêm (VNĐ)', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="number" id="mixhotel_price_night" name="mixhotel_price_night"
                           value="<?php echo esc_attr( $price_night ); ?>"
                           class="regular-text" min="0" step="1000" placeholder="550000">
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_price_allday"><?php esc_html_e( 'Cả Ngày Đêm (VNĐ)', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="number" id="mixhotel_price_allday" name="mixhotel_price_allday"
                           value="<?php echo esc_attr( $price_allday ); ?>"
                           class="regular-text" min="0" step="1000" placeholder="750000">
                </td>
            </tr>
        </table>
        <p class="description">
            <?php esc_html_e( 'Nhập giá bằng số nguyên (VD: 350000 = 350.000đ). Để trống nếu chưa có giá → hiển thị "Liên hệ".', 'mixhotel-core' ); ?>
        </p>
        <?php
    }

    /**
     * Render meta box: Gallery ảnh phòng
     *
     * @param WP_Post $post Current post object.
     */
    public static function render_room_gallery_box( $post ) {
        // Output nonce trực tiếp trong box
        wp_nonce_field( 'mixhotel_room_meta_nonce', 'mixhotel_room_nonce' );

        $gallery_ids = get_post_meta( $post->ID, self::PREFIX . 'room_gallery', true );
        if ( is_string( $gallery_ids ) ) {
            $gallery_ids = array_filter( array_map( 'absint', explode( ',', $gallery_ids ) ) );
        } elseif ( ! is_array( $gallery_ids ) ) {
            $gallery_ids = [];
        }

        $ajax_nonce = wp_create_nonce( 'mixhotel_room_gallery_ajax' );
        ?>
        <div id="mixhotel-gallery-container"
             data-post-id="<?php echo esc_attr( $post->ID ); ?>"
             data-nonce="<?php echo esc_attr( $ajax_nonce ); ?>"
             data-ajax-url="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>">

            <input type="hidden" id="mixhotel_room_gallery" name="mixhotel_room_gallery"
                   value="<?php echo esc_attr( implode( ',', $gallery_ids ) ); ?>">

            <div id="mixhotel-gallery-preview" style="display:flex;flex-wrap:wrap;gap:10px;padding:8px 0;margin-bottom:12px;">
                <?php foreach ( $gallery_ids as $img_id ) :
                    $img_url = wp_get_attachment_image_url( absint( $img_id ), 'thumbnail' );
                    if ( $img_url ) : ?>
                        <div class="mixhotel-gallery-thumb" data-id="<?php echo esc_attr( $img_id ); ?>"
                             style="position:relative;width:100px;height:100px;cursor:grab;border:1px solid #ddd;border-radius:4px;overflow:visible;">
                            <img src="<?php echo esc_url( $img_url ); ?>" style="width:100%;height:100%;object-fit:cover;border-radius:4px;display:block;">
                            <button type="button" class="mixhotel-remove-img"
                                    style="position:absolute;top:-8px;right:-8px;background:#d63638;color:#fff;border:none;border-radius:50%;width:22px;height:22px;cursor:pointer;font-size:14px;font-weight:bold;line-height:1;display:flex;align-items:center;justify-content:center;z-index:99;box-shadow:0 1px 3px rgba(0,0,0,0.3);"
                                    title="<?php esc_attr_e( 'Xóa ảnh', 'mixhotel-core' ); ?>">&times;</button>
                        </div>
                    <?php endif;
                endforeach; ?>
            </div>

            <div style="display:flex;align-items:center;gap:12px;">
                <button type="button" id="mixhotel-add-gallery-btn" class="button button-secondary">
                    <?php esc_html_e( '+ Thêm ảnh Gallery', 'mixhotel-core' ); ?>
                </button>
                <span id="mixhotel-gallery-status" style="font-size:13px;font-weight:500;display:none;"></span>
            </div>
        </div>

        <script>
        window.mixhotelGalleryConfig = window.mixhotelGalleryConfig || {};
        window.mixhotelGalleryConfig.ajaxUrl = <?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>;
        window.mixhotelGalleryConfig.postId = <?php echo absint( $post->ID ); ?>;
        window.mixhotelGalleryConfig.nonce = <?php echo wp_json_encode( $ajax_nonce ); ?>;
        </script>
        <?php
    }

    // =========================================================================
    // RENDER: hotel_branch Meta Box
    // =========================================================================

    /**
     * Render meta box: Thông tin chi nhánh
     *
     * @param WP_Post $post Current post object.
     */
    public static function render_branch_info_box( $post ) {
        wp_nonce_field( 'mixhotel_branch_meta_nonce', 'mixhotel_branch_nonce' );

        $address    = get_post_meta( $post->ID, self::PREFIX . 'branch_address', true );
        $hotline    = get_post_meta( $post->ID, self::PREFIX . 'branch_hotline', true );
        $zalo       = get_post_meta( $post->ID, self::PREFIX . 'branch_zalo', true );
        $messenger  = get_post_meta( $post->ID, self::PREFIX . 'branch_messenger', true );
        $sms        = get_post_meta( $post->ID, self::PREFIX . 'branch_sms', true );
        $maps_embed = get_post_meta( $post->ID, self::PREFIX . 'branch_maps_embed', true );
        ?>
        <table class="form-table">
            <tr>
                <th><label for="mixhotel_branch_address"><?php esc_html_e( 'Địa Chỉ', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="text" id="mixhotel_branch_address" name="mixhotel_branch_address"
                           value="<?php echo esc_attr( $address ); ?>"
                           class="large-text" placeholder="VD: 123 Nguyễn Văn Cừ, Q.5, TP.HCM">
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_branch_hotline"><?php esc_html_e( 'Hotline', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="text" id="mixhotel_branch_hotline" name="mixhotel_branch_hotline"
                           value="<?php echo esc_attr( $hotline ); ?>"
                           class="regular-text" placeholder="VD: 0909123456">
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_branch_zalo"><?php esc_html_e( 'Link Zalo', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="url" id="mixhotel_branch_zalo" name="mixhotel_branch_zalo"
                           value="<?php echo esc_attr( $zalo ); ?>"
                           class="large-text" placeholder="VD: https://zalo.me/0909123456">
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_branch_messenger"><?php esc_html_e( 'Link Messenger', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="url" id="mixhotel_branch_messenger" name="mixhotel_branch_messenger"
                           value="<?php echo esc_attr( $messenger ); ?>"
                           class="large-text" placeholder="VD: https://m.me/mixhotel">
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_branch_sms"><?php esc_html_e( 'Số SMS', 'mixhotel-core' ); ?></label></th>
                <td>
                    <input type="text" id="mixhotel_branch_sms" name="mixhotel_branch_sms"
                           value="<?php echo esc_attr( $sms ); ?>"
                           class="regular-text" placeholder="VD: 0909123456">
                </td>
            </tr>
            <tr>
                <th><label for="mixhotel_branch_maps_embed"><?php esc_html_e( 'Google Maps Embed URL', 'mixhotel-core' ); ?></label></th>
                <td>
                    <textarea id="mixhotel_branch_maps_embed" name="mixhotel_branch_maps_embed"
                              class="large-text" rows="3"
                              placeholder="Dán iframe src URL từ Google Maps"><?php echo esc_textarea( $maps_embed ); ?></textarea>
                    <p class="description"><?php esc_html_e( 'Chỉ dán phần URL src="..." từ iframe embed Google Maps.', 'mixhotel-core' ); ?></p>
                </td>
            </tr>
        </table>
        <?php
    }

    // =========================================================================
    // SAVE: hotel_room Meta
    // =========================================================================

    /**
     * Lưu meta data cho hotel_room
     *
     * @param int     $post_id Post ID.
     * @param WP_Post $post    Post object.
     */
    public static function save_room_meta( $post_id, $post ) {
        // Kiểm tra nonce (BẮT BUỘC - AGENTS.md §3.1)
        if ( ! isset( $_POST['mixhotel_room_nonce'] ) ||
             ! wp_verify_nonce( $_POST['mixhotel_room_nonce'], 'mixhotel_room_meta_nonce' ) ) {
            return;
        }

        // Không lưu khi autosave
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        // Kiểm tra quyền
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        // === Lưu thông tin cơ bản ===
        if ( isset( $_POST['mixhotel_room_code'] ) ) {
            update_post_meta( $post_id, self::PREFIX . 'room_code',
                sanitize_text_field( wp_unslash( $_POST['mixhotel_room_code'] ) ) );
        }

        if ( isset( $_POST['mixhotel_room_branch_id'] ) ) {
            update_post_meta( $post_id, self::PREFIX . 'room_branch_id',
                absint( $_POST['mixhotel_room_branch_id'] ) );
        }

        if ( isset( $_POST['mixhotel_room_youtube_id'] ) ) {
            update_post_meta( $post_id, self::PREFIX . 'room_youtube_id',
                sanitize_text_field( wp_unslash( $_POST['mixhotel_room_youtube_id'] ) ) );
        }

        // Checkbox: featured
        $is_featured = isset( $_POST['mixhotel_room_featured'] ) ? '1' : '0';
        update_post_meta( $post_id, self::PREFIX . 'room_featured', $is_featured );

        // === Lưu bảng giá (4 mức) ===
        $price_fields = [
            'mixhotel_price_2h'     => 'room_price_2h',
            'mixhotel_price_extra'  => 'room_price_extra_hour',
            'mixhotel_price_night'  => 'room_price_overnight',
            'mixhotel_price_allday' => 'room_price_allday',
        ];

        foreach ( $price_fields as $form_key => $meta_key ) {
            if ( isset( $_POST[ $form_key ] ) ) {
                $value = $_POST[ $form_key ];
                // Cho phép giá trị rỗng (spec edge case: "để trống → hiển thị Liên hệ")
                if ( $value === '' ) {
                    delete_post_meta( $post_id, self::PREFIX . $meta_key );
                } else {
                    update_post_meta( $post_id, self::PREFIX . $meta_key, absint( $value ) );
                }
            }
        }

        // === Lưu Gallery IDs ===
        if ( isset( $_POST['mixhotel_room_gallery'] ) ) {
            $raw = sanitize_text_field( wp_unslash( $_POST['mixhotel_room_gallery'] ) );
            $raw = trim( $raw );
            if ( $raw === '' ) {
                delete_post_meta( $post_id, self::PREFIX . 'room_gallery' );
            } else {
                $ids = array_map( 'absint', explode( ',', $raw ) );
                $ids = array_values( array_filter( $ids ) ); // Loại bỏ giá trị 0 và reindex
                if ( empty( $ids ) ) {
                    delete_post_meta( $post_id, self::PREFIX . 'room_gallery' );
                } else {
                    update_post_meta( $post_id, self::PREFIX . 'room_gallery', $ids );
                }
            }
        }
    }

    /**
     * AJAX handler lưu gallery ảnh phòng ngay lập tức khi thêm/xoá ảnh
     */
    public static function ajax_save_gallery() {
        check_ajax_referer( 'mixhotel_room_gallery_ajax', 'nonce' );

        $post_id = isset( $_POST['post_id'] ) ? absint( $_POST['post_id'] ) : 0;
        if ( ! $post_id || ! current_user_can( 'edit_post', $post_id ) ) {
            wp_send_json_error( [ 'message' => __( 'Quyền bị từ chối.', 'mixhotel-core' ) ] );
        }

        $raw = isset( $_POST['gallery_ids'] ) ? sanitize_text_field( wp_unslash( $_POST['gallery_ids'] ) ) : '';
        $raw = trim( $raw );

        if ( $raw === '' ) {
            delete_post_meta( $post_id, self::PREFIX . 'room_gallery' );
            wp_send_json_success( [ 'ids' => [] ] );
        } else {
            $ids = array_map( 'absint', explode( ',', $raw ) );
            $ids = array_values( array_filter( $ids ) ); // Loại bỏ 0 và reindex
            if ( empty( $ids ) ) {
                delete_post_meta( $post_id, self::PREFIX . 'room_gallery' );
            } else {
                update_post_meta( $post_id, self::PREFIX . 'room_gallery', $ids );
            }
            wp_send_json_success( [ 'ids' => $ids ] );
        }
    }

    // =========================================================================
    // SAVE: hotel_branch Meta
    // =========================================================================

    /**
     * Lưu meta data cho hotel_branch
     *
     * @param int     $post_id Post ID.
     * @param WP_Post $post    Post object.
     */
    public static function save_branch_meta( $post_id, $post ) {
        // Kiểm tra nonce (BẮT BUỘC - AGENTS.md §3.1)
        if ( ! isset( $_POST['mixhotel_branch_nonce'] ) ||
             ! wp_verify_nonce( $_POST['mixhotel_branch_nonce'], 'mixhotel_branch_meta_nonce' ) ) {
            return;
        }

        // Không lưu khi autosave
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        // Kiểm tra quyền
        if ( ! current_user_can( 'edit_post', $post_id ) ) {
            return;
        }

        // Text fields
        $text_fields = [
            'mixhotel_branch_address' => 'branch_address',
            'mixhotel_branch_hotline' => 'branch_hotline',
            'mixhotel_branch_sms'     => 'branch_sms',
        ];

        foreach ( $text_fields as $form_key => $meta_key ) {
            if ( isset( $_POST[ $form_key ] ) ) {
                update_post_meta( $post_id, self::PREFIX . $meta_key,
                    sanitize_text_field( wp_unslash( $_POST[ $form_key ] ) ) );
            }
        }

        // URL fields
        $url_fields = [
            'mixhotel_branch_zalo'      => 'branch_zalo',
            'mixhotel_branch_messenger' => 'branch_messenger',
        ];

        foreach ( $url_fields as $form_key => $meta_key ) {
            if ( isset( $_POST[ $form_key ] ) ) {
                update_post_meta( $post_id, self::PREFIX . $meta_key,
                    esc_url_raw( wp_unslash( $_POST[ $form_key ] ) ) );
            }
        }

        // Textarea: maps embed URL
        if ( isset( $_POST['mixhotel_branch_maps_embed'] ) ) {
            update_post_meta( $post_id, self::PREFIX . 'branch_maps_embed',
                sanitize_textarea_field( wp_unslash( $_POST['mixhotel_branch_maps_embed'] ) ) );
        }
    }
}
