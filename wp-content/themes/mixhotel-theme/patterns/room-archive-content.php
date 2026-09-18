<?php
/**
 * Title: Room Archive Content
 * Slug: mixhotel-theme/room-archive-content
 * Categories: mixhotel
 * Description: Room catalog page with filter bar and card grid.
 *
 * @package MixHotelTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Lấy tất cả tiện nghi cho filter bar
$all_amenities = get_terms( [
    'taxonomy'   => 'room_amenity',
    'hide_empty' => true,
    'orderby'    => 'name',
    'order'      => 'ASC',
] );

if ( is_wp_error( $all_amenities ) ) {
    $all_amenities = [];
}

// Query tất cả phòng published
$rooms_query = new WP_Query( [
    'post_type'      => 'hotel_room',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
] );

// Sắp xếp ưu tiên phòng nổi bật lên đầu
if ( ! empty( $rooms_query->posts ) ) {
    usort( $rooms_query->posts, function( $a, $b ) {
        $feat_a = ( get_post_meta( $a->ID, '_mixhotel_room_featured', true ) === '1' ) ? 1 : 0;
        $feat_b = ( get_post_meta( $b->ID, '_mixhotel_room_featured', true ) === '1' ) ? 1 : 0;
        if ( $feat_a !== $feat_b ) {
            return $feat_b <=> $feat_a;
        }
        return strtotime( $b->post_date ) <=> strtotime( $a->post_date );
    } );
}
?>

<!-- Archive Hero -->
<section class="mixArchiveHero mix-section">
    <div class="mix-container">
        <span class="mixArchiveHeroKicker"><?php esc_html_e( 'Khách Sạn Tình Yêu Hà Nội', 'mixhotel-theme' ); ?></span>
        <h1 class="mixArchiveHeroTitle"><?php esc_html_e( 'Chọn Phòng Concept Yêu Thích', 'mixhotel-theme' ); ?></h1>
        <p class="mixArchiveHeroDesc">
            <?php esc_html_e( 'Khám phá các phòng concept độc quyền tại Mix Boutique Hotel. Mỗi phòng mang một chủ đề riêng biệt, thiết kế cho trải nghiệm riêng tư và lãng mạn.', 'mixhotel-theme' ); ?>
        </p>
    </div>
</section>

<!-- Filter Bar -->
<?php if ( ! empty( $all_amenities ) ) : ?>
<section class="mix-section" style="padding-top:0;padding-bottom:0;">
    <div class="mix-container">
        <div class="mixArchiveFilterBar" id="room-filter-bar">
            <button type="button" class="mixArchiveFilterTag is-active" data-filter="all">
                <i class="fa fa-th-large"></i>
                <?php esc_html_e( 'Tất cả', 'mixhotel-theme' ); ?>
            </button>
            <?php foreach ( $all_amenities as $amenity ) : ?>
                <button type="button" class="mixArchiveFilterTag" data-filter="<?php echo esc_attr( $amenity->slug ); ?>">
                    <?php echo esc_html( $amenity->name ); ?>
                </button>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Room Grid -->
<section class="mix-section mix-section--dark-1" id="room-grid-section">
    <div class="mix-container">
        <?php if ( $rooms_query->have_posts() ) : ?>
            <div class="mixArchiveGrid" id="room-archive-grid">
                <?php while ( $rooms_query->have_posts() ) : $rooms_query->the_post();
                    $rid = get_the_ID();
                    $thumb_url   = get_the_post_thumbnail_url( $rid, 'large' );
                    $is_featured = MixHotel_Helpers::is_room_featured( $rid );
                    $price_2h    = MixHotel_Helpers::get_room_price_formatted( $rid, '2h' );
                    $room_amenities = get_the_terms( $rid, 'room_amenity' );
                    $amenity_slugs = [];
                    if ( $room_amenities && ! is_wp_error( $room_amenities ) ) {
                        $amenity_slugs = wp_list_pluck( $room_amenities, 'slug' );
                    }
                    $zalo_link = MixHotel_Helpers::get_room_zalo_link( $rid );
                ?>
                <article class="mixArchiveCard is-visible"
                         data-amenities="<?php echo esc_attr( implode( ',', $amenity_slugs ) ); ?>">
                    <!-- Thumbnail -->
                    <div class="mixArchiveCardThumb">
                        <a href="<?php the_permalink(); ?>" title="<?php echo esc_attr( get_the_title() ); ?>">
                            <?php if ( $thumb_url ) : ?>
                                <img src="<?php echo esc_url( $thumb_url ); ?>"
                                     alt="<?php echo esc_attr( get_the_title() ); ?>"
                                     loading="lazy">
                            <?php endif; ?>
                        </a>
                        <?php if ( $is_featured ) : ?>
                            <span class="mixArchiveCardFeaturedTag">
                                <?php esc_html_e( 'Nổi bật', 'mixhotel-theme' ); ?>
                            </span>
                        <?php endif; ?>
                    </div>

                    <!-- Body -->
                    <div class="mixArchiveCardBody">
                        <h2 class="mixArchiveCardTitle">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h2>

                        <?php if ( has_excerpt() ) : ?>
                            <p class="mixArchiveCardExcerpt"><?php echo esc_html( get_the_excerpt() ); ?></p>
                        <?php endif; ?>

                        <!-- Amenity Tags -->
                        <?php if ( $room_amenities && ! is_wp_error( $room_amenities ) ) : ?>
                        <div class="mixArchiveCardTags">
                            <?php foreach ( $room_amenities as $am ) : ?>
                                <span class="mixArchiveCardTag">
                                    <i class="fa fa-check"></i>
                                    <?php echo esc_html( $am->name ); ?>
                                </span>
                            <?php endforeach; ?>
                        </div>
                        <?php endif; ?>

                        <!-- Footer -->
                        <div class="mixArchiveCardFooter">
                            <div class="mixArchiveCardPrice">
                                <span class="mixArchiveCardPriceLabel"><?php esc_html_e( '2 giờ đầu', 'mixhotel-theme' ); ?></span>
                                <span class="mixArchiveCardPriceValue"><?php echo esc_html( $price_2h ); ?></span>
                            </div>
                            <div class="mixArchiveCardActions">
                                <a href="<?php the_permalink(); ?>" class="mixArchiveCardBtn mixArchiveCardBtn--detail">
                                    <?php esc_html_e( 'Xem chi tiết', 'mixhotel-theme' ); ?>
                                </a>
                                <a href="<?php echo esc_url( $zalo_link ); ?>"
                                   target="_blank" rel="noopener noreferrer"
                                   class="mixArchiveCardBtn mixArchiveCardBtn--contact">
                                    <i class="fa fa-comment"></i>
                                    <?php esc_html_e( 'Hỏi phòng', 'mixhotel-theme' ); ?>
                                </a>
                            </div>
                        </div>
                    </div>
                </article>
                <?php endwhile; ?>
            </div>
        <?php else : ?>
            <!-- Edge Case #4: Không có phòng -->
            <div class="mixArchiveEmpty">
                <div class="mixArchiveEmptyIcon">
                    <i class="fa fa-bed"></i>
                </div>
                <h2 class="mixArchiveEmptyTitle"><?php esc_html_e( 'Chưa có phòng nào', 'mixhotel-theme' ); ?></h2>
                <p class="mixArchiveEmptyDesc"><?php esc_html_e( 'Hệ thống đang cập nhật danh sách phòng. Vui lòng quay lại sau hoặc liên hệ hotline để được tư vấn.', 'mixhotel-theme' ); ?></p>
            </div>
        <?php endif; ?>
        <?php wp_reset_postdata(); ?>
    </div>
</section>
