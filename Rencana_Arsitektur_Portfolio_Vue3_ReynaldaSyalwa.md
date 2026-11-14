# 📐 Rencana Arsitektur & Spesifikasi Desain Website Portofolio
## Reynalda Vonna Syalwa (SyaSya) — Digital Marketing & Growth Specialist
**Arsitektur:** Vue 3 (Vite) + vue-i18n (ID & EN) + vue-bits UI + Chart.js + Tailwind CSS  
**Acuan Visual:** Trifecta Studio & Agency Template (Framer Benchmark)  
**Target Repository:** `https://github.com/ReynaldaSyalwa/ReynaldaSyalwa.github.io.git`  
**Domain Live:** `https://reynaldasyalwa.github.io/`

---

## 1. Analisis Kebutuhan & Tujuan Proyek

### A. Latar Belakang & Aspirasi Klien (SyaSya)
- **Kredensial Utama:** S1 Sistem Informasi Universitas Dinamika (IPK 3,78), Digital Marketing Specialist di PT Anugrah Cipta Management.
- **Dua Aset Bukti Kunci:**
  1. **Rekam Jejak Meta Ads 2 Tahun (2025 – 2026):** 27 kampanye iklan Meta Ads (Facebook & Instagram Ads) dengan fokus pesan konversi (*Messaging Conversations Started*), mengelola puluhan ribu jangkauan dan ratusan percakapan pesan dengan biaya efisien.
  2. **Data Closing Klien Riil 2025:** Bukti penjualan konkret dari leads iklan hingga transaksi *DEAL*:
     - Total pendapatan penjualan terverifikasi: **Rp 62.288.000**
     - Total biaya iklan atribusi closing: **Rp 2.284.762**
     - **Return on Ad Spend (ROAS) riil: 27,2x!**
- **Permintaan Spesifik SyaSya:**
  - Tampilkan tabel statis daftar klien & orang-orang yang berhasil dealing di 2025.
  - Tampilkan grafik hasil *income* penjualan yang didapat melalui Meta Ads.
  - Sajikan tangkapan layar dasbor (*screenshots*) sebagai bukti otentik dengan tampilan visual yang menarik.

### B. Arahan Arsitektur & UI/UX (Herry)
1. **Framework:** Vue 3 menggunakan Vite (komposisi modern `<script setup>`).
2. **Paket UI Improvement:** Mengintegrasikan komponen & animasi dari **vue-bits** (`https://vue-bits.dev/`).
3. **Multibahasa (i18n):** Menerapkan dwibahasa **Bahasa Indonesia (`id`)** dan **English (`en`)** menggunakan `vue-i18n`.
4. **Benchmark Desain:** Terinspirasi dari **Trifecta Framer Template** (tema gelap elegan, aksen emerald/indigo, tipografi terstruktur, *delicate borders* $\le$ 1px, *soft diffused shadows*, lencana kapsul, kartu komparasi, dan visual modular kelas agensi global).

---

## 2. Struktur Modul & Hierarki Komponen

```text
/home/sya/ReynaldaSyalwa.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD otomatis: Build Vue & deploy dist/ ke GitHub Pages
├── public/
│   ├── favicon.ico
│   └── REYNALDA_VONNA_SYALWA_CV.pdf # Dokumen CV resmi yang dapat diunduh
├── assets/
│   └── screenshots/
│       ├── meta-ads/             # 6 tangkapan layar Meta Ads Manager (2025-2026)
│       └── leads-deals/          # 2 tangkapan layar CRM Leads & Closing 2025
├── src/
│   ├── assets/
│   │   ├── main.css              # Styling tokens, font styling, Trifecta theme tokens
│   │   └── tailwind.css          # Tailwind setup
│   ├── data/
│   │   ├── meta_ads_and_deals.json # Dataset lengkap Meta Ads, Leads, & Closing 2025-2026
│   │   └── portfolio_data.js     # Data pilar, sertifikasi, timeline pengalaman kerja
│   ├── locales/
│   │   ├── id.json               # Kamus Bahasa Indonesia
│   │   └── en.json               # English dictionary
│   ├── components/
│   │   ├── Navbar.vue            # Navigasi sticky, Logo SyaSya.growth, Language switcher, Theme toggle
│   │   ├── HeroSection.vue       # Headline bergaya Trifecta, badge status, verified stats cards
│   │   ├── IncomeChartSection.vue # Grafik interaktif Ad Spend vs Sales Income + Ringkasan ROAS 27.2x
│   │   ├── DealsTableSection.vue # Tabel statis klien yang berhasil DEAL tahun 2025 + detail omzet
│   │   ├── MetaAdsGridSection.vue# Kartu analitik 2 tahun Meta Ads (2025-2026) dengan filter & KPI
│   │   ├── ProofLightboxModal.vue# Modal pembesar tangkapan layar asli (Meta Ads & Spreadsheet)
│   │   ├── PillarsSection.vue    # 6 pilar kapabilitas (Performance, SEO, CRM, Desain, Web, Admin)
│   │   ├── TimelineSection.vue   # Pengalaman karir & riwayat pendidikan (Universitas Dinamika)
│   │   ├── ContactSection.vue    # Direct WhatsApp, Email, & tombol download CV PDF
│   │   └── Footer.vue            # Hak cipta, atribusi tech stack, & tautan sosial media
│   ├── App.vue                   # Root container & orchestrator layout
│   └── main.js                   # Inisialisasi Vue 3, i18n, & plugins
├── package.json                  # Dependensi (vue, vite, vue-i18n, chart.js, vue-bits, lucide-vue-next)
├── vite.config.js                # Konfigurasi Vite dengan base './' untuk GitHub Pages
└── index.html                    # Root HTML entry point
```

---

## 3. Desain Sistem & Visual Language (Trifecta Reference)

Mengikuti prinsip desain Trifecta dan panduan visual preferensi:
- **Warna Latar Belakang:** Void obsidian `#09090b` / deep charcoal `#121215`, dengan permukaan kartu `#18181b`.
- **Aksen Utama:** Emerald growth `#10b981` / mint neon `#34d399` (melambangkan pertumbuhan bisnis & profit), dipadukan dengan aksen modern indigo `#6366f1`.
- **Garis Batas (Borders):** Halus dan presisi $\le$ 1px (`#27272a` atau `rgba(255, 255, 255, 0.08)`), tidak kaku.
- **Elevasi & Bayangan:** *Soft widely-diffused low-opacity drop shadows* (`0 20px 40px -8px rgba(0, 0, 0, 0.7)`).
- **Tipografi:**
  - Font Primer: *Plus Jakarta Sans* (modern, tegas, sangat terbaca).
  - Font Angka/Metrik: *JetBrains Mono* (memberikan impresi presisi data analitis).
- **Bilingual i18n Switcher:** Tombol kapsul kecil di navbar (`ID | EN`) yang secara reaktif mengubah teks seluruh antarmuka secara instan.

---

## 4. Rincian Modul Utama & Data yang Ditampilkan

### A. Hero Section (Trifecta Studio Posture)
- **Tagline:** *"Digital Marketing & Growth Specialist with Provable Unit Economics."*
- **Badge Status:** `● AVAILABLE FOR FULL-TIME & HIGH-IMPACT ROLES`.
- **Sub-headline:** Menyoroti keahlian unik SyaSya yang menggabungkan kemampuan **Meta Ads berkinerja tinggi**, **Desain Visual & Video Kreatif**, serta kemampuan **Komunikasi & Closing Klien** berlatar belakang Sistem Informasi.
- **Metric Badges:**
  - `Rp 62.2M+` Verified Sales Generated
  - `27.2x` Blended ROAS on Closed Deals
  - `27+` Meta Ads Campaigns Managed (2025–2026)
  - `3.78` GPA Information Systems Graduate

### B. Income & Sales Chart Section (Sesuai Permintaan SyaSya)
- **Visualisasi Grafik (Chart.js / SVG Interactive Chart):**
  - **Sumbu X:** Periode Bulan (Januari 2025, September 2025, Oktober 2025, November 2025, Desember 2025).
  - **Batang/Bar 1:** *Ad Spend* (Biaya Iklan Meta Ads yang dikeluarkan).
  - **Batang/Bar 2:** *Sales Income Generated* (Omzet transaksi berhasil / DEAL).
  - **Garis/Line:** *Cumulative Revenue Curve*.
- **Sorotan Angka Kunci:**
  - Januari 2025: Ad Spend Rp 654.790 $\rightarrow$ Income Rp 5.550.000 (**ROAS 8,5x**).
  - November 2025: Ad Spend Rp 407.602 $\rightarrow$ Income Rp 25.308.000 (**ROAS 62,1x**).
  - Desember 2025: Ad Spend Rp 328.468 $\rightarrow$ Income Rp 31.430.000 (**ROAS 95,7x**).
  - **Total:** Biaya iklan Rp 2,28 Juta menghasilkan omzet **Rp 62,28 Juta**!

### C. Tabel Statis Klien yang Berhasil Dealing (2025)
- **Format:** Tabel statis responsif dengan gaya *sleek table* Trifecta.
- **Kolom:**
  1. *Bulan Transaksi*
  2. *Nama Klien / Entitas* (Agus Susanto, Pak Ady - Yayasan KPM Hadist, Hermawan, Pak Yuda - Yayasan Nurul Anwar, Pak Khoirul - Yayasan Al-barokah)
  3. *Layanan / Solusi* (Sertifikasi ISO, Konsultasi Manajemen, Paket Institusional)
  4. *Biaya Iklan Terkait (Ad Spend)*
  5. *Nilai Transaksi (Deal Value)*
  6. *Status Badge:* **`DEAL`** (Lencana hijau dengan centang verifikasi).
- **Fitur:** *Summary Bar* di bawah tabel menampilkan akumulasi omzet dan rata-rata efisiensi per klien.

### D. Rekapitulasi & Galeri Analitik Meta Ads (2025 – 2026)
- **Filter Berdasarkan Tahun:** `Semua (27 Kampanye)`, `Tahun 2025 (13 Kampanye)`, `Tahun 2026 (14 Kampanye)`.
- **Metrik Utama yang Dipamerkan:**
  - Biaya per Hasil (CPR) terendah: **Rp 3.612 / hasil** (Ads NSM Mei 2026 MBG) dan **Rp 5.435 / hasil** (Ads November MBG 2025).
  - Kampanye dengan Hasil Terbanyak: **75 Percakapan Pesan** (November 2025).
  - Total Jangkauan (*Reach*) Akumulatif: **>200.000 audiens unik**.
- **Interactive Lightbox:** Tombol *"Lihat Screenshot Asli"* untuk membuka 6 gambar tangkapan layar Meta Ads dan 2 lembar kerja Excel secara utuh dalam modal *zoomable*.

### E. Integrasi Komponen vue-bits (`https://vue-bits.dev/`)
- Menerapkan komponen UI & motion dari ekosistem `vue-bits`, seperti:
  - Efek kartu bersudut halus dengan *subtle glow hover*.
  - Animasi transisi angka ticker (*Counter animation*) pada metrik penjualan.
  - Komponen Tabs dan Accordion interaktif untuk FAQ / Studi Kasus.

---

## 5. Rencana Tahapan Eksekusi (Checklist)

1. **Setup Lingkungan Vue 3 & Vite:**
   - Inisialisasi struktur Vite di repositori `ReynaldaSyalwa.github.io`.
   - Konfigurasi `package.json` dengan dependensi: `vue`, `vue-i18n`, `chart.js`, `lucide-vue-next`, Tailwind CSS/PostCSS, dan `vue-bits`.
   - Jalankan `npm install` dan pastikan dependensi terpasang bersih tanpa konflik.

2. **Setup Multibahasa (vue-i18n):**
   - Buat `src/locales/id.json` dan `src/locales/en.json` untuk seluruh teks antarmuka (Hero, Metrik, Tabel Deals, Grafik Income, Portofolio Meta Ads, Pengalaman, dan Kontak).
   - Inisialisasi instance `createI18n` di `src/main.js`.

3. **Integrasi Data & Komponen:**
   - Masukkan dataset `meta_ads_and_deals.json` ke dalam proyek.
   - Buat komponen grafik pendapatan (*IncomeChartSection.vue*) menggunakan Chart.js dengan tema gelap kustom yang serasi.
   - Buat tabel statis klien dealing (*DealsTableSection.vue*).
   - Buat galeri bukti tangkapan layar dengan modal *lightbox* (*ProofLightboxModal.vue*).
   - Buat komponen navigasi, hero, pilar, timeline, dan kontak.

4. **Konfigurasi GitHub Actions & Auto-Deploy:**
   - Perbarui `.github/workflows/deploy.yml` agar menjalankan build Vite (`npm ci && npm run build`) dan mengunggah folder `dist/` ke GitHub Pages.
   - Setel `base: './'` pada `vite.config.js`.

5. **Verifikasi Kualitas (Build & Browser Testing):**
   - Jalankan `npm run build` untuk memastikan tidak ada error kompilasi.
   - Uji website secara lokal dengan `browser_exec` dan periksa console log, fungsionalitas grafik, toggle bahasa i18n, modal screenshot, dan responsivitas mobile.
   - Commit dan push ke branch `main` GitHub.
