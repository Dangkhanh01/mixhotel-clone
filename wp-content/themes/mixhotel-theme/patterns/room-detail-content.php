<?php
/**
 * Title: Room Detail Content
 * Slug: mixhotel-theme/room-detail-content
 * Categories: mixhotel
 * Description: Full room detail page content with 6 sections: Hero, Gallery, Video, Concept, Pricing, Booking Form.
 *
 * @package MixHotelTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Lấy dữ liệu phòng hiện tại
$room_id = get_the_ID();
if ( ! $room_id ) {
    return;
}

$room_title    = get_the_title( $room_id );
$room_excerpt  = get_the_excerpt( $room_id );
$room_content  = get_the_content( null, false, $room_id );
$thumbnail_url = get_the_post_thumbnail_url( $room_id, 'large' );
$thumbnail_alt = get_post_meta( get_post_thumbnail_id( $room_id ), '_wp_attachment_image_alt', true ) ?: $room_title;

// Helper data
$room_code    = MixHotel_Helpers::get_room_code( $room_id );
$youtube_id   = MixHotel_Helpers::get_room_youtube_id( $room_id );
$is_featured  = MixHotel_Helpers::is_room_featured( $room_id );
$branch_data  = MixHotel_Helpers::get_room_branch_data( $room_id );
$gallery      = MixHotel_Helpers::get_room_gallery_images( $room_id, 'large' );
$gallery_thumbs = MixHotel_Helpers::get_room_gallery_images( $room_id, 'medium' );

// Giá các mức
$price_2h      = MixHotel_Helpers::get_room_price_formatted( $room_id, '2h' );
$price_extra   = MixHotel_Helpers::get_room_price_formatted( $room_id, 'extra_hour' );
$price_night   = MixHotel_Helpers::get_room_price_formatted( $room_id, 'overnight' );
$price_allday  = MixHotel_Helpers::get_room_price_formatted( $room_id, 'allday' );

// Liên hệ
$hotline    = MixHotel_Helpers::get_room_hotline( $room_id );
$zalo_link  = MixHotel_Helpers::get_room_zalo_link( $room_id );
$branch_name = $branch_data ? esc_html( $branch_data['name'] ) : esc_html__( 'Liên hệ tổng đài', 'mixhotel-core' );

// Tiện nghi (taxonomy)
$amenities = get_the_terms( $room_id, 'room_amenity' );
if ( is_wp_error( $amenities ) ) {
    $amenities = [];
}

// Active image = thumbnail hoặc ảnh gallery đầu tiên
$active_image_url = $thumbnail_url ?: '';
$active_image_alt = $thumbnail_alt;
?>

<!-- ===================== SECTION 1: HERO ===================== -->
<section class="mixDetailHero" id="room-hero">
    <?php if ( $thumbnail_url ) : ?>
    <div class="mixDetailHeroBg">
        <img src="<?php echo esc_url( $thumbnail_url ); ?>" alt="" aria-hidden="true" loading="eager">
    </div>
    <?php endif; ?>
    <div class="mixDetailHeroOverlay"></div>

    <div class="mixDetailHeroWrap">
        <!-- Breadcrumb -->
        <nav class="mixDetailBreadcrumb" aria-label="<?php esc_attr_e( 'Breadcrumb', 'mixhotel-theme' ); ?>">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Trang chủ', 'mixhotel-theme' ); ?></a>
            <span class="breadcrumb-sep">/</span>
            <a href="<?php echo esc_url( get_post_type_archive_link( 'hotel_room' ) ); ?>"><?php esc_html_e( 'Khách sạn tình yêu', 'mixhotel-theme' ); ?></a>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current"><?php echo esc_html( $room_title ); ?></span>
        </nav>

        <div class="mixDetailHeroGrid">
            <div>
                <!-- Badges -->
                <div class="mixDetailBadges">
                    <?php if ( $is_featured ) : ?>
                        <span class="mixDetailBadge mixDetailBadge--concept">
                            <?php esc_html_e( 'Nổi bật', 'mixhotel-theme' ); ?>
                        </span>
                    <?php endif; ?>
                    <?php if ( $room_code ) : ?>
                        <span class="mixDetailBadge mixDetailBadge--concept">
                            <?php echo esc_html( $room_code ); ?>
                        </span>
                    <?php endif; ?>
                    <span class="mixDetailBadge mixDetailBadge--branch">
                        <i class="fa fa-map-marker"></i>
                        <?php echo $branch_name; ?>
                    </span>
                </div>

                <!-- Title -->
                <h1 class="mixDetailTitle"><?php echo esc_html( $room_title ); ?></h1>

                <?php if ( $room_excerpt ) : ?>
                    <p class="mixDetailSubtitle"><?php echo esc_html( $room_excerpt ); ?></p>
                <?php endif; ?>

                <!-- CTA Buttons -->
                <div class="mixDetailActions">
                    <a href="#booking-form" class="mixDetailBtn mixDetailBtn--primary">
                        <i class="fa fa-calendar-check-o"></i>
                        <?php esc_html_e( 'Giữ phòng nhanh', 'mixhotel-theme' ); ?>
                    </a>
                    <?php if ( $zalo_link !== '#' ) : ?>
                    <a href="<?php echo esc_url( $zalo_link ); ?>" target="_blank" rel="noopener noreferrer" class="mixDetailBtn mixDetailBtn--zalo">
                        <i class="fa fa-comment"></i>
                        <?php esc_html_e( 'Nhắn Zalo tư vấn', 'mixhotel-theme' ); ?>
                    </a>
                    <?php endif; ?>
                    <a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', $hotline ) ); ?>" class="mixDetailBtn mixDetailBtn--phone">
                        <i class="fa fa-phone"></i>
                        <?php echo esc_html( $hotline ); ?>
                    </a>
                </div>

                <!-- Stats -->
                <div class="mixDetailStats">
                    <div class="mixDetailStatItem">
                        <strong>100%</strong>
                        <span><?php esc_html_e( 'Kín đáo, riêng tư', 'mixhotel-theme' ); ?></span>
                    </div>
                    <div class="mixDetailStatItem">
                        <strong>15-20'</strong>
                        <span><?php esc_html_e( 'Giữ phòng không cọc', 'mixhotel-theme' ); ?></span>
                    </div>
                    <div class="mixDetailStatItem">
                        <strong>Free</strong>
                        <span><?php esc_html_e( 'Cosplay & Board Game', 'mixhotel-theme' ); ?></span>
                    </div>
                    <div class="mixDetailStatItem">
                        <strong>24/7</strong>
                        <span><?php esc_html_e( 'Hỗ trợ nhận phòng', 'mixhotel-theme' ); ?></span>
                    </div>
                </div>
            </div>

            <!-- Featured Photo -->
            <?php if ( $thumbnail_url ) : ?>
            <div>
                <div class="mixDetailHeroPhoto" id="room-main-image">
                    <img src="<?php echo esc_url( $active_image_url ); ?>"
                         alt="<?php echo esc_attr( $active_image_alt ); ?>"
                         loading="eager"
                         id="room-active-image">
                </div>
            </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- ===================== SECTION 2: GALLERY ===================== -->
<?php if ( ! empty( $gallery ) ) : ?>
<section class="mixDetailGallery mix-section" id="room-gallery">
    <div class="mix-container">
        <div class="mixDetailGalleryHead">
            <span class="mix-section-kicker"><?php esc_html_e( 'Album Ảnh Thật 100%', 'mixhotel-theme' ); ?></span>
            <h2 class="mix-section-title"><?php printf( esc_html__( 'Không Gian Thực Tế Của %s', 'mixhotel-theme' ), esc_html( $room_title ) ); ?></h2>
            <p class="mix-section-desc"><?php esc_html_e( 'Bấm vào từng ảnh nhỏ để xem hình lớn, kiểm tra chi tiết không gian.', 'mixhotel-theme' ); ?></p>
        </div>

        <div class="mixDetailGalleryGrid" id="room-gallery-grid">
            <?php foreach ( $gallery as $idx => $img ) : ?>
                <button type="button"
                        class="mixDetailGalleryThumb<?php echo $idx === 0 ? ' is-active' : ''; ?>"
                        data-full-src="<?php echo esc_url( $img['url'] ); ?>"
                        data-alt="<?php echo esc_attr( $img['alt'] ); ?>"
                        aria-label="<?php printf( esc_attr__( 'Xem ảnh %d', 'mixhotel-theme' ), $idx + 1 ); ?>">
                    <?php
                    // Dùng thumbnail size cho grid
                    $thumb_url = wp_get_attachment_image_url( $img['id'], 'medium' );
                    ?>
                    <img src="<?php echo esc_url( $thumb_url ?: $img['url'] ); ?>"
                         alt="<?php echo esc_attr( $img['alt'] ); ?>"
                         loading="lazy">
                </button>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- ===================== SECTION 3: VIDEO ===================== -->
<?php if ( $youtube_id ) : ?>
<section class="mixDetailVideo mix-section mix-section--dark-1" id="room-video">
    <div class="mix-container">
        <div class="mixDetailGalleryHead">
            <span class="mix-section-kicker"><?php esc_html_e( 'Trải Nghiệm Thực Tế', 'mixhotel-theme' ); ?></span>
            <h2 class="mix-section-title"><?php esc_html_e( 'Video Review Không Gian Phòng', 'mixhotel-theme' ); ?></h2>
        </div>

        <div class="mixDetailVideoWrap">
            <div class="mixDetailVideoEmbed">
                <iframe src="<?php echo esc_url( 'https://www.youtube.com/embed/' . $youtube_id ); ?>"
                        title="<?php printf( esc_attr__( 'Video %s', 'mixhotel-theme' ), esc_attr( $room_title ) ); ?>"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        loading="lazy"></iframe>
            </div>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- ===================== SECTION 4: CONCEPT & PERKS ===================== -->
<?php if ( $room_content || ! empty( $amenities ) ) : ?>
<section class="mixDetailConcept mix-section" id="room-concept">
    <div class="mix-container">
        <div class="mixDetailGalleryHead">
            <span class="mix-section-kicker"><?php esc_html_e( 'Điểm Nhấn Độc Quyền', 'mixhotel-theme' ); ?></span>
            <h2 class="mix-section-title"><?php printf( esc_html__( 'Concept Phòng %s', 'mixhotel-theme' ), esc_html( $room_title ) ); ?></h2>
            <?php if ( $room_content ) : ?>
                <p class="mix-section-desc"><?php echo wp_kses_post( wp_trim_words( $room_content, 40 ) ); ?></p>
            <?php endif; ?>
        </div>

        <?php if ( ! empty( $amenities ) ) : ?>
        <div class="mixDetailPerksGrid">
            <?php foreach ( $amenities as $amenity ) : ?>
            <div class="mixDetailPerkCard">
                <div class="mixDetailPerkIcon">
                    <i class="fa fa-check-circle"></i>
                </div>
                <h3 class="mixDetailPerkTitle"><?php echo esc_html( $amenity->name ); ?></h3>
                <?php if ( $amenity->description ) : ?>
                    <p class="mixDetailPerkDesc"><?php echo esc_html( $amenity->description ); ?></p>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
</section>
<?php endif; ?>

<!-- ===================== SECTION 5: PRICING TABLE ===================== -->
<section class="mixDetailPricing mix-section mix-section--dark-1" id="room-pricing">
    <div class="mix-container">
        <div class="mixDetailGalleryHead">
            <span class="mix-section-kicker"><?php esc_html_e( 'Bảng Giá Rõ Ràng Minh Bạch', 'mixhotel-theme' ); ?></span>
            <h2 class="mix-section-title"><?php printf( esc_html__( 'Báo Giá Phòng %s', 'mixhotel-theme' ), esc_html( $room_title ) ); ?></h2>
            <p class="mix-section-desc">
                <?php printf( esc_html__( 'Áp dụng tại cơ sở %s. Không phát sinh phụ phí ẩn.', 'mixhotel-theme' ), $branch_name ); ?>
            </p>
        </div>

        <div class="mixDetailPricingGrid">
            <!-- 2 Giờ Đầu -->
            <div class="mixDetailPriceCard">
                <span class="mixDetailPriceLabel"><?php esc_html_e( '2 Giờ Đầu', 'mixhotel-theme' ); ?></span>
                <div class="mixDetailPriceValue">
                    <?php echo esc_html( $price_2h ); ?>
                    <span class="mixDetailPriceUnit"><?php esc_html_e( '/ 2 giờ', 'mixhotel-theme' ); ?></span>
                </div>
                <span class="mixDetailPriceNote"><?php esc_html_e( 'Khung giờ hẹn hò nhanh', 'mixhotel-theme' ); ?></span>
            </div>

            <!-- Thêm Giờ -->
            <div class="mixDetailPriceCard">
                <span class="mixDetailPriceLabel"><?php esc_html_e( 'Thêm Giờ', 'mixhotel-theme' ); ?></span>
                <div class="mixDetailPriceValue">
                    <?php echo esc_html( $price_extra ); ?>
                    <span class="mixDetailPriceUnit"><?php esc_html_e( '/ mỗi giờ tiếp theo', 'mixhotel-theme' ); ?></span>
                </div>
                <span class="mixDetailPriceNote"><?php esc_html_e( 'Linh hoạt theo nhu cầu', 'mixhotel-theme' ); ?></span>
            </div>

            <!-- Qua Đêm (Popular) -->
            <div class="mixDetailPriceCard mixDetailPriceCard--popular">
                <span class="mixDetailPricePopularBadge"><?php esc_html_e( 'Phổ biến', 'mixhotel-theme' ); ?></span>
                <span class="mixDetailPriceLabel"><?php esc_html_e( 'Qua Đêm', 'mixhotel-theme' ); ?></span>
                <div class="mixDetailPriceValue">
                    <?php echo esc_html( $price_night ); ?>
                    <span class="mixDetailPriceUnit"><?php esc_html_e( '/ 22h – 12h', 'mixhotel-theme' ); ?></span>
                </div>
                <span class="mixDetailPriceNote"><?php esc_html_e( 'Được chọn nhiều nhất', 'mixhotel-theme' ); ?></span>
            </div>

            <!-- Cả Ngày Đêm -->
            <div class="mixDetailPriceCard">
                <span class="mixDetailPriceLabel"><?php esc_html_e( 'Cả Ngày Đêm', 'mixhotel-theme' ); ?></span>
                <div class="mixDetailPriceValue">
                    <?php echo esc_html( $price_allday ); ?>
                    <span class="mixDetailPriceUnit"><?php esc_html_e( '/ 14h – 12h', 'mixhotel-theme' ); ?></span>
                </div>
                <span class="mixDetailPriceNote"><?php esc_html_e( 'Trọn vẹn trải nghiệm', 'mixhotel-theme' ); ?></span>
            </div>
        </div>
    </div>
</section>

<!-- ===================== SECTION 6: BOOKING FORM ===================== -->
<section class="mixDetailBooking mix-section" id="booking-form">
    <div class="mix-container">
        <div class="mixDetailGalleryHead">
            <span class="mix-section-kicker"><?php esc_html_e( 'Giữ Phòng Nhanh', 'mixhotel-theme' ); ?></span>
            <h2 class="mix-section-title"><?php esc_html_e( 'Form Giữ Phòng Online', 'mixhotel-theme' ); ?></h2>
            <p class="mix-section-desc"><?php esc_html_e( 'Điền thông tin bên dưới, nhân viên sẽ liên hệ xác nhận trong vòng 15 phút.', 'mixhotel-theme' ); ?></p>
        </div>

        <div class="mixDetailBookingWrap">
            <form class="mixDetailBookingForm" id="mixhotel-booking-form" method="post">
                <?php wp_nonce_field( 'mixhotel_booking_nonce', 'mixhotel_booking_security' ); ?>
                <input type="hidden" name="action" value="mixhotel_submit_booking">
                <input type="hidden" name="room_id" value="<?php echo esc_attr( $room_id ); ?>">
                <input type="hidden" name="room_name" value="<?php echo esc_attr( $room_title ); ?>">

                <!-- Honeypot (chống bot spam - AGENTS.md §3.1) -->
                <div style="position:absolute;left:-9999px;" aria-hidden="true">
                    <input type="text" name="website_url" tabindex="-1" autocomplete="off">
                </div>

                <div class="mixDetailFormGroup">
                    <label for="booking-name"><?php esc_html_e( 'Họ và tên *', 'mixhotel-theme' ); ?></label>
                    <input type="text" id="booking-name" name="customer_name" required
                           placeholder="<?php esc_attr_e( 'Nhập họ tên của bạn', 'mixhotel-theme' ); ?>">
                </div>

                <div class="mixDetailFormGroup">
                    <label for="booking-phone"><?php esc_html_e( 'Số điện thoại *', 'mixhotel-theme' ); ?></label>
                    <input type="tel" id="booking-phone" name="customer_phone" required
                           placeholder="<?php esc_attr_e( 'VD: 0909123456', 'mixhotel-theme' ); ?>"
                           pattern="[0-9]{10,11}">
                </div>

                <div class="mixDetailFormRow">
                    <div class="mixDetailFormGroup">
                        <label for="booking-date"><?php esc_html_e( 'Ngày nhận phòng', 'mixhotel-theme' ); ?></label>
                        <input type="date" id="booking-date" name="booking_date"
                               min="<?php echo esc_attr( date( 'Y-m-d' ) ); ?>">
                    </div>
                    <div class="mixDetailFormGroup">
                        <label for="booking-time"><?php esc_html_e( 'Giờ nhận phòng', 'mixhotel-theme' ); ?></label>
                        <input type="time" id="booking-time" name="booking_time" value="14:00">
                    </div>
                </div>

                <div class="mixDetailFormGroup">
                    <label for="booking-demand"><?php esc_html_e( 'Nhu cầu nghỉ', 'mixhotel-theme' ); ?></label>
                    <select id="booking-demand" name="booking_demand">
                        <option value="2h"><?php esc_html_e( 'Theo giờ (2 giờ đầu)', 'mixhotel-theme' ); ?></option>
                        <option value="overnight"><?php esc_html_e( 'Qua đêm (22h – 12h)', 'mixhotel-theme' ); ?></option>
                        <option value="allday"><?php esc_html_e( 'Cả ngày đêm (14h – 12h)', 'mixhotel-theme' ); ?></option>
                    </select>
                </div>

                <div class="mixDetailFormGroup">
                    <label for="booking-note"><?php esc_html_e( 'Ghi chú', 'mixhotel-theme' ); ?></label>
                    <textarea id="booking-note" name="booking_note" rows="3"
                              placeholder="<?php esc_attr_e( 'VD: Cần trang trí sinh nhật, mượn đồ cosplay...', 'mixhotel-theme' ); ?>"></textarea>
                </div>

                <button type="submit" class="mixDetailFormSubmit" id="booking-submit-btn">
                    <i class="fa fa-paper-plane"></i>
                    <?php esc_html_e( 'Gửi yêu cầu giữ phòng', 'mixhotel-theme' ); ?>
                </button>

                <div class="mixDetailFormSuccess" id="booking-success-msg" style="display:none;">
                    <i class="fa fa-check-circle"></i>
                    <?php esc_html_e( 'Yêu cầu giữ phòng đã được ghi nhận! Nhân viên sẽ liên hệ bạn sớm.', 'mixhotel-theme' ); ?>
                </div>
            </form>
        </div>
    </div>
</section>
