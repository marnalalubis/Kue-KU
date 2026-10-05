# PRD — Aplikasi Pemesanan Kue Natal

## 1. Ringkasan

Aplikasi Pemesanan Kue Natal adalah website responsif untuk membantu pelanggan melihat menu kue dan mengirim pesanan secara online. Admin toko menggunakan area admin untuk mengelola katalog, stok, kapasitas pesanan harian, dan status pesanan.

**Tujuan produk:** membuat menu mudah dipahami dan proses pemesanan kue Natal mudah dilakukan, sekaligus membantu toko mengelola pesanan pada periode ramai.

### Status informasi

- **Fakta terkonfirmasi:** website responsif; pengguna terdiri dari pelanggan dan admin; pesanan dikirim melalui formulir website; pembayaran saat pesanan diterima; pengantaran memakai tarif tetap; menu memuat kategori, varian/ukuran, stok, foto, harga, dan deskripsi; admin mengatur stok dan kapasitas pesanan harian; peluncuran untuk satu toko.
- **Asumsi:** pelanggan tidak perlu membuat akun; admin mengelola aplikasi melalui browser; pembayaran saat diterima dicatat oleh admin; MVP tidak memakai payment gateway atau integrasi kurir.
- **Perlu dikonfirmasi:** tanggal dan jadwal pengantaran, cakupan area layanan, nilai ongkir, jam operasional, kebijakan pembatalan, serta kanal notifikasi kepada pelanggan.

## 2. Tujuan dan metrik keberhasilan

### Tujuan

1. Membantu pelanggan memahami pilihan kue, varian, harga, dan ketersediaan.
2. Memungkinkan pelanggan mengirim pesanan tanpa harus menghubungi toko secara manual.
3. Membantu admin menghindari pesanan yang melebihi stok atau kapasitas operasional.
4. Menampilkan informasi biaya dan ringkasan pesanan dengan jelas sebelum pesanan dikirim.

### Metrik yang disarankan

Target numerik di bawah adalah **usulan awal untuk disetujui**, bukan hasil ukur atau jaminan.

| Metrik | Usulan target MVP |
|---|---:|
| Tingkat keberhasilan pengiriman formulir pesanan | ≥ 98% dari percobaan yang valid |
| Pesanan yang dibuat ketika stok atau kapasitas tidak tersedia | 0 pesanan terkonfirmasi |
| Pelanggan yang dapat menyelesaikan pemesanan pada perangkat mobile | ≥ 90% dalam usability testing yang direncanakan |
| Waktu pemuatan halaman katalog pada kondisi pengujian yang ditentukan | Target ditetapkan setelah hosting dan kondisi pengujian dikonfirmasi |
| Pesanan dengan informasi produk, biaya, dan alamat yang lengkap | ≥ 95% |

Metrik perlu ditinjau setelah data penggunaan dan hasil pengujian tersedia. Belum ada hasil pengukuran.

## 3. Audiens dan pengguna

### Pelanggan

- Mencari dan membandingkan pilihan kue Natal.
- Perlu memahami harga, varian/ukuran, dan ketersediaan sebelum memesan.
- Mengisi detail kontak dan alamat pengantaran.
- Membayar saat pesanan diterima.

### Admin toko

- Mengelola katalog, harga, foto, varian, stok, dan status produk.
- Mengatur batas kapasitas pesanan per hari.
- Memeriksa detail pesanan, menghubungi pelanggan bila dibutuhkan, dan memperbarui status.
- Mengelola tarif tetap dan area layanan pengantaran.

MVP mengasumsikan satu jenis peran admin. Pembagian akses menjadi beberapa peran belum termasuk cakupan awal.

## 4. Cakupan MVP

### In-scope

- Website katalog yang responsif untuk ponsel dan komputer.
- Menu dengan kategori dan halaman/detail produk.
- Informasi produk: nama, foto, deskripsi, harga, varian/ukuran, stok, serta status ketersediaan.
- Formulir pemesanan tanpa kewajiban membuat akun pelanggan.
- Informasi kontak dan alamat pengantaran pelanggan.
- Ringkasan produk dan biaya sebelum pesanan dikirim.
- Tarif pengantaran tetap dalam area layanan yang ditentukan admin.
- Validasi stok produk dan kapasitas pesanan harian.
- Area admin terlindungi untuk mengelola produk, stok, kapasitas, ongkir, dan pesanan.
- Status pesanan yang dapat diperbarui admin.
- Konfirmasi bahwa pesanan berhasil diterima sistem.

### Out-of-scope

- Aplikasi Android atau iOS khusus.
- Pembayaran online, payment gateway, atau pencatatan transfer otomatis.
- Integrasi kurir atau pelacakan pengiriman langsung.
- Multi-cabang atau marketplace.
- Akun dan riwayat pesanan mandiri untuk pelanggan.
- Kupon, loyalitas, ulasan, dan rekomendasi personal.
- Notifikasi otomatis melalui WhatsApp, SMS, atau email, sampai kanal dan kebutuhan dikonfirmasi.
- Fitur kustomisasi kue seperti ucapan, dekorasi, atau permintaan khusus; perlu keputusan produk terpisah.
- Pelaporan keuangan atau integrasi sistem kasir.

## 5. Struktur menu dan informasi

### Navigasi pelanggan yang disarankan

- **Beranda**
- **Menu Kue**
  - Kategori kue
  - Daftar produk
  - Detail produk
- **Cara Memesan**
- **Informasi Pengantaran**
- **Hubungi Kami**
- **Ringkasan Pesanan** atau keranjang, apabila implementasi menggunakan keranjang

Nama kategori dan produk disediakan oleh toko. Struktur ini merupakan rekomendasi untuk MVP dan dapat disederhanakan setelah daftar produk tersedia.

### Informasi produk minimum

Setiap produk yang dapat ditampilkan sebaiknya memiliki:

- Nama produk.
- Kategori.
- Satu atau lebih foto.
- Deskripsi yang mudah dipahami.
- Harga atau harga awal yang disertai penjelasan yang jelas.
- Varian/ukuran dan harga tiap varian bila berbeda.
- Informasi ketersediaan.
- Stok atau batas jumlah yang dapat dipesan.
- Informasi bahan atau alergen jika tersedia dan telah diverifikasi toko.

Jangan menampilkan klaim bahan atau alergen yang belum dikonfirmasi oleh pihak toko.

## 6. Peran dan workflow utama

### Workflow pelanggan

1. Pelanggan membuka website dan menelusuri kategori atau daftar kue.
2. Pelanggan membuka detail produk, memilih varian/ukuran, dan menentukan jumlah.
3. Website menampilkan informasi produk dan ketersediaan yang relevan.
4. Pelanggan mengisi data kontak dan alamat pengantaran.
5. Website menampilkan ringkasan pesanan, ongkir tetap, dan total yang harus dibayar.
6. Pelanggan mengirim pesanan.
7. Sistem memvalidasi data, stok, dan kapasitas harian.
8. Jika pesanan berhasil dicatat, pelanggan melihat halaman konfirmasi beserta nomor atau referensi pesanan.
9. Pembayaran dilakukan saat pesanan diterima.

**Keputusan terbuka:** pelanggan belum dipastikan memilih tanggal pengantaran. Karena kapasitas harian perlu diperiksa, tanggal pesanan atau aturan penetapan tanggal harus disepakati sebelum implementasi.

### Workflow admin

1. Admin masuk ke area admin dengan autentikasi.
2. Admin menambahkan atau memperbarui produk dan varian.
3. Admin memperbarui harga, foto, stok, dan ketersediaan.
4. Admin menetapkan kapasitas pesanan harian.
5. Admin menetapkan tarif tetap dan area pengantaran.
6. Admin meninjau pesanan baru beserta produk, kontak, alamat, dan ringkasan biaya.
7. Admin memperbarui status pesanan ketika diproses dan diantarkan.
8. Admin mencatat status pembayaran saat pembayaran diterima, jika kebutuhan operasional memerlukan pencatatan tersebut.

### Status pesanan yang disarankan

- **Baru** — pesanan telah diterima sistem, menunggu tinjauan admin.
- **Dikonfirmasi** — admin menyatakan pesanan dapat dipenuhi.
- **Dalam proses** — pesanan sedang disiapkan.
- **Dalam pengantaran** — pesanan sedang dikirim.
- **Selesai** — pesanan telah diterima pelanggan.
- **Dibatalkan** — pesanan dibatalkan sesuai kebijakan toko.

Status **Dibatalkan** perlu disertai aturan mengenai pengembalian stok dan pemulihan kapasitas harian.

## 7. Kebutuhan fungsional

### Katalog

- **FR-01:** Sistem menampilkan daftar produk berdasarkan kategori.
- **FR-02:** Sistem menampilkan nama, foto, deskripsi, harga, varian/ukuran, dan ketersediaan produk.
- **FR-03:** Sistem membedakan produk tersedia, stok habis, dan produk tidak aktif.
- **FR-04:** Admin dapat membuat, mengubah, dan menonaktifkan kategori serta produk.
- **FR-05:** Admin dapat mengatur foto, harga, varian/ukuran, dan stok produk.

### Pemesanan

- **FR-06:** Pelanggan dapat memilih produk, varian/ukuran, dan jumlah.
- **FR-07:** Pelanggan dapat memasukkan nama, nomor kontak, dan alamat pengantaran.
- **FR-08:** Sistem menampilkan ringkasan produk, jumlah, ongkir, dan total sebelum pesanan dikirim.
- **FR-09:** Sistem memvalidasi kelengkapan dan format data yang diwajibkan.
- **FR-10:** Sistem memvalidasi stok dan kapasitas harian ketika pesanan dibuat.
- **FR-11:** Sistem tidak menerima pesanan jika produk tidak tersedia atau kapasitas pada tanggal yang diminta telah tercapai.
- **FR-12:** Sistem menampilkan konfirmasi setelah pesanan berhasil dicatat.
- **FR-13:** Sistem menampilkan keterangan pembayaran saat pesanan diterima.
- **FR-14:** Sistem mencegah pesanan rangkap akibat pengiriman ulang formulir yang sama sejauh dapat dilakukan secara aman.

### Administrasi pesanan

- **FR-15:** Admin dapat melihat daftar dan detail pesanan.
- **FR-16:** Admin dapat mencari atau memfilter pesanan berdasarkan status dan tanggal, jika tanggal pesanan tersedia.
- **FR-17:** Admin dapat memperbarui status pesanan.
- **FR-18:** Sistem menyimpan waktu pembuatan dan perubahan status pesanan.
- **FR-19:** Admin dapat mengatur kapasitas harian dan melihat kapasitas yang terpakai.
- **FR-20:** Admin dapat mengatur tarif pengantaran tetap dan area layanan.
- **FR-21:** Perubahan stok, kapasitas, atau tarif hanya dapat dilakukan oleh admin yang telah terautentikasi.

## 8. Kebutuhan nonfungsional

### Kemudahan penggunaan

- Antarmuka harus responsif dan dapat digunakan pada layar ponsel.
- Harga, ukuran/varian, ketersediaan, ongkir, dan total harus mudah ditemukan.
- Formulir harus memiliki label yang jelas, pesan validasi yang spesifik, dan ringkasan kesalahan.
- Bahasa antarmuka MVP adalah Bahasa Indonesia, kecuali diputuskan lain.

### Keamanan dan privasi

- Area admin harus dilindungi autentikasi.
- Hak akses pelanggan dan admin harus dibedakan.
- Data kontak dan alamat hanya boleh diakses untuk kebutuhan pemrosesan pesanan.
- Data harus dikirim melalui koneksi terenkripsi pada production.
- Password admin tidak boleh disimpan dalam bentuk teks biasa; gunakan mekanisme autentikasi yang aman dari framework atau penyedia yang dipilih.
- Input pelanggan harus divalidasi di server, bukan hanya di browser.
- Logging tidak boleh mencatat data sensitif yang tidak dibutuhkan.
- Masa penyimpanan data pesanan dan prosedur penghapusannya perlu ditentukan sesuai kebijakan toko dan kebutuhan yang berlaku.

### Keandalan dan performa

- Sistem harus menampilkan kondisi loading, kosong, dan gagal dengan pesan yang membantu.
- Proses validasi stok dan kapasitas perlu mencegah dua pesanan secara bersamaan menghabiskan ketersediaan yang sama.
- Target kapasitas pengguna dan beban puncak belum ditetapkan. Nilainya perlu dikonfirmasi sebelum pemilihan hosting.
- Sistem perlu menyediakan backup database dan prosedur pemulihan yang diuji sebelum peluncuran; frekuensi dan target pemulihan perlu ditetapkan bersama pemilik produk.

### Aksesibilitas

- Elemen formulir harus memiliki label yang dapat dibaca teknologi bantu.
- Informasi penting tidak boleh dibedakan hanya melalui warna.
- Navigasi dan tombol utama sebaiknya dapat digunakan dengan keyboard.
- Kontras teks dan elemen interaktif perlu diverifikasi sebelum rilis.
- Kepatuhan terhadap standar aksesibilitas tertentu belum ditentukan.

## 9. Data dan aturan bisnis

### Entitas data utama yang disarankan

- **Kategori:** nama, deskripsi opsional, urutan tampilan, status aktif.
- **Produk:** nama, deskripsi, foto, kategori, status aktif.
- **Varian:** produk, nama/ukuran, harga, stok, status tersedia.
- **Pesanan:** referensi, waktu dibuat, data pelanggan, alamat, status, total, ongkir, catatan operasional jika diaktifkan.
- **Item pesanan:** produk/varian, nama dan harga pada saat pemesanan, jumlah, subtotal.
- **Kapasitas harian:** tanggal, jumlah maksimum, jumlah yang telah dialokasikan.
- **Pengaturan pengantaran:** tarif tetap dan wilayah layanan.

**Rekomendasi data:** simpan nama dan harga produk pada saat pesanan dibuat agar riwayat pesanan tidak berubah ketika admin memperbarui katalog. Rincian model data final dibahas dalam dokumen arsitektur.

### Aturan bisnis awal

1. Total pesanan merupakan jumlah subtotal item ditambah ongkir tetap yang berlaku.
2. Pesanan tidak boleh dikonfirmasi jika stok atau kapasitas yang diperlukan tidak tersedia.
3. Ketersediaan stok harus diperiksa pada saat pesanan dikirim, bukan hanya saat halaman produk dibuka.
4. Perubahan stok setelah pesanan dibuat tidak boleh mengubah rincian pesanan yang sudah tercatat.
5. Batas area layanan, tanggal yang dapat dipesan, serta perlakuan terhadap pembatalan masih perlu disepakati.

## 10. Acceptance criteria

MVP dinyatakan memenuhi kriteria penerimaan setelah seluruh hal berikut lolos pengujian:

1. Pelanggan dapat membuka katalog dan melihat kategori, foto, deskripsi, harga, varian/ukuran, serta status ketersediaan.
2. Pelanggan dapat memilih produk dan jumlah, mengisi data wajib, dan melihat ringkasan biaya sebelum mengirim pesanan.
3. Ongkir yang ditampilkan sama dengan tarif tetap yang dikonfigurasi admin untuk area layanan.
4. Sistem menolak formulir dengan data wajib yang kosong atau tidak valid dan menunjukkan bagian yang perlu diperbaiki.
5. Pesanan berhasil tersimpan dengan rincian item, jumlah, harga pada saat pemesanan, alamat, ongkir, total, status awal, dan waktu dibuat.
6. Jika stok tidak cukup atau kapasitas harian telah tercapai, pesanan tidak dicatat sebagai pesanan terkonfirmasi dan pelanggan menerima penjelasan yang jelas.
7. Dua permintaan yang bersamaan untuk unit stok terakhir tidak boleh sama-sama mengonsumsi stok tersebut secara berlebihan.
8. Admin dapat masuk dan mengelola produk, stok, kapasitas, ongkir, serta pesanan.
9. Pengguna yang tidak terautentikasi tidak dapat mengubah data admin.
10. Website dapat digunakan pada lebar layar ponsel dan desktop tanpa konten utama terpotong.
11. Setelah pesanan berhasil dikirim, pelanggan melihat konfirmasi yang memuat referensi pesanan serta petunjuk pembayaran saat diterima.
12. Jalur utama katalog, pemesanan, validasi stok, pengelolaan pesanan, dan akses admin lulus pengujian fungsional sebelum production.

## 11. Integrasi dan pembayaran

- **Pembayaran:** pembayaran dilakukan saat pesanan diterima. Tidak ada payment gateway dalam MVP.
- **Pengantaran:** tarif tetap dikelola dalam aplikasi; tidak ada integrasi kurir dalam MVP.
- **Notifikasi:** belum ada kanal otomatis yang dikonfirmasi. Notifikasi email atau WhatsApp merupakan keputusan terbuka.
- **Foto produk:** membutuhkan mekanisme upload dan penyimpanan gambar. Layanan penyimpanan final ditentukan saat perencanaan teknis.
- **Analitik:** integrasi analitik eksternal belum termasuk MVP; metrik keberhasilan dapat dikumpulkan sesuai keputusan privasi dan implementasi.

## 12. Dependensi

- Daftar produk, kategori, foto, deskripsi, varian, harga, dan stok dari toko.
- Keputusan pemilik toko tentang tarif tetap dan batas area pengantaran.
- Aturan kapasitas harian, tanggal pemesanan, dan jadwal pengantaran.
- Informasi kontak toko dan teks operasional yang ditampilkan kepada pelanggan.
- Pemilihan hosting, database, penyimpanan gambar, dan mekanisme autentikasi admin.
- Ketersediaan admin untuk pengujian alur operasional dan penerimaan MVP.

## 13. Risiko dan mitigasi

| Risiko | Dampak | Mitigasi yang disarankan |
|---|---|---|
| Lonjakan pesanan saat menjelang Natal | Pesanan melebihi kemampuan produksi atau pengantaran | Tentukan kapasitas harian, uji proses pemesanan, dan pantau pesanan secara rutin |
| Stok tidak sinkron | Pesanan diterima untuk produk yang sudah habis | Validasi stok pada server saat pemesanan dan gunakan pembaruan yang aman untuk permintaan bersamaan |
| Tanggal pengantaran belum jelas | Kapasitas harian tidak dapat diterapkan dengan konsisten | Putuskan pemilihan tanggal atau prosedur penetapan tanggal sebelum pengembangan alur akhir |
| Area dan ongkir belum ditentukan | Pelanggan mendapat biaya atau cakupan layanan yang membingungkan | Tampilkan area layanan dan tarif secara jelas sebelum pelanggan mengirim pesanan |
| Data kontak dan alamat terekspos | Risiko privasi dan penyalahgunaan data | Batasi akses admin, gunakan koneksi terenkripsi, minimalkan logging, dan tetapkan retensi |
| Admin terlambat memeriksa pesanan | Konfirmasi atau pemrosesan pesanan tertunda | Tetapkan prosedur operasional; tentukan kebutuhan notifikasi jika pemantauan manual tidak cukup |
| Pembatalan tidak mengembalikan stok secara benar | Stok atau kapasitas menjadi tidak akurat | Sepakati kebijakan pembatalan dan uji pembaruan stok serta kapasitas sebelum rilis |

## 14. Decision log

| Keputusan | Status | Catatan |
|---|---|---|
| Platform website responsif | Terkonfirmasi | MVP berjalan di browser ponsel dan komputer |
| Pelanggan dan admin sebagai pengguna utama | Terkonfirmasi | Tidak ada peran staf tambahan pada MVP |
| Pemesanan melalui formulir website | Terkonfirmasi | Pesanan tercatat di sistem |
| Pembayaran saat pesanan diterima | Terkonfirmasi | Payment gateway di luar cakupan |
| Tarif pengantaran tetap | Terkonfirmasi | Nilai tarif dan cakupan area belum ditentukan |
| Stok dan kapasitas harian dikelola admin | Terkonfirmasi | Aturan tanggal/cara pengantaran masih perlu diputuskan |
| Penggunaan akun pelanggan | Asumsi: tidak diperlukan | Perlu dikonfirmasi saat desain alur final |
| Notifikasi otomatis | Terbuka | Kanal dan kebutuhan belum dikonfirmasi |
| Tanggal/jadwal pengantaran | Terbuka | Dibutuhkan agar pembatasan kapasitas harian dapat diterapkan secara konsisten |
| Kebijakan pembatalan | Terbuka | Berpengaruh pada stok dan kapasitas |

## 15. Pertanyaan yang perlu diputuskan sebelum implementasi

1. Apakah pelanggan memilih tanggal pengantaran saat memesan?
2. Bagaimana toko menetapkan tanggal dan batas waktu pemesanan menjelang Natal?
3. Berapa tarif tetap dan wilayah pengantaran yang dicakup?
4. Bagaimana pesanan dibatalkan, dan kapan stok serta kapasitas dikembalikan?
5. Apakah pelanggan perlu menerima konfirmasi otomatis melalui email atau WhatsApp?
6. Apakah produk memerlukan pilihan ucapan, dekorasi, atau catatan khusus?
7. Siapa yang akan menyiapkan konten produk dan mengelola aplikasi saat periode ramai?

---
**Dokumen berikutnya yang disarankan:** Full Architecture untuk merinci komponen, data, keamanan, hosting, backup, dan operasi.
