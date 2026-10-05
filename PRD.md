# PRD — Product Requirements Document: Kue-KU (Aplikasi Pemesanan Kue Natal)

## 1. Ringkasan Produk

**Kue-KU** adalah aplikasi web pemesanan kue Natal berbasis website responsif untuk membantu pelanggan menelusuri katalog kue Natal artisanal (kue kering toples, bolu gulung, hampers spesial) dan melakukan pemesanan secara langsung tanpa wajib membuat akun. Sistem dilengkapi validasi kapasitas pesanan harian otomatis serta panel administrasi terproteksi bagi pengelola toko untuk memantau pesanan, memperbarui stok, dan mengatur batas kuota operasional harian.

---

## 2. Masalah yang Diselesaikan

1. **Overload pesanan di musim puncak Natal:** Toko kue rumahan kerap kewalahan menerima pesanan melebihi kapasitas memanggang/pengantaran harian karena tidak adanya batas kuota otomatis per tanggal kirim.
2. **Pencatatan manual via chat rawan keliru:** Pemesanan via WhatsApp sering menyebabkan salah catat alamat, salah varian ukuran toples, atau tanggal pengantaran terlewat.
3. **Ketidakpastian ketersediaan stok:** Pelanggan sering memesan varian kue yang bahannya sudah habis atau sudah tutup pre-order tanpa informasi stok transparan.
4. **Informasi biaya tidak jelas di awal:** Pelanggan sering menanyakan berkali-kali total harga kue ditambah ongkir flat ke area layanan mereka.

---

## 3. Persona Pengguna

### Persona 1: Pelanggan (Maria, 34 tahun — Ibu Rumah Tangga & Profesional)
- **Karakter:** Ingin mengirim hantaran kue Natal untuk keluarga, kerabat, dan rekan kantor tanpa proses ribet.
- **Kebutuhan:** Melihat foto kue yang menggugah selera, deskripsi rasa, pilihan gramatur/toples, harga transparan, info alergen, dan memilih tanggal pengantaran yang masih tersedia kuotanya.
- **Perilaku:** Lebih sering mengakses website lewat smartphone (mobile), memilih bayar saat pesanan diterima (COD / Pay on Delivery).

### Persona 2: Admin Toko (Kezia, 29 tahun — Pemilik & Pengelola Toko Kue)
- **Karakter:** Mengatur produksi di dapur dan logistik pengantaran kue Natal.
- **Kebutuhan:** Membatasi pesanan maksimal per hari (misal 30 pesanan/hari), melihat daftar pesanan terpusat dengan filter status, mengubah status pesanan (Baru → Dikonfirmasi → Dalam Proses → Dalam Pengantaran → Selesai), dan mengupdate stok kue yang menipis.

---

## 4. Cakupan Fitur MVP

### In-Scope (Fitur Inti MVP)
1. **Katalog & Detail Produk Interaktif:**
   - Kategori kue (Kue Kering Toples, Cake & Roll, Hampers & Gift Box).
   - Kartu produk informatif: foto, nama, deskripsi, harga mulai dari, varian ukuran/kemasan, status stok real-time, badge khusus (Best Seller, Limited).
   - Detail produk lengkap dengan pemilih varian, jumlah, dan informasi bahan/alergen.
2. **Keranjang & Alur Checkout COD Ramah Pengguna:**
   - Keranjang belanja interaktif (Cart Drawer) dengan hitungan subtotal instan.
   - Formulir checkout tanpa wajib login: nama pemesan, nomor WhatsApp, alamat lengkap pengantaran, catatan pengiriman.
   - Pemilih tanggal pengantaran dengan indikator sisa kuota harian.
   - Perhitungan tarif ongkos kirim tetap (Flat Delivery Fee) otomatis ke dalam grand total.
3. **Validasi Kuota Pesanan Harian (Daily Capacity Engine):**
   - Mencegah pelanggan memilih tanggal yang kapasitas kuota hariannya telah penuh.
4. **Pelacakan & Bukti Pesanan (Digital Order Slip):**
   - Halaman konfirmasi pemesanan sukses dengan ID unik (contoh: `KUE-202612-XXXX`).
   - Tombol langsung untuk konfirmasi atau kirim nota ke WhatsApp Admin.
   - Halaman pelacakan pesanan publik untuk melihat status terkini pesanan.
5. **Panel Admin Terproteksi (NextAuth Credentials):**
   - Login admin aman dengan password terenkripsi bcrypt.
   - Dashboard ringkasan: total pesanan hari ini, total omset estimasi, status kapasitas hari ini, dan peringatan stok menipis.
   - Manajemen Pesanan: daftar pesanan, filter status, detail pemesan & barang, cetak struk/nota, perbarui status.
   - Manajemen Produk: tambah kue baru, ubah harga, kelola varian, dan toggle status stok (Tersedia / Habis).
   - Manajemen Kuota Harian: tetapkan kapasitas maksimum pesanan per tanggal pengantaran.
   - Konfigurasi Toko: atur tarif ongkir tetap, jam operasional, dan kontak WhatsApp toko.

### Out-of-Scope (Bukan Prioritas MVP)
- Integrasi payment gateway otomatis (Midtrans/Xendit) — menggunakan metode bayar saat diterima (COD) untuk MVP.
- Integrasi kurir ekspedisi pihak ketiga otomatis (Gosend API / GrabExpress API).
- Akun login khusus pelanggan (guest checkout diutamakan agar konversi tinggi).
- Aplikasi native Android / iOS terpisah.

---

## 5. Metrik Keberhasilan MVP

| Metrik | Target |
|---|---|
| Keberhasilan pengiriman formulir pesanan valid | 100% tanpa crash |
| Pesanan melebihi kuota harian | 0 pesanan (sistem menolak tanggal penuh) |
| Kemudahan akses mobile (skor responsif 375px) | 100% tanpa horizontal scroll |
| Waktu muat halaman katalog | < 1.5 detik |
| Error TypeScript & ESLint | 0 error |
