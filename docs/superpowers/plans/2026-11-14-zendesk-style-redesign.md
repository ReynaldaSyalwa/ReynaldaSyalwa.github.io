# Zendesk Style Reference Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Reynalda Syalwa portfolio website into the Zendesk Design System (Light theme, Near-Black `#11110d` on Warm White `#f5f5f2` and Pure White `#ffffff`, Electric Lime `#d1f470` single chromatic accent, Forest Canopy `#203524` event promo surfaces, 0px flat cards, zero shadows, and whisper-weight 300 display typography).

**Architecture:** Update Tailwind configuration and CSS custom properties with Zendesk tokens, replace dark obsidian surfaces across all Vue 3 components with the Zendesk surface stepping system (`#ffffff` canvas → `#f5f5f2` cards → `#203524` event promo cards), apply strict border radii (0px cards, 16px buttons, 40px event cards, 12px inputs), and re-render Chart.js with editorial forest/lime/stone colors while preserving all authentic data and bilingual reactivity.

**Tech Stack:** Vue 3, Vite, Tailwind CSS, Chart.js, Lucide Vue Next, Vue I18n.

**Spec:** `docs/superpowers/specs/2026-11-14-zendesk-style-redesign-design.md`

## Global Constraints

- **Theme:** Strictly Light theme; no dark mode toggles or dark body canvas.
- **Elevation:** Strictly zero `box-shadow` on cards, buttons, and sections; elevation is achieved purely through surface stepping.
- **Card Radius:** Strictly `0px` (`rounded-none`) on all standard content and metric cards.
- **Button Radius:** Strictly `16px` (`rounded-2xl`) on primary and secondary buttons; no full-pill `9999px`.
- **Event Card Radius:** Strictly `40px` (`rounded-[40px]`) on the Forest Canopy `#203524` event promo card.
- **Accent Color:** Electric Lime `#d1f470` is the single chromatic accent on the page for interactive conversion actions.
- **Typography:** Primary font `Inter`, global letter spacing `0.054em`, display headlines in weight 300 (never weight 700).
- **Body Text:** Near-Black ink `#11110d` instead of pure `#000000`.

## Review Focus

- Missing zero-shadow: verify that no lingering `shadow-`, `shadow-trifecta`, or `shadow-glow-emerald` classes remain on cards.
- Button radius violation: ensure no buttons retain `rounded-full` or `rounded-lg` instead of the mandated `rounded-2xl` (`16px`).
- Display typography weight: ensure main hero headline uses weight 300 whisper-weight, not bold/extrabold weight 700/800.
- Chart legibility: ensure Chart.js labels, tooltips, and axes are sharp and high-contrast in light mode against `#f5f5f2` / `#ffffff`.
- Mobile drawer navigation: verify mobile drawer displays cleanly with Zendesk light styling and proper border dividers.

---

### Task 1: Global Theme Tokens, Fonts & CSS Setup

**Files:**
- Modify: `index.html:1-29`
- Modify: `template.html:1-28`
- Modify: `tailwind.config.js:1-39`
- Modify: `src/style.css:1-61`

**Interfaces:**
- Consumes: Google Fonts (`Inter`), Tailwind CSS theme configuration.
- Produces: Zendesk color utility classes (`bg-zendesk-pure-white`, `bg-zendesk-warm-white`, `bg-zendesk-forest`, `bg-zendesk-lime`, `text-zendesk-ink`, `border-zendesk-divider`), font-family `Inter`, tracking `zendesk` (`0.054em`).

- [ ] **Step 1: Update `index.html` and `template.html` fonts & base classes**
  - Add Google Font `Inter` with weights 300, 400, 500, 600, 700.
  - Set `body` class to `bg-white text-[#11110d] antialiased selection:bg-[#d1f470] selection:text-[#11110d]`.

- [ ] **Step 2: Configure `tailwind.config.js` with Zendesk Design Tokens**
  - Define colors:
    - `zendesk-lime`: `#d1f470`
    - `zendesk-forest`: `#203524`
    - `zendesk-grove`: `#2d4c33`
    - `zendesk-ink`: `#11110d`
    - `zendesk-warm`: `#f5f5f2`
    - `zendesk-white`: `#ffffff`
    - `zendesk-midnight`: `#000000`
    - `zendesk-stone`: `#90918c`
  - Define `fontFamily.sans`: `['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']`.
  - Define `letterSpacing.zendesk`: `0.054em`.
  - Define `borderRadius`:
    - `cards`: `0px`
    - `buttons`: `16px`
    - `event`: `40px`
    - `inputs`: `12px`
    - `tags`: `4px`
  - Remove obsidian colors, trifecta shadow, and emerald glows.

- [ ] **Step 3: Update `src/style.css` with CSS Custom Properties**
  - Add Zendesk `:root` tokens: `--color-electric-lime: #d1f470`, `--color-forest-canopy: #203524`, `--color-deep-grove: #2d4c33`, `--color-near-black-ink: #11110d`, `--color-warm-white: #f5f5f2`, `--color-pure-white: #ffffff`.
  - Set global tracking `letter-spacing: 0.054em;` on body and headings.
  - Remove dark grid pattern, dark gradients, and obsidian scrollbar styles.
  - Set clean custom scrollbar matching warm neutral palette.

- [ ] **Step 4: Verify build**
  - Run: `npm run build`
  - Expected: Build succeeds without errors.

- [ ] **Step 5: Commit**
  - Command: `git add index.html template.html tailwind.config.js src/style.css && git commit -m "feat: configure Zendesk design tokens, Inter font, and zero-shadow styles"`

---

### Task 2: Announcement Bar & Sticky Navigation Component

**Files:**
- Modify: `src/components/Navbar.vue:1-145`
- Modify: `src/App.vue:1-48`

**Interfaces:**
- Consumes: Tailwind tokens (`zendesk-midnight`, `zendesk-forest`, `zendesk-lime`, `zendesk-ink`, `zendesk-warm`).
- Produces: Top announcement strip with lime action, sticky white navigation bar, 16px radius lime CTA button, responsive mobile drawer.

- [ ] **Step 1: Implement Top Announcement Strip**
  - Full-width strip on `#000000` background.
  - 14px white text with uppercase tracking `0.054em`.
  - Link text in Electric Lime `#d1f470` with underline pointing to `#contact`.

- [ ] **Step 2: Restructure Navbar Bar & Elements**
  - Navbar container: Pure White `#ffffff` background with bottom border `1px solid rgba(17, 17, 13, 0.11)`.
  - Logo: Monokrom `#11110d` typography `Reynalda.growth` with subtle humanist badge.
  - Navigation links: 16px weight 500 `#11110d` with tracking `0.054em`.
  - Language Switcher: 14px weight 600, border `1px solid rgba(17, 17, 13, 0.15)`, text `#11110d`.
  - Primary CTA button: Background `#d1f470`, text `#11110d`, `border-radius: 16px`, padding `10px 20px`, weight 600.
  - Mobile menu drawer: Pure White `#ffffff` background, dividers `rgba(17, 17, 13, 0.11)`.

- [ ] **Step 3: Update `src/App.vue` background wrapper**
  - Change root container from `bg-obsidian-950 text-zinc-100` to `bg-white text-zendesk-ink selection:bg-zendesk-lime selection:text-zendesk-ink`.

- [ ] **Step 4: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 5: Commit**
  - Command: `git add src/components/Navbar.vue src/App.vue && git commit -m "feat: implement Zendesk top announcement strip and white navigation header"`

---

### Task 3: Hero Section Redesign & 4 Impact Metric Cards

**Files:**
- Modify: `src/components/HeroSection.vue:1-131`

**Interfaces:**
- Consumes: Zendesk tokens, i18n messages (`hero.*`, `stats.*`).
- Produces: Full-viewport white hero with whisper-weight 300 headline, lead email/contact row, floating UI dashboard embed card, monochrome trust strip, and 4 flat 0px metric cards on `#f5f5f2`.

- [ ] **Step 1: Implement Whisper-Weight Hero Headline & Layout**
  - Hero background: Pure White `#ffffff`.
  - Status tag: radius 4px, background `rgba(17, 17, 13, 0.05)`, border `1px solid rgba(17, 17, 13, 0.11)`, text `#11110d` 14px weight 600, tracking `0.054em`.
  - Display headline: Inter weight 300, 68–74px desktop / 38–44px mobile, line-height 1.02, color `#11110d`. Highlight in weight 300 (no heavy gradient).
  - Subtitle: Inter 18px weight 400 `#11110d` with comfortable line height.

- [ ] **Step 2: Implement Lead Input Row & Lime CTA**
  - Input field: `border-radius: 12px`, background `rgba(17, 17, 13, 0.05)`, border `1px solid #11110d`, padding `12px 16px`, placeholder in `#11110d` (opacity 60%).
  - Primary button: `border-radius: 16px`, background `#d1f470`, text `#11110d`, font weight 600, padding `12px 24px`.
  - Secondary ghost button: transparent background, text `#11110d`, border `1px solid rgba(17, 17, 13, 0.2)`.

- [ ] **Step 3: Implement Product UI Screenshot Embed & Lifestyle Flanks**
  - Central embed card: 16px border-radius, pure white surface, subtle 1px border `rgba(17, 17, 13, 0.11)`, zero box-shadow, downward bleed.
  - Realistic representations of Meta Ads Manager campaign table, ROAS metrics, and leads tracker.
  - Flanking lifestyle portrait cards with 16px radius for human warmth.

- [ ] **Step 4: Implement Monochrome Logo Trust Bar**
  - Centered monochrome trust strip with overline 14px weight 600 uppercase `#11110d` tracking `0.054em`.
  - Client / partner badges rendered in `#11110d` at 60% opacity with 24–32px gap.

- [ ] **Step 5: Implement 4 Impact Metric Cards**
  - 4 cards on `#f5f5f2` (Warm White).
  - Border-radius strictly `0px` (`rounded-none`).
  - Zero shadow (`shadow-none`).
  - Overline 14px weight 600 uppercase `#11110d`.
  - Metric numbers in large weight 600 `#11110d` (ROAS highlighted with subtle `#203524` tag with `#d1f470` text).

- [ ] **Step 6: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 7: Commit**
  - Command: `git add src/components/HeroSection.vue && git commit -m "feat: redesign hero section with whisper-weight headline, UI embed, and flat metric cards"`

---

### Task 4: Sales Income & Ad Spend Chart Component

**Files:**
- Modify: `src/components/IncomeChartSection.vue:1-250`

**Interfaces:**
- Consumes: Chart.js, i18n messages (`chart_section.*`).
- Produces: Editorial Chart.js bar chart styled with Deep Grove `#2d4c33` / Electric Lime `#d1f470` and Stone `#90918c`, flat 0px metric summary cards on `#f5f5f2`.

- [ ] **Step 1: Update Section Banding & Container**
  - Section surface: Pure White `#ffffff` with top and bottom dividers `1px solid rgba(17, 17, 13, 0.11)`.
  - Section header: Inter weight 600 `#11110d`, subtitle in `#11110d` (opacity 75%).
  - Summary cards: Flat 0px radius cards on `#f5f5f2` with zero shadow.

- [ ] **Step 2: Restyle Chart.js Palette & Canvas Rendering**
  - Sales Income dataset: Solid Deep Grove `#2d4c33` with subtle Electric Lime `#d1f470` top stroke border.
  - Ad Spend dataset: Muted Stone tone `#90918c` with subtle border.
  - Grid lines: Subtle `rgba(17, 17, 13, 0.08)`.
  - Ticks and labels: Inter 12px weight 500, color `#11110d`.
  - Tooltips: Pure White `#ffffff` background with 1px border `#11110d`, text `#11110d`.

- [ ] **Step 3: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 4: Commit**
  - Command: `git add src/components/IncomeChartSection.vue && git commit -m "feat: restyle sales income chart with Zendesk deep grove and stone palette"`

---

### Task 5: Closed Deals Table & Meta Ads Section

**Files:**
- Modify: `src/components/DealsTableSection.vue:1-187`
- Modify: `src/components/MetaAdsSection.vue:1-180`

**Interfaces:**
- Consumes: Closed deals dataset, Meta Ads campaign data, `@open-modal` event emitter.
- Produces: Warm White `#f5f5f2` flat container tables (0px radius), Forest Canopy `#203524` status tags with lime text, ghost link buttons with 11% bottom border.

- [ ] **Step 1: Redesign Deals Table Section**
  - Section surface: Warm White `#f5f5f2`.
  - Container card: Flat 0px radius, zero shadow, border `1px solid rgba(17, 17, 13, 0.11)`.
  - Table header: Inter 14px weight 600 `#11110d`, border bottom `1px solid rgba(17, 17, 13, 0.11)`.
  - Status badge `DEAL`: tag 4px radius, background Forest Canopy `#203524`, text Electric Lime `#d1f470`, weight 600.
  - Search input: 12px radius, background `rgba(17, 17, 13, 0.05)`, border `1px solid #11110d`.

- [ ] **Step 2: Redesign Meta Ads Section**
  - Campaign grouping cards: Flat 0px radius `#ffffff` on `#f5f5f2` background.
  - CPR highlights: Clean Near-Black text with subtle Lime underline indicator.
  - Proof action links: Ghost link buttons (transparent fill, `#11110d` text, border-bottom `1px solid rgba(17, 17, 13, 0.2)` on hover).

- [ ] **Step 3: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 4: Commit**
  - Command: `git add src/components/DealsTableSection.vue src/components/MetaAdsSection.vue && git commit -m "feat: redesign deals table and meta ads sections with 0px flat cards and ghost links"`

---

### Task 6: Core Pillars & Career Timeline Sections

**Files:**
- Modify: `src/components/PillarsSection.vue:1-97`
- Modify: `src/components/TimelineSection.vue:1-99`

**Interfaces:**
- Consumes: Pillars definitions, timeline items, i18n messages (`pillars.*`, `timeline.*`).
- Produces: 3x2 grid of 0px flat pillar cards on `#f5f5f2`, 4px tags, stone connector timeline.

- [ ] **Step 1: Redesign 6 Core Growth Pillars**
  - Section surface: Pure White `#ffffff`.
  - 6 cards: Flat 0px radius (`rounded-none`), background `#f5f5f2`, zero shadow.
  - Icons: Outlined mono-weight in Near-Black `#11110d`.
  - Pillar tags: 4px radius, background `rgba(17, 17, 13, 0.06)`, text `#11110d`, weight 500.

- [ ] **Step 2: Redesign Career Timeline Section**
  - Section surface: Warm White `#f5f5f2`.
  - Connector line: Stone Divider `#90918c`.
  - Experience cards: Flat 0px radius `#ffffff` cards, border `1px solid rgba(17, 17, 13, 0.11)`.
  - Type badges: 4px radius, background Forest Canopy `#203524`, text `#ffffff`.

- [ ] **Step 3: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 4: Commit**
  - Command: `git add src/components/PillarsSection.vue src/components/TimelineSection.vue && git commit -m "feat: redesign pillars and timeline with 0px cards and stone dividers"`

---

### Task 7: Event Promo Card Contact, Footer & Modal Lightbox

**Files:**
- Modify: `src/components/ContactSection.vue:1-62`
- Modify: `src/components/Footer.vue:1-80`
- Modify: `src/components/ProofGalleryModal.vue:1-179`

**Interfaces:**
- Consumes: Modal props (`isOpen`, `initialCategory`), emits (`close`).
- Produces: 40px radius Forest Canopy `#203524` contact card with Lime primary + White ghost CTA, clean footer, 16px modal with 100% circular icon arrows.

- [ ] **Step 1: Implement Zendesk Relate Event Promo Card in ContactSection**
  - Container card: Background Forest Canopy `#203524`, border-radius **`40px`** (`rounded-[40px]`), zero box-shadow.
  - Padding: `48px 40px` (desktop), `32px 24px` (mobile).
  - Headline: 32px weight 600, color `#ffffff`.
  - Body: 15px weight 400, color `#ffffff` (opacity 90%).
  - Stacked CTAs:
    - Primary CTA: Background Electric Lime `#d1f470`, text Near-Black `#11110d`, radius 16px, padding `12px 24px`, weight 600.
    - Ghost CTA: Background transparent, border 1px solid `#ffffff`, text `#ffffff`, radius 16px, padding `12px 24px`, weight 600.

- [ ] **Step 2: Redesign Footer**
  - Surface: Warm White `#f5f5f2` with border-top `1px solid rgba(17, 17, 13, 0.11)`.
  - Text: Near-Black `#11110d` (opacity 70%), Inter 14px tracking `0.054em`.
  - Links: `#11110d` with underline hover.

- [ ] **Step 3: Restyle Proof Gallery Modal**
  - Modal container: 16px radius, background `#f5f5f2`, border `1px solid rgba(17, 17, 13, 0.15)`.
  - Navigation arrows: Circular icon buttons (radius 100%, border 1px solid `#11110d`, transparent background).
  - Close button: 100% radius circular button.

- [ ] **Step 4: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 5: Commit**
  - Command: `git add src/components/ContactSection.vue src/components/Footer.vue src/components/ProofGalleryModal.vue && git commit -m "feat: implement 40px event promo contact card, light footer, and circular modal nav"`

---

### Task 8: End-to-End Visual Audit, Mobile Verification & Production Bundle

**Files:**
- Modify: `index.html`
- Modify: `dist/*`
- Modify: `assets/*`

**Interfaces:**
- Consumes: All updated components and build assets.
- Produces: Production-ready build deployed to root and dist.

- [ ] **Step 1: Strict Zero-Shadow & Border Radius Audit**
  - Grep for any lingering unwanted shadows (`box-shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-trifecta`, `shadow-glow`).
  - Grep for any lingering full-pill `rounded-full` buttons (except 100% circular icon buttons).
  - Confirm all content cards strictly use `rounded-none` (0px radius).
  - Confirm headline strictly uses `font-light` / weight 300.

- [ ] **Step 2: Bilingual & Data Integrity Check**
  - Test language toggle between ID and EN.
  - Verify all metrics (ROAS 27.2x, Rp 62.2M, 27 campaigns) render properly.

- [ ] **Step 3: Production Build Generation**
  - Run: `npm run build`
  - Ensure `dist/index.html` and root `index.html` are cleanly synchronized with fresh bundles.

- [ ] **Step 4: Final Commit**
  - Command: `git add -A && git commit -m "chore: complete Zendesk style reference redesign and synchronize production bundle"`
