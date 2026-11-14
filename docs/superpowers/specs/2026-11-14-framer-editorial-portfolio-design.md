# Technical Design Specification: Framer Editorial Portfolio Redesign

**Date:** 2026-11-14  
**Project:** Reynalda Syalwa Portfolio (`ReynaldaSyalwa.github.io`)  
**Design Reference:** Framer Editorial Portfolio (Inspired by Inez Prawiradirdja's Minimalist Editorial Design)  
**Animation Engine:** AOS (Animate On Scroll) via CSS / Intersection Observer  

---

## 1. Executive Summary

This specification outlines the transformation of Reynalda Syalwa's portfolio into an elegant, high-craft **Framer Editorial Design Portfolio** based directly on the reference UI screenshot.

The design is defined by:
- Pure white canvas (`#ffffff`) with generous breathing room and whitespace.
- Sophisticated editorial typography pairing: **Newsreader** (Editorial Serif) for prominent statements and case study titles, paired with **Inter** for clean metadata, body copy, and UI.
- Hand-drawn, whimsical black-and-white line-art SVG illustrations (a digital growth marketer at a workstation with thoughts and analytics notes in the Hero, and a mailbox with a flying letter in the Contact section).
- **Borderless & Frameless Case Study Cards**: Visual image thumbnails with rounded corners (`rounded-2xl` ~16px) followed by clean metadata (`YEAR • REGION • SPECIALIZATION`), storytelling editorial titles, and subtitles.
- Seamless preservation of authentic commercial data (Rp 62.2M+ closed sales, 27.2x ROAS, 27 Meta campaigns, interactive Unit Economics chart, deals table, and proof lightbox).
- **AOS (Animate On Scroll) via CSS**: Smooth staggered fade-up transitions on scroll for editorial polish.

---

## 2. Design System Tokens & Typography

### 2.1 Typography System
* **Display / Editorial Headline Font:** `Newsreader` (weights: 400, 500, 600, with italic styles).
* **Body, Metadata & UI Font:** `Inter` (weights: 300, 400, 500, 600).
* **Monospace Data Font:** `JetBrains Mono` (weights: 400, 500, 600).
* **Type Scale:**
  * Hero Editorial Statement: `36px - 46px`, `Newsreader`, line-height `1.30`.
  * Project Title (Featured): `24px - 30px`, `Newsreader` / `Inter`, weight 500-600.
  * Project Metadata Overline: `12px - 13px`, `Inter`, uppercase, letter-spacing `0.08em` (`tracking-widest`), text `#71717a`.
  * Body & Description: `15px - 16px`, `Inter`, line-height `1.6`, text `#3f3f46`.
  * Brand Name Logo: `14px`, `Inter`, uppercase, letter-spacing `0.15em` (`tracking-[0.15em]`), weight 600.

### 2.2 Color Tokens & Palette
* **Canvas:** `#ffffff` (Pure White).
* **Primary Text:** `#18181b` (Near-Black Warm Ink).
* **Secondary Text:** `#71717a` (Editorial Muted Gray).
* **Subtle Dividers:** `rgba(0, 0, 0, 0.08)` (Thin hairline rules).
* **Action Accent:** `#000000` (Pill button fill with white text) and subtle hover tints.
* **Tag Background:** `rgba(0, 0, 0, 0.04)`.

### 2.3 Animation System (AOS via CSS)
* Library: `aos` (integrated with CSS transitions).
* Standard reveal attributes: `data-aos="fade-up"`, `data-aos-duration="600"`, `data-aos-once="true"`.
* Smooth bezier timing: `cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 3. Component Architecture & Layout

### 3.1 Top Bar & Header Navigation (`Navbar.vue`)
* **Utility Search Bar (Top):**
  * Centered pill search bar: `🔍 Search skills, campaigns, or deals...` (`rounded-full`, 1px subtle border).
  * Right: Black pill button `Hubungi SyaSya` (or `Download CV`) + Language switcher `[ ID | EN ]`.
* **Main Header:**
  * Left: `REYNALDA SYALWA` (uppercase tracked `0.15em`, font 14px weight 600).
  * Right: Nav links `WORK`, `ANALYTICS`, `ABOUT`, `CONTACT` with subtle hover text darkening.

### 3.2 Split Hero Section (`HeroSection.vue`)
* Two-column grid (`grid-cols-1 lg:grid-cols-12`):
  * **Left Column (8 cols):**
    * Editorial statement in `Newsreader`:
      *"Based in Surabaya, Indonesia, I'm a Digital Marketing & Growth Specialist working with Meta Ads, Creative Strategy, and Information Systems; centered on scaling revenue and closing high-value deals."*
    * Trust bar overline: `CLIENTS & BRANDS I'VE WORKED WITH`.
    * Client/Brand logos in monochrome: Meta Ads Blueprint, PT Netmarks Indonesia, Sertifikasi ISO, GA4, Looker Studio.
  * **Right Column (4 cols):**
    * Hand-drawn line art SVG illustration: Growth marketer at a workstation with laptop, coffee, ideas, and analytics thought bubbles.

### 3.3 Borderless Project Showcase Feed (`ProjectFeedSection.vue`)
* Layout directly mirrors the reference UI:
  * **Card 1 (Full-width Featured):**
    * High-res screenshot of Meta Ads Manager December 2025 (`rounded-2xl` ~16px, subtle 1px border `rgba(0,0,0,0.06)`).
    * Metadata: `2025–2026 • SURABAYA • PERFORMANCE MARKETING`.
    * Title: `Scaling institutional ISO certification client closing with 95.7x ROAS`.
    * Subtitle: `Converting Rp 328k Meta Ads spend into Rp 31.4M verified commercial contract revenue.`
  * **Card 2 (Full-width Featured):**
    * High-res CRM Deals & WhatsApp messaging closing snapshot (`rounded-2xl`).
    * Metadata: `2025 • INDONESIA • SALES CLOSING & CRM`.
    * Title: `Converting paid inquiries into Rp 62.2M+ high-ticket B2B deals`.
    * Subtitle: `Structuring full-funnel WhatsApp consultation pipelines for institutional clients and foundations.`
  * **Two-Column Grid (Side-by-side cards):**
    * **Left Card:** Lowest CPR record Rp 3.612/result.
      * Metadata: `2026 • EFFICIENCY • META ADS MANAGER`.
      * Title: `Achieving record-low Rp 3.612 Cost-Per-Result across 27 campaigns`.
    * **Right Card:** Creative Strategy & Content production (Canva, Photoshop, CapCut).
      * Metadata: `2025–2026 • CREATIVE & CONTENT • GROWTH`.
      * Title: `High-conversion commercial flyers & short-form video creatives`.
  * Each card has a hover lift effect and clicking opens the Proof Gallery Modal.

### 3.4 Interactive Analytics & Closed Deals Sections
* **`IncomeChartSection.vue`:**
  * Clean white background, minimal axes, Deep Grove and Stone bar colors.
  * Preserves interactive month-by-month sales revenue vs. ad spend comparison.
* **`DealsTableSection.vue`:**
  * Clean, borderless table container with hairline row dividers.
  * Preserves search/filter functionality and closing transaction records.

### 3.5 Core Growth Pillars & Career Experience
* **`PillarsSection.vue`:**
  * 6 pillars presented with clean outlined icons, metadata tags, and generous whitespace.
* **`TimelineSection.vue`:**
  * Editorial career journey: PT Netmarks Indonesia, CV Cipta Mandiri, Universitas Dinamika.

### 3.6 Editorial Contact Section & Footer (`ContactSection.vue` & `Footer.vue`)
* **Contact Section:**
  * Two-column split:
    * Left: Large heading in `Newsreader`: *"Have a project in mind or just want to say hi?"*, big email address `vonnasyalwareynalda@gmail.com` with underline, and uppercase tracked links (`WHATSAPP`, `LINKEDIN`, `DOWNLOAD CV`).
    * Right: Hand-drawn line art SVG illustration of a mailbox with a letter flying out.
* **Footer:**
  * Left: `© REYNALDA SYALWA 2026`.
  * Right: Pill badge `Made with Vue 3`.

---

## 4. Implementation & Deployment Strategy

1. Import Google Fonts `Newsreader` alongside `Inter` and `JetBrains Mono`.
2. Configure `tailwind.config.js` with `fontFamily.serif: ['Newsreader', 'Georgia', 'serif']`.
3. Initialize `aos` in `src/main.js` and add `aos/dist/aos.css` in `src/style.css`.
4. Create bespoke hand-drawn line-art SVG illustrations for Hero and Contact.
5. Refactor `Navbar.vue`, `HeroSection.vue`, `DealsTableSection.vue`, `MetaAdsSection.vue`, `ContactSection.vue`, and `Footer.vue`.
6. Run `npm run build` and verify.
7. Merge and push directly to `origin main` as requested.
