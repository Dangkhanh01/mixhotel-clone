# CHANGELOG: NHẬT KÝ PHÁT TRIỂN DỰ ÁN MIX HOTEL CLONE

Tất cả các thay đổi kiến trúc, tính năng và sửa lỗi của dự án đều được ghi chép tại đây theo chuẩn [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

### Added - 2026-09-13
- **Thiết lập Bộ tài liệu 3 tầng theo chuẩn Disciplined Vibe Coding (SDD):**
  - **Tầng 3 (Hiến pháp & Chống Bug):**
    - Khởi tạo [AGENTS.md](file:///c:/Users/maida/Code/wordpress/AGENTS.md) quy định Thứ bậc chân lý, ranh giới an toàn và quy trình thực thi.
    - Khởi tạo [.agents/skills/wordpress-bug-prevention/SKILL.md](file:///c:/Users/maida/Code/wordpress/.agents/skills/wordpress-bug-prevention/SKILL.md) ghi nhận 5 bài học phòng ngừa bug WordPress/CSS kinh điển.
  - **Tầng 1 (Nghiệp vụ vĩ mô):**
    - [docs/system-architecture.md](file:///c:/Users/maida/Code/wordpress/docs/system-architecture.md): Thiết kế phân tách Theme (Trình diễn) và Plugin (Nghiệp vụ).
    - [docs/database-schema.md](file:///c:/Users/maida/Code/wordpress/docs/database-schema.md): Đặc tả ERD, CPT `hotel_room`, `hotel_branch`, `booking_lead` và taxonomy `room_amenity`.
    - [docs/design-tokens-spec.md](file:///c:/Users/maida/Code/wordpress/docs/design-tokens-spec.md): Bảng mã màu Dark Luxury, font Questrial/Roboto, spacing scale.
    - [docs/roadmap.md](file:///c:/Users/maida/Code/wordpress/docs/roadmap.md): Lộ trình 4 tuần chia nhỏ thành các Feature Packages.
  - **Tầng 2 (Gói đặc tả tính năng Feature Kit 01):**
    - [specs/01-foundation-and-theme/spec.md](file:///c:/Users/maida/Code/wordpress/specs/01-foundation-and-theme/spec.md): Đặc tả chức năng, kịch bản Gherkin và Edge Cases.
    - [specs/01-foundation-and-theme/plan.md](file:///c:/Users/maida/Code/wordpress/specs/01-foundation-and-theme/plan.md): Kế hoạch và Constitution Check.
    - [specs/01-foundation-and-theme/contracts/theme-tokens.contract.json](file:///c:/Users/maida/Code/wordpress/specs/01-foundation-and-theme/contracts/theme-tokens.contract.json): Hợp đồng JSON Schema cho Design Tokens.
    - [specs/01-foundation-and-theme/contracts/cpt-interface.contract.php](file:///c:/Users/maida/Code/wordpress/specs/01-foundation-and-theme/contracts/cpt-interface.contract.php): Hợp đồng Interface cho CPT và Taxonomies.
    - [specs/01-foundation-and-theme/tasks.md](file:///c:/Users/maida/Code/wordpress/specs/01-foundation-and-theme/tasks.md): 12 Task nguyên tử kèm đường dẫn file chính xác.
