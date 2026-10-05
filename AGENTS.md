# AGENTS.md — Panduan & Aturan Perilaku AI Agent (Kue-KU)

## Tentang Project

**Kue-KU** adalah aplikasi web pemesanan kue Natal berskala MVP untuk toko kue artisanal. Aplikasi dibangun menggunakan stack resmi **Paket A (Vercel Starter)** dari Monorepo Skills: Next.js 14 App Router, TypeScript strict mode, Tailwind CSS, Prisma ORM, PostgreSQL (Neon), NextAuth.js, dan Vercel.

---

## Aturan Utama (Non-Negotiable Rules)

1. **Kepatuhan Stack Paket A:**
   - Gunakan Next.js 14 dengan **App Router** (`src/app`), BUKAN Pages Router.
   - Gunakan TypeScript dalam mode ketat (`strict: true`). **DILARANG** menggunakan tipe `any` sembarangan; definisikan antarmuka/type data yang jelas di `src/types/index.ts`.
   - Gunakan Tailwind CSS dengan design tokens yang telah disepakati di `DESIGN.md`.
   - Gunakan Prisma ORM sebagai database access layer dengan instance singleton di `src/lib/prisma.ts`.
   - Gunakan NextAuth.js dengan Credentials Provider untuk autentikasi admin.

2. **Keamanan & Validasi Server:**
   - Semua input pengguna (nama, telepon, alamat, tanggal, varian kue) **WAJIB** divalidasi di sisi server (API route handler), bukan hanya di browser.
   - Password akun admin **WAJIB** di-hash menggunakan `bcryptjs` (salt rounds minimal 10). DILARANG menyimpan password plaintext.
   - Endpoint API **TIDAK BOLEH** mengembalikan kolom `password` ke client dalam keadaan apa pun.

3. **Integritas Bisnis & Kapasitas Harian:**
   - Validasi kapasitas pesanan harian (`DailyCapacity`) harus dijalankan saat pemesanan dibuat agar kuota harian toko tidak pernah terlampaui.
   - Format kode pesanan standar adalah `KUE-YYYYMMDD-XXXX`.
   - Perhitungan subtotal dan ongkir tetap harus diverifikasi ulang di server sebelum pesanan dicatat ke database.

4. **Kualitas Tampilan & Aksesibilitas:**
   - Terapkan pendekatan Mobile-First (harus rapi di lebar layar 375px tanpa overflow horizontal).
   - Gunakan palet warna festive Natal dari `DESIGN.md` (Crimson Red `#991B1B`, Pine Green `#166534`, Warm Gold `#D97706`, Warm Cream `#FFFDF5`).
   - Sediakan umpan balik interaktif (loading state, error message, toast feedback, empty state).

5. **Pemeriksaan Sebelum Selesai:**
   - Jalankan `npm run lint` dan pastikan `0 error`.
   - Jalankan `npx tsc --noEmit` dan pastikan `0 error`.
   - Jalankan `npm run build` dan pastikan proses kompilasi Next.js sukses.

---

## Perintah Kerja yang Sering Digunakan

```bash
# Jalankan development server
npm run dev

# Jalankan type checking
npx tsc --noEmit

# Jalankan linter ESLint
npm run lint

# Sinkronisasi schema Prisma ke database
npx prisma db push

# Buka antarmuka grafis database
npx prisma studio

# Kompilasi rilis produksi
npm run build
```
