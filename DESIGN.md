# DESIGN.md — Design System & Bahasa Visual: Kue-KU

## 1. Konsep & Nuansa Visual

Tema visual **Kue-KU** mengusung nuansa **"Artisanal Christmas Bakery & Warm Festivity"** — perpaduan antara kehangatan tradisi Natal (merah crimson dan hijau pinus alami), kemewahan bahan kue premium (aksen emas mentega/wisman), serta kesegaran modernitas antarmuka web masa kini yang bersih dan mudah digunakan.

---

## 2. Palet Token Warna

| Token Desain | Hex / HSL | Peran & Penggunaan |
|---|---|---|
| `--color-primary` | `#991B1B` (Crimson Red) | Tombol CTA utama, badge promo penting, aksen aktif |
| `--color-primary-hover` | `#7F1D1D` (Burgundy) | Status hover tombol utama, teks link terfokus |
| `--color-secondary` | `#166534` (Pine Forest) | Tombol sekunder, badge status konfirmasi, WhatsApp button |
| `--color-secondary-hover` | `#14532D` (Dark Pine) | Hover tombol sekunder |
| `--color-accent` | `#D97706` (Festive Warm Gold) | Bintang rating, highlight diskon, bingkai hampers khusus |
| `--color-bg-base` | `#FAFAF9` (Warm Stone 50) | Latar belakang halaman body |
| `--color-bg-surface` | `#FFFFFF` (Pure White) | Kartu produk, modal dialog, formulir input |
| `--color-bg-subtle` | `#FFFDF5` (Warm Cream) | Hero section, callout banner, kotak ringkasan biaya |
| `--color-text-main` | `#1C1917` (Stone 900) | Judul utama, nama produk, teks harga |
| `--color-text-muted` | `#78716C` (Stone 500) | Deskripsi produk, label bantuan, placeholder |
| `--color-border` | `#E7E5E4` (Stone 200) | Garis batas kartu, pemisah tabel, border input |
| `--color-border-focus` | `#991B1B` | Focus ring saat input aktif |
| `--color-success` | `#15803D` (Emerald) | Status "Selesai", konfirmasi pesanan berhasil |
| `--color-warning` | `#B45309` (Amber) | Status "Dalam Proses", kuota hampir penuh |
| `--color-error` | `#DC2626` (Red) | Pesan validasi error, kuota habis, status "Dibatalkan" |

---

## 3. Tipografi

- **Font Utama (Interface & Angka):** `Inter`, `system-ui`, `-apple-system`, `sans-serif`
- **Font Aksen & Judul Festive (Display):** `Playfair Display`, `Georgia`, `serif` (digunakan pada Headline Hero dan Judul Bagian)

### Hirarki Teks:
- **Hero Title:** `text-3xl sm:text-5xl font-extrabold tracking-tight font-serif`
- **Section Heading:** `text-2xl sm:text-3xl font-bold text-stone-900`
- **Product Title:** `text-lg font-bold text-stone-900 line-clamp-1`
- **Price Display:** `text-lg sm:text-xl font-extrabold text-red-800`
- **Body & Inputs:** `text-sm sm:text-base text-stone-700`
- **Badges & Microcopy:** `text-xs font-semibold uppercase tracking-wider`

---

## 4. Jarak, Sudut, & Efek Kedalaman

- **Base Spacing:** Kelipatan 4px (`p-2`, `p-4`, `p-6`, `p-8`).
- **Corner Radius:**
  - Tombol & Input: `rounded-xl` (12px)
  - Kartu Produk: `rounded-2xl` (16px) dengan `overflow-hidden`
  - Modal & Cart Drawer: `rounded-2xl` atau `rounded-3xl`
  - Badge & Tag: `rounded-full`
- **Shadows:**
  - Card default: `shadow-sm hover:shadow-md transition-all duration-300`
  - Floating Cart & Modal: `shadow-xl shadow-stone-900/10`
  - Festive Glow: `shadow-md shadow-red-900/5`

---

## 5. Komponen Kunci Antarmuka

### A. Festive Announcement Bar & Header
- Header sticky dengan banner ucapan Natal ("🎄 Sambut Natal dengan Kehangatan Kue Spesial Kue-KU • Slot Pengantaran Terbatas").
- Logo Kue-KU dengan ikon kue/pinus.
- Navigasi cepat: Katalog, Cara Pesan, Info Kirim, Lacak Pesanan.
- Tombol Keranjang Belanja interaktif dengan badge counter jumlah kue terpilih.

### B. Kartu Produk (Product Card)
- Wadah gambar berasio 4:3 atau 1:1 dengan efek hover zoom halus.
- Label tag status: `Tersedia`, `Pre-Order`, atau `Habis`.
- Badge spesial: `⭐ Best Seller`, `🎄 Edisi Natal`, `✨ Hadiah Hampers`.
- Nama kue, varian ringkas (contoh: "Toples 350g & 500g"), harga IDR terformat rapi (`Rp 115.000`).
- Tombol aksi "+ Tambah" atau "Pilih Varian".

### C. Drawer Keranjang & Pemilih Varian
- Off-canvas drawer yang meluncur mulus dari sisi kanan layar.
- Daftar item terpilih dengan thumbnail, nama kue, varian terpilih, kontrol tombol `+` dan `-`.
- Kalkulasi otomatis Subtotal, Ongkir Tetap (Flat Rate), dan Estimasi Total.

### D. Formulir Pemesanan & Kalender Kuota
- Formulir satu langkah (single-step checkout) yang bersih tanpa form berbelit-belit.
- Pemilih tanggal pengantaran dengan pill/badge informatif:
  - Hijau: "Tersedia (Sisa X slot)"
  - Kuning: "Tersisa Sedikit"
  - Merah/Disabled: "Kuota Penuh"
- Pilihan metode pembayaran terpasang jelas: **"Bayar di Tempat (COD / Saat Kue Diterima)"**.

### E. Status Tag Pesanan (Admin & Customer)
- **Baru:** `bg-sky-50 text-sky-700 border-sky-200`
- **Dikonfirmasi:** `bg-amber-50 text-amber-700 border-amber-200`
- **Dalam Proses:** `bg-purple-50 text-purple-700 border-purple-200`
- **Dalam Pengantaran:** `bg-indigo-50 text-indigo-700 border-indigo-200`
- **Selesai:** `bg-emerald-50 text-emerald-700 border-emerald-200`
- **Dibatalkan:** `bg-rose-50 text-rose-700 border-rose-200`

---

## 6. Standar Aksesibilitas & Responsivitas

- **Mobile First:** Target utama lebar layar 375px (iPhone standard) bebas horizontal scrolling, ukuran target sentuh tombol minimal `44px x 44px`.
- **Tablet (768px):** Grid katalog menyesuaikan 2 kolom, form checkout 2 kolom seimbang.
- **Desktop (1024px+):** Grid katalog 3 atau 4 kolom, ringkasan keranjang sticky di sisi formulir.
- **Kontras Warna:** Rasio kontras teks utama terhadap background minimal 4.5:1 (WCAG AA).
