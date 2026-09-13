# AGENTS.md — LUẬT BẤT DI BẤT DỊCH CHO DỰ ÁN MIX HOTEL CLONE

> Tài liệu này là **System Prompt tối thượng (Hiến pháp dự án)** tuân thủ theo `playbook_disciplined_vibe_coding.md`. Mọi AI Agent (Antigravity, Cursor, Claude, Copilot) tham gia lập trình codebase này BẮT BUỘC phải đọc và tuân thủ 100% các nguyên tắc bên dưới.

---

## 1. THỨ BẬC CHÂN LÝ (Hierarchy of Truth)

Khi xảy ra mâu thuẫn giữa các nguồn tài liệu và code, thứ tự ưu tiên giải quyết từ CAO nhất xuống THẤP nhất như sau:
1. **Chỉ dẫn trực tiếp và mới nhất của User** (trong hội thoại hiện tại).
2. **File này (`AGENTS.md`)** — Hiến pháp kiến trúc và ranh giới an toàn.
3. **Spec Kit hiện hành (`specs/<feature>/spec.md`, `contracts/`, `plan.md`, `tasks.md`)**.
4. **Tài liệu nghiệp vụ vĩ mô (`docs/system-architecture.md`, `docs/database-schema.md`)**.
5. **Mã nguồn và Database hiện có trong workspace**.

---

## 2. RÀNG BUỘC CÔNG NGHỆ & MÔI TRƯỜNG

* **WordPress Core & Server:** WordPress 6.x + PHP 8.2+ chạy trên Docker Compose (`store_app`, `store_db`, `store_pma`).
* **Kiến trúc Giao diện:** Full Site Editing (FSE) Block Theme (`wp-content/themes/mixhotel-theme/`), cấu hình toàn bộ qua `theme.json` và Block Templates/Patterns.
* **Kiến trúc Nghiệp vụ:** Toàn bộ Custom Post Types, Taxonomies, Meta Boxes, REST API, AJAX handlers phải nằm độc lập trong Custom Plugin (`wp-content/plugins/mixhotel-core/`).
* **Không cài đặt tùy tiện:** KHÔNG tự ý cài đặt thêm plugin bên thứ 3 cồng kềnh (Elementor, Visual Composer, các addon nặng) nếu chưa có sự phê duyệt của User.
* **Quy chuẩn Styling:** 
  * BẮT BUỘC sử dụng Design Tokens đã định nghĩa trong `theme.json` và `docs/design-tokens-spec.md`.
  * TUYỆT ĐỐI KHÔNG hardcode mã màu tùy tiện (ví dụ `#121212`, `#ff0000`) rải rác trong file CSS/HTML mà không thông qua biến CSS variables `--wp--preset--color--*`.
* **Zero Core Modifications:** TUYỆT ĐỐI KHÔNG chỉnh sửa bất kỳ file nào trong `wp-admin/`, `wp-includes/` hoặc core WordPress.

---

## 3. RANH GIỚI AN TOÀN & BẢO MẬT

1. **Bảo mật Form & API:**
   * Mọi endpoint AJAX / REST API nhận dữ liệu đặt phòng BẮT BUỘC phải kiểm tra **WordPress Nonce** (`check_ajax_referer` hoặc `wp_verify_nonce`).
   * Phải tích hợp honeypot field hoặc rate-limiting để chống bot spam form đặt phòng.
2. **Sanitization & Escaping:**
   * Input từ người dùng: BẮT BUỘC sanitize trước khi lưu vào DB (`sanitize_text_field`, `sanitize_textarea_field`, `absint`).
   * Output ra giao diện: BẮT BUỘC escape đúng ngữ cảnh (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`).
   * Database Queries: Khi dùng `$wpdb`, 100% câu lệnh có tham số phải dùng `$wpdb->prepare()`.
3. **Quản lý Secrets:**
   * KHÔNG commit credentials thật, Telegram Bot Token, Database passwords lên Git public. Các secrets phải được load qua biến môi trường hoặc WordPress Options bảo mật.

---

## 4. QUY TRÌNH THỰC THI (Disciplined Vibe Coding Workflow)

1. **Spec-Driven First:** Không bao giờ viết code nếu chưa có `spec.md`, `contracts/` và `tasks.md` được duyệt.
2. **Bug Prevention Knowledge:** Trước khi code bất kỳ module nào, Agent BẮT BUỘC phải đọc tài liệu `.agents/skills/wordpress-bug-prevention/SKILL.md` để tránh các lỗi thường gặp của WordPress.
3. **Atomic Task Execution:**
   * Chỉ thực hiện từng task một được đánh dấu trong `specs/<feature>/tasks.md`.
   * Gắn path file chính xác, không tạo file bừa bãi ngoài phạm vi task.
4. **Fast Verification Loop:**
   * Sau mỗi task, chạy kiểm tra cú pháp PHP: `php -l <file_path>` hoặc kiểm tra runtime error log `wp-content/debug.log`.
   * Đảm bảo `WP_DEBUG_LOG` không xuất hiện Warning, Notice hay Fatal Error.
   * Khi task đạt chuẩn $\rightarrow$ đánh dấu `[X]` vào `tasks.md` trước khi sang task tiếp theo.
5. **Ghi nhận bài học (Bug Registry):**
   * Nếu gặp một lỗi phức tạp tốn hơn 2 lượt debug để sửa, BẮT BUỘC phải cập nhật nguyên nhân và cách phòng ngừa vào `.agents/skills/wordpress-bug-prevention/SKILL.md`.
