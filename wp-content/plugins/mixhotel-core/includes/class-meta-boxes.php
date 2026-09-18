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
        add_action( 'add_meta_boxes', [ __CLASS__, 'register_meta_boxes' ] );
        add_action( 'save_post_hotel_room', [ __CLASS__, 'save_room_meta' ], 10, 2 );
        add_action( 'save_post_hotel_branch', [ __CLASS__, 'save_branch_meta' ], 10, 2 );
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
        $gallery_ids = get_post_meta( $post->ID, self::PREFIX . 'room_gallery', true );
        $gallery_ids = is_array( $gallery_ids ) ? $gallery_ids : [];
        ?>
        <div id="mixhotel-gallery-container">
            <input type="hidden" id="mixhotel_room_gallery" name="mixhotel_room_gallery"
                   value="<?php echo esc_attr( implode( ',', $gallery_ids ) ); ?>">
            <div id="mixhotel-gallery-preview" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
                <?php foreach ( $gallery_ids as $img_id ) :
                    $img_url = wp_get_attachment_image_url( absint( $img_id ), 'thumbnail' );
                    if ( $img_url ) : ?>
                        <div class="mixhotel-gallery-thumb" data-id="<?php echo esc_attr( $img_id ); ?>"
                             style="position:relative;width:100px;height:100px;">
                            <img src="<?php echo esc_url( $img_url ); ?>" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">
                            <button type="button" class="mixhotel-remove-img"
                                    style="position:absolute;top:-6px;right:-6px;background:#d63638;color:#fff;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:12px;line-height:1;"
                                    title="<?php esc_attr_e( 'Xóa ảnh', 'mixhotel-core' ); ?>">&times;</button>
                        </div>
                    <?php endif;
                endforeach; ?>
            </div>
            <button type="button" id="mixhotel-add-gallery-btn" class="button">
                <?php esc_html_e( '+ Thêm ảnh Gallery', 'mixhotel-core' ); ?>
            </button>
        </div>
        <script>
        (function($) {
            var frame;
            $('#mixhotel-add-gallery-btn').on('click', function(e) {
                e.preventDefault();
                if (frame) { frame.open(); return; }
                frame = wp.media({
                    title: '<?php echo esc_js( __( 'Chọn ảnh Gallery', 'mixhotel-core' ) ); ?>',
                    button: { text: '<?php echo esc_js( __( 'Thêm vào Gallery', 'mixhotel-core' ) ); ?>' },
                    multiple: true
                });
                frame.on('select', function() {
                    var attachments = frame.state().get('selection').toJSON();
                    var $preview = $('#mixhotel-gallery-preview');
                    var $input = $('#mixhotel_room_gallery');
                    var currentIds = $input.val() ? $input.val().split(',') : [];

                    attachments.forEach(function(att) {
                        if (currentIds.indexOf(String(att.id)) === -1) {
                            currentIds.push(att.id);
                            var thumbUrl = att.sizes && att.sizes.thumbnail ? att.sizes.thumbnail.url : att.url;
                            $preview.append(
                                '<div class="mixhotel-gallery-thumb" data-id="' + att.id + '" style="position:relative;width:100px;height:100px;">' +
                                '<img src="' + thumbUrl + '" style="width:100%;height:100%;object-fit:cover;border-radius:4px;">' +
                                '<button type="button" class="mixhotel-remove-img" style="position:absolute;top:-6px;right:-6px;background:#d63638;color:#fff;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:12px;line-height:1;" title="Xóa ảnh">&times;</button>' +
                                '</div>'
                            );
                        }
                    });
                    $input.val(currentIds.join(','));
                });
                frame.open();
            });

            $(document).on('click', '.mixhotel-remove-img', function() {
                var $thumb = $(this).closest('.mixhotel-gallery-thumb');
                var removeId = String($thumb.data('id'));
                var $input = $('#mixhotel_room_gallery');
                var ids = $input.val().split(',').filter(function(id) { return id !== removeId; });
                $input.val(ids.join(','));
                $thumb.remove();
            });
        })(jQuery);
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
            if ( empty( $raw ) ) {
                delete_post_meta( $post_id, self::PREFIX . 'room_gallery' );
            } else {
                $ids = array_map( 'absint', explode( ',', $raw ) );
                $ids = array_filter( $ids ); // Loại bỏ giá trị 0
                update_post_meta( $post_id, self::PREFIX . 'room_gallery', $ids );
            }
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
