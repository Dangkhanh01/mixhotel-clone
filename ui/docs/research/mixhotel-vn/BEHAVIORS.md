# BEHAVIORS & INTERACTION SPECIFICATION: MIXHOTEL.VN

## 1. Header & Navigation Behaviors
- **Desktop Header:**
  - Sticky at page top with backdrop blur and subtle shadow on scroll.
  - Multi-level dropdown menus on hover ("KHÁCH SẠN TÌNH YÊU", "TIN TỨC", "CHÍNH SÁCH") with smooth entrance animation (`appeared_3`).
  - Active indicator gold underline that expands on hover.
- **Mobile Header:**
  - Fixed top bar containing logo on left and hamburger icon on right.
  - Hamburger toggle triggers full-screen slide-in drawer (`blockCateMobile`) from left to right.
  - Red close button (`.xItem`) fixed at top-right of drawer.
  - Nested sub-menu accordion expanding on chevron click.

## 2. Floating Contact & Sticky Action Bars
- **Desktop Floating Contact Widget (Right side):**
  - Vertically centered at right margin (desktop only, hidden on `< 768px`).
  - Icons: Messenger (purple shadow ripple), Zalo (blue shadow ripple), Phone (navy shadow ripple), Back-to-Top button.
  - Ripple keyframe animation (`bigshake_1`) triggers on hover.
  - Back-to-Top scrolls smoothly to top of page.
- **Mobile Bottom Action Bar (Fixed bottom):**
  - Fixed at `bottom: 0`, full width (visible only on mobile `< 768px`).
  - 5 slots: Home, Messenger, Phone (elevated circular center button), Zalo, SMS.
  - Center phone button has continuous pulse glow animation (`bigshake_2`) and phone wobble animation (`latdat_2`).
  - All contact items trigger branch selection modal (`#popupContact_1`).

## 3. Modals & Dialogs
- **Branch Selection Modal (`#popupContact_1`):**
  - Triggered by clicking "ĐẶT PHÒNG", "Hỏi phòng", or any contact icon.
  - Displays 3 active branches:
    1. Mix Boutique Premium - Huỳnh Thúc Kháng (Phone: `038 310 4010`, Zalo: `+84383104010`, Messenger: `m.me/602986296805550`)
    2. Mix Boutique Hotel - 256B Đặng Tiến Đông (Phone: `039 330 7030`, Zalo: `+84393307030`, Messenger: `m.me/111428390604292`)
    3. Mix Boutique Hotel - 20 Phúc La Hà Đông (Phone: `035 366 0966`, Zalo: `+84353660966`, Messenger: `m.me/114361207416511`)
  - Direct deep linking according to selected channel (tel:, sms:, zalo.me, m.me).
  - Smooth fade and scale modal transition.
- **Quick Booking Form ("Giữ phòng nhanh nhất"):**
  - Form validation on required fields (Name, Phone, Branch, Need).
  - Shows success notification with 15-20 min room hold policy and instant Zalo confirmation CTA.

## 4. Media & Cards
- **Video Section:**
  - YouTube lite preview with custom thumbnail, dark overlay, and pulsing gold play icon.
  - Modal or inline playable frame.
- **Concept Rooms & Photos:**
  - Image hover zoom (`scale(1.05)`) with smooth transition.
  - Badge tags ("HOT CONCEPT", "Boutique mood", "Bathtub room", etc.).
