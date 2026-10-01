# TASKS: 08 — AUTOMATED BOOKING ENGINE

**Input:** `specs/08-automated-booking/spec.md`, `plan.md` & `contracts/api-contracts.md`  
**Tuân thủ:** `playbook_disciplined_vibe_coding.md` & `AGENTS.md`

---

## Phase 0: BUG FIX — Sửa Nonce Đóng Băng (BUG-17) [CRITICAL]

- [X] **T001** Sửa `wp-content/themes/mixhotel-theme/assets/js/booking-engine.js` — Thay `formData.append()` thành `formData.set()` để luôn ghi đè nonce fresh từ `MixHotelData.nonce`. Xoá logic kiểm tra `!formData.get('mixhotel_booking_nonce')`.
- [X] **T002** Sửa `wp-content/themes/mixhotel-theme/patterns/hero-booking.php` — Xoá `wp_nonce_field(...)`. Thêm `<input type="hidden" name="action" value="mixhotel_submit_booking">`. Thêm placeholder nonce input trống `<input type="hidden" name="mixhotel_booking_nonce" value="">`.
- [X] **T003** Thống nhất nonce action — Sửa `room-detail-content.php` nonce field name thành `mixhotel_booking_nonce` (nếu cần). Sửa `class-booking-handler.php` chỉ verify 1 action `mixhotel_booking_nonce`.
- [X] **T004** Re-seed / Update trang chủ — Xoá nonce cũ khỏi `post_content` trong DB bằng WP-CLI hoặc update trực tiếp content.
- [X] **T005** Verification — Test form Hero trang chủ gửi thành công. Kiểm tra `debug.log` có booking mới. Test form chi tiết phòng.
- [X] **T006** Ghi BUG-17 vào `.agents/skills/wordpress-bug-prevention/SKILL.md`.

---

## Phase 1: Backend — Availability Check & Auto-Confirm Logic

- [X] **T007** Thêm method `calculate_checkout_time($check_in_dt, $demand_type)` vào `class-booking-handler.php` — Tính check-out time theo duration map (2h, overnight, allday). Unit test bằng `php -r`.
- [X] **T008** Thêm method `check_room_availability($room_id, $check_in_dt, $check_out_dt)` vào `class-booking-handler.php` — Query overlap time-range theo Contract 2. Sử dụng `$wpdb->prepare()`.
- [X] **T009** Upgrade `handle_booking_submission()` trong `class-booking-handler.php` — Tích hợp availability check + auto-confirm. Lưu thêm meta `_mixhotel_lead_check_in_datetime`, `_mixhotel_lead_check_out_datetime`, `_mixhotel_lead_duration_type`, `_mixhotel_lead_confirmed_at`. Kiểm tra option `mixhotel_auto_confirm_enabled`.

---

## Phase 2: Backend — WP-Cron TTL & Status Lifecycle

- [X] **T010** Đăng ký custom cron interval `mixhotel_five_minutes` và schedule hook `mixhotel_check_expired_bookings` trong `class-booking-handler.php`. Đăng ký trong activation hook.
- [X] **T011** Implement `cron_expire_bookings()` — Query đơn `confirmed` quá hạn, batch update status → `expired`, ghi meta `_mixhotel_lead_expired_at`, log debug.
- [X] **T012** Cập nhật `mixhotel-core.php` — Thêm `register_deactivation_hook` để clear cron schedule.

---

## Phase 3: Admin — Mở rộng Quản lý Đơn

- [X] **T013** Cập nhật `class-admin-leads.php` — Thêm status badges cho `checked_in` (🏨), `expired` (⏰), `no_show` (🚫), `completed` (✔️). Thêm cột Check-in/out datetime.
- [X] **T014** Thêm Quick Action buttons trong Meta Box `class-admin-leads.php` — Nút Check-in, Hoàn thành, Khách không đến, Huỷ đơn. AJAX handlers cho status transitions.
- [X] **T015** Thêm dropdown filter theo trạng thái trên danh sách `booking_lead` trong `class-admin-leads.php`.
- [X] **T016** Cập nhật `class-settings.php` — Thêm section "Booking Engine" với toggle Auto-Confirm và input Hold Duration (phút).

---

## Phase 4: Frontend — Cập nhật Form & UI

- [X] **T017** Cập nhật `booking-engine.js` — Hiển thị check-in/check-out trong modal xác nhận. Xử lý error code `room_unavailable` với thông báo UI thân thiện.
- [X] **T018** Cập nhật `parts/booking-modal.html` — Thêm vùng hiển thị thời gian check-in/check-out, hold duration.
- [X] **T019** (Optional) Thêm API endpoint kiểm tra phòng trống real-time — Form hiển thị badge "✅ Còn trống" / "🔴 Đã kín" sau khi chọn ngày/giờ.

---

## Phase 5: Verification & Documentation

- [X] **T020** Kiểm tra cú pháp `php -l` cho tất cả file PHP đã sửa/tạo mới.
- [X] **T021** Functional testing — Happy path, overlap test, cron TTL test, admin transitions, backward compat.
- [X] **T022** Cập nhật `docs/database-schema.md` — Bổ sung meta mới cho `booking_lead`.
- [X] **T023** Cập nhật `docs/changelog.md` — Ghi nhận Feature 08.

