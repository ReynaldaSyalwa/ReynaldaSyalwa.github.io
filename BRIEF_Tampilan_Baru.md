# 📋 Brief — Rebuild Tampilan Portofolio (SyaSya)

**Status:** ⏸️ PAUSED — menunggu aset dari SyaSya. Jangan eksekusi apa pun sebelum aset lengkap.
**Tanggal:** 22 November 2026
**Sumber instruksi:** SyaSya (pemilik data & desain)

---

## Yang akan dikirim SyaSya (menunggu)

| # | Aset | Fungsi |
|---|---|---|
| 1 | **Referensi tampilan web terbaru** | Acuan desain utama — menggantikan gaya editorial Framer yang sekarang |
| 2 | **Dokumen CV** | Konten profil, pengalaman, pendidikan |
| 3 | **Foto wajah** | Hero / About section (menggantikan ilustrasi sketch) |
| 4 | **Hasil desain flyer / foto / video** | Portofolio karya kreatif — section baru (galeri) |
| 5 | **Data ads dari 2 Excel** (sudah diterima) | Tetap dimasukkan ke tampilan baru |

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
1. Pelajari referensi tampilan baru → tentukan apakah reskin atau rebuild
2. Restrukturisasi filter jadi **3 tab periode saja** (Semua / 2025 / 2026)
3. Tambah section baru: foto profil + galeri karya flyer/foto/video
4. Regenerate data, verifikasi angka vs Excel, build, test mobile+desktop, push
