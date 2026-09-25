# IMPLEMENTATION PLAN: 03 - SEED-FIRST REAL DATA MIGRATION

**Feature:** Seed-First Real Data Migration for Hotel Rooms & Dynamic Archive  
**Target:** Eliminate mock room data and 404 errors on `/khach-san-tinh-yeu/`  
**Reference:** User request "thực hiện Lựa chọn A: Seed-First /goal"

---

## 1. Context & Architecture

### Current Problem
- `wp-content/themes/mixhotel-theme/inc-branches-data.php` defines 32 rooms with hardcoded URLs (`/khach-san-tinh-yeu/bad-girl/`, etc.).
- Only 4 rooms (`karma`, `katana`, `amora`, `cloud-nine`) exist in the WordPress database as `hotel_room` Custom Post Type posts.
- Visiting any of the remaining 28 rooms causes a WordPress 404 Not Found error.
- The archive pattern `room-archive-content.php` relies on `inc-branches-data.php` arrays rather than querying the database.

### Target Architecture
1. **Database Truth**: All 32 rooms will exist as published `hotel_room` CPT posts with:
   - Proper title, post_name (slug), excerpt, content.
   - Post meta: `_mixhotel_room_code`, `_mixhotel_room_branch_id`, `_mixhotel_room_price_2h`, `_mixhotel_room_price_extra_hour`, `_mixhotel_room_price_overnight`, `_mixhotel_room_price_allday`, `_mixhotel_room_youtube_id`, `_mixhotel_room_featured`, `_mixhotel_room_gallery`.
   - Post thumbnail attachment imported from theme assets into WordPress media library.
   - Taxonomies: `room_amenity` terms.
2. **Dynamic Archive**: `room-archive-content.php` will query branches and rooms dynamically using `WP_Query`:
   - Iterate through published `hotel_branch` posts in desired order.
   - For each branch, query its child `hotel_room` posts via `_mixhotel_room_branch_id`.
   - Render room cards using `get_the_title()`, `get_permalink()`, `get_the_post_thumbnail_url()`, and formatted prices.
   - Dynamically build the consultation booking form rooms dropdown.
   - Retain the SEO article content (`inc-khach-san-tinh-yeu-article.php`) which is rich editorial content.
3. **Detail Page Integration**: `single-hotel_room.html` and `room-detail-content.php` will work 100% out of the box for all 32 rooms because they already query CPT meta and taxonomy functions!

---

## 2. Inventory of the 32 Rooms to Seed

### Branch 1: Mix Huỳnh Thúc Kháng / Mix Premium (`cs1-huynh-thuc-khang`)
1. `bad-girl` — Room 001 - Bad girl (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
2. `inferno` — VIP Room 102 - Inferno (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
3. `master-n-slave` — Room 201 - Master n Slave (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
4. `galaxy` — Room 202 - Galaxy (Superior: 199k/2h, +50k/h, 500k night, 700k allday)
5. `eden` — VIP Room 203 - Eden (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
6. `lolita` — Room 301 - Lolita (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
7. `karma` — Room 302 - Karma (Superior: 199k/2h, +50k/h, 500k night, 700k allday)
8. `303-scarlet` — VIP Room 303 - Scarlet (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
9. `katana` — VIP Room 401 - Katana (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
10. `amora` — Room 402 - Amora (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
11. `cloud-nine` — VIP Room 469 - Cloud Nine (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)

### Branch 2: Mix Đặng Tiến Đông (`cs2-dang-tien-dong`)
12. `hidden-frenzy` — Room 00 - Hidden Frenzy (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
13. `oasis` — VIP 01 - Oasis (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
14. `bad-boy` — Room 02 - Bad Boy (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
15. `lover` — VIP 03 - Lover (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
16. `after-sunset` — Room 04 - After Sunset (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
17. `kissing` — VIP 05 - Kissing (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
18. `lollipop` — Room 06 - Lollipop (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
19. `on-top` — VIP 07 - On Top (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
20. `blowj-up` — Room 08 - Blowj Up (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
21. `lalaland` — Room 09 - Lalaland (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)

### Branch 3: Mix Phúc La Hà Đông (`cs3-phuc-la`)
22. `naive` — Room 201 - Naive (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
23. `whisper` — VIP 102 - Whisper (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
24. `wake-up` — VIP 101 - Wake up (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
25. `rhett-butler` — VIP 202 - Rhett Butler (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
26. `confession` — Room 203 - Confession (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
27. `hollywood` — Room 204 - Hollywood (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
28. `honeymoon` — Room 301 - Honeymoon (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
29. `the-lust` — VIP 302 - The Lust (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)
30. `flame` — Room 303 - Flame (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
31. `passion` — Room 304 - Passion (Deluxe: 300k/2h, +50k/h, 600k night, 800k allday)
32. `get-high` — VIP 469 - Get High (VIP: 400k/2h, +80k/h, 800k night, 1000k allday)

---

## 3. Step-by-Step Execution Plan

- [x] **Phase 1: Seeder Enhancement**
  - Update `mix_import_attachment` to resolve image paths across `assets/images/`, `assets/storage/`, and `assets/uploads/`.
  - Include all 32 rooms with complete metadata, pricing tiers, amenities, and image paths.
  - Enable direct CLI execution (`php .../seed-rooms-branches.php`) with auto `wp-load.php` detection.
- [x] **Phase 2: Database Seeding & Verification**
  - Run the seeder in Docker container.
  - Verify all 32 room posts are created/updated and published in `wp_posts`.
  - Verify thumbnails and galleries are properly linked in `wp_postmeta`.
  - Flush rewrite rules to ensure permalinks resolve.
- [x] **Phase 3: Refactor Archive Pattern (`room-archive-content.php`)**
  - Query branches dynamically using `get_posts` or `WP_Query` for `hotel_branch`.
  - Query rooms dynamically for each branch using `_mixhotel_room_branch_id`.
  - Render room cards dynamically with `get_permalink()`, `get_the_title()`, `get_the_post_thumbnail_url()`, and formatted prices.
  - Dynamically build the consultation booking form room options.
- [x] **Phase 4: Comprehensive Verification & Testing**
  - Test HTTP response of `/khach-san-tinh-yeu/` (Archive page).
  - Test HTTP response of all 32 individual room URLs `/khach-san-tinh-yeu/<slug>/` to confirm 200 OK (0 404 errors!).
  - Verify no PHP syntax errors (`php -l`) and no runtime warnings in `debug.log`.
  - Verify UI rendering and links.
