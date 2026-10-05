# TASKS.md — Rencana Kerja & Daftar Tugas: Kue-KU

## Legenda Status
- `[ ]` Belum dimulai
- `[~]` Sedang dikerjakan
- `[x]` Selesai
- **Prioritas:** `P0` (Blocker / Fondasi Inti), `P1` (Penting / Fungsional Utama), `P2` (Penyempurnaan / Tambahan)

---

## Fase 1 — Inisialisasi & Scaffold Proyek

- [ ] `T-001` [P0] Inisialisasi struktur proyek Next.js 14 App Router, TypeScript strict mode, Tailwind CSS, dan ESLint.
      *Selesai kalau:* Struktur direktori `src/`, `package.json`, `tailwind.config.ts`, dan file konfigurasi terbentuk tanpa konflik.
- [ ] `T-002` [P0] Konfigurasi design tokens (warna festive Natal, font, border radius) di `tailwind.config.ts` dan `src/app/globals.css`.
      *Selesai kalau:* Variabel warna `--color-primary`, font festive, dan styling utilitas dapat dipanggil dengan benar.

---

## Fase 2 — Database Prisma & Autentikasi Admin

- [ ] `T-003` [P0] Buat skema database Prisma (`schema.prisma`) mencakup model `User`, `Category`, `Product`, `ProductVariant`, `Order`, `OrderItem`, `DailyCapacity`, dan `StoreSetting`.
      *Selesai kalau:* File `prisma/schema.prisma` terdefinisi lengkap dan `src/lib/prisma.ts` singleton tersedia.
- [ ] `T-004` [P0] Buat file seed database (`prisma/seed.ts`) dengan akun admin default dan katalog kue Natal realistis (Nastar Wisman, Kastengel Edam, Putri Salju, Roll Cake Yule Log, Hamper Box).
      *Selesai kalau:* Script seed siap di-eksekusi untuk mengisi database awal.
- [ ] `T-005` [P0] Implementasi NextAuth.js Credentials Provider dengan enkripsi bcrypt dan session handler JWT di `src/lib/auth.ts` dan `src/app/api/auth/[...nextauth]/route.ts`.
      *Selesai kalau:* Login admin bekerja dengan verifikasi password hash dan route terlindungi secara aman.

---

## Fase 3 — Komponen UI & Fitur Katalog Sisi Pelanggan

- [ ] `T-006` [P1] Bangun layout utama: Header navigasi dengan festive announcement bar, logo Kue-KU, menu navigasi, dan tombol keranjang mengambang (`src/components/Navbar.tsx` & `Footer.tsx`).
      *Selesai kalau:* Header responsif, sticky, dan menampilkan counter item keranjang secara real-time.
- [ ] `T-007` [P1] Implementasi Cart State Management (`src/lib/cart-context.tsx`) dan Cart Drawer (`src/components/CartDrawer.tsx`).
      *Selesai kalau:* Pengguna dapat menambah, mengurangi, menghapus item keranjang belanja dengan kalkulasi subtotal instan.
- [ ] `T-008` [P1] Bangun halaman Beranda (`src/app/page.tsx`) dengan Hero section bernuansa Natal, USP keunggulan bahan (Mentega Wisman, Tanpa Pengawet, Halal), dan daftar produk unggulan.
      *Selesai kalau:* Halaman beranda tampil memikat di mobile (375px) dan desktop (1440px).
- [ ] `T-009` [P1] Bangun halaman Katalog Menu Kue (`src/app/menu/page.tsx`) dengan filter kategori (Kue Kering, Cake & Roll, Hampers), pencarian instan, dan kartu kue informatif (`ProductCard.tsx`).
      *Selesai kalau:* Pelanggan dapat memfilter kue dan melihat badge ketersediaan stok.
- [ ] `T-010` [P1] Buat Modal Detail Produk (`src/components/ProductModal.tsx`) dengan pemilihan varian (toples 350g, 500g, gift box), informasi alergen/bahan, dan tombol tambah ke keranjang.
      *Selesai kalau:* Pelanggan dapat memilih varian kue dengan perubahan harga dinamis sebelum masuk keranjang.

---

## Fase 4 — Alur Pemesanan, Validasi Kapasitas Harian, & Pelacakan

- [ ] `T-011` [P0] Buat komponen pemilih tanggal pengantaran berkuota (`src/components/DateCapacityPicker.tsx`) yang terintegrasi dengan endpoint `/api/capacity`.
      *Selesai kalau:* Tanggal dengan kuota penuh ditandai merah/disabled dan tidak dapat dipilih oleh pelanggan.
- [ ] `T-012` [P0] Bangun halaman Checkout & Formulir Pemesanan (`src/app/pesan/page.tsx`) dengan validasi input kontak WhatsApp, alamat antar, catatan pengiriman, dan ringkasan ongkir flat.
      *Selesai kalau:* Pelanggan dapat menyelesaikan formulir checkout dan melihat rincian biaya yang transparan.
- [ ] `T-013` [P0] Bangun endpoint submit pesanan (`src/app/api/orders/route.ts`) dengan validasi atomic kapasitas harian dan pembuatan nomor nota unik (`KUE-YYYYMMDD-XXXX`).
      *Selesai kalau:* Pesanan sukses tersimpan ke database, kuota harian bertambah 1, dan mengembalikan order code.
- [ ] `T-014` [P1] Bangun halaman Nota Digital & Konfirmasi Pesanan (`src/app/pesanan/[code]/page.tsx`) lengkap dengan rincian pesanan, status terkini, dan tombol Share/Konfirmasi WhatsApp.
      *Selesai kalau:* Pelanggan dapat membuka nota digital mereka kapan saja untuk memantau status pesanan.

---

## Fase 5 — Panel Administrasi Toko (Store Operations)

- [ ] `T-015` [P0] Bangun halaman Login Admin (`src/app/admin/login/page.tsx`) dengan validasi kredensial dan proteksi middleware session.
      *Selesai kalau:* Pengguna tanpa sesi admin dialihkan otomatis ke halaman login.
- [ ] `T-016` [P1] Bangun Dashboard Ringkasan Admin (`src/app/admin/page.tsx`) yang menampilkan total pesanan hari ini, estimasi omset, kapasitas terpakai, dan status stok kue.
      *Selesai kalau:* Admin mendapatkan overview operasional toko secara real-time.
- [ ] `T-017` [P1] Bangun halaman Manajemen Pesanan (`src/app/admin/orders/page.tsx`) dengan filter status, pencarian nomor nota, detail pesanan, dan tombol update status pesanan.
      *Selesai kalau:* Admin dapat mengubah status pesanan dari "Baru" hingga "Selesai" atau "Dibatalkan".
- [ ] `T-018` [P1] Bangun halaman Manajemen Katalog & Stok (`src/app/admin/products/page.tsx`) untuk menambah kue, mengubah harga varian, dan toggle status stok habis.
      *Selesai kalau:* Perubahan stok di admin langsung berdampak pada halaman katalog pelanggan.
- [ ] `T-019` [P1] Bangun halaman Manajemen Kuota Harian (`src/app/admin/capacity/page.tsx`) untuk mengatur batas pesanan maksimal per tanggal pengantaran Natal.
      *Selesai kalau:* Admin dapat menaikkan/menurunkan kuota atau menutup pemesanan untuk tanggal tertentu.
- [ ] `T-020` [P2] Bangun halaman Pengaturan Toko & Ongkir (`src/app/admin/settings/page.tsx`) serta endpoint pemantauan kesehatan aplikasi (`/api/health`).
      *Selesai kalau:* Admin dapat mengatur nominal ongkir flat dan endpoint `/api/health` return status 200 OK.

---

## Fase 6 — Pengujian, Linting, & Validasi Produksi

- [ ] `T-021` [P0] Jalankan pemeriksaan `npm run lint` dan selesaikan semua peringatan/error.
      *Selesai kalau:* `npm run lint` menghasilkan 0 error dan 0 warning.
- [ ] `T-022` [P0] Jalankan type check TypeScript `npx tsc --noEmit`.
      *Selesai kalau:* Seluruh type aman dengan 0 error.
- [ ] `T-023` [P0] Jalankan kompilasi produksi `npm run build`.
      *Selesai kalau:* Build Next.js sukses menghasilkan bundles produksi.
- [ ] `T-024` [P1] Buat file konfigurasi deployment Vercel (`vercel.json`), `.env.example`, dan dokumentasi panduan deploy sesuai Paket A.
      *Selesai kalau:* Proyek siap di-push ke GitHub dan di-import di Vercel.
