# Framer Editorial Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Reynalda Syalwa portfolio website into the Framer Editorial Portfolio design (Pure white canvas, Newsreader serif headline typography, Inter metadata, hand-drawn line-art illustrations, borderless project cards, and AOS CSS scroll animations).

**Architecture:** Integrate Google Font Newsreader and AOS animation library, redesign Navbar with search pill and uppercase tracked branding, split Hero with editorial statement and custom hand-drawn workstation illustration, transform project feed into borderless image-first storytelling case studies, adapt analytics chart and deals table into clean editorial aesthetic, and build the two-column contact section with custom hand-drawn mailbox illustration.

**Tech Stack:** Vue 3, Vite, Tailwind CSS, AOS, Chart.js, Lucide Vue Next, Vue I18n.

**Spec:** `docs/superpowers/specs/2026-11-14-framer-editorial-portfolio-design.md`

## Global Constraints

- **Theme:** Minimalist pure white canvas (`#ffffff`) with warm near-black typography (`#18181b`).
- **Typography:** Display & storytelling headlines use Google Font `Newsreader` (Editorial Serif); metadata, body, and labels use `Inter`.
- **Card Presentation:** Borderless and frameless content cards; visual focus on `rounded-2xl` images with metadata and titles underneath.
- **Illustrations:** Black-and-white hand-drawn line-art SVG sketches in Hero (growth marketer at workstation) and Contact (mailbox with flying letter).
- **Animations:** AOS (Animate On Scroll) via CSS with `data-aos="fade-up"` attributes and smooth easing.
- **Data Preservation:** Retain 100% of authentic commercial data (Rp 62.2M+ closing revenue, 27.2x ROAS, 27 Meta campaigns, bilingual i18n support, and proof modal).
- **Final Action:** Push directly to `origin main` upon completion.

---

### Task 1: Fonts, Tailwind Configuration & AOS CSS Setup

**Files:**
- Modify: `index.html`
- Modify: `template.html`
- Modify: `tailwind.config.js`
- Modify: `src/style.css`
- Modify: `src/main.js`

- [ ] **Step 1: Import Google Font Newsreader in HTML templates**
  - Add Google Font `Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&display=swap` to `index.html` and `template.html`.

- [ ] **Step 2: Configure `tailwind.config.js` font families**
  - Add `serif: ['Newsreader', 'Georgia', 'serif']` to `fontFamily`.
  - Add `editorial: '0.08em'` and `tracked: '0.15em'` to `letterSpacing`.

- [ ] **Step 3: Setup AOS in `src/main.js` and `src/style.css`**
  - Import `AOS` from `aos` and call `AOS.init({ duration: 600, once: true, easing: 'ease-out-cubic' })`.
  - Import `aos/dist/aos.css` in `src/style.css`.

- [ ] **Step 4: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 5: Commit**
  - Command: `git add index.html template.html tailwind.config.js src/style.css src/main.js && git commit -m "feat: setup Newsreader serif font, AOS scroll animation, and editorial tokens"`

---

### Task 2: Top Search Bar & Header Navigation Component

**Files:**
- Modify: `src/components/Navbar.vue`

- [ ] **Step 1: Implement top utility bar**
  - Centered pill search bar: `🔍 Search skills, campaigns, or deals...` with subtle border.
  - Right: Black pill button `Hubungi SyaSya` / `Download CV` and Language switcher `[ ID | EN ]`.

- [ ] **Step 2: Implement main navigation bar**
  - Left: `REYNALDA SYALWA` (uppercase tracking `0.15em`, font 14px weight 600).
  - Right: Clean minimal nav links: `WORK`, `ANALYTICS`, `ABOUT`, `CONTACT`.
  - Mobile drawer menu.

- [ ] **Step 3: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 4: Commit**
  - Command: `git add src/components/Navbar.vue && git commit -m "feat: implement Framer editorial top bar and navigation header"`

---

### Task 3: Split Hero Section & Hand-drawn Workstation Illustration

**Files:**
- Modify: `src/components/HeroSection.vue`

- [ ] **Step 1: Implement two-column split layout with AOS**
  - Left column: Editorial statement in `Newsreader` serif (~36-44px), subtitle, and client trust logos.
  - Right column: Custom hand-drawn line-art SVG illustration of growth marketer working at desk with laptop, thoughts, coffee, and analytics notes.
  - Client logos strip: `CLIENTS & BRANDS I'VE WORKED WITH` (Meta Ads Blueprint, PT Netmarks Indonesia, Sertifikasi ISO, GA4, Looker Studio).

- [ ] **Step 2: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 3: Commit**
  - Command: `git add src/components/HeroSection.vue && git commit -m "feat: implement split editorial hero with hand-drawn workstation illustration"`

---

### Task 4: Borderless Project Showcase Feed

**Files:**
- Modify: `src/components/MetaAdsSection.vue`

- [ ] **Step 1: Restructure into borderless image-first case studies**
  - Featured Card 1 (Full-width): Meta Ads December 2025 (Rp 31.4M revenue, 95.7x ROAS) with `rounded-2xl` image, metadata `2025–2026 • SURABAYA • PERFORMANCE MARKETING`, bold Newsreader title, and descriptive subtitle.
  - Featured Card 2 (Full-width): B2B WhatsApp CRM Deals Closing (Rp 62.2M+) with `rounded-2xl` image, metadata `2025 • INDONESIA • SALES CLOSING & CRM`, bold Newsreader title, and subtitle.
  - 2-Column Grid:
    - Left: Lowest CPR record Rp 3.612/result.
    - Right: Creative strategy & video content.
  - Integrate `data-aos="fade-up"` on all cards.
  - Click triggers `@open-modal` to view authentic screenshot proof.

- [ ] **Step 2: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 3: Commit**
  - Command: `git add src/components/MetaAdsSection.vue && git commit -m "feat: implement borderless project showcase feed with editorial typography"`

---

### Task 5: Editorial Analytics & Deals Table Sections

**Files:**
- Modify: `src/components/IncomeChartSection.vue`
- Modify: `src/components/DealsTableSection.vue`

- [ ] **Step 1: Restyle Sales Income & Ad Spend Chart section**
  - Clean pure white canvas, minimal axes, Newsreader headings, and `data-aos="fade-up"`.

- [ ] **Step 2: Restyle Closed Deals Table section**
  - Borderless table container with hairline dividers, search input, and `data-aos="fade-up"`.

- [ ] **Step 3: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 4: Commit**
  - Command: `git add src/components/IncomeChartSection.vue src/components/DealsTableSection.vue && git commit -m "feat: restyle income chart and deals table into editorial aesthetic"`

---

### Task 6: Core Growth Pillars & Career Experience Sections

**Files:**
- Modify: `src/components/PillarsSection.vue`
- Modify: `src/components/TimelineSection.vue`

- [ ] **Step 1: Restyle Pillars and Career Timeline**
  - Borderless layout with subtle hairline dividers and `data-aos="fade-up"`.
  - Newsreader section headers and clean Inter descriptions.

- [ ] **Step 2: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 3: Commit**
  - Command: `git add src/components/PillarsSection.vue src/components/TimelineSection.vue && git commit -m "feat: restyle pillars and career timeline with editorial serif typography"`

---

### Task 7: Editorial Contact Section & Hand-drawn Mailbox Illustration

**Files:**
- Modify: `src/components/ContactSection.vue`
- Modify: `src/components/Footer.vue`

- [ ] **Step 1: Implement two-column contact section**
  - Left: Headline in `Newsreader`: *"Have a project in mind or just want to say hi?"*, large clickable email `vonnasyalwareynalda@gmail.com` with underline, and uppercase tracked links (`WHATSAPP`, `LINKEDIN`, `DOWNLOAD CV`).
  - Right: Hand-drawn line art SVG illustration of a mailbox with a letter flying out.
  - Footer: Left `© REYNALDA SYALWA 2026`, Right `Made with Vue 3`.

- [ ] **Step 2: Verify build**
  - Run: `npm run build`
  - Expected: PASS

- [ ] **Step 3: Commit**
  - Command: `git add src/components/ContactSection.vue src/components/Footer.vue && git commit -m "feat: implement editorial contact section with hand-drawn mailbox illustration"`

---

### Task 8: Production Build Verification & Push to Main

**Files:**
- Modify: `index.html`
- Modify: `dist/*`
- Modify: `assets/*`

- [ ] **Step 1: Run production build**
  - Run: `npm run build`
  - Verify all assets compiled without errors.

- [ ] **Step 2: Commit production bundle and push to main**
  - Command: `git add -A && git commit -m "chore: complete Framer editorial redesign with AOS animations and synchronize production bundle"`
  - Command: `git push origin main`
