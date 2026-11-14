# Technical Design Specification: Zendesk Style Reference Redesign

**Date:** 2026-11-14  
**Project:** Reynalda Syalwa Portfolio (`ReynaldaSyalwa.github.io`)  
**Design Reference:** Zendesk Style Reference (Lime signal in a forest clearing)  
**Theme:** Light  

---

## 1. Executive Summary

This specification defines the complete redesign of Reynalda Syalwa's personal portfolio website from its legacy dark-obsidian aesthetic to the warm, authoritative, precision SaaS aesthetic of the **Zendesk Design System**.

The new visual design pairs near-black warm ink (`#11110d`) on warm off-white (`#f5f5f2`) and pure white (`#ffffff`), punctuated by a singular electric lime accent (`#d1f470`) carrying 100% of interactive signaling weight, complemented by deep Forest Canopy (`#203524`) for featured event blocks.

All authentic business performance data (ROAS 27.2x, Rp 62.2M+ closed deals, 27 Meta campaigns, bilingual i18n support, and interactive proof gallery) are preserved and elevated within this editorial layout.

---

## 2. Design System Tokens & Rules

### 2.1 Color Tokens & Surfaces

| Token Name | Hex Value | Semantic Role |
|------------|-----------|---------------|
| `--color-electric-lime` | `#d1f470` | Primary CTA buttons, active indicators, accent highlights. Sole chromatic accent. |
| `--color-forest-canopy` | `#203524` | Featured promo card surfaces, event announcements. |
| `--color-deep-grove` | `#2d4c33` | Secondary dark green surfaces, chart dataset accents. |
| `--color-near-black-ink` | `#11110d` | Primary typography, nav labels, body copy, icons, button labels. |
| `--color-warm-white` | `#f5f5f2` | Warm card surfaces, alternating section bands, testimonial fills. |
| `--color-pure-white` | `#ffffff` | Page canvas, hero background, button text on dark surfaces. |
| `--color-midnight` | `#000000` | Top announcement strip, ultra-high contrast accents. |
| `--color-stone-divider` | `#90918c` | Subtle dividers, timeline rules, secondary chart lines. |
| `--border-subtle` | `rgba(17, 17, 13, 0.11)` | Ghost button bottom underlines, table row dividers, card borders. |

### 2.2 Surface Elevation Model (Zero-Shadow Rule)
* **Zero `box-shadow` throughout the entire website.** Depth is achieved strictly through surface stepping:
  * **Level 0 (Canvas):** Pure White (`#ffffff`) for Hero and primary canvas.
  * **Level 1 (Warm Surface):** Warm White (`#f5f5f2`) for content cards and alternating content bands.
  * **Level 2 (Forest Canopy):** `#203524` for the featured event promo card (Contact section).
  * **Level 3 (Deep Grove):** `#2d4c33` for nested dark elements within event sections.

### 2.3 Typography System
* **Primary Typeface:** `Inter` (substitute for Vanilla Sans, humanist sans with clean geometric curves).
* **Global Letter Spacing (Tracking):** `0.054em` (`tracking-[0.054em]`) applied across all headline, body, and navigation text.
* **Weights & Scales:**
  * **Display / Hero Headline:** `74px` (desktop) / `42px` (mobile), **Weight 300 (whisper-weight)**, Line-Height `1.02`. *Strictly avoid weight 700 on headlines.*
  * **Heading LG:** `48px`, Weight 300, Line-Height `1.15`.
  * **Heading Section:** `32px`, Weight 600, Line-Height `1.25`.
  * **Heading SM:** `26px`, Weight 600, Line-Height `1.30`.
  * **Subheading:** `18px`, Weight 500, Line-Height `1.40`.
  * **Body:** `16px`, Weight 400, Line-Height `1.56`, color `#11110d`.
  * **Caption / Overline:** `14px`, Weight 600, Line-Height `1.44`, uppercase with `0.054em` tracking.

### 2.4 Border Radius Tokens
* **Content Cards:** `0px` (`rounded-none`). Flat, flush-cornered warm rectangles.
* **Buttons (Primary & Secondary):** `16px` (`rounded-2xl`). *Never full pill 9999px.*
* **Event Promo Cards:** `40px` (`rounded-[40px]`).
* **Inputs:** `12px` (`rounded-xl`).
* **Tags & Badges:** `4px` (`rounded`).
* **Icon Buttons:** `100%` (`rounded-full`).

---

## 3. Component Architecture & Specifications

### 3.1 Top Announcement Banner (`Navbar.vue` or Header Wrapper)
* **Surface:** `#000000` (Midnight).
* **Typography:** Inter 14px weight 400, color `#ffffff`.
* **Content:** Highlight value proposition (e.g., "Available for Performance Marketing & Digital Strategy Q1/Q2 2026").
* **Action Link:** Electric Lime (`#d1f470`) text with underline ("Hubungi Saya →" or "Konsultasi Gratis →").

### 3.2 Sticky Navigation Bar (`Navbar.vue`)
* **Surface:** `#ffffff` with subtle bottom border `rgba(17, 17, 13, 0.11)`.
* **Logo:** Monokrom `#11110d` typography `Reynalda.growth` with subtle badge.
* **Nav Links:** 16px weight 500 `#11110d`, tracking `0.054em`, clean underline or text darkening on hover.
* **Language Switcher:** Minimalist border (1px `rgba(17, 17, 13, 0.15)`), 14px weight 600 `#11110d`.
* **Primary CTA:** Background `#d1f470`, text `#11110d`, radius 16px, padding `10px 20px`, weight 600.

### 3.3 Hero Section (`HeroSection.vue`)
* **Surface:** Pure White `#ffffff`.
* **Overline / Badge:** Warm tag (radius 4px, background `rgba(17, 17, 13, 0.05)`, text `#11110d` 14px weight 600, tracking `0.054em`).
* **Main Headline:** Centered Inter weight 300, 68–74px, color `#11110d`, line-height 1.02.
* **Subheadline:** Centered Inter 18px weight 400, color `#11110d`, max-width 700px.
* **Lead Row:**
  * Input field: radius 12px, background `rgba(17, 17, 13, 0.05)`, border 1px solid `#11110d`, padding `12px 16px`.
  * Primary Button: radius 16px, background `#d1f470`, text `#11110d`, weight 600, padding `12px 24px`.
* **Product UI Screenshot Embed:**
  * White card with 16px radius, realistic rendering of Meta Ads Manager / ROI dashboard metrics, extending downward across the section boundary to create scroll anticipation.
  * Flanked by rounded portrait lifestyle photo strips.
* **Monochrome Trust Bar:**
  * Horizontal strip on `#ffffff` displaying key client sectors and partner logos in `#11110d` at 60% opacity with `24-32px` gaps.

### 3.4 Key Metric Cards (`HeroSection.vue` or Sub-section)
* 4 cards arranged in a grid.
* **Surface:** `#f5f5f2` (Warm White).
* **Radius:** `0px` (flat rectangle).
* **Shadow:** `none`.
* **Border:** 1px solid `rgba(17, 17, 13, 0.08)`.
* **Typography:** Overline 14px weight 600 uppercase `#11110d`, metric value large Inter/Mono `#11110d`, description in `#11110d` (opacity 70%).

### 3.5 Sales Income & Ad Spend Chart (`IncomeChartSection.vue`)
* **Surface:** `#ffffff` or `#f5f5f2`.
* **Chart.js Styling:**
  * Dataset 1 (Sales Income): Deep Grove `#2d4c33` with subtle Electric Lime `#d1f470` top stroke.
  * Dataset 2 (Ad Spend): Neutral stone tone `#90918c`.
  * Grid lines: Subtle dashed `rgba(17, 17, 13, 0.08)`.
  * Axes & Legend: `#11110d`, Inter font.
* **Metric summary cards:** Flat cards 0px radius, `#f5f5f2`.

### 3.6 Closed Deals Table (`DealsTableSection.vue`)
* **Surface:** Warm White `#f5f5f2` card container (radius `0px`, zero shadow).
* **Table Header:** Text 14px weight 600 `#11110d`, bottom border `rgba(17, 17, 13, 0.11)`.
* **Table Rows:** Clean padding, subtle divider lines.
* **Status Badge `DEAL`:** 4px radius tag, background Forest Canopy `#203524`, text `#d1f470`, weight 600.
* **Search / Filter Input:** 12px radius, border 1px `#11110d`, background `rgba(17, 17, 13, 0.05)`.

### 3.7 Meta Ads Section (`MetaAdsSection.vue`)
* **Cards:** Flat cards 0px radius with `#f5f5f2` surface.
* **Metric highlights:** CPR metrics highlighted with Electric Lime text accent.
* **Ghost Link Button:** Transparent background, text `#11110d`, border-bottom `1px solid rgba(17, 17, 13, 0.11)` for proof screenshot trigger.

### 3.8 6 Core Growth Pillars (`PillarsSection.vue`)
* 6 flat cards arranged in 3x2 grid.
* **Card Surface:** `#f5f5f2`, radius `0px`, zero shadow.
* **Icons:** Outlined mono-weight in `#11110d`.
* **Pillar Tags:** Radius 4px, background `rgba(17, 17, 13, 0.06)`, text `#11110d`.

### 3.9 Career Timeline (`TimelineSection.vue`)
* Alternating band surface `#ffffff`.
* Connector line in Stone Divider `#90918c`.
* Timeline cards: flat 0px radius `#f5f5f2`.
* Role badge: 4px radius, `#203524` with text `#ffffff` or `#d1f470`.

### 3.10 Featured Promo Card Contact (`ContactSection.vue`)
* Modeled directly after the **Zendesk Relate Event Promo Card**:
  * **Surface:** Forest Canopy `#203524`.
  * **Border Radius:** `40px` (`rounded-[40px]`).
  * **Padding:** `48px 40px` (mobile: `32px 24px`).
  * **Headline:** 32px weight 600, color `#ffffff`.
  * **Body Copy:** 15px weight 400, color `#ffffff` (opacity 90%).
  * **Two Action CTAs:**
    * Primary CTA: Background Electric Lime `#d1f470`, text Near-Black `#11110d`, radius 16px, padding `12px 24px`, weight 600 (WhatsApp).
    * Ghost Secondary CTA: Background transparent, border 1px solid `#ffffff`, text `#ffffff`, radius 16px, padding `12px 24px`, weight 600 (Email / CV).

### 3.11 Footer (`Footer.vue`)
* Surface: Warm White `#f5f5f2`, top border `rgba(17, 17, 13, 0.11)`.
* Text & copyright: `#11110d` (opacity 70%), Inter 14px tracking `0.054em`.
* Links: `#11110d` with subtle underline hover.

### 3.12 Proof Lightbox Modal (`ProofGalleryModal.vue`)
* Backdrop: High-opacity dark neutral `rgba(17, 17, 13, 0.8)` with backdrop blur.
* Container: 16px radius, background `#f5f5f2`.
* Navigation buttons: 100% circular icon buttons (`rounded-full`), border 1px solid `#11110d`, transparent fill.

---

## 4. Implementation Steps & File Modifications

1. **`index.html` & `template.html`:**
   * Import Google Font `Inter` (weights: 300, 400, 500, 600, 700).
   * Set `body` class to `bg-[#ffffff] text-[#11110d]`.
2. **`tailwind.config.js`:**
   * Configure theme tokens:
     * `colors.zendesk`: `electric-lime` (`#d1f470`), `forest-canopy` (`#203524`), `deep-grove` (`#2d4c33`), `near-black` (`#11110d`), `warm-white` (`#f5f5f2`), `pure-white` (`#ffffff`), `midnight` (`#000000`), `stone-divider` (`#90918c`).
     * `fontFamily.sans`: `['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']`.
     * `letterSpacing`: `zendesk: '0.054em'`.
     * `borderRadius`: `cards: '0px'`, `buttons: '16px'`, `event: '40px'`, `inputs: '12px'`, `tags: '4px'`.
3. **`src/style.css`:**
   * Replace obsidian styling with Zendesk custom properties and base rules.
   * Remove glow effects, emerald gradient text, and radial dots.
   * Add custom scrollbar with Zendesk warm neutral tones.
4. **Vue Components Refactoring:**
   * Refactor `App.vue`, `Navbar.vue`, `HeroSection.vue`, `IncomeChartSection.vue`, `DealsTableSection.vue`, `MetaAdsSection.vue`, `PillarsSection.vue`, `TimelineSection.vue`, `ContactSection.vue`, `Footer.vue`, and `ProofGalleryModal.vue`.
5. **Build & Quality Verification:**
   * Run `npm run build` to compile assets cleanly.
   * Verify responsiveness across mobile, tablet, and desktop breakpoints.

---

## 5. Verification & Acceptance Criteria

* [ ] No `box-shadow` on any card or element across the entire site.
* [ ] Content cards strictly use `border-radius: 0px`.
* [ ] Buttons strictly use `border-radius: 16px` (no 9999px pill shapes).
* [ ] Event promo card (Contact section) strictly uses `border-radius: 40px` and `#203524` background.
* [ ] Main hero headline strictly uses Inter weight 300 with line-height ~1.02 and tracking `0.054em`.
* [ ] Electric lime `#d1f470` is used exclusively for interactive conversion and key status accents.
* [ ] Body text uses near-black `#11110d`.
* [ ] All functional data, translations (ID/EN), Chart.js data, and modal proofs operate flawlessly.
* [ ] `npm run build` succeeds with zero errors.
