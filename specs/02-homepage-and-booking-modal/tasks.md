# TASKS: 02 - HOMEPAGE AND BOOKING MODAL

**Input:** `specs/02-homepage-and-booking-modal/spec.md`, `plan.md`, `contracts/`  
**Quy tắc:** Mỗi task gắn cứng đường dẫn file chính xác. Kiểm tra cú pháp PHP/JS ngay sau hoàn thành. Đọc `wordpress-bug-prevention/SKILL.md` trước khi code.  
**Prototype Reference:** `ui/src/components/`

---

## Phase 1: Foundation — Assets, functions.php & CSS Modules

- [ ] **T001** [P] Tạo thư mục asset và đồng bộ hình ảnh cần thiết từ `ui/public/images/` sang `wp-content/themes/mixhotel-theme/assets/images/` (chỉ các file liệt kê trong `plan.md` Section 6.1)
- [ ] **T002** Tạo file `wp-content/themes/mixhotel-theme/functions.php` — Enqueue CSS modules và JS files, đăng ký Block Pattern Category `mixhotel`, đăng ký Template Parts mới (`mobile-action-bar`, `desktop-contact-bar`, `contact-modal`)
- [ ] **T003** [P] Tạo file `wp-content/themes/mixhotel-theme/assets/css/header.css` — Chuyển đổi styles từ classes `.mixPremium*` trong prototype, thay hex bằng CSS Variables `--wp--preset--*`
- [ ] **T004** [P] Tạo file `wp-content/themes/mixhotel-theme/assets/css/mobile-bar.css` — Styles cho Sticky Mobile Action Bar (nền sáng, nút Phone nhô cao, wobble animation)
- [ ] **T005** [P] Tạo file `wp-content/themes/mixhotel-theme/assets/css/desktop-contact-bar.css` — Styles cho thanh contact nổi desktop (nền dark, icon tròn, hover effects)
- [ ] **T006** [P] Tạo file `wp-content/themes/mixhotel-theme/assets/css/modal.css` — Styles cho Contact Modal (overlay blur, card dark-secondary, branch items, z-index theo BUG-05)
- [ ] **T007** [P] Tạo file `wp-content/themes/mixhotel-theme/assets/css/hero.css` — Styles cho Hero Section (background veil layers, grid layout, form card, stat cards, responsive breakpoints)
- [ ] **T008** [P] Tạo file `wp-content/themes/mixhotel-theme/assets/css/sections.css` — Styles cho tất cả remaining sections (Real Photos, Video, Concept Rooms, Branches, Pricing, Events, Booking Steps, FAQ, Final CTA, Footer)

---

## Phase 2: Navigation — Header & Floating Controls

- [ ] **T009** Cập nhật `wp-content/themes/mixhotel-theme/parts/header.html` — Header hoàn chỉnh với Logo, Navigation Block đa cấp (Khách sạn tình yêu ▼, Tin tức ▼, Chính sách ▼), nút ĐẶT PHÒNG. Tham chiếu: `ui/src/components/navigation/DesktopHeader.tsx`
- [ ] **T010** Tạo file `wp-content/themes/mixhotel-theme/assets/js/header-scroll.js` — JS detect scroll > 30px toggle class `mixPremiumMenuScrolled`, mobile drawer open/close
- [ ] **T011** Tạo file `wp-content/themes/mixhotel-theme/parts/mobile-action-bar.html` — Thanh 5 nút cố định đáy mobile (Home, Messenger, Phone, Zalo, SMS). Tham chiếu: `ui/src/components/floating/MobileActionBar.tsx`
- [ ] **T012** Tạo file `wp-content/themes/mixhotel-theme/parts/desktop-contact-bar.html` — Thanh nổi bên phải desktop (Messenger, Zalo, Phone, Page Up). Tham chiếu: `ui/src/components/floating/DesktopContactBar.tsx`

---

## Phase 3: Contact Modal — Hệ thống liên hệ đa kênh

- [ ] **T013** Tạo file `wp-content/themes/mixhotel-theme/parts/contact-modal.html` — HTML Modal chọn chi nhánh, tuân thủ 100% contract `modal-interaction.contract.json`. Tham chiếu: `ui/src/components/floating/ContactModal.tsx` + `BranchSelectModal.tsx`
- [ ] **T014** Tạo file `wp-content/themes/mixhotel-theme/assets/js/contact-modal.js` — Vanilla JS dispatcher: listen `data-contact-action` clicks → open modal → populate branch links theo contactType → close (ESC/overlay/X) → body lock/unlock → focus trap. Tuân thủ contract `modal-interaction.contract.json`

---

## Phase 4: Core Homepage Patterns (11 Block Patterns)

- [ ] **T015** Tạo file `wp-content/themes/mixhotel-theme/patterns/hero-booking.php` — Hero Section pattern với background ảnh, kicker, H1, CTA buttons, stats, form giữ phòng. Form fields tuân thủ `booking-form.contract.json`. Tham chiếu: `ui/src/components/sections/HeroSection.tsx`
- [ ] **T016** Tạo file `wp-content/themes/mixhotel-theme/patterns/real-photos-grid.php` — Pattern grid ảnh thật (1 featured + 5 tiles). Tham chiếu: `ui/src/components/sections/RealPhotosSection.tsx`
- [ ] **T017** Tạo file `wp-content/themes/mixhotel-theme/patterns/video-showcase.php` — Pattern video showcase (2 shorts + 1 channel preview). Tham chiếu: `ui/src/components/sections/VideoSection.tsx`
- [ ] **T018** Tạo file `wp-content/themes/mixhotel-theme/assets/js/youtube-lite.js` — Vanilla JS lite embed: click thumbnail → inject YouTube iframe autoplay
- [ ] **T019** Tạo file `wp-content/themes/mixhotel-theme/patterns/concept-rooms.php` — Pattern 4 phòng concept nổi bật. Tham chiếu: `ui/src/components/sections/ConceptRoomsSection.tsx`
- [ ] **T020** Tạo file `wp-content/themes/mixhotel-theme/patterns/branches-list.php` — Pattern 3 chi nhánh Hà Nội. Tham chiếu: `ui/src/components/sections/BranchesSection.tsx`
- [ ] **T021** Tạo file `wp-content/themes/mixhotel-theme/patterns/why-choose-us.php` — Pattern giá trị cốt lõi. Tham chiếu: `ui/src/components/sections/WhyChooseUsSection.tsx`
- [ ] **T022** Tạo file `wp-content/themes/mixhotel-theme/patterns/pricing-table.php` — Pattern bảng giá 3 hạng phòng. Tham chiếu: `ui/src/components/sections/PricingSection.tsx`
- [ ] **T023** Tạo file `wp-content/themes/mixhotel-theme/patterns/events-decoration.php` — Pattern sự kiện & trang trí. Tham chiếu: `ui/src/components/sections/EventsSection.tsx`
- [ ] **T024** Tạo file `wp-content/themes/mixhotel-theme/patterns/booking-steps.php` — Pattern 3 bước đặt phòng. Tham chiếu: `ui/src/components/sections/BookingStepsSection.tsx`
- [ ] **T025** Tạo file `wp-content/themes/mixhotel-theme/patterns/faq-accordion.php` — Pattern FAQ accordion. Tham chiếu: `ui/src/components/sections/FaqSection.tsx`
- [ ] **T026** Tạo file `wp-content/themes/mixhotel-theme/assets/js/faq-accordion.js` — Vanilla JS toggle expand/collapse cho FAQ items
- [ ] **T027** Tạo file `wp-content/themes/mixhotel-theme/patterns/final-cta.php` — Pattern Final CTA cuối trang. Tham chiếu: `ui/src/components/sections/FinalCtaSection.tsx`

---

## Phase 5: Assembly — Ghép trang chủ & Footer

- [ ] **T028** Cập nhật `wp-content/themes/mixhotel-theme/parts/footer.html` — Footer hoàn chỉnh theo prototype (logo, mô tả, chi nhánh, social links, DMCA, Bộ Công Thương). Tham chiếu: `ui/src/components/sections/FooterSection.tsx`
- [ ] **T029** Cập nhật `wp-content/themes/mixhotel-theme/templates/front-page.html` — Ghép toàn bộ patterns và template parts theo thứ tự trong `contracts/patterns-manifest.contract.json` → `frontPageAssemblyOrder`

---

## Phase 6: Verification & Fast Loop (Gate 2 — POC Approval)

- [ ] **T030** Kiểm tra cú pháp PHP cho tất cả file `.php` mới: `php -l functions.php` và `php -l patterns/*.php`
- [ ] **T031** Kiểm tra syntax JS: `node --check assets/js/*.js`
- [ ] **T032** Kiểm tra `wp-content/debug.log` — không có PHP Warning/Notice/Fatal khi tải trang chủ trên Docker
- [ ] **T033** Visual comparison: chụp ảnh trang chủ WordPress (port 8888) so sánh với prototype Next.js — đạt ≥ 90% tương đồng layout/color/typography
- [ ] **T034** Responsive test: kiểm tra trên viewport 360px, 576px, 768px, 992px, 1200px — không có horizontal scroll, không vỡ layout
- [ ] **T035** Interaction test: Modal open/close, Hero Form validate/submit, FAQ accordion, YouTube Lite embed, Header sticky, Scroll-to-top
- [ ] **T036** Cập nhật nhật ký công việc vào `docs/changelog.md`
