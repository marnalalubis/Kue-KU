# SDLC — Tahapan Pengembangan & Alur Kerja (Kue-KU)

## 1. Alur Tahapan Pengembangan

Alur pengerjaan mengikuti siklus terstruktur Paket A:

```text
Fase 1: Dokumen Perencanaan ──► Fase 2: Fondasi & Scaffold ──► Fase 3: Database & Auth ──► Fase 4: Fitur Pelanggan ──► Fase 5: Fitur Admin ──► Fase 6: Testing & Linting ──► Fase 7: Deployment & Maintenance
```

### Fase 1 — Perencanaan & Spesifikasi
- **Input:** Ide produk, kebutuhan pesanan kue Natal, catatan operasional toko.
- **Output:** 6 dokumen acuan (`PRD.md`, `SDLC.md`, `DESIGN.md`, `ARCHITECTURE.md`, `TASKS.md`, `AGENTS.md`).
- **Kriteria Selesai:** 6 dokumen lengkap, selaras tanpa kontradiksi teknis.

### Fase 2 — Fondasi & Scaffold
- **Input:** `ARCHITECTURE.md`
- **Output:** Next.js 14 App Router terpasang dengan TypeScript strict mode, Tailwind CSS, ESLint, dan struktur folder `src/`.
- **Kriteria Selesai:** `npm run dev` jalan di localhost:3000, `npm run build` sukses.

### Fase 3 — Database & Autentikasi
- **Input:** Model schema database dan aturan keamanan admin.
- **Output:** Prisma ORM terhubung ke PostgreSQL (Neon / serverless DB), model relasi data, `src/lib/prisma.ts` singleton, NextAuth credentials provider dengan bcrypt hashing.
- **Kriteria Selesai:** `npx prisma db push` berhasil, akun admin bisa login dan logout dengan aman.

### Fase 4 — Fitur Sisi Pelanggan (Customer Experience)
- **Input:** `PRD.md` dan `DESIGN.md`.
- **Output:** Halaman beranda dengan nuansa Natal, katalog kue terfilter per kategori, pop-up detail kue dengan varian dan stok, keranjang belanja (cart drawer), formulir checkout COD dengan pemilih tanggal pengantaran berkuota, perhitungan ongkir flat, dan halaman nota sukses dengan nomor pesanan unik.
- **Kriteria Selesai:** Pelanggan dapat membuat pesanan dari awal hingga terbit nomor pesanan dan tervalidasi kuota harian.

### Fase 5 — Fitur Sisi Admin (Store Operations)
- **Input:** `PRD.md` dan alur operasional.
- **Output:** Dashboard admin terproteksi NextAuth session, manajemen pesanan dengan filter status (Baru, Dikonfirmasi, Dalam Proses, Dalam Pengantaran, Selesai, Dibatalkan), cetak struk pesanan, CRUD produk & varian kue, pengatur batas kuota harian per tanggal, serta konfigurasi tarif ongkir toko.
- **Kriteria Selesai:** Admin dapat mengubah status pesanan, mengubah stok kue, dan membatasi kuota tanggal pengantaran tertentu.

### Fase 6 — Pengujian, Linting, & Type Check
- **Input:** Seluruh kode aplikasi.
- **Output:** Lolos `npm run lint` (0 error, 0 warning), lolos `npx tsc --noEmit` (0 error), lolos `npm run build`, responsif di viewport Mobile (375px), Tablet (768px), dan Desktop (1440px).
- **Kriteria Selesai:** Aplikasi berjalan mulus di mode produksi `npm run start`.

### Fase 7 — Deployment Vercel & Operasional
- **Input:** Repository GitHub siap rilis.
- **Output:** Deploy ke platform Vercel, konfigurasi Environment Variables (`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`), custom domain DNS Cloudflare SSL Full (Strict), dan monitoring UptimeRobot.

---

## 2. Strategi Branching & Aturan Git

- **Branch Utama (`main`):** Branch stabil yang selalu siap dideploy ke Vercel production.
- **Branch Fitur (`feat/...`):** Branch sementara untuk mengerjakan task tertentu dari `TASKS.md`.
- **Konvensi Pesan Commit (Conventional Commits):**
  - `feat:` penambahan fitur baru (misal: `feat: implementasi validasi kapasitas harian`)
  - `fix:` perbaikan bug (misal: `fix: pembulatan ongkir pada checkout`)
  - `docs:` perubahan dokumentasi (misal: `docs: tambah 6 dokumen perencanaan`)
  - `chore:` penyesuaian konfigurasi atau dependency (misal: `chore: setup prisma schema`)
  - `style:` perapian tampilan CSS/Tailwind tanpa ubah logika

---

## 3. Kriteria Rilis (Release Criteria)

Aplikasi dinyatakan siap rilis ke produksi apabila:
1. Formulir pemesanan dapat menerima pesanan pelanggan dan mengunci kuota harian dengan tepat.
2. Login admin hanya dapat diakses dengan kredensial yang valid; route `/admin/*` terlindungi secara server-side.
3. Password di database tersimpan sebagai hash bcrypt (bukan plaintext).
4. Tidak ada error console di browser dan tidak ada uncaught exception di server API.
5. `npm run lint` menghasilkan `0 error`.
6. `npm run build` sukses menghasilkan static & dynamic serverless routes.
