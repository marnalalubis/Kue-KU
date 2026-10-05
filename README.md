# 🎄 Kue-KU — Artisanal Christmas Cake & Cookies Web App

Aplikasi web pemesanan kue Natal artisanal modern, responsif, dan siap produksi yang dibangun mengikuti metodologi **Paket A (Vercel Starter)** dari [Monorepo Skills](https://github.com/askiya/MONOREPO-SKILLS/tree/main/paket/paket-A).

---

## 🏗️ Tech Stack (Paket A)

- **Frontend & Serverless:** [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling & Design System:** [Tailwind CSS](https://tailwindcss.com/) dengan Festive Christmas Palette
- **Database & ORM:** [PostgreSQL](https://neon.tech/) (Neon Serverless) + [Prisma ORM](https://www.prisma.io/)
- **Autentikasi Staf/Admin:** [NextAuth.js](https://next-auth.js.org/) (Credentials Provider, Session JWT, Bcrypt Hashing)
- **Deployment Platform:** [Vercel](https://vercel.com/) (Edge Network & Serverless Functions, Region Singapore `sin1`)
- **DNS & SSL:** [Cloudflare DNS](https://cloudflare.com/) (SSL Full Strict)

---

## ✨ Fitur Utama (MVP)

### 🛍️ Sisi Pelanggan (Customer Experience)
1. **Katalog Kue Natal Interaktif (`/menu`):**
   - Filter kategori instan (Kue Kering Toples, Cake & Roll Spesial, Hampers & Gift Box).
   - Pencarian real-time berdasarkan nama kue atau bahan.
   - Kartu kue informatif dengan foto berkualitas tinggi, badge edisi khusus, dan harga terformat rupiah.
2. **Pemilih Varian & Informasi Alergen:**
   - Modal detail kue dengan pilihan kemasan (toples 350g, 500g, paket hampers).
   - Peringatan transparan terkait bahan & alergen (mentega Wisman, telur, keju Edam, susu, kacang mede).
   - Tombol interaktif langsung masukkan ke keranjang belanja.
3. **Keranjang Belanja Mengambang (Cart Drawer):**
   - Pengelolaan jumlah pesanan secara langsung dengan sinkronisasi penyimpanan lokal browser.
   - Rincian subtotal otomatis dan notifikasi ongkir tetap (flat rate).
4. **Formulir Checkout & Validasi Kuota Harian (`/pesan`):**
   - Tanpa kewajiban mendaftar akun pelanggan (guest checkout cepat).
   - **Daily Capacity Engine:** Pengecekan otomatis batas kuota pemanggangan harian (maksimal 35 pesanan/hari). Tanggal penuh akan dikunci sistem.
   - Pilihan metode pembayaran terkonfirmasi: **Bayar di Tempat (COD / Saat Pesanan Diterima)**.
   - Perhitungan ongkir flat otomatis (Rp 20.000).
5. **Nota Digital & Pelacakan Pesanan (`/pesanan/[code]` dan `/lacak`):**
   - Kode nota unik resmi (contoh: `KUE-20261224-8821`).
   - Tombol Cetak Nota & Tombol Konfirmasi langsung ke WhatsApp Toko.
   - Lacak status pesanan secara mandiri kapan saja.

### 🛡️ Sisi Admin & Staf Dapur (`/admin`)
1. **Autentikasi Terproteksi (`/admin/login`):**
   - Login aman berbasis NextAuth JWT dan enkripsi sandi bcrypt.
2. **Dashboard Ringkasan Operasional (`/admin`):**
   - Metrik KPI: Total pesanan, pesanan baru masuk, estimasi omset penjualan, dan kuota pemanggangan.
   - Tabel 5 pesanan terbaru dengan tautan cepat ke detail.
3. **Manajemen Pesanan Masuk (`/admin/orders`):**
   - Filter pesanan berdasarkan status: `BARU`, `DIKONFIRMASI`, `DALAM_PROSES`, `DALAM_PENGANTARAN`, `SELESAI`, `DIBATALKAN`.
   - Pencarian berdasarkan kode nota, nama pemesan, atau nomor telepon.
   - Modal detail pesanan dan tombol ubah status satu klik.
4. **Manajemen Katalog & Ketersediaan Stok (`/admin/products`):**
   - Pantau stok toples dan loyang kue.
   - Toggle instan status produk (Tersedia / Habis) yang langsung berdampak ke katalog pelanggan.
5. **Batas Kuota Pemanggangan Harian (`/admin/capacity`):**
   - Atur batas maksimal pesanan per tanggal pengantaran Natal.
   - Fitur tutup/buka pemesanan untuk tanggal tertentu.
6. **Pengaturan Toko & Ongkir Flat (`/admin/settings`):**
   - Konfigurasi nominal ongkir flat, catatan area jangkauan kurir, nomor WhatsApp toko, dan teks pengumuman promo.
7. **Health Check Endpoint (`/api/health`):**
   - Endpoint pemantauan uptime untuk integrasi UptimeRobot.

---

## 🚀 Panduan Menjalankan di Komputer Lokal

### 1. Prasyarat
- Node.js LTS (versi 18+)
- Git

### 2. Kloning & Instalasi
```bash
# Masuk ke folder proyek
cd Kue-KU

# Instal semua dependensi
npm install
```

### 3. Konfigurasi Environment Variables
Salin template `.env.example` menjadi `.env`:
```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
NEXTAUTH_SECRET="kue-ku-christmas-secret-key-min-32-chars-random-string"
NEXTAUTH_URL="http://localhost:3000"
```
*(Catatan: Aplikasi telah dilengkapi resilient data layer, sehingga tetap dapat dijalankan dan diuji coba dengan data mock bawaan meskipun database Neon belum dikoneksikan).*

### 4. Menjalankan Server Development
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 🔑 Kredensial Login Admin Bawaan

| Keterangan | Nilai Default |
|---|---|
| **Halaman Login** | `/admin/login` |
| **Email** | `admin@kueku.com` |
| **Password** | `AdminNatal2026!` |

---

## 💾 Integrasi Database Neon PostgreSQL

Setelah membuat project di [console.neon.tech](https://console.neon.tech):
1. Salin connection string Prisma dari dashboard Neon ke file `.env`:
   ```env
   DATABASE_URL="postgresql://user:password@ep-sample-123456.ap-southeast-1.aws.neon.tech/kueku?sslmode=require"
   ```
2. Jalankan sinkronisasi skema ke database:
   ```bash
   npx prisma db push
   ```
3. Jalankan seeding data awal:
   ```bash
   npm run seed
   ```
4. Buka antarmuka tabel Prisma:
   ```bash
   npx prisma studio
   ```

---

## 🌐 Panduan Deployment ke Vercel (Paket A)

1. **Push ke GitHub:**
   ```bash
   git add .
   git commit -m "feat: rilis MVP aplikasi pemesanan kue natal"
   git push origin main
   ```
2. **Import ke Vercel:**
   - Kunjungi [vercel.com/new](https://vercel.com/new) dan pilih repository ini.
   - Tambahkan Environment Variables di Vercel:
     - `DATABASE_URL`: Connection string PostgreSQL Neon Anda
     - `NEXTAUTH_SECRET`: Random string minimal 32 karakter
     - `NEXTAUTH_URL`: `https://nama-proyek.vercel.app` (atau domain kustom Anda)
   - Klik **Deploy**.
3. **Konfigurasi Domain & SSL Cloudflare (Opsional):**
   - Tambahkan CNAME record `@` dan `www` mengarah ke `cname.vercel-dns.com` dengan **Proxy status: OFF (DNS Only)**.
   - Atur SSL/TLS mode di Cloudflare ke **Full (Strict)**.

---

## 📋 Hasil Verifikasi Kualitas (Fase 4 & 6)

- **ESLint:** `npm run lint` &rarr; `✔ No ESLint warnings or errors`
- **TypeScript:** `npx tsc --noEmit` &rarr; `Exit code 0 (0 error)`
- **Next.js Production Build:** `npm run build` &rarr; `✓ Compiled successfully (17/17 routes generated)`
