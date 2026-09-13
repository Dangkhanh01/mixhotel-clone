# IMPLEMENTATION PLAN: 01 - FOUNDATION AND THEME SETUP

**Input:** `specs/01-foundation-and-theme/spec.md`, `docs/system-architecture.md`, `docs/design-tokens-spec.md`  
**Constitution Check:** Tuân thủ 100% nguyên tắc trong `AGENTS.md` (FSE Block Theme, không sửa core, dùng Tokens, không hardcode màu).

---

## 1. CONSTITUTION CHECK (KIỂM TRA TUÂN THỦ HIẾN PHÁP DỰ ÁN)

| Điều khoản trong `AGENTS.md` | Đánh giá | Ghi chú thực thi |
| :--- | :---: | :--- |
| **Dùng FSE Block Theme** | PASS | Khởi tạo cấu trúc `wp-content/themes/mixhotel-theme/` với `theme.json` |
| **Không sửa Core / Vendor** | PASS | 100% code nằm trong theme riêng và custom plugin riêng |
| **Dùng Design Tokens tập trung** | PASS | Khai báo toàn bộ màu sắc, typography trong `theme.json` |
| **Độc lập Nghiệp vụ** | PASS | CPT `hotel_room` và taxonomy nằm trong `mixhotel-core.php` |

---

## 2. KIẾN TRÚC FILE & COMPONENT

```
wp-content/
├── themes/
│   └── mixhotel-theme/
│       ├── style.css                           # Khai báo metadata theme
│       ├── theme.json                          # Cấu hình Tokens & Styles (Version 3)
│       ├── templates/
│       │   ├── index.html                      # Template fallback
│       │   └── front-page.html                 # Khung sườn trang chủ
│       └── parts/
│           ├── header.html                     # Header placeholder
│           └── footer.html                     # Footer placeholder
└── plugins/
    └── mixhotel-core/
        ├── mixhotel-core.php                   # File khởi động plugin
        └── includes/
            ├── class-cpt-room.php              # Đăng ký CPT hotel_room
            └── class-taxonomies.php            # Đăng ký taxonomy room_amenity
```

---

## 3. CÁC HỢP ĐỒNG KỸ THUẬT (CONTRACTS)

1. **`contracts/theme-tokens.contract.json`**: Khóa cứng schema của palette màu và typography scale.
2. **`contracts/cpt-interface.contract.php`**: Khóa cứng các tham số của hàm `register_post_type` và `register_taxonomy`.
