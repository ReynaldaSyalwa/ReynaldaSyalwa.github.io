# 📋 Brief — Rebuild Tampilan Portofolio (SyaSya)

**Status:** ⏸️ PAUSED — menunggu aset dari SyaSya. Jangan eksekusi apa pun sebelum aset lengkap.
**Tanggal:** 22 November 2026
**Sumber instruksi:** SyaSya (pemilik data & desain)

---

## Yang akan dikirim SyaSya (menunggu)

| # | Aset | Fungsi |
|---|---|---|
| 1 | ✅ **Referensi tampilan** — Behance: *Portfolio Brand Social Media Digital Marketing* (Muhammad Helmi Muharrom, project 220076409) | Acuan desain utama |
| 2 | ⏳ **Dokumen CV** | Konten profil, pengalaman, pendidikan |
| 3 | ⏳ **Foto wajah** | Hero / About (cutout portrait di atas lingkaran warna) |
| 4 | ⏳ **Hasil desain flyer / foto / video** | Galeri karya kreatif — section baru |
| 5 | ✅ **Data ads 2 Excel** | Tetap dimasukkan, filter periode saja |

---

## Catatan penting dari SyaSya (WAJIB dipatuhi)

> "untuk hasil roas, hasil omset, hasil pengeluaran di filter jadi 3 bagian yakni **semua, 2025, 2026** jangan kyk website barusan kamu buat data nya masih membingungkan mau dibaca mulai dari mana"

### Artinya — kritik terhadap versi sekarang
Versi live saat ini (`80ede6c`) punya **2 dimensi filter**:
1. `Baris Bisnis`: Semua / Sertifikasi ISO/NSM / IWASH Cleaning
2. `Periode`: Semua / 2025 / 2026

→ **Terlalu banyak pilihan, pembaca bingung harus mulai baca dari mana.**

### Aturan baru untuk filter ROAS / Omset / Pengeluaran
- **SATU filter saja: `Semua` · `2025` · `2026`**
- Hapus / turunkan filter baris bisnis dari posisi filter utama
- Angka harus langsung terbaca sebagai satu rangkuman, bukan dua sumbu filter yang saling mengunci
- Urutan baca harus jelas: Total → per tahun → detail

---

## Data ads yang harus tetap masuk (dari 2 Excel)

**File sumber:**
- `Data_klien_ads_2026_untuk_keperluan_portofolio.xlsx` (sheet Ads NSM 2025, Ads NSM 2026, REKAP)
- `REKAP_IKLAN_IWASH.xlsx` (sheet Imlek, Ramadhan, HUT Surabaya)

**Angka final terverifikasi:**

| Periode | Deal | Revenue | Ad Spend | ROAS |
|---|---:|---:|---:|---:|
| 2025 (ISO 6 + IWASH 6) | 12 | Rp 82.904.000 | Rp 5.199.457 | 15,94x |
| 2026 (ISO 10) | 10 | Rp 146.176.000 | Rp 4.735.148 | 30,87x |
| **Semua** | **22** | **Rp 229.080.000** | **Rp 9.934.605** | **23,06x** |

**Detail ISO:** 16 deal · Rp 226.984.000 · spend Rp 9.374.244 · ROAS 24,21x
**Detail IWASH:** 6 deal · Rp 2.096.000 · spend Rp 560.361 · ROAS 3,74x

Angka di atas sudah lolos `assert` di `scripts/generate_portfolio_data.py` — **jangan ditulis ulang manual**, regenerate dari skrip.

---

## Aturan privasi yang sudah disepakati
- ❌ Nomor HP **tidak dipublikasikan** (field dihapus dari dataset)
- ✅ Nama badan usaha (PT / CV / Yayasan / Law Firm) **tampil penuh**
- ✅ Konsumen perorangan (IWASH) **disamarkan panjang-terjaga** (`L**** D*******`)
- ✅ Screenshot spreadsheet leads **sudah dihapus** dari `public/` (verified 404)

---

## Kondisi teknis saat ini (titik mulai)
- Repo: `/home/sya/ReynaldaSyalwa.github.io` @ `80ede6c`
- Stack: Vue 3 + Vite + vue-i18n (ID/EN) + Chart.js + AOS + Tailwind
- Build: `npm run build` menulis ke `dist/` **dan** root (`index.html` + `assets/`) — karena GitHub Pages aktif via branch
- Data: `src/data/portfolio_data.json` (digenerate, jangan diedit manual)
- Deploy: push ke `main` → GitHub Actions → live di https://reynaldasyalwa.github.io

## Rencana setelah aset masuk
1. Terapkan bahasa visual referensi Behance (lihat bagian di bawah)
2. Restrukturisasi filter jadi **3 tab periode saja** (Semua / 2025 / 2026)
3. Tambah section: hero dengan foto cutout, galeri karya flyer/foto/video
4. Regenerate data, verifikasi angka vs Excel, build, test mobile+desktop, push

---

## 🎨 Referensi Desain Behance — Analisis

**Sumber:** https://www.behance.net/gallery/220076409/Portfolio-Brand-Social-Media-Digital-Marketing
Oleh **Muhammad Helmi Muharrom** · Tags: Advertising, Branding, Figma
**Catatan penting:** ini bukan website ter-code — ini **deck gambar** (24 modul). Jadi yang diambil adalah **bahasa visualnya**, lalu diterjemahkan ke Vue.

### Palet
| Peran | Nilai |
|---|---|
| Latar | Off-white hangat **#F7F5F0** + tekstur grain/noise halus (bukan putih bersih) |
| Aksen utama | **Orange amber #F5A24B → #F79A3E** |
| Aksen sekunder | Sage/olive **#7E8F6B**, lime **#7BD44A** (panah tren) |
| Teks | Hitam **#111**, muted **#6B6B6B** |
| Kartu hasil | Blok **hitam solid** dengan teks putih |

### Tipografi
- **Satu keluarga geometric sans** (Poppins / Gilroy / General Sans) — tidak ada serif
- Headline sangat bold, 2 baris, ~86–90px, tracking rapat; **satu kata diwarnai orange** (mis. nama)
- Body ~15px regular, abu-abu, line-height longgar
- Hero number besar bold ("2 Years") + keterangan kecil di bawahnya

### Komponen khas
1. **Marquee ticker** — band kata kunci (Design, Brand, Marketing, Social Media, Strategy, Analytics) **dimiringkan ~-3°**, pemisah bintang ✦ orange
2. **Cutout portrait** di atas **lingkaran orange solid**, dengan outline doodle putih mengikuti siluet (efek stiker)
3. **Chip pill hitam** berisi emoji (📢 Marketing, 🚀 Ads, ✨ Brand, 📱 Social Media) ditempel miring mengelilingi subjek
4. **Segmented CTA** — segmen orange aktif + segmen outline gelap, ikon panah ↗
5. **Tanda kutip besar** (2 blok hitam) pembuka blok testimoni
6. **Coretan hand-drawn** orange di dekat badge/headline
7. **Kartu "Result"** hitam + grid 6 kartu statistik kecil ber-ikon (followers, impressions, SKUs, engagement, AVR, reach) dengan panah naik

### Pola section (per brand/case)
`Judul besar` → `narasi singkat` → `kolase visual di kiri` → `grid metrik "Result" di kanan`
Contoh: Kahf → 25K followers, 1.4M impressions, 150+ SKU, 15% engagement, 5% AVR, 7% organic reach.

### Pemetaan ke website SyaSya
| Elemen referensi | Padanan di portofolio SyaSya |
|---|---|
| Cover: headline + cutout + orange circle + chips | Hero dengan **foto wajah SyaSya**, headline "I'm SyaSya", chip keahlian |
| Statistik hero ("2 Years") | **22 deal / Rp 229,1 Jt / 23,1x ROAS** |
| Marquee ticker | Meta Ads · ISO Certification · IWASH Cleaning · Creative Design · SEO |
| Kartu "Result" hitam + grid 6 metrik | Section hasil ads dengan **filter Semua / 2025 / 2026** |
| Kolase visual per brand | **Galeri flyer / foto / video karya SyaSya** |
| Testimoni + kutipan | Bisa diisi testimoni klien (jika ada) |

### Yang harus dihindari
- Jangan pakai putih bersih — harus off-white + grain
- Jangan campur banyak aksen: orange = utama, hijau hanya untuk indikator tren
- Jangan pakai serif (versi sekarang pakai Newsreader — harus diganti)
