# ARCHITECTURE.md — Arsitektur & Spesifikasi Teknis: Kue-KU

## 1. Tentang Project

**Kue-KU** adalah web aplikasi pemesanan kue Natal berskala MVP dengan arsitektur modern full-stack berbasis Next.js App Router. Sistem ini mengintegrasikan katalog produk interaktif, keranjang belanja sisi klien, alur pemesanan guest-checkout yang memvalidasi kapasitas harian secara real-time, serta panel manajemen admin yang terproteksi dengan sesi JWT NextAuth.

---

## 2. Stack Teknologi (Paket A — Vercel Starter)

| Layer | Teknologi | Peran & Alasan Pemilihan |
|---|---|---|
| **Frontend Framework** | Next.js 14+ (App Router) | Server-Side Rendering (SSR) untuk SEO katalog kue yang cepat, Client Components untuk interaktivitas keranjang belanja |
| **Bahasa Pemrograman** | TypeScript (Strict Mode) | Type-safety penuh pada payload pesanan, skema data, dan endpoint API |
| **Styling & CSS** | Tailwind CSS | Desain responsif bertema festive Natal, cepat di-maintain tanpa overhead runtime |
| **Autentikasi** | NextAuth.js (Auth.js v4) | Sesi JWT berbasis Credentials Provider untuk admin toko; aman dengan bcrypt password hashing |
| **ORM & Database** | Prisma ORM + PostgreSQL (Neon) | Database relasional serverless scale-to-zero di Neon; pemodelan skema deklaratif dan migrasi mudah |
| **Deployment & CDN** | Vercel Serverless & Edge | Deploy instan, zero-configuration SSL, optimasi gambar otomatis (`next/image`), performa latency rendah |

---

## 3. Struktur Direktori

```text
Kue-KU/
├── prisma/
│   ├── schema.prisma          # Skema database Prisma
│   └── seed.ts                # Data awal katalog kue Natal, admin, dan kuota harian
├── public/
│   ├── images/                # Asset foto kue Natal berkualitas tinggi
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # Endpoint handler autentikasi NextAuth
│   │   │   ├── admin/
│   │   │   │   ├── orders/route.ts          # Endpoint daftar & update status pesanan
│   │   │   │   ├── products/route.ts        # Endpoint kelola kue (CRUD)
│   │   │   │   ├── capacity/route.ts        # Endpoint kelola kuota harian
│   │   │   │   └── settings/route.ts        # Endpoint konfigurasi toko
│   │   │   ├── orders/
│   │   │   │   ├── route.ts                 # Endpoint submit pesanan pelanggan
│   │   │   │   └── [code]/route.ts          # Endpoint pelacakan pesanan
│   │   │   ├── products/route.ts            # Endpoint katalog produk publik
│   │   │   ├── capacity/route.ts            # Endpoint cek ketersediaan tanggal
│   │   │   └── health/route.ts              # Endpoint status pemantauan Uptime
│   │   ├── admin/
│   │   │   ├── login/page.tsx               # Halaman login khusus admin
│   │   │   ├── layout.tsx                   # Layout admin dengan sidebar & guard auth
│   │   │   ├── page.tsx                     # Dashboard KPI & ringkasan operasional
│   │   │   ├── orders/page.tsx              # Manajemen & proses status pesanan
│   │   │   ├── products/page.tsx            # Manajemen stok & harga katalog kue
│   │   │   ├── capacity/page.tsx            # Pengaturan batas pesanan harian
│   │   │   └── settings/page.tsx            # Pengaturan toko & ongkir flat
│   │   ├── menu/page.tsx                    # Katalog lengkap kue Natal & filter
│   │   ├── pesan/page.tsx                   # Halaman checkout & formulir pemesanan
│   │   ├── pesanan/[code]/page.tsx          # Halaman nota digital & status pelacakan
│   │   ├── cara-pesan/page.tsx              # Halaman panduan pemesanan
│   │   ├── informasi-pengantaran/page.tsx   # Halaman ketentuan pengiriman & ongkir
│   │   ├── layout.tsx                       # Root layout (Navbar, Footer, Cart Drawer)
│   │   ├── page.tsx                         # Landing Page (Hero, Featured, Testimoni)
│   │   ├── providers.tsx                    # NextAuth SessionProvider & CartProvider
│   │   └── globals.css                      # Tailwind utilities & custom root tokens
│   ├── components/
│   │   ├── Navbar.tsx                       # Header navigasi & tombol keranjang
│   │   ├── Footer.tsx                       # Footer informasi toko & kontak
│   │   ├── CartDrawer.tsx                   # Drawer keranjang belanja mengambang
│   │   ├── ProductCard.tsx                  # Komponen kartu kue dengan opsi varian
│   │   ├── ProductModal.tsx                 # Modal detail kue, alergen, & varian
│   │   ├── OrderStatusBadge.tsx             # Badge warna status pesanan
│   │   ├── DateCapacityPicker.tsx           # Pemilih tanggal kirim dengan info kuota
│   │   └── AdminSidebar.tsx                 # Sidebar navigasi panel admin
│   ├── lib/
│   │   ├── prisma.ts                        # Singleton PrismaClient
│   │   ├── auth.ts                          # Opsi konfigurasi NextAuth
│   │   ├── cart-context.tsx                 # State management keranjang belanja
│   │   ├── utils.ts                         # Formatter mata uang IDR & tanggal
│   │   └── constants.ts                     # Status pesanan & opsi default
│   └── types/
│       └── index.ts                         # Type definitions produk, pesanan, kuota
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

---

## 4. Skema Database (Prisma Schema)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  STAFF
}

enum OrderStatus {
  BARU
  DIKONFIRMASI
  DALAM_PROSES
  DALAM_PENGANTARAN
  SELESAI
  DIBATALKAN
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String   // bcrypt hash
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  sortOrder   Int       @default(0)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id           String           @id @default(cuid())
  name         String
  slug         String           @unique
  description  String
  image        String
  categoryId   String
  category     Category         @relation(fields: [categoryId], references: [id])
  isAvailable  Boolean          @default(true)
  isFeatured   Boolean          @default(false)
  badge        String?          // e.g. "Best Seller", "Edisi Natal"
  allergenInfo String?          // e.g. "Mengandung mentega Wisman, telur, susu, keju Edam"
  variants     ProductVariant[]
  orderItems   OrderItem[]
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
}

model ProductVariant {
  id          String      @id @default(cuid())
  productId   String
  product     Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  name        String      // e.g. "Toples 350g", "Toples 500g", "Hamper Box"
  weightGram  Int?
  price       Int         // Harga dalam Rupiah (e.g. 125000)
  stock       Int         @default(50)
  isAvailable Boolean     @default(true)
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Order {
  id              String      @id @default(cuid())
  orderCode       String      @unique // e.g. "KUE-202612-8821"
  customerName    String
  customerPhone   String
  deliveryAddress String
  deliveryDate    String      // Format: YYYY-MM-DD
  notes           String?
  subtotal        Int
  shippingFee     Int         @default(20000)
  totalAmount     Int
  status          OrderStatus @default(BARU)
  paymentMethod   String      @default("COD") // Bayar saat pesanan diterima
  paymentStatus   String      @default("PENDING") // PENDING, PAID
  items           OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@index([deliveryDate])
  @@index([status])
}

model OrderItem {
  id          String          @id @default(cuid())
  orderId     String
  order       Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId   String
  product     Product         @relation(fields: [productId], references: [id])
  variantId   String?
  variant     ProductVariant? @relation(fields: [variantId], references: [id])
  productName String
  variantName String
  price       Int
  quantity    Int
  subtotal    Int
}

model DailyCapacity {
  id            String   @id @default(cuid())
  date          String   @unique // Format: YYYY-MM-DD
  maxOrders     Int      @default(30)
  bookedOrders  Int      @default(0)
  isClosed      Boolean  @default(false)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model StoreSetting {
  id                String   @id @default("default-setting")
  storeName         String   @default("Kue-KU Artisanal Christmas Bakery")
  phone             String   @default("081234567890")
  flatShippingFee   Int      @default(20000)
  deliveryAreaNotes String   @default("Melayani seluruh area kota (Radius maks 20km)")
  announcement      String   @default("🎄 Pemesanan Kue Natal 2026 Sudah Dibuka! Slot Pengantaran Terbatas.")
  isStoreOpen       Boolean  @default(true)
  updatedAt         DateTime @updatedAt
}
```

---

## 5. API Routes & Endpoint Design

| Endpoint | Method | Autentikasi | Deskripsi & Payload |
|---|---|---|---|
| `/api/auth/[...nextauth]` | ALL | Publik | Sesi JWT NextAuth (login, callback, logout) |
| `/api/products` | GET | Publik | Daftar katalog kue, kategori, dan varian |
| `/api/capacity?date=YYYY-MM-DD` | GET | Publik | Cek kuota sisa pengantaran tanggal yang dipilih |
| `/api/orders` | POST | Publik | Submit formulir checkout; validasi stok & kapasitas harian |
| `/api/orders/[code]` | GET | Publik | Ambil detail nota pesanan untuk pelacakan pelanggan |
| `/api/admin/orders` | GET | Admin Sesi | Ambil semua pesanan dengan filter status, tanggal, search |
| `/api/admin/orders/[id]` | PATCH | Admin Sesi | Update status pesanan (e.g. `DALAM_PROSES`) & catatan |
| `/api/admin/products` | POST/PUT | Admin Sesi | Tambah kue baru, edit harga varian, ubah stok |
| `/api/admin/capacity` | GET/POST | Admin Sesi | Atur batas maksimal pesanan per tanggal tertentu |
| `/api/admin/settings` | GET/PUT | Admin Sesi | Ambil & perbarui tarif ongkir serta informasi toko |
| `/api/health` | GET | Publik | Response `{ status: "ok", timestamp: ISOString }` |

---

## 6. Alur Validasi Transaksi & Kapasitas Harian (Atomic Logic)

Ketika pelanggan menekan tombol **"Kirim Pesanan"**:
1. Server menerima payload: items (produk + varian + qty), kontak, alamat, dan `deliveryDate`.
2. Validasi input: Nama (min 3 karakter), No. WhatsApp (min 9 digit), Alamat (min 10 karakter), items (tidak boleh kosong).
3. Pengecekan Kapasitas:
   - Query tabel `DailyCapacity` untuk `deliveryDate`.
   - Jika belum ada row, buat default `maxOrders = 30`, `bookedOrders = 0`.
   - Jika `isClosed == true` ATAU `bookedOrders >= maxOrders`, tolak pesanan dengan error `400: Kuota pengantaran tanggal ini sudah penuh. Silakan pilih tanggal lain.`
4. Pengecekan Total & Ongkir:
   - Hitung subtotal di sisi server berdasarkan harga resmi varian di database.
   - Ambil `flatShippingFee` dari `StoreSetting` (default Rp 20.000).
   - `totalAmount = subtotal + flatShippingFee`.
5. Transaksi Database (Atomic Prisma Transaction):
   - Generate kode pesanan acak yang unik: `KUE-YYYYMMDD-XXXX`.
   - Simpan entitas `Order` dan relasi `OrderItem`.
   - Increment `bookedOrders` sebanyak 1 pada `DailyCapacity`.
6. Return response sukses `{ success: true, orderCode: "..." }`.
