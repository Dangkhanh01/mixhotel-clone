<?php
/**
 * Contract Interface: Custom Post Types and Taxonomies Registration
 * 
 * Hợp đồng quy định các hằng số và chữ ký bắt buộc cho plugin mixhotel-core.
 */

namespace MixHotel\Contracts;

interface CPTContract {
    const CPT_ROOM   = 'hotel_room';
    const CPT_BRANCH = 'hotel_branch';
    const CPT_LEAD   = 'booking_lead';

    const TAX_AMENITY = 'room_amenity';
    const TAX_CONCEPT = 'room_concept';

    /**
     * Đăng ký Custom Post Type
     * @return void
     */
    public function register_post_types(): void;

    /**
     * Đăng ký Custom Taxonomies
     * @return void
     */
    public function register_taxonomies(): void;
}
