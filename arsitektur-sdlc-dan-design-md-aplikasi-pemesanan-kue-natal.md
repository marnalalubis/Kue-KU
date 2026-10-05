# Arsitektur, SDLC, dan DESIGN.md — Aplikasi Pemesanan Kue Natal

## 1. Konteks, Tujuan, dan Cakupan

Dokumen ini menetapkan konteks produk, tujuan, dan batas cakupan MVP aplikasi pemesanan kue Natal. Dokumen ini menjadi acuan awal bagi pemilik usaha, perancang, pengembang, dan penguji dalam menyepakati kebutuhan produk serta menyiapkan keputusan teknis dan desain sebelum implementasi.

MVP ditujukan untuk satu toko kue yang ingin menerima dan mengelola pesanan Natal melalui website responsif. Website harus dapat digunakan pelanggan melalui perangkat desktop maupun seluler, serta menyediakan fungsi administrasi bagi staf toko. Cakupan ini berfokus pada alur pemesanan yang sederhana dan pengelolaan operasional dasar selama periode penjualan.

### Tujuan produk

MVP bertujuan untuk:

- Menampilkan katalog kue Natal dengan informasi produk yang terstruktur.
- Memungkinkan pelanggan memilih produk dan mengirimkan pesanan melalui formulir di website.
- Menyediakan metode pembayaran saat pesanan diterima.
- Menerapkan ongkos pengantaran dengan tarif tetap.
- Membantu admin mengelola produk, stok, pesanan, dan kapasitas pesanan harian.
- Mengurangi ketergantungan pada pencatatan pesanan secara manual tanpa memperkenalkan kompleksitas sistem yang tidak diperlukan pada tahap awal.

### Keputusan produk yang telah disetujui

Keputusan berikut menjadi dasar cakupan MVP:

| Area | Keputusan |
|---|---|
| Jenis layanan | Website responsif untuk satu toko. |
| Pengguna | Pelanggan dan admin. |
| Pemesanan | Pelanggan membuat pesanan melalui formulir di website. |
| Pembayaran | Pembayaran dilakukan saat pesanan diterima. |
| Pengantaran | Menggunakan ongkos pengantaran dengan tarif tetap. |
| Katalog | Produk disajikan dalam menu yang terstruktur. |
| Operasional | Admin dapat mengelola stok produk dan kapasitas pesanan harian. |

Detail formulir, data yang wajib diminta, status pesanan, dan tindakan admin perlu dirinci dalam spesifikasi kebutuhan sebelum implementasi. Pengelolaan kapasitas harian dimaksudkan untuk membantu toko membatasi jumlah pesanan sesuai kemampuan operasional; aturan perhitungan dan perilakunya ketika kapasitas tercapai juga harus ditetapkan sebelum pengembangan fitur terkait.

### Batas cakupan MVP

MVP **tidak mencakup**:

- Payment gateway atau pembayaran daring.
- Aplikasi mobile khusus; akses seluler disediakan melalui website responsif.
- Integrasi dengan kurir atau layanan logistik pihak ketiga.
- Dukungan multi-cabang.
- Notifikasi otomatis, termasuk notifikasi melalui email, SMS, atau aplikasi pesan.

Fitur-fitur tersebut dapat dipertimbangkan untuk pengembangan berikutnya setelah kebutuhan operasional MVP dievaluasi. Tidak termasuk dalam MVP bukan berarti kebutuhan tersebut telah ditolak secara permanen.

### Keputusan yang masih perlu dikonfirmasi

Sejumlah aturan operasional belum ditetapkan dan tidak boleh diasumsikan sebagai keputusan final saat perancangan atau implementasi. Pemilik usaha perlu mengonfirmasi:

- Jadwal dan pilihan waktu pengantaran, termasuk batas waktu pemesanan untuk tiap jadwal.
- Area pengantaran yang dilayani.
- Nilai tarif pengantaran tetap serta aturan penerapannya.
- Kebijakan pembatalan dan perubahan pesanan.
- Apakah notifikasi diperlukan, siapa penerimanya, dan melalui kanal apa.

Keputusan tersebut dapat memengaruhi formulir pemesanan, perhitungan total, proses administrasi, dan komunikasi kepada pelanggan. Karena itu, detailnya perlu disepakati sebelum alur terkait difinalkan.

## 2. Asumsi dan Keputusan Terbuka

Bagian ini membedakan fakta yang telah dikonfirmasi, asumsi kerja untuk perencanaan MVP, dan keputusan yang masih harus disepakati. Asumsi hanya membantu analisis dan perancangan awal; asumsi tidak boleh diterapkan sebagai kebijakan produk sebelum dikonfirmasi oleh pemilik bisnis.

### 2.1 Fakta terkonfirmasi

MVP yang direncanakan adalah website responsif untuk pelanggan dan admin, dengan kemampuan berikut:

- Menampilkan katalog produk kue Natal.
- Menerima pesanan melalui formulir pemesanan.
- Mendukung pembayaran saat pesanan diterima.
- Menerapkan ongkir dengan tarif tetap, tetapi nilai dan cakupan penerapannya belum ditentukan.
- Mendukung pengelolaan stok produk dan kapasitas pesanan harian oleh admin.

Fakta tersebut menjadi dasar rancangan awal. Detail operasional yang tidak dinyatakan di atas belum dianggap sebagai persyaratan yang disepakati.

### 2.2 Asumsi kerja

Asumsi berikut dapat digunakan sementara untuk menyusun rancangan arsitektur, alur pengguna, dan rencana pengembangan. Semuanya perlu ditinjau sebelum implementasi terkait difinalkan.

| Topik | Asumsi kerja | Hal yang perlu dikonfirmasi |
|---|---|---|
| Akses pelanggan | Pelanggan dapat melihat katalog dan mengirim pesanan melalui website tanpa harus membuat akun. | Apakah akun pelanggan diperlukan untuk MVP atau untuk pemesanan berulang? |
| Pencatatan pesanan | Sistem menyimpan informasi yang diperlukan untuk memproses dan menyerahkan pesanan. | Data wajib apa saja, siapa yang dapat mengaksesnya, dan berapa lama data disimpan? |
| Pembayaran | Pembayaran dilakukan saat pesanan diterima; MVP tidak diasumsikan memproses pembayaran daring. | Metode pembayaran apa yang diterima, dan kapan status pembayaran dicatat oleh admin? |
| Stok dan kapasitas | Admin dapat memperbarui stok produk dan batas kapasitas pesanan harian. | Apakah pesanan mengurangi stok atau kapasitas secara otomatis, dan bagaimana perubahan atau pembatalan memengaruhinya? |
| Tarif pengantaran | Sistem akan mendukung tarif tetap. | Apakah tarif berlaku per pesanan, per alamat, atau berdasarkan kategori area? Berapa nominalnya dan di area mana tarif tersebut berlaku? |
| Pengelolaan oleh admin | Admin mengelola katalog, stok, kapasitas, dan informasi pesanan melalui antarmuka yang sesuai. | Peran admin, hak akses, dan kebutuhan pencatatan aktivitas admin apa yang diperlukan? |

Jika suatu asumsi memengaruhi total biaya, ketersediaan produk, penerimaan pesanan, atau janji layanan kepada pelanggan, asumsi tersebut harus diselesaikan sebelum alur terkait dipublikasikan.

### 2.3 Keputusan terbuka

Keputusan berikut perlu ditetapkan oleh pemilik bisnis sebelum implementasi final pada fitur terkait. Dampak teknisnya perlu ditinjau setelah kebijakan operasional dipilih.

| Keputusan | Hal yang perlu ditetapkan | Dampak jika belum diputuskan |
|---|---|---|
| Tanggal dan jadwal pengantaran atau pengambilan | Tanggal layanan yang tersedia, pilihan slot waktu jika ada, tenggat pemesanan, serta apakah pelanggan dapat memilih pengantaran atau pengambilan. | Formulir pesanan, validasi ketersediaan, dan pengelolaan kapasitas harian belum dapat ditentukan secara lengkap. |
| Area layanan dan nominal ongkir | Wilayah yang dilayani, cara memeriksa alamat, nominal tarif tetap, serta pengecualian jika ada. | Sistem belum dapat menghitung total pesanan atau memastikan apakah suatu alamat dapat dilayani. |
| Jam operasional | Jam layanan pelanggan, jam pemrosesan pesanan, dan batas waktu pemesanan untuk hari yang sama jika layanan tersebut tersedia. | Informasi yang ditampilkan kepada pelanggan dan aturan penerimaan pesanan belum dapat ditetapkan. |
| Kebijakan pembatalan | Apakah pesanan dapat dibatalkan, batas waktu pembatalan, pihak yang berwenang membatalkan, serta cara menangani stok dan kapasitas setelah pembatalan. | Status pesanan dan aturan pemulihan stok atau kapasitas berisiko tidak konsisten. |
| Kanal notifikasi | Apakah pelanggan atau admin perlu menerima notifikasi; kanal yang digunakan, seperti email, SMS, atau aplikasi pesan; serta peristiwa pemicu dan isi notifikasi. | Konfirmasi pesanan dan komunikasi perubahan status mungkin harus dilakukan secara manual; integrasi notifikasi tidak dapat direncanakan secara spesifik. |
| Catatan atau kustomisasi kue | Apakah pelanggan boleh menambahkan catatan, memilih varian, meminta perubahan desain atau tulisan, dan apakah permintaan tersebut dikenai biaya atau perlu persetujuan admin. | Struktur formulir, katalog, harga, dan proses persetujuan pesanan dapat berubah. |
| Retensi data pelanggan | Data pelanggan yang disimpan, tujuan dan masa penyimpanan, cara menghapus atau menganonimkan data, serta pihak yang boleh mengaksesnya. | Kebijakan privasi, rancangan penyimpanan data, dan prosedur operasional belum dapat difinalkan. |

### 2.4 Tindak lanjut sebelum implementasi final

Pemilik bisnis perlu mendokumentasikan keputusan pada tabel di atas, termasuk pilihan yang tidak berlaku untuk MVP. Keputusan yang memengaruhi harga, ketersediaan, jadwal layanan, atau penggunaan data pelanggan harus disepakati sebelum fitur terkait diuji dengan pelanggan.

Setiap perubahan setelah keputusan ditetapkan perlu dicatat sebagai perubahan kebutuhan dan ditinjau dampaknya terhadap alur pemesanan, antarmuka, data, pengujian, serta jadwal rilis. Jika keputusan belum tersedia saat pengembangan dimulai, tim harus menandai fitur yang terdampak sebagai belum final dan tidak menampilkan asumsi sementara kepada pelanggan sebagai kebijakan yang telah berlaku.

## 3. Arsitektur Sistem Tingkat Tinggi

MVP menggunakan arsitektur web tiga lapis: antarmuka website responsif, backend aplikasi, dan layanan penyimpanan data. Pelanggan dan admin mengakses website melalui peramban. Website berkomunikasi dengan backend untuk menampilkan katalog, mengirim pesanan, dan mengelola data. Backend membaca dan menulis data pada database relasional serta, bila diperlukan, mengambil atau menyimpan foto produk pada penyimpanan gambar.

```text
Pelanggan ──┐
            ├──> Website responsif ──> Backend aplikasi ──> Database relasional
Admin ──────┘                              │
                                          └──> Penyimpanan foto produk
```

Diagram ini menunjukkan batas tanggung jawab, bukan pilihan teknologi atau penyedia layanan tertentu. Framework, platform hosting, dan layanan penyimpanan akan ditentukan kemudian berdasarkan kebutuhan operasional dan keputusan proyek.

### 3.1 Alur utama

**Pemesanan oleh pelanggan**

1. Pelanggan membuka website pada perangkat desktop atau seluler.
2. Website meminta data katalog kepada backend dan menampilkan produk beserta foto, deskripsi, harga, dan informasi ketersediaan.
3. Pelanggan mengisi formulir pemesanan. Backend memvalidasi data, memeriksa stok dan kapasitas harian, lalu menyimpan pesanan jika memenuhi aturan yang berlaku.
4. Website menampilkan ringkasan dan status pesanan, termasuk informasi pembayaran saat pesanan diterima serta tarif pengantaran yang telah dikonfigurasi.
5. Admin melihat pesanan melalui area admin dan memperbarui statusnya sesuai proses operasional.

**Pengelolaan oleh admin**

1. Admin masuk melalui halaman autentikasi yang tidak tersedia bagi pelanggan.
2. Setelah autentikasi berhasil, admin mengelola produk, foto, stok, kapasitas harian, tarif pengantaran, dan pesanan sesuai hak aksesnya.
3. Setiap perubahan dikirim ke backend, divalidasi, dan disimpan pada database atau penyimpanan gambar yang sesuai.
4. Perubahan yang memengaruhi katalog atau ketersediaan ditampilkan kepada pelanggan melalui permintaan berikutnya ke backend.

### 3.2 Tanggung jawab komponen

#### Website responsif

Frontend menyediakan pengalaman penggunaan bagi pelanggan dan admin, dengan tampilan yang menyesuaikan ukuran layar. Tanggung jawabnya mencakup:

- Menampilkan katalog, informasi produk, formulir pemesanan, ringkasan pesanan, dan status yang tersedia.
- Menyediakan antarmuka admin untuk pengelolaan produk, pesanan, stok, dan kapasitas harian.
- Memeriksa kelengkapan masukan secara awal untuk membantu pengguna, tanpa menggantikan validasi di backend.
- Mengirim permintaan ke backend melalui antarmuka komunikasi yang terdefinisi.
- Menyampaikan hasil atau kesalahan dari backend dengan jelas.

Frontend tidak menjadi sumber kebenaran untuk harga, stok, kapasitas, status pesanan, atau hak akses. Nilai tersebut harus divalidasi dan ditegakkan oleh backend.

#### Backend aplikasi

Backend menjadi lapisan utama untuk aturan bisnis dan koordinasi antara website, database, serta penyimpanan gambar. Tanggung jawabnya meliputi:

- Menyediakan operasi untuk membaca katalog, membuat pesanan, mengakses fungsi admin, dan memperbarui data.
- Memvalidasi masukan, harga, status, dan hak akses sebelum memproses perubahan.
- Memeriksa stok serta kapasitas harian saat pesanan dibuat atau diperbarui agar data tidak sekadar bergantung pada tampilan frontend.
- Menyimpan perubahan secara konsisten dan mengembalikan hasil yang dapat dipahami oleh website.
- Menerapkan autentikasi dan otorisasi admin pada setiap operasi yang memerlukan akses terbatas.
- Menangani metadata gambar dan hubungan antara gambar dengan produk, sementara berkas gambar dikelola oleh penyimpanan gambar.

Aturan bisnis terkait jadwal pengantaran, area layanan, nilai ongkir, pembatalan, dan notifikasi belum ditetapkan. Backend perlu dirancang agar aturan tersebut dapat dikonfigurasi atau ditambahkan setelah keputusan operasional dikonfirmasi, tanpa mengasumsikan perilaku yang belum disepakati.

#### Database relasional

Database relasional menyimpan data terstruktur dan menjaga hubungan antardata. Entitas yang diperkirakan diperlukan meliputi:

- Produk, harga, deskripsi, dan status ketersediaan.
- Referensi foto produk dan urutan tampilnya.
- Pesanan beserta rincian produk, jumlah, harga yang berlaku saat pemesanan, dan data kontak pelanggan yang diperlukan.
- Stok dan kapasitas harian.
- Akun admin dan informasi yang diperlukan untuk pengelolaan akses.
- Konfigurasi operasional yang telah disepakati, seperti tarif pengantaran tetap.

Perubahan yang saling terkait—misalnya pencatatan pesanan dan penyesuaian ketersediaan—perlu diproses secara konsisten agar kegagalan di tengah proses tidak menghasilkan data yang bertentangan. Informasi pelanggan harus dibatasi pada kebutuhan pemesanan dan dilindungi sesuai kebijakan privasi yang ditetapkan proyek.

#### Autentikasi dan otorisasi admin

Fungsi pengelolaan hanya dapat digunakan oleh admin yang telah terautentikasi. Backend, bukan hanya frontend, harus memeriksa identitas dan hak akses pada setiap operasi admin. Kredensial harus disimpan dengan aman dan tidak pernah ditanamkan pada kode frontend.

Untuk MVP, kebutuhan dapat dimulai dari peran admin terbatas. Pengelolaan sesi, kebijakan kata sandi, pemulihan akses, dan jumlah peran perlu ditentukan sebelum implementasi. Halaman admin sebaiknya tidak menampilkan atau mengubah data pelanggan lebih dari yang diperlukan untuk memproses pesanan.

#### Penyimpanan foto produk

Berkas foto produk disimpan pada penyimpanan berkas atau objek yang terpisah dari database relasional. Database menyimpan metadata dan referensi berkas, seperti lokasi, nama, atau urutan tampilan; backend mengatur proses unggah, validasi, pengaitan dengan produk, dan penghapusan sesuai kebijakan.

Foto yang ditampilkan kepada pelanggan dapat disajikan melalui URL atau mekanisme akses yang sesuai dengan layanan yang kelak dipilih. Ukuran dan tipe berkas perlu dibatasi, dan foto sebaiknya dioptimalkan untuk penggunaan web. Pilihan penyedia, aturan akses, serta strategi pencadangan belum ditetapkan.

### 3.3 Pendekatan arsitektur yang disarankan

Untuk MVP satu toko, pendekatan **monolitik modular** disarankan. Frontend dan backend dapat dikembangkan serta dirilis sebagai satu aplikasi atau satu kesatuan operasional, sementara kode backend dibagi berdasarkan tanggung jawab, misalnya katalog, pemesanan, inventaris dan kapasitas, serta administrasi.

Pendekatan ini menjaga sistem tetap sederhana untuk dibangun dan dioperasikan, sekaligus membuat aturan tiap area lebih mudah dipahami dan diuji. Jika kebutuhan meningkat, modul dapat dipisahkan kemudian berdasarkan kebutuhan nyata; pemisahan layanan sejak awal tidak menjadi prasyarat MVP.

Pilihan framework, basis data tertentu, penyedia hosting, layanan penyimpanan gambar, dan mekanisme pengiriman notifikasi belum diputuskan. Keputusan tersebut perlu dibuat pada tahap desain teknis setelah mempertimbangkan kemampuan tim, biaya, keamanan, pemeliharaan, dan kebutuhan peluncuran.

### 3.4 Batas keputusan sebelum implementasi final

Arsitektur ini mendukung kebutuhan MVP yang telah disebutkan, tetapi beberapa aturan operasional harus dikonfirmasi sebelum perilakunya ditetapkan dalam backend dan antarmuka:

- Jadwal dan jangka waktu pengantaran yang dapat dipilih pelanggan.
- Area pengantaran yang dilayani dan nilai tarif tetap yang berlaku.
- Syarat, tenggat, serta alur pembatalan pesanan.
- Apakah notifikasi diperlukan, jenis kanalnya, dan peristiwa yang memicunya.

Sebelum keputusan tersebut tersedia, implementasi sebaiknya tidak menjanjikan pilihan atau proses tertentu kepada pelanggan. Aturan yang disepakati nantinya perlu divalidasi di backend dan ditampilkan secara konsisten pada website pelanggan maupun area admin.

This response was delivered by ai.amanai.dev

## 4. Modul Aplikasi dan Batas Tanggung Jawab

Aplikasi dibagi menjadi modul-modul dengan tanggung jawab yang jelas agar alur pemesanan mudah dipahami, aturan bisnis dapat diuji, dan perubahan pada satu area tidak menimbulkan dampak yang tidak perlu pada area lain. Batas antarmodul pada MVP dapat diterapkan di dalam satu aplikasi; pemisahan ini adalah batas tanggung jawab logis, bukan persyaratan untuk menggunakan layanan atau server terpisah.

### 4.1 Ringkasan Modul

| Modul | Tanggung jawab utama |
|---|---|
| Katalog dan kategori | Menyajikan produk yang tersedia untuk dipesan beserta pengelompokan dan informasi ringkasnya. |
| Detail produk dan varian | Menampilkan informasi produk, pilihan varian, harga, dan ketersediaan yang relevan. |
| Formulir pemesanan | Mengumpulkan data pelanggan, pilihan produk, dan informasi pengantaran yang diperlukan. |
| Validasi stok dan kapasitas | Memeriksa bahwa jumlah produk dan kapasitas pemesanan pada tanggal yang dipilih mencukupi. |
| Perhitungan ongkir tetap | Menghitung ongkir berdasarkan konfigurasi tarif dan cakupan pengantaran toko. |
| Pengelolaan pesanan | Membuat, menyimpan, menampilkan, dan memperbarui pesanan beserta statusnya. |
| Autentikasi admin | Membatasi akses ke fungsi administrasi kepada pengguna yang berwenang. |
| Konfigurasi toko | Menyimpan aturan operasional yang dapat diatur admin, termasuk pengantaran dan kapasitas. |

### 4.2 Katalog dan Kategori

Modul katalog menyediakan daftar produk yang dapat dilihat pelanggan tanpa perlu masuk ke akun. Modul ini bertanggung jawab untuk:

- Menampilkan produk aktif yang ditandai tersedia untuk pemesanan.
- Menyajikan nama, gambar, deskripsi ringkas, harga awal atau harga yang sesuai dengan varian, serta informasi ketersediaan.
- Mengelompokkan produk ke dalam kategori, misalnya kue kering, cake, atau hampers.
- Mendukung navigasi dari kategori ke produk dan dari produk ke detailnya.
- Tidak menampilkan produk nonaktif atau produk yang sementara tidak ditawarkan kepada pelanggan, sesuai kebijakan tampilan yang ditetapkan toko.

Kategori berfungsi untuk pengelompokan dan navigasi, bukan sebagai tempat penyimpanan aturan harga atau stok. Perubahan kategori tidak boleh mengubah pesanan yang sudah dibuat. Pesanan perlu menyimpan informasi produk yang dibeli sebagai data transaksi, sehingga riwayatnya tetap dapat dibaca meskipun nama, kategori, atau detail katalog kemudian diperbarui.

### 4.3 Detail Produk dan Varian

Modul detail produk menyampaikan informasi yang dibutuhkan pelanggan sebelum memilih produk. Informasi dapat mencakup nama, gambar, deskripsi lengkap, harga, ketersediaan, serta catatan penting seperti jumlah isi, ukuran, atau informasi produk lain yang disediakan toko.

Jika suatu produk memiliki varian—misalnya ukuran, rasa, atau paket—pelanggan harus memilih varian yang valid sebelum menambahkan produk ke pesanan. Setiap varian yang dapat dipesan perlu memiliki identitas dan harga yang jelas. Aturan stok dapat berlaku pada tingkat produk atau varian, bergantung pada model inventaris yang diputuskan untuk MVP; aturan tersebut harus konsisten pada katalog, formulir pemesanan, dan validasi akhir.

Modul ini bertanggung jawab menampilkan pilihan dan menyampaikan pilihan pelanggan kepada proses pemesanan. Modul ini tidak bertanggung jawab untuk menjamin ketersediaan stok hingga transaksi selesai. Ketersediaan yang tampil dapat berubah, sehingga pilihan tetap harus divalidasi kembali saat pesanan diajukan.

### 4.4 Formulir Pemesanan

Formulir pemesanan mengumpulkan informasi yang diperlukan untuk membuat pesanan. Untuk MVP, formulir setidaknya mencakup:

- Produk, varian, dan jumlah masing-masing.
- Nama pelanggan.
- Nomor telepon atau cara kontak yang disepakati.
- Alamat pengantaran.
- Tanggal pengantaran atau pemenuhan, jika pemesanan berdasarkan tanggal diaktifkan.
- Catatan pesanan yang bersifat opsional, jika didukung.

Sebelum mengirimkan formulir, pelanggan harus dapat meninjau ringkasan item, jumlah, subtotal, ongkir, dan total yang harus dibayar. Karena metode pembayaran MVP adalah pembayaran saat pesanan diterima, ringkasan harus menjelaskan cara pembayaran tersebut dengan bahasa yang tidak ambigu. Aplikasi tidak memproses pembayaran daring pada MVP.

Validasi dilakukan di antarmuka untuk membantu pelanggan memperbaiki isian, lalu diulang pada sisi server sebelum pesanan disimpan. Validasi sisi server adalah pemeriksaan otoritatif; aplikasi tidak boleh mengandalkan harga, ongkir, atau nilai ketersediaan yang dikirim langsung dari peramban. Nilai transaksi dihitung kembali dari data produk dan konfigurasi toko yang berlaku.

### 4.5 Validasi Stok dan Kapasitas

Modul validasi memeriksa apakah pesanan dapat diterima berdasarkan ketersediaan produk dan kapasitas operasional toko. Pemeriksaan ini mencakup:

1. Produk dan varian masih aktif serta dapat dipesan.
2. Jumlah yang diminta valid dan tidak melampaui stok yang tersedia, jika stok dikelola per produk atau varian.
3. Tanggal yang diminta termasuk tanggal pemenuhan yang diizinkan.
4. Pesanan tidak melampaui kapasitas harian yang telah dikonfigurasi, apabila batas kapasitas diterapkan.
5. Semua pemeriksaan masih benar pada saat pesanan dikonfirmasi oleh sistem.

Stok dan kapasitas harian adalah dua batas yang berbeda. Stok membatasi jumlah produk tertentu; kapasitas harian membatasi beban total yang dapat dilayani toko pada tanggal tertentu. Aturan penghitungan kapasitas—misalnya berdasarkan jumlah pesanan, jumlah item, atau satuan kerja produksi—harus ditetapkan sebelum implementasi final.

Untuk mencegah penerimaan pesanan berlebih, pemeriksaan dan pencatatan pesanan harus dilakukan dengan cara yang aman terhadap permintaan bersamaan. Jika stok atau kapasitas tidak mencukupi, sistem harus menolak pembuatan pesanan dan menjelaskan bagian yang perlu diubah, bukan menerima pesanan lalu mengandalkan koreksi manual sebagai jalur normal.

Kapan stok atau kapasitas dikurangi—saat pesanan dibuat, saat admin menerima pesanan, atau pada tahap lain—merupakan keputusan bisnis yang perlu dikonfirmasi. Keputusan tersebut harus diterapkan secara konsisten, termasuk ketika pesanan dibatalkan.

### 4.6 Perhitungan Ongkir Tetap

Modul ongkir menghitung biaya pengantaran menggunakan tarif tetap yang ditentukan toko, bukan tarif dinamis berdasarkan jarak atau penyedia logistik. Perhitungan dilakukan di sisi server dan hasilnya ditampilkan kepada pelanggan sebelum pesanan diajukan.

Nilai tarif dan cakupan pengantaran belum ditentukan dalam brief. Sebelum implementasi final, pemilik toko perlu mengonfirmasi:

- Area yang dilayani dan cara alamat diperiksa terhadap area tersebut.
- Nilai ongkir tetap, termasuk apakah tarif sama untuk seluruh area.
- Apakah ada ambang, pengecualian, atau kondisi khusus yang mengubah biaya.
- Apakah pelanggan dapat memilih pengambilan sendiri atau hanya pengantaran.

Jika alamat berada di luar area layanan, sistem harus mencegah pelanggan mengirim pesanan dengan metode pengantaran tersebut dan memberikan penjelasan yang dapat ditindaklanjuti. Ongkir yang ditampilkan pada ringkasan harus sama dengan ongkir yang disimpan pada pesanan. Perubahan konfigurasi tarif setelah pesanan dibuat tidak boleh mengubah nilai ongkir pada pesanan lama.

### 4.7 Pengelolaan Pesanan

Modul pengelolaan pesanan menjadi sumber pencatatan transaksi yang digunakan pelanggan dan admin. Modul ini bertanggung jawab untuk:

- Menyimpan data pelanggan, rincian item, varian, jumlah, alamat, jadwal yang dipilih, subtotal, ongkir, total, metode pembayaran, dan catatan yang relevan.
- Menetapkan identitas atau nomor pesanan yang dapat digunakan untuk merujuk pesanan.
- Menyimpan status pesanan dan waktu perubahan status.
- Menyediakan ringkasan pesanan bagi admin untuk ditinjau dan diproses.
- Menyajikan konfirmasi kepada pelanggan setelah pesanan berhasil dibuat.

Status pesanan harus menggambarkan proses kerja yang disepakati. Status minimum dapat mencakup pesanan baru, dikonfirmasi, sedang disiapkan, siap atau dalam pengantaran, selesai, dan dibatalkan. Nama, urutan, transisi yang diizinkan, serta pihak yang boleh melakukan perubahan harus dikonfirmasi sebelum dijadikan aturan final. Aplikasi sebaiknya mencegah transisi yang tidak masuk akal dan mencatat perubahan status agar riwayat penanganan dapat ditelusuri.

Kebijakan pembatalan belum ditentukan. Karena itu, sistem harus dirancang agar aturan pembatalan dapat dinyatakan dengan jelas, termasuk pihak yang boleh membatalkan, batas waktu pembatalan, dampaknya terhadap stok dan kapasitas, serta cara pembatalan dikomunikasikan kepada pelanggan. Sampai kebijakan disepakati, alur pembatalan tidak boleh dianggap memiliki perilaku final.

Konfirmasi setelah pesanan dibuat adalah bagian dari pengalaman pelanggan. Bentuk penyampaiannya—misalnya halaman konfirmasi saja, pesan melalui kanal tertentu, atau keduanya—belum dipastikan. Implementasi harus membedakan antara konfirmasi bahwa sistem berhasil mencatat pesanan dan konfirmasi bahwa admin telah menyetujui atau siap memenuhinya. Notifikasi otomatis melalui email, SMS, atau aplikasi pesan juga masih perlu dikonfirmasi.

### 4.8 Autentikasi Admin

Modul autentikasi admin melindungi fungsi pengelolaan katalog, stok, konfigurasi toko, dan status pesanan. Area administrasi tidak boleh dapat diakses hanya dengan mengetahui alamat halaman; setiap operasi administratif harus memerlukan sesi autentikasi yang sah.

Untuk cakupan MVP, akses dapat dibatasi pada peran admin dengan kewenangan yang ditetapkan secara eksplisit. Modul ini bertanggung jawab atas:

- Proses masuk dan keluar admin.
- Pemeriksaan identitas dan kewenangan sebelum operasi administrasi dijalankan.
- Perlindungan halaman dan titik akses administratif dari pengguna yang tidak berwenang.
- Penanganan sesi dan kegagalan autentikasi secara aman.

Pengelolaan akun, pemulihan kata sandi, jumlah admin, dan pembagian peran lanjutan perlu disesuaikan dengan kebutuhan operasional toko. Kredensial dan rahasia autentikasi tidak boleh ditampilkan kepada pelanggan atau disimpan dalam bentuk yang dapat dibaca langsung. Autentikasi admin tidak memberikan akses ke pembayaran daring, karena pembayaran daring bukan bagian dari MVP.

### 4.9 Konfigurasi Toko

Modul konfigurasi menyimpan aturan operasional yang digunakan modul lain, sehingga nilai yang berlaku tidak tersebar atau ditanam langsung pada antarmuka. Konfigurasi yang relevan meliputi:

- Tarif ongkir tetap dan area pengantaran.
- Tanggal atau hari pengantaran yang tersedia.
- Kapasitas harian dan cara kapasitas dihitung.
- Batas atau jeda pemesanan, jika toko membutuhkannya.
- Informasi toko dan instruksi pembayaran saat pesanan diterima.
- Aturan ketersediaan produk yang berlaku pada periode tertentu, bila diperlukan.

Jadwal pengantaran, cakupan area, nilai ongkir, kebijakan pembatalan, dan kanal notifikasi belum ditetapkan dalam brief. Semua itu merupakan keputusan yang harus dikonfirmasi oleh pemilik toko sebelum konfigurasi dan perilaku terkait dianggap final. Perubahan konfigurasi harus divalidasi dan, jika memengaruhi pesanan yang sudah tersimpan, tidak boleh mengubah rincian historis pesanan.

### 4.10 Alur Pelanggan

Alur pelanggan dari penemuan produk hingga konfirmasi adalah sebagai berikut:

1. **Melihat katalog.** Pelanggan membuka website, menelusuri kategori, dan melihat produk yang ditawarkan.
2. **Memeriksa detail.** Pelanggan membuka produk untuk membaca deskripsi, harga, ketersediaan, dan pilihan varian.
3. **Memilih produk.** Pelanggan memilih varian dan jumlah. Sistem dapat memberikan indikasi ketersediaan, tetapi hasil akhir tetap bergantung pada validasi saat pengajuan.
4. **Mengisi formulir.** Pelanggan memasukkan informasi kontak, alamat, tanggal yang diinginkan jika tersedia, dan catatan opsional.
5. **Meninjau ringkasan.** Sistem menghitung ulang subtotal, ongkir tetap yang berlaku, dan total. Pelanggan meninjau metode pembayaran saat pesanan diterima sebelum melanjutkan.
6. **Mengajukan pesanan.** Sistem memvalidasi produk, stok, kapasitas, jadwal, cakupan pengantaran, dan data wajib di sisi server.
7. **Menerima hasil.** Jika validasi berhasil, sistem menyimpan pesanan dan menampilkan konfirmasi beserta nomor atau identitas pesanan dan ringkasannya. Jika gagal, sistem tidak membuat pesanan dan menjelaskan masalah yang perlu diperbaiki.
8. **Menerima pembaruan.** Pelanggan dapat menerima informasi status melalui kanal yang ditetapkan. Kanal dan cakupan notifikasi otomatis masih perlu dikonfirmasi.

### 4.11 Alur Admin

Alur admin dari pengelolaan menu hingga pemrosesan pesanan adalah sebagai berikut:

1. **Masuk ke area admin.** Admin melakukan autentikasi sebelum menggunakan fungsi pengelolaan.
2. **Mengelola menu.** Admin membuat atau memperbarui produk, kategori, deskripsi, harga, gambar, varian, dan status aktif. Perubahan katalog berlaku untuk pemesanan berikutnya dan tidak mengubah rincian transaksi yang telah tercatat.
3. **Memperbarui ketersediaan.** Admin memperbarui stok atau status produk sesuai model inventaris yang dipilih, serta memeriksa kapasitas dan jadwal yang tersedia.
4. **Mengatur operasional toko.** Admin memperbarui tarif ongkir, area layanan, kapasitas, jadwal, dan instruksi pembayaran sesuai keputusan yang telah disetujui.
5. **Meninjau pesanan baru.** Admin melihat rincian pelanggan dan item, tanggal yang diminta, total, serta catatan pesanan.
6. **Memproses pesanan.** Admin memperbarui status sesuai urutan kerja yang ditetapkan. Sistem menyimpan perubahan status dan waktu perubahannya.
7. **Menangani perubahan atau pembatalan.** Admin mengikuti kebijakan pembatalan yang telah dikonfirmasi dan memastikan dampaknya terhadap stok serta kapasitas tercatat.
8. **Menyelesaikan pesanan.** Admin menandai pesanan selesai setelah pemenuhan dilakukan. Pelanggan menerima pembaruan hanya melalui kanal yang telah diputuskan dan diaktifkan.

### 4.12 Batas Antarmodul dan Konsistensi Data

Antarmuka pelanggan bertanggung jawab untuk mengumpulkan pilihan dan menampilkan informasi; antarmuka admin bertanggung jawab untuk operasi pengelolaan; sedangkan aturan bisnis dijalankan dan ditegakkan oleh lapisan aplikasi di sisi server. Dengan demikian, harga, ongkir, stok, kapasitas, dan status tidak boleh dianggap valid hanya karena telah dikirim atau ditampilkan oleh peramban.

Data pesanan harus mempertahankan nilai yang berlaku ketika pesanan dibuat, setidaknya untuk item dan harga, ongkir, total, informasi pemenuhan, serta identitas produk atau varian. Data tersebut digunakan sebagai rekam transaksi dan tidak boleh berubah hanya karena katalog atau konfigurasi toko berubah kemudian. Batas ini menjaga hasil yang dilihat pelanggan tetap selaras dengan catatan yang digunakan admin.

This response was delivered by ai.amanai.dev

## 5. Model Data dan Aturan Bisnis

Model data MVP perlu mendukung katalog yang dapat berubah tanpa mengubah riwayat pesanan, pencatatan stok yang konsisten saat pesanan dibuat bersamaan, serta pembatasan kapasitas produksi dan pengantaran per hari. Rekomendasi berikut mengasumsikan satu toko, satu mata uang, dan pembayaran dilakukan saat pesanan diterima. Jadwal pengantaran, area layanan, nilai ongkir, aturan pembatalan, dan kebijakan pengembalian stok tetap harus dikonfirmasi sebelum implementasi final.

### Entitas dan data minimum

| Entitas | Data minimum | Tujuan dan hubungan |
|---|---|---|
| **Kategori** (`categories`) | `id`, `name`, `slug`, `sort_order`, `is_active`, `created_at`, `updated_at` | Mengelompokkan produk. Satu kategori dapat memiliki banyak produk. Produk yang sudah pernah dipesan sebaiknya dinonaktifkan, bukan dihapus. |
| **Produk** (`products`) | `id`, `category_id`, `name`, `slug`, `description`, `image_url`, `is_active`, `sort_order`, `created_at`, `updated_at` | Data katalog yang ditampilkan kepada pelanggan. Setiap produk berada pada satu kategori dan dapat memiliki satu atau lebih varian. |
| **Varian** (`product_variants`) | `id`, `product_id`, `name`, `sku` (opsional), `price`, `is_active`, `created_at`, `updated_at` | Pilihan produk yang dapat dipesan, misalnya ukuran atau isi. Harga disimpan sebagai bilangan bulat dalam unit terkecil mata uang yang digunakan; jangan menggunakan bilangan pecahan floating-point untuk perhitungan uang. |
| **Stok** (`inventory`) | `variant_id`, `on_hand`, `reserved`, `updated_at` | Menyimpan jumlah unit fisik dan unit yang sedang dicadangkan. `variant_id` menjadi kunci unik. Stok tersedia dihitung sebagai `on_hand - reserved`. |
| **Pesanan** (`orders`) | `id`, `order_number`, `customer_name`, `customer_phone`, `customer_email` (opsional), `delivery_address`, `delivery_date`, `delivery_window` (jika berlaku), `status`, `payment_method`, `payment_status`, `subtotal`, `delivery_fee`, `total`, `customer_note` (opsional), `created_at`, `updated_at`, `cancelled_at` (opsional) | Mewakili satu pemesanan pelanggan. Menyimpan salinan data kontak dan alamat agar perubahan profil atau data lain tidak mengubah detail pesanan. Memiliki banyak item pesanan. |
| **Item pesanan** (`order_items`) | `id`, `order_id`, `variant_id` (opsional untuk referensi), `product_name_snapshot`, `variant_name_snapshot`, `unit_price_snapshot`, `quantity`, `line_total` | Mencatat produk dan varian yang benar-benar dipesan. Snapshot menjaga riwayat tetap akurat jika nama, harga, atau katalog berubah. Memiliki relasi ke pesanan dan, bila masih tersedia, ke varian asal. |
| **Kapasitas harian** (`daily_capacity`) | `id`, `service_date`, `capacity_limit`, `reserved_capacity`, `is_closed`, `updated_at` | Membatasi jumlah pesanan atau unit produksi yang dapat diterima pada suatu tanggal. Gunakan satu baris unik per tanggal dan jenis layanan jika kapasitas produksi dan pengantaran dibatasi secara terpisah. |
| **Konfigurasi pengantaran** (`delivery_config`) | `id`, `is_enabled`, `delivery_fee`, `service_area_description` atau data zona, `schedule_rules`, `updated_at` | Menyimpan aturan pengantaran yang berlaku, termasuk tarif dan area layanan. Jika ongkir berbeda menurut zona atau tanggal, modelkan tarif sebagai tabel aturan terpisah dengan masa berlaku, zona, dan prioritas yang jelas. |
| **Admin** (`admins`) | `id`, `name`, `email`, `password_hash` atau identitas penyedia autentikasi, `role`, `is_active`, `created_at`, `last_login_at` | Mengelola akses ke halaman admin. Kata sandi tidak boleh disimpan dalam bentuk teks biasa. Perubahan katalog, stok, kapasitas, dan status pesanan sebaiknya mencatat admin yang melakukan tindakan. |

Harga pada pesanan disimpan dalam satuan mata uang yang konsisten, misalnya rupiah sebagai bilangan bulat. Jika sistem menyimpan stok dalam tabel terpisah, pembaruan stok harus tetap berada dalam transaksi yang sama dengan perubahan status pesanan.

### Hubungan dan integritas data

- `categories` memiliki relasi satu-ke-banyak dengan `products`.
- `products` memiliki relasi satu-ke-banyak dengan `product_variants`.
- Setiap varian memiliki paling banyak satu baris stok aktif pada `inventory`.
- `orders` memiliki relasi satu-ke-banyak dengan `order_items`.
- `order_items.variant_id` dapat menggunakan relasi nullable agar riwayat pesanan tetap dapat dibaca apabila varian kemudian diarsipkan. Snapshot pada item tetap menjadi sumber utama untuk nama dan harga historis.
- `daily_capacity` harus memiliki batasan unik untuk kombinasi tanggal dan jenis kapasitas yang dikelolanya.
- Gunakan foreign key, batasan nilai positif untuk harga dan kuantitas, serta batasan unik untuk `order_number` dan SKU jika SKU digunakan.
- Produk, varian, kategori, dan admin yang sudah dirujuk oleh data historis umumnya dinonaktifkan atau diarsipkan, bukan dihapus secara permanen.

### Snapshot katalog pada item pesanan

Saat pesanan dibuat, salin nama produk, nama varian, dan harga satuan yang ditampilkan serta disetujui pelanggan ke dalam kolom snapshot item pesanan. Simpan pula kuantitas dan total baris item. Dengan demikian, pesanan lama tetap menampilkan rincian yang benar walaupun admin mengganti nama produk, mengubah varian, memperbarui harga, atau menonaktifkan katalog.

Referensi `variant_id` tetap berguna untuk pelaporan dan penelusuran, tetapi tidak boleh menjadi satu-satunya sumber informasi untuk menampilkan pesanan historis. Perubahan katalog setelah pesanan dibuat tidak boleh memperbarui snapshot atau total pesanan yang sudah tercatat.

### Aturan perhitungan harga

Untuk setiap item:

`total_item = harga_satuan_snapshot × kuantitas`

Untuk keseluruhan pesanan:

`subtotal = jumlah seluruh total_item`

`total = subtotal + ongkir_snapshot`

Ongkir yang dikenakan sebaiknya disalin ke pesanan sebagai `delivery_fee` saat pelanggan mengirim pesanan. Jika ongkir bergantung pada zona atau tanggal, sistem harus menentukan tarif yang berlaku berdasarkan aturan yang sudah dikonfirmasi, lalu menyimpan nilai yang dikenakan. Perubahan konfigurasi tarif berikutnya tidak boleh mengubah total pesanan lama.

Pada MVP, total tidak mencakup diskon, pajak, biaya tambahan, atau pembulatan kecuali kebijakan tersebut ditentukan secara eksplisit. Nilai harga dan total harus dihitung atau diverifikasi di server; jangan mempercayai total yang dikirim hanya oleh browser. Sebelum menyimpan pesanan, server menghitung ulang subtotal dan total dari harga katalog terkini yang masih berlaku, kuantitas, serta ongkir yang ditetapkan sistem.

### Validasi ketersediaan

Sebelum menerima pesanan, server harus memvalidasi seluruh hal berikut:

1. Produk dan varian masih aktif serta dapat dipesan.
2. Kuantitas setiap item merupakan bilangan bulat positif dan tidak melampaui batas yang ditetapkan, jika ada.
3. Stok tersedia cukup untuk setiap varian, bila varian menggunakan pelacakan stok.
4. Tanggal dan, jika diterapkan, jendela pengantaran tersedia serta belum ditutup.
5. Kapasitas tersisa cukup untuk seluruh pesanan berdasarkan satuan kapasitas yang telah ditetapkan—misalnya jumlah pesanan, jumlah unit, atau beban produksi.
6. Alamat berada di area layanan yang dikonfirmasi dan ongkir dapat ditentukan.
7. Harga, ongkir, subtotal, dan total dihitung ulang di sisi server menggunakan data yang berlaku.

Jika produk dibuat sesuai pesanan dan tidak dibatasi stok fisik, ketersediaannya tetap harus dibatasi melalui kapasitas harian. Kebijakan mengenai stok negatif, produk tanpa batas stok, batas maksimum per pelanggan, dan masa berlaku reservasi perlu ditentukan sebelum implementasi.

### Transaksi, stok, dan pesanan bersamaan

Pemeriksaan ketersediaan lalu penyimpanan pesanan tidak boleh dilakukan sebagai dua langkah terpisah tanpa pengamanan. Dua pelanggan dapat memesan unit terakhir secara bersamaan. Buat pesanan dan alokasikan stok serta kapasitas dalam satu transaksi basis data yang atomik.

Pola yang direkomendasikan:

1. Mulai transaksi.
2. Kunci baris stok varian dan baris kapasitas untuk tanggal yang dipilih, misalnya dengan penguncian baris (`SELECT ... FOR UPDATE`), atau lakukan pembaruan bersyarat yang atomik.
3. Baca ulang ketersediaan setelah kunci diperoleh.
4. Jika stok atau kapasitas tidak cukup, batalkan transaksi dan kembalikan pesan bahwa pilihan sudah tidak tersedia.
5. Jika cukup, naikkan nilai `reserved` dan `reserved_capacity` atau kurangi jumlah tersedia dengan operasi atomik.
6. Buat pesanan beserta snapshot item, ongkir, dan total.
7. Commit transaksi hanya jika seluruh langkah berhasil; jika ada kegagalan, rollback seluruh perubahan.

Transaksi harus mencakup semua varian dalam pesanan. Gunakan urutan penguncian yang konsisten, misalnya berdasarkan `variant_id`, untuk mengurangi risiko deadlock. Tambahkan penanganan percobaan ulang yang terbatas untuk deadlock atau konflik transaksi. Permintaan pembuatan pesanan juga sebaiknya memiliki kunci idempotensi atau mekanisme setara agar pengiriman ulang akibat koneksi terputus tidak membuat pesanan dan reservasi ganda.

### Status pesanan dan pembayaran

Pisahkan status pemenuhan pesanan dari status pembayaran agar keduanya tidak tercampur. Contoh status pesanan yang dapat disesuaikan:

- `pending_confirmation`: pesanan diterima dan menunggu konfirmasi admin, bila proses konfirmasi diperlukan.
- `confirmed`: pesanan diterima dan dijadwalkan.
- `preparing`: pesanan sedang dibuat.
- `ready`: pesanan siap diserahkan atau diantarkan.
- `completed`: pesanan telah diterima pelanggan.
- `cancelled`: pesanan dibatalkan.

Karena pembayaran dilakukan saat pesanan diterima, `payment_status` dapat dimulai sebagai `unpaid` lalu berubah menjadi `paid` setelah pembayaran dikonfirmasi. Sistem harus menentukan apakah pesanan langsung dianggap dikonfirmasi ketika dikirim atau baru setelah admin memeriksanya. Status yang diperbolehkan dan transisinya sebaiknya divalidasi di server; perubahan penting dicatat dalam riwayat status beserta waktu dan admin yang melakukan perubahan.

### Pembatalan dan pelepasan alokasi

Dampak pembatalan terhadap stok dan kapasitas bergantung pada tahap pesanan dan kebijakan bisnis yang dikonfirmasi. Aturan teknis yang direkomendasikan:

- Batalkan pesanan melalui operasi transaksional yang mengubah status hanya jika status saat ini mengizinkan pembatalan.
- Jika stok atau kapasitas masih dicadangkan dan produksi belum dimulai, kurangi `reserved` dan `reserved_capacity` dalam transaksi yang sama dengan perubahan status menjadi `cancelled`.
- Jika stok sudah dikurangi langsung dari `on_hand`, tambahkan kembali stok hanya bila barang tersebut benar-benar dapat dijual kembali dan kebijakan pembatalan mengizinkannya.
- Jangan pernah melepas reservasi yang sama dua kali. Periksa status sebelumnya atau simpan catatan alokasi yang dapat digunakan untuk menjamin pelepasan tepat satu kali.
- Jika produksi sudah dimulai, pesanan telah selesai, atau stok tidak dapat dipulihkan, jangan otomatis mengembalikan stok. Perlakuan kapasitas, biaya, dan pembayaran harus mengikuti kebijakan yang disepakati.
- Catat alasan pembatalan, waktu, pihak yang membatalkan, dan perubahan alokasi bila fitur administrasi tersebut disertakan.

Jika pelanggan dapat membatalkan sendiri, tentukan batas waktu dan status yang masih dapat dibatalkan. Jika pembatalan hanya dapat dilakukan admin, antarmuka pelanggan dan aturan akses harus mencerminkan hal tersebut.

### Keputusan yang harus dikonfirmasi

Sebelum skema dan validasi final ditetapkan, pemilik produk perlu memutuskan:

- Apakah pemesanan selalu memerlukan konfirmasi admin atau langsung diterima bila stok dan kapasitas tersedia.
- Apakah kapasitas dihitung per pesanan, per unit, per varian, atau berdasarkan beban produksi.
- Jadwal, jendela waktu, hari libur, batas waktu pemesanan, dan zona waktu yang digunakan.
- Area layanan, cara memvalidasi alamat, serta nilai dan aturan ongkir—termasuk apakah ada zona atau pengecualian.
- Tahapan pesanan yang masih dapat dibatalkan, pihak yang berwenang membatalkan, dan konsekuensinya terhadap stok serta kapasitas.
- Apakah reservasi memiliki masa berlaku dan kapan reservasi dilepas jika pesanan tidak dikonfirmasi.
- Informasi pelanggan wajib, batas kuantitas, kebijakan perubahan pesanan, dan apakah notifikasi termasuk dalam MVP.

Sebelum keputusan tersebut tersedia, rancangan basis data sebaiknya tetap memungkinkan konfigurasi kapasitas, jadwal, tarif, dan status tanpa mengunci aturan bisnis yang belum disepakati ke dalam logika aplikasi.

## 6. API dan Alur Interaksi

Bagian ini mengusulkan antarmuka layanan untuk website pelanggan dan admin. Endpoint dan format payload merupakan rancangan awal yang perlu disesuaikan dengan teknologi implementasi, kebijakan autentikasi, serta keputusan bisnis yang masih terbuka. Seluruh komunikasi API sebaiknya menggunakan HTTPS dan format JSON, kecuali jika implementasi menetapkan format lain.

### 6.1 Prinsip API

- Gunakan prefiks versi, misalnya `/api/v1`, agar perubahan mendatang dapat dikelola tanpa merusak integrasi yang sudah ada.
- Pisahkan operasi publik untuk pelanggan dari operasi admin yang memerlukan autentikasi dan otorisasi.
- Validasi input di server meskipun validasi yang sama juga dilakukan di antarmuka.
- Gunakan kode HTTP dan pesan kesalahan yang konsisten. Respons kesalahan sebaiknya menyertakan kode yang dapat dibaca mesin, pesan untuk pengguna, dan rincian validasi bila relevan.
- Simpan harga, tarif pengantaran, dan total pesanan sebagai nilai yang dihitung server. Jangan mempercayai nilai harga atau total dari klien.
- Gunakan transaksi atau mekanisme atomik saat menyimpan pesanan dan mengurangi stok atau kapasitas agar dua permintaan bersamaan tidak melampaui batas.
- Pertimbangkan kunci idempotensi untuk pengiriman pesanan, sehingga pengulangan permintaan akibat koneksi terputus tidak membuat pesanan ganda.
- Catat perubahan penting—khususnya status pesanan, stok, kapasitas, dan konfigurasi tarif—beserta pengguna dan waktunya.

### 6.2 Model sumber daya

Nama dan struktur berikut adalah konseptual; struktur final dapat berubah sesuai kebutuhan implementasi.

- **Produk:** identitas, nama, deskripsi, gambar, harga, status aktif, serta informasi stok atau ketersediaan.
- **Pesanan:** nomor pesanan, data pelanggan, rincian item, jumlah, pilihan pengantaran atau pengambilan, alamat bila diperlukan, jadwal atau tanggal yang dipilih, ringkasan biaya, metode pembayaran, status pesanan, dan waktu pembuatan.
- **Stok:** jumlah tersedia per produk, serta batas dan aturan pemesanan yang berlaku.
- **Kapasitas harian:** batas pesanan atau unit yang dapat dipenuhi pada tanggal tertentu, serta jumlah yang sudah dialokasikan.
- **Konfigurasi pengantaran:** area layanan dan tarif yang berlaku. Nilai dan cakupan konfigurasi ini belum ditetapkan dan harus dikonfirmasi sebelum peluncuran.

Keluaran API publik hanya boleh memuat informasi yang diperlukan pelanggan. Data pribadi pelanggan tidak boleh disertakan dalam respons katalog atau daftar pesanan publik.

### 6.3 Usulan endpoint

#### Katalog pelanggan

| Metode dan endpoint | Tujuan | Akses |
|---|---|---|
| `GET /api/v1/products` | Mengambil katalog produk aktif | Publik |
| `GET /api/v1/products/{productId}` | Mengambil detail satu produk aktif | Publik |
| `GET /api/v1/availability` | Memeriksa ketersediaan produk atau kapasitas untuk tanggal tertentu, bila jadwal sudah ditetapkan | Publik |
| `POST /api/v1/orders` | Mengirim pesanan baru | Publik, dengan perlindungan terhadap penyalahgunaan |

#### Pengelolaan pesanan

| Metode dan endpoint | Tujuan | Akses |
|---|---|---|
| `GET /api/v1/admin/orders` | Mengambil daftar pesanan untuk admin | Admin |
| `GET /api/v1/admin/orders/{orderId}` | Mengambil detail pesanan untuk admin | Admin |
| `PATCH /api/v1/admin/orders/{orderId}/status` | Memperbarui status pesanan | Admin |
| `GET /api/v1/orders/{orderId}` | Melihat status pesanan tertentu, hanya jika mekanisme akses pelanggan telah ditetapkan | Pelanggan terverifikasi atau akses bertoken |

#### Pengelolaan produk, stok, dan kapasitas

| Metode dan endpoint | Tujuan | Akses |
|---|---|---|
| `POST /api/v1/admin/products` | Membuat produk | Admin |
| `PATCH /api/v1/admin/products/{productId}` | Memperbarui data atau status produk | Admin |
| `GET /api/v1/admin/inventory` | Melihat stok produk | Admin |
| `PATCH /api/v1/admin/inventory/{productId}` | Mengubah stok atau kebijakan ketersediaan produk | Admin |
| `GET /api/v1/admin/capacity` | Melihat kapasitas harian dan alokasinya | Admin |
| `PUT /api/v1/admin/capacity/{date}` | Mengatur kapasitas untuk tanggal tertentu | Admin |
| `GET /api/v1/admin/delivery-settings` | Melihat pengaturan pengantaran | Admin |
| `PUT /api/v1/admin/delivery-settings` | Mengatur area dan tarif pengantaran setelah kebijakannya dikonfirmasi | Admin |

Endpoint pengantaran dan ketersediaan yang bergantung pada jadwal, area layanan, atau tarif hanya perlu diaktifkan setelah aturan bisnis terkait disepakati.

### 6.4 Alur membaca katalog

**Permintaan:** pelanggan meminta daftar produk, misalnya `GET /api/v1/products`. Parameter opsional dapat mencakup pencarian, kategori, urutan, dan pagination, jika fitur tersebut diperlukan.

**Validasi dan aturan:**

- Hanya produk aktif dan layak dijual yang ditampilkan.
- Nilai pagination, filter, dan pengurutan harus dibatasi pada pilihan yang didukung.
- Informasi ketersediaan harus mencerminkan sumber data terbaru yang tersedia, tanpa menjanjikan stok yang belum dialokasikan.

**Keluaran:** daftar produk dengan identitas, nama, deskripsi ringkas, harga, gambar, dan status ketersediaan yang aman ditampilkan kepada pelanggan. Respons daftar dapat menyertakan metadata pagination.

**Kegagalan yang ditangani:**

- `400 Bad Request` untuk parameter tidak valid.
- `500 Internal Server Error` jika katalog gagal dimuat.
- Jika layanan ketersediaan sementara tidak tersedia, sistem dapat tetap menampilkan katalog dengan ketersediaan yang ditandai tidak dapat dipastikan, atau menolak respons sesuai kebijakan produk. Perilaku ini harus konsisten dan tidak boleh menampilkan stok yang diketahui sudah habis sebagai tersedia.

Permintaan detail produk mengikuti aturan yang sama. Produk yang tidak ditemukan atau tidak aktif sebaiknya merespons `404 Not Found`.

### 6.5 Alur mengirim pesanan

**Permintaan:** pelanggan mengirim item yang dipesan, jumlah, informasi kontak, pilihan pemenuhan pesanan, serta alamat atau tanggal yang diperlukan. Contoh bentuk konseptual:

```json
{
  "customer": {
    "name": "Nama Pelanggan",
    "phone": "Nomor Telepon",
    "email": "alamat@example.com"
  },
  "items": [
    {
      "productId": "product-id",
      "quantity": 2
    }
  ],
  "fulfillment": {
    "type": "delivery",
    "date": "YYYY-MM-DD",
    "address": {
      "line1": "Alamat",
      "city": "Kota",
      "postalCode": "Kode Pos"
    }
  },
  "notes": "Catatan pesanan"
}
```

Contoh tersebut tidak menetapkan format tanggal, kewajiban email, struktur alamat final, ataupun pilihan pengambilan/pengantaran. Field dan aturan wajib harus disesuaikan setelah keputusan bisnis dikonfirmasi.

**Validasi dan aturan:**

1. Pastikan setiap produk masih aktif dan dapat dipesan.
2. Pastikan jumlah tiap item merupakan bilangan bulat positif dan memenuhi batas minimum atau maksimum jika ada.
3. Validasi data kontak, alamat, tanggal, serta tipe pemenuhan menurut aturan yang telah disepakati.
4. Periksa stok dan kapasitas untuk seluruh item dan tanggal yang dipilih.
5. Hitung harga item, ongkir, dan total di server menggunakan harga serta tarif terkini. Tolak atau minta pelanggan mengonfirmasi ulang jika harga berubah sejak katalog dilihat, sesuai kebijakan yang ditetapkan.
6. Simpan pesanan dan alokasikan stok serta kapasitas secara atomik. Jika salah satu alokasi gagal, jangan menyimpan pesanan parsial atau mengurangi ketersediaan sebagian.
7. Tetapkan metode pembayaran sesuai MVP: pembayaran saat pesanan diterima. Ini bukan pembayaran daring; status pembayaran dan pencatatan pelunasannya harus dibedakan dari status pemenuhan pesanan.
8. Terapkan validasi batas panjang catatan dan field teks untuk mencegah input berlebihan atau berbahaya.

**Keluaran:** jika berhasil, kembalikan `201 Created` berisi nomor atau ID pesanan, ringkasan item, biaya yang dihitung server, metode pembayaran, status awal, serta informasi yang diperlukan pelanggan untuk merujuk pesanan. Hindari mengembalikan informasi internal admin.

**Kegagalan yang ditangani:**

- `400 Bad Request` untuk format permintaan yang tidak valid.
- `422 Unprocessable Entity` untuk data yang valid secara sintaksis tetapi melanggar aturan bisnis, seperti jumlah tidak valid atau tanggal yang tidak dapat dilayani.
- `404 Not Found` jika produk yang dirujuk tidak tersedia.
- `409 Conflict` jika stok atau kapasitas habis atau berubah sebelum alokasi berhasil.
- `429 Too Many Requests` jika batas perlindungan terhadap spam atau percobaan berulang tercapai.
- `500 Internal Server Error` untuk kegagalan tak terduga, tanpa membocorkan rincian internal.

Jika koneksi gagal setelah pesanan mungkin tersimpan, klien harus dapat mengulang permintaan dengan kunci idempotensi yang sama. Server harus mengembalikan hasil pesanan yang sama, bukan membuat pesanan baru.

### 6.6 Alur melihat daftar dan detail pesanan

**Daftar pesanan admin:** `GET /api/v1/admin/orders` dapat menerima filter status, rentang tanggal, pencarian nomor pesanan, serta pagination.

**Validasi dan aturan:**

- Pastikan pengguna sudah terautentikasi dan memiliki peran yang berwenang.
- Batasi ukuran halaman dan validasi format filter.
- Terapkan prinsip hak akses minimum; hanya admin yang berwenang boleh melihat data pelanggan.
- Jangan memasukkan informasi sensitif ke log pencarian atau parameter URL tanpa kebutuhan.

**Keluaran:** daftar ringkas dengan nomor pesanan, waktu dibuat, nama atau identitas pelanggan seperlunya, total, metode pembayaran, dan status. Detail lengkap diambil melalui `GET /api/v1/admin/orders/{orderId}`.

**Kegagalan yang ditangani:**

- `401 Unauthorized` jika autentikasi tidak ada atau tidak valid.
- `403 Forbidden` jika pengguna tidak memiliki hak akses yang diperlukan.
- `400 Bad Request` untuk filter atau pagination yang tidak valid.
- `404 Not Found` jika pesanan tidak ditemukan.

**Akses pelanggan:** jika pelanggan perlu memeriksa status pesanannya, gunakan mekanisme akses yang tidak menebak ID pesanan, misalnya tautan bertoken atau proses verifikasi yang disepakati. Nomor pesanan saja tidak boleh dianggap sebagai bukti otorisasi. Alur ini memerlukan keputusan tentang cara menyampaikan atau memverifikasi akses, khususnya karena kebijakan notifikasi belum ditetapkan.

### 6.7 Alur memperbarui status pesanan

**Permintaan:** admin mengirim `PATCH /api/v1/admin/orders/{orderId}/status` dengan status tujuan dan, bila diperlukan, catatan internal.

Contoh konseptual:

```json
{
  "status": "confirmed",
  "note": "Pesanan telah diperiksa"
}
```

Nama status pada contoh bukan keputusan final. Daftar status dan transisi yang sah harus ditentukan sebelum implementasi.

**Validasi dan aturan:**

- Pastikan admin terautentikasi dan memiliki izin untuk melakukan transisi yang diminta.
- Pastikan pesanan masih dalam status yang memungkinkan transisi tersebut.
- Validasi bahwa pembatalan, penolakan, atau perubahan lain—jika diizinkan—menangani pelepasan stok dan kapasitas secara konsisten.
- Pisahkan status pemenuhan pesanan dari status pembayaran. Pembayaran saat pesanan diterima tidak berarti status pesanan otomatis selesai atau lunas.
- Catat status sebelumnya, status baru, pelaku, waktu, dan alasan bila diwajibkan.
- Gunakan pemeriksaan versi atau mekanisme setara untuk mencegah pembaruan admin yang bersamaan saling menimpa.

**Keluaran:** status terbaru, waktu perubahan, dan ringkasan pesanan yang diperbarui.

**Kegagalan yang ditangani:**

- `400 Bad Request` untuk nilai status yang tidak dikenal.
- `401 Unauthorized` atau `403 Forbidden` untuk akses yang tidak sah.
- `404 Not Found` jika pesanan tidak ditemukan.
- `409 Conflict` untuk transisi yang dilarang atau jika data berubah bersamaan.
- `500 Internal Server Error` jika pembaruan gagal. Sistem tidak boleh melaporkan perubahan berhasil jika pencatatan status atau perubahan alokasi terkait tidak berhasil.

### 6.8 Alur mengelola produk

**Membuat produk:** admin mengirim data produk melalui `POST /api/v1/admin/products`. **Memperbarui produk:** admin menggunakan `PATCH /api/v1/admin/products/{productId}` untuk mengubah field yang diizinkan, termasuk harga atau status aktif.

**Validasi dan aturan:**

- Pastikan akses admin.
- Validasi field wajib, panjang teks, format gambar atau referensi media, dan format harga.
- Harga harus bernilai nonnegatif serta disimpan dalam satuan mata uang yang ditetapkan oleh implementasi.
- Perubahan harga tidak boleh mengubah total pesanan yang sudah tercatat.
- Menonaktifkan produk mencegah pemesanan baru, tetapi tidak boleh menghapus rincian produk dari pesanan sebelumnya.
- Perubahan stok sebaiknya dilakukan melalui endpoint pengelolaan stok, bukan dengan memperbarui field katalog secara tidak terkontrol.

**Keluaran:** representasi produk setelah perubahan tersimpan.

**Kegagalan yang ditangani:**

- `400 Bad Request` atau `422 Unprocessable Entity` untuk data tidak valid.
- `401 Unauthorized` atau `403 Forbidden` untuk akses yang tidak sah.
- `404 Not Found` untuk produk yang tidak ditemukan.
- `409 Conflict` jika perubahan melanggar aturan, misalnya konflik identitas atau pembaruan bersamaan.

### 6.9 Alur mengatur stok dan kapasitas

**Stok produk:** admin melihat stok melalui `GET /api/v1/admin/inventory`, lalu memperbarui stok atau aturan ketersediaan melalui `PATCH /api/v1/admin/inventory/{productId}`.

**Kapasitas harian:** admin membaca kapasitas melalui `GET /api/v1/admin/capacity` dan menetapkan batas untuk tanggal tertentu melalui `PUT /api/v1/admin/capacity/{date}`.

**Validasi dan aturan:**

- Pastikan akses admin dan validasi tanggal sesuai format dan zona waktu operasional yang telah ditetapkan.
- Jumlah stok, batas kapasitas, dan penyesuaian harus berupa bilangan bulat dalam rentang yang diizinkan.
- Jangan mengizinkan kapasitas diturunkan di bawah jumlah yang sudah dialokasikan tanpa proses penanganan yang eksplisit.
- Jangan menghapus stok atau kapasitas yang sudah dirujuk oleh pesanan aktif.
- Untuk perubahan stok, tentukan apakah admin menetapkan jumlah tersedia baru atau menambahkan/mengurangi jumlah dari nilai sebelumnya. Pilih satu semantik API dan dokumentasikan agar perubahan tidak ditafsirkan berbeda.
- Alokasi pesanan dan perubahan admin harus aman terhadap pembaruan bersamaan.

**Keluaran:** nilai stok atau kapasitas terbaru, jumlah yang sudah dialokasikan, dan jumlah yang masih tersedia, bila aman untuk ditampilkan kepada admin.

**Kegagalan yang ditangani:**

- `400 Bad Request` atau `422 Unprocessable Entity` untuk nilai atau tanggal tidak valid.
- `401 Unauthorized` atau `403 Forbidden` untuk akses yang tidak sah.
- `404 Not Found` untuk produk atau konfigurasi yang tidak ada.
- `409 Conflict` jika perubahan membuat alokasi yang sudah ada tidak valid atau terjadi pembaruan bersamaan.

### 6.10 Ongkir, pembatalan, dan notifikasi

Keputusan mengenai jadwal pengantaran, area layanan, tarif atau nilai ongkir, aturan pembatalan, dan kanal notifikasi belum dikonfirmasi. Karena itu:

- API tidak boleh mengasumsikan nilai ongkir, tanggal layanan, atau cakupan area tertentu.
- Ongkir harus dihitung server berdasarkan konfigurasi yang telah disetujui, bukan angka yang dikirim pelanggan.
- Jika area pengantaran tidak dapat ditentukan atau belum dikonfigurasi, permintaan pengantaran harus ditolak dengan pesan yang jelas, bukan diproses menggunakan nilai bawaan yang tidak disepakati.
- Aturan pembatalan perlu menentukan siapa yang boleh membatalkan, status mana yang dapat dibatalkan, serta bagaimana stok dan kapasitas dikembalikan.
- Notifikasi tidak boleh dijanjikan sampai kanal, isi pesan, pemicu, dan persetujuan pengguna yang diperlukan ditetapkan. Bila notifikasi diimplementasikan, kegagalan pengiriman pesan sebaiknya tidak membatalkan penyimpanan pesanan; kegagalan tersebut perlu dicatat dan dapat dicoba ulang secara aman.

### 6.11 Standar respons dan operasional

Respons sukses sebaiknya memiliki bentuk konsisten, misalnya objek data dan metadata pagination bila diperlukan. Respons kesalahan sebaiknya mengikuti format seragam, seperti:

```json
{
  "error": {
    "code": "AVAILABILITY_CONFLICT",
    "message": "Ketersediaan berubah. Periksa kembali pesanan Anda.",
    "details": []
  }
}
```

Pesan untuk pelanggan harus jelas tanpa mengungkap rincian teknis atau data pelanggan lain. Log server boleh menyimpan konteks teknis yang diperlukan untuk diagnosis, tetapi harus melindungi data pribadi dan rahasia autentikasi.

Sebelum endpoint digunakan dalam produksi, tetapkan dan dokumentasikan skema final, aturan validasi, autentikasi admin, mekanisme akses pelanggan, daftar status dan transisinya, mata uang, zona waktu, kebijakan retry, serta keputusan bisnis yang masih terbuka.

## 7. Keamanan, Privasi, dan Operasi

Keamanan dan privasi harus menjadi bagian dari implementasi MVP sejak awal, bukan tambahan setelah aplikasi diluncurkan. Karena aplikasi menangani pesanan, alamat pelanggan, dan informasi operasional, akses terhadap data harus dibatasi sesuai kebutuhan kerja. Kebijakan retensi data, target performa, serta sasaran pemulihan layanan dan database perlu disepakati sebelum peluncuran.

### 7.1 Autentikasi dan Otorisasi Admin

- Fitur admin wajib dilindungi autentikasi; akun admin tidak boleh dibuat melalui formulir pendaftaran publik.
- Gunakan kata sandi yang disimpan sebagai hash menggunakan algoritme yang sesuai untuk kata sandi, bukan dalam bentuk teks biasa atau enkripsi yang dapat dibalik.
- Terapkan pembatasan percobaan login dan jeda sementara setelah kegagalan berulang untuk mengurangi risiko tebakan kata sandi.
- Sediakan cara aman untuk mengganti atau memulihkan kredensial admin. Hindari mengirim atau mencatat kata sandi dalam log.
- Otorisasi harus diperiksa di server pada setiap permintaan yang mengakses atau mengubah data admin. Menyembunyikan tombol atau halaman di antarmuka saja tidak cukup.
- Terapkan prinsip hak akses minimum. Jika hanya ada satu jenis akun admin pada MVP, tetap pisahkan jalur admin dari jalur pelanggan dan batasi aksesnya pada fitur yang memang diperlukan.
- Akhiri sesi secara aman saat logout dan gunakan cookie sesi dengan atribut `HttpOnly`, `Secure`, dan `SameSite` yang sesuai. Tetapkan masa berlaku sesi dan perilaku saat sesi kedaluwarsa.

### 7.2 Perlindungan Aplikasi dan Data

- Semua input dari browser harus divalidasi dan dinormalisasi di server, termasuk nama, nomor kontak, alamat, pilihan produk, jumlah, tanggal atau jadwal yang tersedia, serta catatan pesanan.
- Jangan mempercayai harga, tarif pengantaran, stok, kapasitas harian, atau status pesanan yang dikirim oleh klien. Server harus menghitung atau memeriksa ulang nilai tersebut dari sumber data yang berwenang sebelum menyimpan pesanan.
- Gunakan kueri terparameterisasi atau mekanisme ORM yang aman untuk mencegah injeksi. Terapkan pengodean keluaran dan perlindungan terhadap skrip lintas situs (XSS) saat menampilkan data pelanggan atau catatan pesanan.
- Lindungi operasi yang mengubah data dari pemalsuan permintaan lintas situs (CSRF) apabila autentikasi menggunakan cookie. Batasi metode HTTP dan asal permintaan sesuai kebutuhan.
- Tolak permintaan yang tidak berwenang, data tidak valid, jumlah pesanan yang melampaui stok, serta pilihan pengantaran yang tidak tersedia. Kegagalan harus ditangani tanpa mengungkap rincian internal sistem.
- Gunakan HTTPS untuk seluruh koneksi, termasuk halaman admin dan API. Alihkan koneksi HTTP ke HTTPS dan jangan mengirimkan data sensitif melalui koneksi tidak terenkripsi.
- Simpan kunci, kata sandi database, token, dan rahasia lain di pengelola rahasia atau konfigurasi lingkungan yang tidak masuk ke repositori. Batasi akses ke rahasia tersebut, pisahkan nilai untuk lingkungan pengembangan dan produksi, serta siapkan prosedur rotasi jika rahasia terpapar.

### 7.3 Privasi dan Akses Data Pelanggan

Kumpulkan hanya data yang diperlukan untuk memproses pesanan, mengatur pengantaran, dan menghubungi pelanggan terkait pesanan. Jangan meminta informasi pembayaran yang tidak diperlukan karena MVP menggunakan pembayaran saat pesanan diterima.

Alamat dan nomor kontak pelanggan hanya boleh dapat diakses oleh admin yang memerlukan informasi tersebut untuk pemenuhan pesanan. Hindari menampilkan data lengkap pada halaman publik, respons API yang tidak relevan, pesan kesalahan, maupun log. Jika memungkinkan, tampilkan informasi yang disamarkan pada tampilan yang tidak memerlukan detail lengkap.

Tetapkan tujuan penggunaan data dan berikan pemberitahuan privasi yang jelas pada formulir pemesanan. Kebijakan retensi dan penghapusan data—termasuk pesanan yang telah selesai, dibatalkan, atau tidak dilanjutkan—**perlu disepakati** sebelum implementasi final, dengan mempertimbangkan kebutuhan operasional dan kewajiban yang berlaku. Prosedur untuk menangani permintaan akses atau penghapusan data pelanggan juga perlu ditentukan.

### 7.4 Pencatatan Log dan Pemantauan

Log harus membantu diagnosis dan audit operasional tanpa menjadi salinan basis data pelanggan. Catat kejadian penting, seperti login admin yang berhasil atau gagal, perubahan stok dan kapasitas, perubahan status pesanan, serta kesalahan aplikasi. Sertakan waktu, jenis kejadian, dan identitas admin bila relevan.

Jangan mencatat kata sandi, token sesi, rahasia, atau alamat dan nomor kontak lengkap kecuali benar-benar diperlukan. Batasi akses ke log, lindungi log dari perubahan yang tidak berwenang, dan tetapkan masa retensinya; **lama retensi perlu disepakati**. Pastikan pesan kesalahan yang terlihat oleh pengguna tidak mengandung jejak tumpukan, kredensial, atau detail infrastruktur.

Gunakan pemantauan untuk mendeteksi error aplikasi, kegagalan koneksi database, lonjakan respons lambat, dan masalah ketersediaan. Tetapkan siapa yang menerima peringatan dan bagaimana insiden ditangani. Sebelum produksi, uji bahwa sistem pemantauan dapat menangkap kegagalan penting tanpa membocorkan data sensitif.

### 7.5 Unggah dan Penyajian Gambar

Gambar produk harus melalui validasi di server. Batasi ukuran berkas dan dimensi gambar, izinkan hanya format yang ditetapkan, dan verifikasi tipe berkas berdasarkan isi berkas, bukan hanya ekstensi atau `Content-Type` dari browser. Tolak berkas yang rusak atau tidak sesuai, gunakan nama berkas yang dibuat server, dan hindari menjalankan atau menyajikan unggahan sebagai konten aktif.

Simpan gambar di penyimpanan yang akses tulisnya terbatas; pemisahan dari aplikasi atau penggunaan layanan penyimpanan khusus dapat dipertimbangkan. Jika gambar diunggah oleh admin, endpoint unggah wajib memerlukan autentikasi dan otorisasi admin. Gambar sebaiknya diolah ulang menjadi format yang aman dan ukuran yang sesuai untuk tampilan web.

### 7.6 Backup dan Pemulihan

Jadwalkan backup database secara berkala dan lindungi salinannya dengan kontrol akses serta enkripsi yang sesuai. Backup harus disimpan terpisah dari lingkungan utama agar kegagalan satu sistem tidak menghilangkan data produksi sekaligus salinannya. Rahasia dan kredensial untuk mengakses backup tidak boleh disimpan dalam repositori aplikasi.

Prosedur backup harus mencakup data pesanan, katalog, stok, kapasitas harian, dan konfigurasi penting yang diperlukan untuk menjalankan layanan. Dokumentasikan cara melakukan pemulihan dan siapa yang berwenang melakukannya. Uji pemulihan secara berkala pada lingkungan terpisah; keberadaan berkas backup saja tidak membuktikan bahwa data dapat dipulihkan dengan benar.

Frekuensi backup, lama penyimpanan backup, serta target kehilangan data yang dapat diterima dan waktu pemulihan (**RPO** dan **RTO**) **perlu disepakati** sesuai kapasitas tim dan dampak operasional saat musim Natal.

### 7.7 Kesiapan Trafik dan Target Layanan

Menjelang Natal, trafik dan jumlah pesanan dapat meningkat tajam dalam waktu singkat. Uji beban pada alur katalog, pengiriman formulir pesanan, pemeriksaan stok, dan pembaruan kapasitas harian. Pastikan perubahan stok dan kapasitas ditangani secara konsisten ketika beberapa pelanggan memesan bersamaan agar pesanan tidak melampaui ketersediaan.

Siapkan pemantauan penggunaan sumber daya, koneksi database, antrean atau proses latar belakang jika digunakan, serta tingkat error. Rencanakan kapasitas untuk periode puncak dan prosedur penanganan saat sistem melambat atau tidak tersedia. Jika kapasitas terbatas, prioritaskan agar pelanggan tidak menerima konfirmasi pesanan yang tidak dapat dipenuhi.

Target waktu respons, kapasitas pengguna atau pesanan pada jam puncak, dan tingkat ketersediaan layanan **perlu disepakati dan diuji** sebelum peluncuran. Penetapan target tersebut harus disesuaikan dengan infrastruktur, pola permintaan, dan kemampuan operasional tim.

## 8. Lingkungan dan Deployment

### 8.1 Tujuan

Lingkungan dan proses deployment harus menjaga aplikasi pemesanan kue Natal tetap aman, dapat diuji, dan mudah dipulihkan. Perubahan aplikasi, konfigurasi, atau skema database tidak boleh mengganggu pesanan yang sedang berjalan maupun data pelanggan.

Rancangan ini berlaku untuk website responsif pelanggan dan admin, termasuk katalog produk, formulir pemesanan, pembayaran saat pesanan diterima, tarif pengantaran tetap, stok, dan kapasitas harian. Detail jadwal pengantaran, area dan nilai ongkir, kebijakan pembatalan, serta notifikasi masih perlu dikonfirmasi. Nilai yang bergantung pada keputusan tersebut sebaiknya dikelola melalui konfigurasi, bukan ditanam langsung dalam kode.

### 8.2 Lingkungan

Gunakan lingkungan development, staging, dan production yang terpisah. Masing-masing harus memiliki konfigurasi, kredensial, database, serta penyimpanan file sendiri.

| Lingkungan | Tujuan | Data dan akses |
|---|---|---|
| Development | Pengembangan fitur, eksperimen, dan pengujian lokal. | Gunakan data sintetis atau data uji. Jangan menyalin data pelanggan production ke perangkat pengembang. |
| Staging | Verifikasi integrasi, migrasi, alur pemesanan, tampilan responsif, dan kesiapan rilis. | Gunakan konfigurasi yang menyerupai production, tetapi dengan data sintetis dan akses terbatas. |
| Production | Melayani pelanggan dan admin. | Gunakan data operasional asli, akses minimum yang diperlukan, pencatatan aktivitas, dan pemantauan. |

Staging sebaiknya sedekat mungkin dengan production dalam hal versi runtime, konfigurasi infrastruktur, dan perilaku layanan. Perbedaan yang memang diperlukan—misalnya integrasi pembayaran atau pengiriman notifikasi dalam mode uji—harus terdokumentasi dan diperiksa sebelum rilis.

Batas tanggung jawab lingkungan perlu ditetapkan sejak awal:

- Akses database production dan kredensial production dibatasi kepada personel yang berwenang.
- Perubahan langsung di production dihindari; lakukan perubahan melalui alur deployment dan migrasi yang ditinjau.
- Pesanan uji di staging tidak boleh memicu pengiriman, penagihan, atau notifikasi kepada pelanggan nyata.
- Data produksi tidak digunakan untuk pengujian atau demonstrasi tanpa proses anonimisasi yang disetujui.

### 8.3 Konfigurasi dan pengelolaan rahasia

Simpan konfigurasi yang berbeda antarlingkungan di luar kode aplikasi. Parameter yang mungkin diperlukan meliputi URL aplikasi, koneksi database, konfigurasi object storage, zona waktu, pengaturan log, serta nilai operasional seperti tarif pengantaran, area layanan, batas kapasitas harian, dan pilihan jadwal.

Kredensial, token, dan rahasia lain harus disimpan di fasilitas pengelolaan rahasia atau mekanisme setara yang disediakan oleh lingkungan hosting. Jangan menyimpan rahasia dalam repositori, dokumentasi publik, artefak build, atau berkas konfigurasi yang dikirim ke pengguna. Berikan hak akses minimum, rotasi kredensial secara berkala dan saat terjadi insiden, serta pemisahan kredensial untuk tiap lingkungan.

Perubahan konfigurasi operasional harus dicatat dan dapat ditinjau. Sebelum keputusan bisnis yang masih terbuka ditetapkan, tampilkan status atau nilai sementara secara eksplisit agar tim tidak menganggapnya sebagai kebijakan final. Sebelum production dibuka, pastikan nilai yang memengaruhi checkout dan kapasitas telah disetujui pemilik produk.

### 8.4 Database, migrasi, dan pencadangan

Gunakan database relasional terkelola sebagai pilihan awal apabila sesuai dengan teknologi aplikasi dan kebutuhan tim. Layanan terkelola umumnya mengurangi beban pemeliharaan mesin database, tetapi tim tetap bertanggung jawab atas desain skema, pengaturan akses, pemantauan, pencadangan, dan pengujian pemulihan.

Perubahan skema database harus dikelola melalui berkas migrasi berversi yang disimpan bersama kode. Terapkan proses berikut:

1. Buat migrasi yang kecil, terarah, dan dapat ditinjau.
2. Jalankan seluruh migrasi secara otomatis pada lingkungan development dan staging.
3. Uji migrasi terhadap data uji yang representatif, termasuk validasi stok, kapasitas harian, dan status pesanan.
4. Pastikan rilis aplikasi kompatibel dengan skema database selama proses deployment.
5. Jalankan migrasi production melalui langkah deployment yang terkendali, dengan pencatatan hasil dan pemeriksaan kesehatan setelahnya.

Untuk perubahan yang berisiko, utamakan pola **expand-and-contract**: tambahkan struktur baru terlebih dahulu, deploy aplikasi yang kompatibel dengan struktur lama dan baru, pindahkan penggunaan data, lalu hapus struktur lama pada rilis terpisah setelah verifikasi. Hindari migrasi destruktif yang tidak dapat dipulihkan secara praktis dalam satu langkah deployment.

Tetapkan jadwal pencadangan otomatis, retensi, dan target pemulihan sesuai toleransi bisnis terhadap kehilangan data dan waktu layanan terhenti. Sebelum rilis berisiko, pertimbangkan pencadangan tambahan. Uji pemulihan secara berkala ke lingkungan terisolasi; keberadaan cadangan saja tidak membuktikan bahwa cadangan dapat dipulihkan. Prosedur pemulihan harus mencatat siapa yang berwenang, langkah pemulihan, dan cara memverifikasi konsistensi pesanan, stok, serta kapasitas setelah pemulihan.

### 8.5 Hosting aplikasi dan foto produk

Tempatkan aplikasi pada layanan hosting yang mendukung kebutuhan runtime, deployment berulang, konfigurasi per lingkungan, pemantauan, dan peningkatan kapasitas sesuai pola penggunaan musiman. Pilih model yang dapat dioperasikan tim dengan baik, baik layanan aplikasi terkelola maupun infrastruktur yang lebih fleksibel. Hindari ketergantungan yang tidak diperlukan pada fitur khusus satu penyedia apabila portabilitas menjadi kebutuhan.

Simpan foto produk pada object storage, bukan di sistem berkas sementara milik server aplikasi. Gunakan bucket atau ruang penyimpanan terpisah untuk tiap lingkungan, batasi akses tulis, dan sajikan gambar melalui jalur yang sesuai dengan kebijakan keamanan. Tetapkan aturan ukuran, format, dan optimasi gambar agar katalog tetap cepat pada perangkat seluler. Atur pencadangan atau retensi sesuai pentingnya aset; foto produk biasanya dapat diunggah ulang, tetapi sumber aslinya tetap perlu disimpan oleh pemilik bisnis.

Jangan menaruh informasi pelanggan atau data pesanan dalam metadata gambar. Pastikan akses ke foto yang bersifat publik memang disengaja, dan jangan menganggap object storage sebagai tempat aman untuk berkas pribadi tanpa kontrol akses yang sesuai.

### 8.6 Proses deployment

Gunakan repositori versi sebagai sumber perubahan aplikasi dan konfigurasi yang aman untuk disimpan di repositori. Setiap perubahan sebaiknya ditinjau sebelum digabungkan ke cabang rilis. Pipeline integrasi dan deployment berkelanjutan (CI/CD) disarankan untuk mengurangi pekerjaan manual dan menghasilkan jejak rilis yang konsisten.

Pipeline rilis minimum meliputi:

1. Menjalankan pemeriksaan format, analisis statis, dan pengujian otomatis.
2. Membangun artefak aplikasi yang dapat diidentifikasi berdasarkan versi atau commit.
3. Men-deploy artefak yang sama ke staging untuk verifikasi.
4. Menjalankan pemeriksaan kesehatan, uji alur pemesanan, dan pemeriksaan akses admin di staging.
5. Meminta persetujuan rilis sesuai kebijakan tim dan pemilik bisnis.
6. Memastikan konfigurasi production dan pencadangan siap, lalu menjalankan migrasi yang diperlukan.
7. Men-deploy ke production dengan strategi yang sesuai kemampuan hosting, kemudian memeriksa log, kesehatan aplikasi, dan alur utama.

Setelah deployment, lakukan smoke test untuk memastikan halaman katalog dapat diakses, formulir pemesanan berfungsi, pesanan tersimpan dengan benar, dan admin dapat mengelola produk, stok, serta kapasitas. Verifikasi pula bahwa tarif dan aturan operasional yang telah disetujui tampil konsisten. Catat versi yang dirilis, waktu deployment, migrasi yang dijalankan, dan hasil pemeriksaan.

Rencanakan waktu rilis dengan mempertimbangkan periode pemesanan dan beban kerja operasional. Hindari perubahan berisiko tinggi saat volume pesanan sedang tinggi, kecuali diperlukan untuk memperbaiki gangguan atau masalah keamanan.

### 8.7 Rollback dan penanganan kegagalan

Setiap rilis harus memiliki rencana pemulihan yang sesuai dengan jenis perubahan. Untuk masalah pada aplikasi yang tidak melibatkan perubahan data yang tidak dapat dibatalkan, rollback dapat dilakukan dengan men-deploy kembali artefak aplikasi stabil sebelumnya. Pastikan konfigurasi dan skema database tetap kompatibel dengan versi yang dipulihkan.

Untuk perubahan database, jangan mengandalkan rollback otomatis atas migrasi destruktif. Gunakan migrasi maju yang aman bila memungkinkan, atau pulihkan database dari cadangan hanya setelah dampak terhadap pesanan terbaru dipahami. Pemulihan cadangan dapat menghilangkan perubahan yang terjadi setelah waktu pencadangan; keputusan ini memerlukan persetujuan penanggung jawab dan pencatatan dampaknya.

Jika deployment gagal atau kesehatan aplikasi memburuk:

1. Hentikan tahapan rilis berikutnya dan cegah rilis tambahan.
2. Periksa log, metrik, status migrasi, dan laporan kegagalan pipeline.
3. Pulihkan versi aplikasi stabil atau terapkan perbaikan maju yang telah diverifikasi.
4. Periksa konsistensi data pesanan, stok, dan kapasitas harian.
5. Informasikan tim operasional tentang dampak terhadap pemrosesan pesanan.
6. Catat penyebab, tindakan pemulihan, dan tindak lanjut pencegahan.

Sebelum periode operasional penting, pastikan versi aplikasi sebelumnya masih tersedia untuk redeployment dan akses pemulihan dapat digunakan. Uji prosedur rollback dan pemulihan secara berkala di staging.

### 8.8 Pemantauan dan keputusan teknologi

Pantau ketersediaan aplikasi, kesalahan server, waktu respons, penggunaan sumber daya, kegagalan koneksi database, hasil pencadangan, dan status deployment. Simpan log secara terpusat bila memungkinkan, batasi data sensitif yang dicatat, dan tetapkan siapa yang meninjau peringatan serta menindaklanjutinya.

Rekomendasi umum untuk MVP adalah hosting aplikasi terkelola, database relasional terkelola, serta object storage untuk foto produk. Rekomendasi ini tidak mewajibkan penyedia tertentu. Pilihan teknologi final—termasuk platform hosting, database, layanan penyimpanan, dan pipeline deployment—harus mengikuti keahlian tim, biaya, kebutuhan operasional, kemampuan pemulihan, keamanan, dan proyeksi skala aplikasi.

## 9. SDLC: Tahapan Pengerjaan

Pengerjaan MVP dilakukan secara berurutan dan bertahap. Setiap tahap menghasilkan keluaran yang dapat ditinjau sebelum pekerjaan berikutnya dimulai. Urutan ini membantu memastikan kebutuhan operasional—terutama kapasitas produksi, stok, pengantaran, dan pembayaran—telah diterjemahkan menjadi aturan sistem yang jelas.

Estimasi durasi yang pernah dibahas merupakan **perkiraan awal**, bukan komitmen jadwal. Durasi aktual bergantung pada ukuran dan ketersediaan tim, ruang lingkup yang disepakati, kecepatan pengambilan keputusan, kesiapan konten, serta kelengkapan kebutuhan dan akses ke layanan pendukung.

### 9.1 Klarifikasi Kebutuhan dan Keputusan Terbuka

**Tujuan:** menyepakati ruang lingkup MVP, aturan bisnis, dan proses operasional yang akan didukung sistem.

Tim bersama pemilik bisnis memvalidasi kebutuhan pelanggan dan admin, termasuk katalog produk, formulir pemesanan, pembayaran saat pesanan diterima, tarif pengantaran tetap, pengelolaan stok, dan kapasitas pesanan harian. Keputusan yang belum final harus dicatat, ditetapkan pemiliknya, dan diberi tenggat agar tidak berubah menjadi asumsi tersembunyi selama implementasi.

Hal yang perlu dikonfirmasi antara lain:

- Jadwal dan pilihan tanggal atau slot pengantaran, termasuk batas waktu pemesanan.
- Area layanan pengantaran dan nilai tarif tetap, serta apakah tarif berlaku per pesanan atau dengan ketentuan lain.
- Kebijakan pembatalan, perubahan pesanan, dan penanganan pesanan yang tidak dapat dipenuhi.
- Cara pelanggan membayar saat pesanan diterima, pihak yang menerima pembayaran, dan cara status pembayaran dicatat.
- Apakah pelanggan memerlukan akun atau dapat memesan sebagai tamu.
- Informasi yang wajib dikumpulkan pada formulir pemesanan dan informasi yang boleh dibagikan kepada pihak pengantaran.
- Kebijakan stok dan kapasitas: cara menghitung kebutuhan bahan atau produk, batas harian, serta perlakuan terhadap stok yang habis.
- Notifikasi yang diperlukan, kanalnya, dan kapan notifikasi dikirim kepada pelanggan maupun admin.
- Zona waktu, mata uang, format kontak, serta kebutuhan pencatatan dan retensi data.

**Keluaran:**

- Ruang lingkup MVP dan daftar fitur yang secara eksplisit berada di luar MVP.
- Aturan bisnis yang telah disepakati, termasuk penanggung jawab untuk keputusan terbuka.
- Alur operasional pesanan, pembayaran, produksi, dan pengantaran.
- Kriteria penerimaan untuk fitur utama serta daftar risiko dan ketergantungan.

### 9.2 Desain UX dan Arsitektur

**Tujuan:** menerjemahkan kebutuhan yang disepakati menjadi rancangan antarmuka dan sistem yang dapat dibangun serta diuji.

Rancang alur pelanggan dari melihat katalog hingga menerima ringkasan pesanan. Rancang pula alur admin untuk mengelola produk, stok, kapasitas harian, dan pesanan. Antarmuka harus responsif pada ponsel dan desktop, dengan formulir yang jelas, status pesanan yang mudah dipahami, serta pesan validasi yang membantu pengguna memperbaiki kesalahan.

Pada saat yang sama, tentukan batas komponen aplikasi, model data, status pesanan, mekanisme autentikasi dan otorisasi admin, serta cara penerapan aturan stok dan kapasitas. Tetapkan pendekatan untuk pencatatan perubahan penting dan penanganan kesalahan. Integrasi eksternal yang belum dipastikan—misalnya layanan notifikasi—tidak boleh menjadi prasyarat tersembunyi bagi alur pemesanan MVP.

**Keluaran:**

- Peta alur pengguna dan sketsa atau prototipe layar utama.
- Panduan visual dan komponen antarmuka awal.
- Rancangan arsitektur, model data, dan transisi status pesanan.
- Keputusan teknis yang terdokumentasi, termasuk batas keamanan dan strategi pengujian.
- Kriteria penerimaan yang ditautkan ke alur dan aturan bisnis.

### 9.3 Implementasi Fondasi dan Autentikasi

**Tujuan:** menyiapkan dasar aplikasi dan akses admin yang aman sebelum fitur bisnis dibangun.

Siapkan repositori, konfigurasi lingkungan pengembangan dan produksi, proses build, pemeriksaan otomatis, serta mekanisme deployment awal. Bangun kerangka website responsif dan pola navigasi dasar. Terapkan autentikasi untuk admin dan otorisasi berbasis peran sesuai kebutuhan MVP; area pengelolaan tidak boleh dapat diakses tanpa izin.

Konfigurasi rahasia dan kredensial harus disimpan di luar kode sumber. Validasi masukan dilakukan di sisi server, dan kesalahan tidak boleh membocorkan informasi sensitif. Siapkan pencatatan teknis minimum agar kegagalan dapat ditelusuri tanpa merekam data pelanggan secara berlebihan.

**Keluaran:**

- Aplikasi dasar yang dapat dijalankan di lingkungan yang disepakati.
- Jalur build, pemeriksaan otomatis, dan deployment awal.
- Area admin yang terlindungi serta penanganan sesi yang sesuai.
- Konfigurasi lingkungan dan praktik pengelolaan rahasia.
- Pemeriksaan dasar untuk akses, validasi server, dan pencatatan kesalahan.

### 9.4 Pembangunan Katalog dan Administrasi

**Tujuan:** memungkinkan pelanggan meninjau produk dan admin menjaga informasi operasional tetap akurat.

Bangun halaman katalog yang menampilkan informasi produk yang telah disetujui, seperti nama, deskripsi, harga, gambar, dan ketersediaan. Pastikan tampilan tetap mudah digunakan pada layar kecil dan menyampaikan produk yang tidak tersedia secara jelas.

Bangun fasilitas admin untuk menambah, mengubah, mengaktifkan, atau menonaktifkan produk sesuai kewenangan yang disepakati. Sediakan pengelolaan stok dan kapasitas harian, beserta validasi agar nilai yang tidak masuk akal tidak tersimpan. Jika ketersediaan berubah, tampilan pelanggan harus mencerminkan status terbaru sesuai aturan yang telah ditetapkan.

**Keluaran:**

- Katalog produk responsif.
- Fungsi administrasi produk dan ketersediaan.
- Pengelolaan stok serta kapasitas harian dengan validasi.
- Pengujian untuk operasi admin dan tampilan produk tersedia maupun tidak tersedia.

### 9.5 Pembangunan Alur Pemesanan dan Validasi Kapasitas

**Tujuan:** menyediakan alur pemesanan yang lengkap dan mencegah pesanan melampaui aturan yang telah disepakati.

Bangun formulir pemesanan yang meminta data minimum untuk memproses pesanan dan pengantaran. Tampilkan rincian produk, jumlah, tarif tetap yang berlaku, total biaya, data pelanggan, dan ringkasan sebelum pelanggan mengirim pesanan. Karena pembayaran dilakukan saat pesanan diterima pada MVP, alur harus menyatakan metode pembayaran tersebut dengan jelas dan tidak menampilkan proses pembayaran daring yang belum disepakati.

Validasi data di sisi klien untuk membantu pengguna dan di sisi server untuk menjaga integritas. Sebelum pesanan disimpan, server harus memeriksa kembali ketersediaan produk, stok, kapasitas harian, serta aturan tanggal, area, dan tarif pengantaran. Pemeriksaan dan pencatatan pesanan harus dirancang agar permintaan yang bersamaan tidak menyebabkan kapasitas atau stok terlampaui.

Simpan pesanan dengan status awal yang telah disepakati dan sediakan tampilan admin untuk melihat serta memperbarui status sesuai alur operasional. Bila terjadi kegagalan validasi, jelaskan penyebabnya kepada pelanggan tanpa menghilangkan data formulir yang masih dapat digunakan. Kebijakan pembatalan dan notifikasi hanya diimplementasikan setelah keputusan terkait dikonfirmasi.

**Keluaran:**

- Alur pemesanan pelanggan beserta ringkasan dan konfirmasi.
- Pemeriksaan server untuk stok, kapasitas, tarif, dan aturan layanan.
- Pencatatan serta pengelolaan status pesanan oleh admin.
- Penanganan permintaan bersamaan dan kegagalan validasi.
- Pengujian alur berhasil, data tidak valid, stok habis, dan kapasitas penuh.

### 9.6 Pengujian dan Validasi

**Tujuan:** memastikan fitur bekerja sesuai kebutuhan, aman untuk penggunaan yang direncanakan, dan dapat dioperasikan oleh tim.

Lakukan pengujian pada beberapa tingkat: unit untuk aturan bisnis, integrasi untuk penyimpanan dan alur antarbagian, serta end-to-end untuk perjalanan pelanggan dan admin. Uji pada ukuran layar dan peramban yang menjadi sasaran. Periksa aksesibilitas dasar, keterbacaan pesan, format data, serta penanganan kesalahan.

Skenario penting meliputi pemesanan saat stok dan kapasitas tersedia, percobaan memesan saat stok habis atau kapasitas penuh, perubahan data produk, akses tanpa izin ke fungsi admin, serta pengiriman pesanan bersamaan. Uji juga bahwa jumlah, tarif, dan total yang ditampilkan konsisten dengan data yang tersimpan.

Sebelum rilis, tinjau keamanan dasar, konfigurasi produksi, cadangan dan pemulihan data sesuai kemampuan platform, serta prosedur penanganan insiden. Catat temuan, tingkat keparahan, pemilik perbaikan, dan status penyelesaiannya.

**Keluaran:**

- Hasil pengujian dan daftar temuan.
- Bukti pemenuhan kriteria penerimaan untuk alur utama.
- Persetujuan pemilik bisnis atas perilaku sistem dan konten.
- Daftar risiko tersisa yang disetujui sebelum peluncuran.

### 9.7 Persiapan Konten dan Operasional

**Tujuan:** memastikan aplikasi siap digunakan dengan data, prosedur, dan penanggung jawab yang jelas.

Masukkan konten produk final, harga, gambar yang telah disetujui, area layanan, tarif, jadwal, dan batas kapasitas. Periksa kembali bahwa data katalog sesuai dengan produk yang benar-benar dapat diproduksi dan dikirim. Siapkan akun admin dengan hak akses minimum yang diperlukan, serta pastikan kredensial awal diserahkan melalui cara yang aman.

Latih admin menggunakan katalog, stok, kapasitas, dan pengelolaan status pesanan. Dokumentasikan prosedur menerima dan menindaklanjuti pesanan, mencatat pembayaran saat diterima, menangani perubahan atau pembatalan yang telah disepakati, serta menghubungi pelanggan apabila terjadi masalah. Jika notifikasi otomatis belum menjadi bagian MVP, tetapkan cara operasional untuk memeriksa pesanan baru.

**Keluaran:**

- Konten dan konfigurasi operasional yang tervalidasi.
- Akun admin dan panduan penggunaan singkat.
- Prosedur kerja untuk pesanan, pembayaran, produksi, dan pengantaran.
- Penanggung jawab operasional dan jalur eskalasi masalah.

### 9.8 Peluncuran dan Pemantauan

**Tujuan:** merilis MVP secara terkendali dan mengetahui dengan cepat bila terjadi gangguan.

Lakukan pemeriksaan akhir pada lingkungan produksi, termasuk akses admin, konfigurasi, data katalog, dan satu simulasi alur pemesanan yang tidak menimbulkan transaksi operasional yang keliru. Tentukan waktu peluncuran, penanggung jawab teknis dan operasional, serta cara kembali ke versi sebelumnya jika ditemukan masalah kritis.

Setelah diluncurkan, pantau ketersediaan aplikasi, kesalahan server, keberhasilan pengiriman formulir, kapasitas dan stok, serta pesanan yang perlu ditindaklanjuti. Tinjau laporan pelanggan dan admin secara rutin, lalu prioritaskan perbaikan berdasarkan dampak terhadap pemesanan dan operasi. Perubahan terhadap aturan tarif, area, jadwal, kapasitas, pembatalan, atau notifikasi harus ditinjau dan diuji sebelum diterapkan.

**Keluaran:**

- MVP tersedia bagi pengguna pada lingkungan produksi.
- Prosedur rollback dan kontak penanggung jawab yang diketahui.
- Pemantauan serta pencatatan masalah operasional.
- Daftar umpan balik dan prioritas perbaikan untuk iterasi berikutnya.

## 10. SDLC: Pengujian dan Kriteria Rilis

Pengujian dilakukan bertahap sejak pengembangan, lalu diulang pada lingkungan staging yang mendekati produksi sebelum rilis. Cakupannya meliputi fungsi pelanggan dan admin, aturan stok dan kapasitas, keamanan, responsivitas, aksesibilitas, serta ketahanan sistem terhadap beban dan kegagalan. Hasil pengujian harus dicatat bersama versi aplikasi, lingkungan, langkah reproduksi, dan status temuan.

### 10.1 Pengujian unit

Pengujian unit memverifikasi logika bisnis secara terisolasi, tanpa bergantung pada layanan eksternal. Prioritaskan aturan yang dapat memengaruhi kebenaran atau ketersediaan pesanan:

- Perhitungan subtotal, ongkir tetap, dan total berdasarkan konfigurasi yang berlaku.
- Validasi produk, jumlah, data kontak, alamat, serta pilihan pengantaran.
- Pengurangan stok dan kapasitas harian setelah pesanan berhasil dibuat.
- Penolakan pesanan ketika stok produk tidak mencukupi atau kapasitas tanggal yang dipilih sudah penuh.
- Pemulihan stok dan kapasitas saat pesanan dibatalkan, sesuai kebijakan pembatalan yang disetujui.
- Otorisasi tindakan admin dan penanganan input yang tidak valid.
- Perilaku aplikasi ketika konfigurasi area, ongkir, atau jadwal belum tersedia.

Uji kasus batas, termasuk jumlah nol atau negatif, nilai maksimum, data kosong, tanggal yang tidak dapat dipesan, dan nilai yang melampaui stok atau kapasitas. Aturan yang masih menunggu keputusan bisnis tidak boleh diasumsikan: implementasi dan pengujiannya harus menunggu konfirmasi atau memakai konfigurasi eksplisit yang telah disepakati.

### 10.2 Pengujian integrasi

Pengujian integrasi memastikan komponen aplikasi dan penyimpanan data bekerja bersama sesuai transaksi yang diharapkan. Verifikasi alur pembuatan, pembacaan, pembaruan, dan pembatalan pesanan, serta konsistensi perubahan stok dan kapasitas.

Skenario penting meliputi:

- Dua permintaan mencoba memesan stok terakhir secara bersamaan. Hanya satu pesanan yang boleh berhasil; permintaan lain harus menerima respons yang jelas, dan stok tidak boleh menjadi negatif.
- Beberapa pesanan mengisi kapasitas harian secara bersamaan. Sistem harus menolak pesanan yang melebihi kapasitas, termasuk ketika permintaan diproses paralel.
- Pembatalan pesanan mengembalikan stok dan kapasitas tepat satu kali. Percobaan pembatalan berulang tidak boleh menggandakan pemulihan.
- Kegagalan penyimpanan saat membuat atau memperbarui pesanan tidak boleh menghasilkan status sukses palsu atau perubahan stok dan kapasitas yang tidak konsisten.
- Alamat di luar area yang dikonfigurasi ditolak atau ditangani sesuai aturan area yang telah disetujui. Sebelum area dikonfirmasi, hasil yang diharapkan harus ditetapkan secara eksplisit.
- Data tidak valid ditolak pada batas API atau layanan, bukan hanya oleh validasi antarmuka.
- Data pesanan yang berhasil disimpan dapat ditampilkan dengan benar kepada pelanggan dan admin yang berwenang.

Gunakan transaksi atau mekanisme konsistensi setara untuk memastikan pembuatan pesanan dan pembaruan stok serta kapasitas bersifat atomik.

### 10.3 Pengujian end-to-end

Pengujian end-to-end menjalankan alur pengguna melalui antarmuka dan layanan yang terhubung dalam lingkungan staging. Setidaknya, cakup alur berikut:

1. Pelanggan melihat katalog dan detail produk.
2. Pelanggan mengisi formulir, memilih jumlah dan jadwal yang tersedia, lalu mengirim pesanan.
3. Sistem menampilkan ringkasan dan status pesanan yang sesuai dengan metode pembayaran saat pesanan diterima.
4. Admin terautentikasi melihat dan mengelola pesanan, stok, serta kapasitas harian.
5. Admin membatalkan pesanan; stok dan kapasitas pulih sesuai kebijakan yang telah disetujui.
6. Pesanan gagal dengan pesan yang dapat dipahami ketika stok habis, kapasitas penuh, alamat di luar area, atau input tidak valid.
7. Admin tanpa autentikasi tidak dapat melihat data pesanan atau menjalankan tindakan administratif.

Uji pula perilaku ketika pengguna mengirim formulir berulang kali, menyegarkan halaman setelah pengiriman, atau mengalami gangguan koneksi. Sistem harus menghindari pesanan ganda bila mekanisme pencegahan pengiriman berulang telah ditetapkan.

### 10.4 Validasi keamanan

Validasi keamanan dilakukan pada antarmuka, API, dan konfigurasi lingkungan:

- Pastikan seluruh halaman dan endpoint admin mewajibkan autentikasi serta pemeriksaan otorisasi pada sisi server.
- Uji akses langsung ke endpoint admin tanpa autentikasi, dengan sesi kedaluwarsa, dan dengan peran yang tidak berwenang. Semua akses harus ditolak tanpa membocorkan data.
- Validasi dan sanitasi input di sisi server untuk mengurangi risiko injeksi, skrip lintas situs, serta manipulasi harga, stok, kapasitas, dan status pesanan.
- Pastikan data sensitif tidak ditampilkan pada pesan kesalahan, respons API, log, atau halaman publik.
- Gunakan HTTPS pada lingkungan yang mendukungnya, kelola rahasia melalui konfigurasi aman, dan hindari menyimpan kredensial di kode sumber.
- Tinjau perlindungan sesi, pembatasan percobaan masuk, pencatatan tindakan admin, dan kebijakan retensi data sesuai kebutuhan produk.
- Jalankan pemindaian dependensi dan pemeriksaan konfigurasi keamanan sebelum rilis; tinjau serta selesaikan temuan yang berisiko tinggi.

Metode pembayaran MVP adalah pembayaran saat pesanan diterima. Karena itu, pengujian tidak boleh mengasumsikan integrasi pembayaran daring.

### 10.5 Responsivitas dan aksesibilitas

Verifikasi tata letak pada ukuran layar ponsel, tablet, dan desktop, termasuk orientasi yang umum digunakan. Pastikan katalog, formulir pemesanan, ringkasan pesanan, dan area admin tetap dapat digunakan tanpa gulir horizontal yang tidak perlu. Uji pula kondisi konten panjang, pesan validasi, dan pembesaran halaman.

Periksa aksesibilitas berdasarkan praktik WCAG yang relevan, termasuk:

- Navigasi menggunakan papan ketik dan indikator fokus yang jelas.
- Label programatis untuk kolom formulir dan identifikasi kesalahan yang mudah ditemukan.
- Kontras teks dan elemen antarmuka yang memadai.
- Struktur judul, tombol, tautan, dan pesan status yang dapat dipahami teknologi bantu.
- Target interaksi yang cukup mudah digunakan pada layar sentuh.
- Informasi penting tidak disampaikan melalui warna saja.

Perbaiki penghalang aksesibilitas yang berdampak pada kemampuan pelanggan menyelesaikan pemesanan sebelum rilis.

### 10.6 Uji beban dan ketahanan

Lakukan uji beban yang mewakili lonjakan kunjungan musiman dan pengiriman formulir yang terjadi bersamaan. Ukur waktu respons, tingkat kegagalan, penggunaan sumber daya, serta kestabilan operasi baca dan tulis. Beban uji dan sasaran kinerja harus ditentukan berdasarkan perkiraan trafik dan infrastruktur yang disetujui; jangan menetapkan ambang tanpa dasar operasional.

Sertakan beban paralel pada produk dengan stok rendah dan tanggal dengan kapasitas hampir penuh. Pastikan tekanan beban tidak menyebabkan stok atau kapasitas terlampaui, pesanan hilang, atau data menjadi tidak konsisten. Uji pula pemulihan ketika penyimpanan sementara tidak tersedia atau permintaan gagal, dengan memastikan kegagalan dilaporkan secara jelas dan tidak mengonfirmasi pesanan yang belum tersimpan.

### 10.7 Kriteria rilis

Rilis dapat diajukan setelah kriteria berikut terpenuhi:

- Acceptance criteria pada PRD untuk alur pelanggan, pengelolaan admin, katalog, pemesanan, tarif pengantaran tetap, stok, dan kapasitas harian telah dipetakan ke kasus uji dan dinyatakan lulus.
- Skenario kritis pada bagian ini, khususnya pemesanan serentak atas stok terakhir, kapasitas penuh, penolakan akses admin tanpa autentikasi, kegagalan penyimpanan, serta pemulihan setelah pembatalan, telah berhasil diverifikasi.
- Tidak ada cacat kritis atau tinggi yang belum ditangani. Risiko dan pengecualian lain harus dicatat serta disetujui oleh pemilik produk dan teknis.
- Validasi keamanan, responsivitas, dan aksesibilitas telah ditinjau, dan temuan yang menghalangi penggunaan atau membahayakan data telah diselesaikan.
- Mekanisme pencatatan kesalahan dan pemeriksaan kesehatan layanan tersedia agar masalah produksi dapat diketahui dan ditindaklanjuti.
- Keputusan bisnis yang masih terbuka—jadwal pengantaran, area dan nilai ongkir, kebijakan pembatalan, serta notifikasi—telah dikonfirmasi atau secara eksplisit dikeluarkan dari cakupan rilis. Perilaku yang bergantung pada keputusan tersebut tidak boleh dirilis dengan asumsi yang belum disetujui.
- Hasil pengujian dan persetujuan rilis didokumentasikan serta dapat ditelusuri ke versi kandidat yang dirilis.

Acceptance criteria PRD merupakan acuan utama untuk keputusan lulus atau gagal. Jika implementasi dan PRD berbeda, perbedaan tersebut harus diselesaikan atau disetujui secara tertulis sebelum rilis, bukan dianggap lulus berdasarkan perilaku yang kebetulan ada.

**Hasil pengujian belum tersedia.** Status lulus, temuan, metrik, dan keputusan rilis harus diisi setelah pengujian dijalankan; dokumen ini tidak menyatakan bahwa aplikasi telah diuji atau memenuhi kriteria rilis.

## 11. SDLC: Alur Kerja Tim dan Perubahan

Bagian ini menetapkan cara tim merencanakan, mengembangkan, memeriksa, dan merilis perubahan pada MVP aplikasi pemesanan kue Natal. Prosesnya dapat disesuaikan dengan ukuran tim dan alat yang digunakan, tetapi keputusan, pemeriksaan, serta persetujuan penting harus tetap dapat ditelusuri.

### 11.1 Prinsip kerja

- **Utamakan alur pemesanan yang andal.** Perubahan pada katalog, formulir pesanan, stok, kapasitas harian, dan pengelolaan pesanan harus menjaga keutuhan data serta mencegah pesanan yang tidak dapat dipenuhi.
- **Buat pekerjaan dapat ditinjau.** Setiap perubahan memiliki tujuan, ruang lingkup, kriteria penerimaan, dan catatan dampak yang jelas.
- **Validasi aturan bisnis sebelum mengodekan asumsi.** Jadwal pengantaran, cakupan area, nilai ongkir, kebijakan pembatalan, dan notifikasi yang belum dikonfirmasi harus dicatat sebagai keputusan tertunda. Jangan menetapkan nilainya melalui implementasi tanpa persetujuan pihak berwenang.
- **Sesuaikan kehati-hatian dengan risiko dan kedekatan musim.** Semakin dekat periode pemesanan Natal, semakin besar alasan untuk menghindari perubahan yang tidak mendesak, khususnya pada alur pembayaran saat pesanan diterima dan pengelolaan stok atau kapasitas.

### 11.2 Backlog dan prioritas

Semua pekerjaan—fitur, perbaikan bug, utang teknis, keamanan, dan dokumentasi—dicatat dalam backlog bersama yang menjadi sumber status pekerjaan. Entri backlog setidaknya memuat:

- masalah atau kebutuhan yang ingin ditangani;
- hasil yang diharapkan dan pihak yang terdampak;
- kriteria penerimaan yang dapat diuji;
- dependensi, asumsi, serta keputusan bisnis yang masih terbuka;
- tingkat risiko, urgensi, dan perkiraan dampak bila pekerjaan ditunda.

Pekerjaan diprioritaskan berdasarkan nilai bagi pelanggan dan operasional, dampak pada kebenaran pesanan, keselamatan data, kewajiban yang berlaku, risiko gangguan, serta waktu yang tersisa sebelum periode pemesanan Natal. Urutan praktisnya adalah:

1. **Kritis:** kerentanan keamanan, kehilangan atau kerusakan data pesanan, kesalahan stok atau kapasitas yang memungkinkan pesanan berlebih, serta gangguan yang menghalangi pemesanan.
2. **Tinggi:** masalah yang menghambat penyelesaian pesanan atau pekerjaan admin penting, tanpa solusi sementara yang layak.
3. **Normal:** penyempurnaan yang bermanfaat tetapi tidak mengancam operasi inti.
4. **Rendah:** perubahan kosmetik atau tambahan yang dapat ditunda tanpa dampak berarti.

Prioritas bukan pengganti persetujuan produk. Perubahan yang memengaruhi kebijakan bisnis atau pengalaman pelanggan harus mendapat keputusan pemilik produk sebelum implementasi, sekalipun perubahan itu tampak kecil.

### 11.3 Siklus perubahan

Setiap pekerjaan mengikuti alur berikut, dengan penyesuaian yang wajar untuk perbaikan darurat:

1. **Ajukan dan klasifikasikan.** Catat pekerjaan di backlog serta tandai jenisnya: fitur, bug, keamanan, operasional, atau dokumentasi.
2. **Perjelas kebutuhan.** Definisikan perilaku yang diharapkan, skenario gagal, dan kriteria penerimaan. Tanyakan keputusan yang belum tersedia; jangan menyamarkannya sebagai asumsi tetap.
3. **Tinjau dampak.** Identifikasi bagian sistem, data, alur admin, pelanggan, dan proses operasional yang akan terdampak. Catat risiko serta kebutuhan migrasi atau komunikasi bila relevan.
4. **Minta persetujuan yang sesuai.** Pemilik produk menyetujui perubahan perilaku produk, prioritas, dan kriteria penerimaan. Perubahan teknis berisiko tinggi juga memerlukan tinjauan teknis dari pihak yang bertanggung jawab atas implementasi.
5. **Implementasikan dalam perubahan yang terfokus.** Hindari menggabungkan pekerjaan yang tidak berkaitan, agar tinjauan dan pembatalan perubahan lebih mudah.
6. **Tinjau kode dan hasil pemeriksaan.** Perubahan diperiksa oleh orang selain pembuatnya jika memungkinkan. Periksa juga dokumentasi dan konfigurasi yang terdampak.
7. **Rilis secara terkendali.** Pastikan pemeriksaan wajib lulus, catatan rilis tersedia, dan langkah pemulihan diketahui sebelum perubahan diterapkan.
8. **Pantau dan tutup pekerjaan.** Verifikasi hasil terhadap kriteria penerimaan, catat masalah yang ditemukan, dan perbarui backlog serta dokumentasi keputusan.

### 11.4 Tinjauan kode dan pemeriksaan otomatis

Perubahan kode harus dapat dipahami dan ditinjau sebelum digabungkan ke cabang rilis. Tinjauan setidaknya memeriksa kesesuaian dengan kebutuhan, penanganan kondisi gagal, dampak pada data pesanan, keamanan, kemudahan pemeliharaan, serta apakah dokumentasi atau pengujian perlu diperbarui. Pembuat perubahan tidak boleh menjadi satu-satunya pihak yang menyatakan perubahan berisiko tinggi telah siap.

Pemeriksaan otomatis dijalankan pada perubahan yang diajukan dan, bila tersedia, sebelum rilis. Pemeriksaan yang sesuai dengan teknologi proyek dapat mencakup:

- pemeriksaan format, kualitas, dan kesalahan kode;
- pengujian unit untuk aturan bisnis penting;
- pengujian integrasi untuk penyimpanan pesanan dan alur terkait;
- pengujian alur utama pelanggan dan admin;
- pemeriksaan keamanan dan dependensi;
- validasi migrasi basis data atau perubahan skema.

Kriteria minimum untuk menerima perubahan adalah seluruh pemeriksaan wajib lulus atau hasil kegagalan memiliki penjelasan dan persetujuan pengecualian yang tercatat. Pengujian untuk alur kritis harus mencakup paling tidak pengiriman formulir pesanan, validasi ketersediaan stok atau kapasitas, pencatatan pesanan, serta pengelolaan pesanan oleh admin. Pemeriksaan otomatis membantu mengurangi risiko, tetapi tidak menggantikan verifikasi manual terhadap perilaku produk.

### 11.5 Persetujuan dan dokumentasi keputusan

Pemilik produk menyetujui kebutuhan, prioritas, kriteria penerimaan, serta perubahan yang mengubah perilaku atau kebijakan pelanggan dan operasional. Persetujuan harus dapat ditelusuri, misalnya melalui catatan backlog atau catatan keputusan; persetujuan lisan untuk perubahan penting perlu dirangkum secara tertulis sebelum rilis.

Gunakan catatan keputusan ringkas untuk hal yang berdampak luas atau sulit dibalik. Catatan tersebut memuat konteks, pilihan yang dipertimbangkan, keputusan, alasan, pihak yang menyetujui, tanggal, serta konsekuensi atau hal yang masih perlu ditinjau. Keputusan tentang jadwal pengantaran, area dan nilai ongkir, pembatalan, serta notifikasi harus tetap berstatus **belum dikonfirmasi** sampai pemilik produk memberikan keputusan. Pekerjaan yang bergantung pada keputusan tersebut ditandai sebagai terblokir atau menggunakan rancangan yang dapat dikonfigurasi tanpa menetapkan kebijakan secara sepihak.

### 11.6 Perubahan kebutuhan menjelang Natal

Menjelang periode pemesanan Natal, perubahan baru dinilai dengan mempertimbangkan manfaat, urgensi, risiko kegagalan, waktu untuk menguji, dan kemampuan tim memulihkan sistem. Permintaan mendesak tetap dicatat dan ditinjau; tenggat dekat tidak dengan sendirinya menjadi alasan untuk melewati pemeriksaan atau persetujuan.

Sebelum menyetujui perubahan dekat dengan periode operasional, pastikan:

- perubahan benar-benar diperlukan untuk mencegah gangguan, memenuhi aturan yang telah disetujui, atau menangani kebutuhan pelanggan penting;
- ruang lingkup dipersempit agar tidak memperkenalkan pekerjaan tambahan;
- dampak terhadap pesanan yang sudah masuk, stok, kapasitas harian, dan pekerjaan admin telah dinilai;
- pengujian yang relevan dapat diselesaikan sebelum perubahan digunakan;
- tersedia cara pemulihan yang realistis, termasuk pemulihan data bila perubahan data terlibat;
- admin yang terdampak mengetahui perubahan dan tindakan yang perlu dilakukan.

Jika suatu permintaan masih menyangkut kebijakan yang belum disepakati, eskalasikan untuk keputusan pemilik produk alih-alih menebak. Bila manfaat tidak sebanding dengan risiko atau waktu pengujian tidak memadai, tunda perubahan sampai setelah periode sibuk, kecuali perubahan tersebut diperlukan untuk mengatasi masalah kritis.

### 11.7 Pencatatan risiko, bug, dan insiden

Catat risiko sebelum menjadi bug dan catat bug segera setelah teridentifikasi. Entri risiko atau bug memuat gejala atau skenario, dampak pada pelanggan dan operasi, tingkat keparahan, kondisi yang memicu, bukti yang tersedia, langkah reproduksi bila diketahui, solusi sementara, penanggung jawab tindak lanjut, dan status.

Penentuan keparahan mempertimbangkan apakah pelanggan tidak dapat memesan, pesanan dapat tercatat keliru atau hilang, stok atau kapasitas dapat terlampaui, data sensitif terpapar, atau admin tidak dapat menjalankan operasi penting. Bug kritis ditangani dan dikomunikasikan segera sesuai prosedur insiden; solusi sementara harus disampaikan kepada pihak operasional dengan jelas. Setelah insiden, catat penyebab, dampak, keputusan yang diambil, tindakan pencegahan, dan tindak lanjut tanpa menjadikan pencatatan sebagai sarana menyalahkan individu.

### 11.8 Pembatasan perubahan berisiko tinggi setelah rilis

Setelah rilis, perubahan terhadap bagian berisiko tinggi dibatasi dan hanya dilakukan untuk kebutuhan yang dapat dibenarkan, seperti memperbaiki insiden kritis, menutup kerentanan, atau mencegah kesalahan pesanan dan kerugian operasional. Area yang memerlukan kehati-hatian khusus mencakup:

- validasi dan pencatatan pesanan;
- perhitungan serta penegakan stok dan kapasitas harian;
- data pesanan dan perubahan skema penyimpanannya;
- akses admin dan perlindungan data;
- konfigurasi yang memengaruhi ketersediaan layanan atau perilaku pesanan.

Perubahan tersebut memerlukan penilaian dampak, tinjauan kode, pemeriksaan yang relevan, persetujuan pihak yang berwenang, rencana pemulihan, dan verifikasi setelah rilis. Hindari penggabungan perubahan kosmetik atau fitur yang tidak mendesak dengan perbaikan darurat. Jika ada keraguan mengenai keamanan atau kebenaran pesanan, utamakan penghentian sementara fungsi yang terdampak secara terkendali dan eskalasi kepada pemilik produk serta penanggung jawab teknis daripada merilis perubahan yang belum tervalidasi.

Pengecualian terhadap proses hanya digunakan dalam keadaan darurat, dibatasi pada perubahan minimum, dan didokumentasikan. Pemeriksaan yang terlewat, alasan pengecualian, pihak yang menyetujui, serta rencana peninjauan dan pengujian susulan harus dicatat agar sistem kembali ke proses normal secepatnya.

## 12. DESIGN.md: Prinsip dan Sistem Visual

Bagian ini menetapkan prinsip dan token visual awal untuk MVP aplikasi pemesanan kue Natal. Tujuannya adalah menjaga pengalaman tetap ramah, jelas, dan tepercaya, sekaligus memudahkan pelanggan menemukan produk dan menyelesaikan pemesanan. Seluruh nilai visual berikut merupakan usulan awal dan dapat disesuaikan setelah identitas merek dikonfirmasi.

### 12.1 Prinsip desain

- **Ramah dan hangat:** Gunakan bahasa visual yang mengundang dan terasa personal, seperti layanan toko kue yang membantu. Hindari tampilan yang terlalu formal atau terasa seperti sistem transaksi yang kaku.
- **Meriah secukupnya:** Nuansa Natal boleh hadir melalui warna aksen, foto, atau ilustrasi kecil. Hindari dekorasi berlebihan yang mengganggu katalog, harga, stok, atau langkah pemesanan.
- **Jelas dan mudah dipindai:** Susun informasi dalam hierarki yang konsisten. Nama produk, harga, ketersediaan, detail pesanan, dan tindakan utama harus mudah ditemukan.
- **Mudah dipercaya:** Tampilkan harga, ringkasan pesanan, metode pembayaran saat pesanan diterima, serta informasi pengantaran yang telah dikonfirmasi secara lugas. Jangan menggunakan elemen visual atau klaim yang memberi kesan kepastian pada kebijakan yang belum ditetapkan.
- **Berorientasi pada pemesanan:** Setiap halaman sebaiknya membantu pengguna mengambil langkah berikutnya, dari menjelajahi katalog hingga mengirim pesanan. Tombol utama harus jelas, mudah dijangkau, dan tidak bersaing dengan terlalu banyak ajakan lain.
- **Responsif dan inklusif:** Tata letak, teks, dan kontrol harus tetap nyaman digunakan pada ponsel maupun layar besar. Jangan mengandalkan warna saja untuk menyampaikan status atau kesalahan.

### 12.2 Token warna

Palet berikut memberikan dasar bernuansa Natal dengan warna netral yang dominan. Hijau dan merah digunakan sebagai aksen, bukan sebagai latar luas yang dapat mengurangi kenyamanan membaca.

| Token | Nilai awal | Penggunaan |
|---|---|---|
| `color.cream` | `#FFF9F1` | Latar utama yang hangat |
| `color.surface` | `#FFFFFF` | Kartu produk, formulir, dan panel |
| `color.ink` | `#292522` | Teks utama |
| `color.muted` | `#6B625D` | Teks sekunder, keterangan, dan label tambahan |
| `color.border` | `#E8DED4` | Garis batas, pemisah, dan kontrol nonaktif |
| `color.forest` | `#24543B` | Aksen merek, tautan penting, dan tombol utama |
| `color.forest-hover` | `#1B422E` | Keadaan hover atau tekan pada tombol hijau |
| `color.berry` | `#9B3B3B` | Aksen Natal dan penanda yang memerlukan perhatian |
| `color.gold` | `#B78335` | Aksen dekoratif kecil, bukan teks utama |
| `color.success` | `#28724A` | Status berhasil |
| `color.warning` | `#8A5A12` | Peringatan yang memerlukan perhatian |
| `color.error` | `#A33333` | Kesalahan atau tindakan yang berisiko |

**Aturan penggunaan warna:**

- Gunakan `color.cream` atau putih sebagai latar utama, dengan teks `color.ink` untuk keterbacaan.
- Gunakan `color.forest` sebagai aksen antarmuka yang paling konsisten, terutama untuk tombol utama dan tautan yang menonjol.
- Gunakan `color.berry` secara hemat, misalnya untuk detail dekoratif atau penanda stok terbatas. Jangan gunakan merah sebagai satu-satunya penanda kesalahan atau status.
- Gunakan `color.gold` hanya pada detail kecil seperti ornamen, garis aksen, atau ikon dekoratif. Hindari warna ini untuk teks kecil di atas latar terang.
- Pastikan kontras teks dan latar memadai. Untuk teks isi, sasarkan rasio kontras sekurang-kurangnya **4,5:1**; untuk teks besar dan elemen antarmuka, sekurang-kurangnya **3:1**.
- Status harus menyertakan label, ikon, atau keterangan tekstual selain warna. Contohnya, tampilkan “Stok habis”, bukan hanya kartu berwarna merah.

### 12.3 Tipografi

Gunakan tipografi yang bersahabat tetapi tetap jelas pada layar kecil. Pilih satu keluarga sans-serif yang mudah dibaca untuk antarmuka. Font dekoratif, jika identitas merek menghendakinya, hanya digunakan secara terbatas untuk aksen judul atau materi promosi—bukan formulir, harga, tombol, maupun informasi pesanan.

Token awal:

| Token | Ukuran | Tinggi baris | Penggunaan |
|---|---:|---:|---|
| `type.display` | 40 px | 1,15 | Judul utama pada layar besar; turunkan menjadi 32 px di ponsel |
| `type.h1` | 32 px | 1,2 | Judul halaman |
| `type.h2` | 24 px | 1,3 | Judul bagian |
| `type.h3` | 20 px | 1,35 | Judul kartu atau subbagian |
| `type.body-lg` | 18 px | 1,5 | Pengantar atau teks penjelas yang menonjol |
| `type.body` | 16 px | 1,5 | Teks isi dan formulir |
| `type.small` | 14 px | 1,45 | Label tambahan dan keterangan |
| `type.caption` | 12 px | 1,4 | Metadata singkat; jangan gunakan untuk informasi penting |

Aturan tipografi:

- Gunakan bobot **400** untuk teks isi, **500–600** untuk label dan tombol, serta **600–700** untuk judul.
- Hindari paragraf panjang dengan huruf kapital seluruhnya, huruf miring berlebihan, atau terlalu banyak variasi ukuran dan ketebalan.
- Harga harus mudah dipindai dan tidak lebih kecil daripada teks isi di sekitarnya.
- Gunakan ukuran teks minimal **16 px** untuk masukan formulir pada perangkat seluler guna meningkatkan kenyamanan penggunaan.

### 12.4 Jarak dan tata letak

Gunakan skala jarak berbasis kelipatan 4 px agar susunan antarkomponen konsisten.

| Token | Nilai |
|---|---:|
| `space.1` | 4 px |
| `space.2` | 8 px |
| `space.3` | 12 px |
| `space.4` | 16 px |
| `space.5` | 24 px |
| `space.6` | 32 px |
| `space.7` | 48 px |
| `space.8` | 64 px |

Pedoman tata letak:

- Gunakan jarak kecil untuk elemen yang berkaitan, misalnya label dan nilai; gunakan jarak lebih besar untuk memisahkan kelompok informasi.
- Berikan ruang yang cukup di sekitar tombol dan kontrol formulir. Targetkan tinggi kontrol sentuh minimal **44 px**.
- Pada layar besar, batasi lebar area baca agar paragraf dan formulir tidak terlalu melebar. Gunakan kisi responsif untuk katalog produk dan satu kolom pada layar sempit.
- Pastikan ringkasan harga dan tindakan melanjutkan pemesanan tetap mudah ditemukan tanpa menutupi konten atau membingungkan pengguna.

### 12.5 Radius dan bayangan

Gunakan sudut membulat secara konsisten untuk memberi kesan ramah tanpa membuat antarmuka terasa kekanak-kanakan.

| Token | Nilai awal | Penggunaan |
|---|---:|---|
| `radius.sm` | 6 px | Label, badge, dan kontrol kecil |
| `radius.md` | 10 px | Input, tombol, dan kartu standar |
| `radius.lg` | 16 px | Kartu produk dan panel utama |
| `radius.pill` | 999 px | Chip atau badge berbentuk kapsul |

Bayangan harus lembut dan jarang digunakan. Utamakan garis batas untuk memisahkan kartu dari latar; gunakan bayangan ringan hanya untuk elemen yang perlu tampak terangkat atau mengambang. Hindari bayangan pekat yang mengurangi kesan bersih.

### 12.6 Tombol, status, dan ikon

- Sediakan hierarki tombol yang konsisten:
  - **Utama:** latar hijau hutan, teks putih, untuk tindakan seperti menambahkan produk atau melanjutkan pemesanan.
  - **Sekunder:** latar transparan atau putih dengan garis batas, untuk tindakan alternatif.
  - **Tautan:** gaya teks untuk navigasi atau tindakan ringan.
  - **Berisiko:** gaya khusus yang jelas untuk tindakan destruktif; gunakan warna kesalahan secukupnya dan sertakan label yang spesifik.
- Sediakan keadaan `hover`, `focus`, `pressed`, `disabled`, dan `loading`. Fokus keyboard harus terlihat jelas dan tidak hanya mengandalkan perubahan warna yang samar.
- Gunakan ikon sederhana dengan gaya garis yang konsisten. Ikon sebaiknya membantu mengenali fungsi, bukan menggantikan label pada tindakan penting.
- Jika ikon membutuhkan interpretasi, sertakan teks atau nama aksesibel. Gunakan ikon dekoratif secara hemat dan jangan menaruh ornamen di dekat harga, status stok, atau informasi penting lainnya.

### 12.7 Ilustrasi dan foto produk

**Ilustrasi:** Gunakan ilustrasi sebagai aksen untuk memperkuat suasana Natal, misalnya pada area sambutan atau keadaan kosong. Pilih bentuk sederhana, palet terbatas, dan gaya yang konsisten. Ilustrasi tidak boleh mengurangi ruang atau kontras yang dibutuhkan untuk membaca informasi dan menyelesaikan pemesanan.

**Foto produk:** Foto adalah bagian utama dari katalog, sehingga produk harus menjadi fokus dan tampil konsisten.

- Gunakan pencahayaan yang terang dan seimbang, dengan warna kue yang mendekati tampilan aslinya.
- Tampilkan produk dengan jelas dan hindari latar, properti, atau dekorasi yang lebih menonjol daripada kue.
- Terapkan rasio gambar dan perlakuan pemotongan yang konsisten pada kartu katalog. Pastikan gambar tidak memotong bagian produk yang penting.
- Sediakan teks alternatif yang menjelaskan produk; jangan memasukkan informasi harga atau stok ke dalam gambar.
- Jika foto belum tersedia, gunakan placeholder netral yang tetap menjaga tata letak—bukan gambar generik yang dapat disalahartikan sebagai produk sebenarnya.

### 12.8 Penyesuaian setelah identitas merek dikonfirmasi

Token pada bagian ini adalah **baseline MVP**, bukan keputusan merek final. Setelah identitas merek dan kebutuhan operasional dikonfirmasi, tinjau kembali:

- warna merek, pasangan warna yang dapat diakses, dan pemetaan status;
- keluarga dan lisensi font, gaya judul, serta kebutuhan bahasa;
- gaya fotografi, ilustrasi, ikon, dan tingkat kemeriahan;
- nilai radius, kepadatan tata letak, serta kebutuhan tampilan admin;
- penerapan identitas visual pada halaman katalog, formulir, ringkasan pesanan, dan tampilan responsif.

Perubahan sebaiknya dilakukan melalui token bersama, bukan penyesuaian ad hoc per halaman. Dengan demikian, antarmuka pelanggan dan admin tetap konsisten serta lebih mudah dipelihara.

## 13. DESIGN.md: Komponen dan Pola Antarmuka

Bagian ini menetapkan pola antarmuka untuk MVP aplikasi pemesanan kue Natal. Pola berlaku pada tampilan pelanggan dan admin, dengan prioritas pada pemesanan yang jelas, penggunaan yang nyaman di ponsel, serta informasi stok dan kapasitas yang tidak menyesatkan. Nilai ongkir, area layanan, jadwal pengantaran, kebijakan pembatalan, dan saluran notifikasi harus mengikuti keputusan bisnis yang telah dikonfirmasi; antarmuka tidak boleh mengarang atau menyiratkan kebijakan yang belum ditetapkan.

### 13.1 Prinsip umum

- **Responsif:** utamakan layar ponsel, lalu sesuaikan tata letak untuk tablet dan desktop. Hindari gulir horizontal, kecuali tabel admin yang menyediakan alternatif tampilan kartu.
- **Konsisten:** gunakan istilah yang sama untuk produk, varian, jumlah, stok, pengantaran, ongkir, total, dan status pesanan di seluruh halaman.
- **Jelas:** tampilkan harga, ketersediaan, biaya, dan langkah berikutnya sebelum pelanggan mengonfirmasi pesanan.
- **Aksesibel:** sediakan label untuk semua kontrol formulir, urutan fokus yang logis, indikator fokus terlihat, kontras teks yang memadai, dan pesan status yang tidak hanya dibedakan dengan warna.
- **Tahan terhadap kesalahan:** pertahankan input yang valid saat terjadi kesalahan, jelaskan cara memperbaikinya, dan hindari pengiriman formulir ganda.
- **Sesuai data:** UI hanya menampilkan stok, kapasitas, jadwal, serta status yang bersumber dari data aplikasi. Status ketersediaan harus diperbarui atau divalidasi kembali saat pesanan dikirim.

### 13.2 Pola keadaan komponen

Setiap komponen yang memuat data atau mendukung tindakan harus menangani keadaan berikut sesuai relevansinya:

- **Normal:** data tersedia dan tindakan yang sesuai dapat dilakukan.
- **Loading:** proses sedang berlangsung. Tampilkan indikator yang dekat dengan konten terkait; cegah pengiriman berulang untuk tindakan yang sama.
- **Kosong:** belum ada data untuk ditampilkan. Jelaskan keadaan tersebut dan, bila sesuai, sediakan langkah berikutnya.
- **Error:** data gagal dimuat atau tindakan gagal. Sampaikan masalah dengan bahasa yang mudah dipahami dan berikan opsi mencoba kembali jika aman.
- **Tidak tersedia:** item, stok, kapasitas, atau tindakan tidak dapat digunakan. Jelaskan alasannya jika diketahui dan jangan tampilkan tindakan aktif yang seolah-olah dapat dilanjutkan.
- **Sukses:** tindakan berhasil. Konfirmasikan hasil dan langkah berikutnya; jangan menyatakan pesanan berhasil sebelum server memastikan pesanan tercatat.

Keadaan yang tidak relevan, seperti keadaan kosong pada tombol, tidak perlu dibuat sebagai tampilan tersendiri. Namun, setiap alur harus tetap memberi umpan balik atas perubahan status yang penting.

### 13.3 Header

**Tujuan:** memberi identitas aplikasi dan akses cepat ke fungsi utama sesuai peran pengguna.

**Informasi wajib:**
- Nama atau logo aplikasi.
- Tautan ke beranda atau katalog.
- Akses ke ringkasan keranjang atau pesanan sementara jika fitur keranjang digunakan.
- Untuk admin: identitas area admin dan navigasi ke daftar pesanan serta pengelolaan produk atau stok sesuai cakupan MVP.

**Perilaku pada layar kecil:**
- Gunakan header ringkas dengan logo atau nama dan tombol menu yang dapat diakses.
- Menu harus dapat dibuka dan ditutup dengan kontrol yang jelas, mendukung keyboard, serta tidak menutupi informasi penting tanpa cara untuk menutupnya.
- Tampilkan jumlah item hanya jika nilainya benar dan tetap terbaca pada layar sempit.

**Keadaan:**
- **Normal:** navigasi tersedia dan menandai halaman aktif.
- **Loading:** bila navigasi bergantung pada sesi atau data, tampilkan indikator kecil tanpa menghilangkan merek atau struktur halaman.
- **Kosong:** tidak berlaku untuk navigasi; jika keranjang kosong, tampilkan jumlah nol atau status kosong secara jelas.
- **Error:** kegagalan memuat jumlah keranjang tidak boleh menghalangi akses ke katalog; sediakan pemuatan ulang bila relevan.
- **Tidak tersedia:** sembunyikan atau nonaktifkan tautan yang memang tidak tersedia bagi peran tersebut, bukan tautan yang gagal dimuat sementara.
- **Sukses:** setelah navigasi atau perubahan jumlah keranjang, tampilkan halaman tujuan atau nilai baru tanpa pesan yang berlebihan.

### 13.4 Navigasi kategori

**Tujuan:** membantu pelanggan menemukan produk berdasarkan kategori yang disediakan, misalnya jenis kue atau pilihan musiman.

**Informasi wajib:**
- Nama kategori yang tersedia.
- Penanda kategori yang sedang dipilih.
- Jumlah atau daftar produk terkait jika tersedia dan akurat.

**Perilaku pada layar kecil:**
- Tampilkan kategori sebagai daftar gulir horizontal yang tetap dapat dioperasikan dengan sentuhan dan keyboard, atau sebagai pilihan bertumpuk.
- Jangan mengandalkan ikon atau warna saja untuk menunjukkan kategori aktif.
- Jika daftar kategori panjang, sediakan mekanisme yang tetap mudah ditemukan tanpa mengganggu katalog.

**Keadaan:**
- **Normal:** kategori dapat dipilih dan hasil katalog sesuai dengan pilihan.
- **Loading:** pertahankan navigasi yang ada dan tampilkan indikator pada area hasil, bukan mengganti seluruh halaman tanpa konteks.
- **Kosong:** jika tidak ada kategori yang dikonfigurasi, tampilkan seluruh produk yang tersedia atau pesan penjelas sesuai perilaku katalog.
- **Error:** jelaskan bahwa kategori gagal dimuat dan sediakan pilihan memuat ulang atau melihat katalog umum bila memungkinkan.
- **Tidak tersedia:** kategori yang tidak memiliki produk aktif tidak ditawarkan sebagai pilihan, kecuali bisnis memang ingin menampilkannya dengan label yang jelas.
- **Sukses:** setelah kategori dipilih, perbarui hasil dan indikator kategori aktif; pertahankan posisi gulir yang wajar.

### 13.5 Kartu produk

**Tujuan:** merangkum produk agar pelanggan dapat membandingkan pilihan dan membuka detailnya.

**Informasi wajib:**
- Foto produk atau pengganti visual yang konsisten jika foto belum tersedia.
- Nama produk.
- Harga atau kisaran harga yang benar untuk varian yang tersedia.
- Ketersediaan, bila produk habis atau dibatasi stoknya.
- Akses yang jelas ke halaman detail; tindakan tambah cepat hanya digunakan jika pilihan wajib sudah diketahui.

**Perilaku pada layar kecil:**
- Susun kartu dalam satu kolom atau kisi yang tetap menjaga ukuran teks dan gambar dapat dibaca.
- Batasi tinggi gambar secara konsisten dan gunakan pemotongan yang tidak menyembunyikan ciri produk.
- Pastikan tombol tidak terlalu rapat untuk disentuh dan kartu tidak membuat seluruh isi sulit dipilih secara selektif.

**Keadaan:**
- **Normal:** informasi produk dan tindakan menuju detail terlihat.
- **Loading:** gunakan placeholder dengan ukuran yang konsisten agar tata letak tidak meloncat.
- **Kosong:** bila katalog tidak memiliki produk, tampilkan pesan yang menjelaskan bahwa belum ada produk untuk ditampilkan.
- **Error:** tampilkan pesan kegagalan memuat katalog dan tindakan coba lagi; jangan menampilkan data sementara seolah-olah terkini.
- **Tidak tersedia:** tandai produk sebagai tidak tersedia dan nonaktifkan tindakan pemesanan. Jangan mengandalkan warna saja untuk menyampaikan status.
- **Sukses:** bila tindakan cepat digunakan, konfirmasikan produk atau varian yang ditambahkan dan perbarui ringkasan keranjang.

### 13.6 Halaman detail produk

**Tujuan:** menyediakan informasi yang cukup untuk memilih produk dan memulai pemesanan dengan yakin.

**Informasi wajib:**
- Nama dan deskripsi produk.
- Foto, jika tersedia.
- Varian yang dapat dipilih, harga per varian, dan informasi stok yang relevan.
- Batasan pemesanan yang benar-benar telah ditetapkan, misalnya jumlah minimum atau batas pemesanan, jika berlaku.
- Tindakan untuk melanjutkan pemesanan atau menambahkan produk.

**Perilaku pada layar kecil:**
- Urutkan informasi utama, pilihan varian, jumlah, dan tindakan secara vertikal.
- Jaga tombol tindakan utama mudah ditemukan tanpa menutupi pilihan maupun ringkasan harga.
- Hindari gambar besar yang mendorong informasi penting terlalu jauh ke bawah.

**Keadaan:**
- **Normal:** detail, harga, dan opsi yang valid ditampilkan.
- **Loading:** tampilkan placeholder untuk foto dan teks, serta nonaktifkan tindakan yang membutuhkan data belum tersedia.
- **Kosong:** bukan keadaan normal untuk detail produk; bila konten wajib tidak dikonfigurasi, tampilkan pesan bahwa detail belum tersedia dan jangan izinkan pemesanan.
- **Error:** tampilkan bahwa detail gagal dimuat, dengan opsi mencoba lagi atau kembali ke katalog.
- **Tidak tersedia:** jelaskan produk tidak dapat dipesan saat ini; jangan menawarkan tindakan pemesanan aktif.
- **Sukses:** setelah produk berhasil ditambahkan atau pemesanan dimulai, konfirmasikan tindakan dan arahkan pelanggan ke langkah berikutnya yang sesuai.

### 13.7 Pemilih varian dan jumlah

**Tujuan:** memastikan pelanggan memilih konfigurasi produk dan jumlah yang dapat dipesan.

**Informasi wajib:**
- Label dan pilihan varian yang tersedia.
- Harga yang terkait dengan pilihan aktif.
- Jumlah yang dipilih.
- Batas stok atau jumlah yang diperbolehkan jika berlaku dan diketahui.

**Perilaku pada layar kecil:**
- Gunakan pilihan berlabel, seperti daftar tombol pilihan atau menu pilih, dengan area sentuh yang cukup.
- Untuk jumlah, sediakan kontrol naik/turun yang berlabel dan dapat digunakan dengan keyboard; jangan mengandalkan pengeditan angka tanpa validasi.
- Tampilkan harga dan ketersediaan dekat dengan pilihan yang memengaruhinya.

**Keadaan:**
- **Normal:** pelanggan dapat memilih varian dan jumlah yang tersedia; harga mengikuti pilihan.
- **Loading:** nonaktifkan perubahan yang bergantung pada data stok yang belum selesai dimuat dan jelaskan bahwa ketersediaan sedang diperiksa.
- **Kosong:** jika tidak ada varian yang dikonfigurasi, jelaskan bahwa produk belum dapat dipesan dan jangan mengirim nilai kosong.
- **Error:** jika pemeriksaan stok gagal, minta pelanggan mencoba lagi atau lanjutkan hanya jika aturan bisnis secara eksplisit mengizinkan pemesanan tanpa pengecekan; jangan mengklaim stok tersedia.
- **Tidak tersedia:** tandai varian atau jumlah di luar batas sebagai tidak dapat dipilih. Validasi ulang stok ketika pesanan dikirim karena stok dapat berubah.
- **Sukses:** tampilkan pilihan yang tersimpan dan harga yang telah diperbarui setelah perubahan berhasil.

### 13.8 Formulir pelanggan

**Tujuan:** mengumpulkan informasi minimum yang diperlukan untuk memproses pesanan dan menghubungi pelanggan sesuai kebijakan yang telah ditetapkan.

**Informasi wajib:**
- Nama pelanggan.
- Nomor telepon atau sarana kontak lain yang diwajibkan operasional.
- Alamat pengantaran jika pengantaran dipilih atau menjadi satu-satunya metode yang tersedia.
- Catatan pesanan hanya jika fitur dan batasannya sudah ditentukan.
- Pilihan metode atau jadwal pengantaran hanya setelah opsi tersebut dikonfirmasi oleh bisnis.

Label, format yang diharapkan, kolom wajib, dan penggunaan data harus dijelaskan secara ringkas. Jangan meminta data pribadi yang tidak dibutuhkan untuk memenuhi pesanan.

**Perilaku pada layar kecil:**
- Susun kolom dalam satu kolom dengan label di atas kolom input.
- Gunakan papan ketik perangkat yang sesuai dengan jenis data, misalnya papan ketik numerik untuk nomor telepon jika didukung.
- Pertahankan isian ketika validasi gagal dan pastikan pesan kesalahan terbaca pada kolom terkait.

**Keadaan:**
- **Normal:** semua kolom wajib dapat diisi dan petunjuknya jelas.
- **Loading:** saat formulir dikirim, nonaktifkan pengiriman berulang dan pertahankan data input.
- **Kosong:** tunjukkan kolom wajib yang belum diisi saat pengguna mencoba melanjutkan; jangan menampilkan pesan kesalahan sebelum konteksnya tepat.
- **Error:** tampilkan kesalahan di dekat kolom terkait dan ringkasan kesalahan jika diperlukan. Jelaskan format yang diharapkan tanpa menyalahkan pelanggan.
- **Tidak tersedia:** bila area atau metode pengantaran tidak memenuhi syarat berdasarkan aturan terkonfirmasi, jelaskan batasannya dan pilihan yang masih tersedia. Jangan meminta alamat untuk area yang tidak dilayani tanpa memberi tahu hasilnya.
- **Sukses:** setelah server menerima pesanan, tampilkan konfirmasi dan nomor atau identitas pesanan jika tersedia.

### 13.9 Ringkasan pesanan

**Tujuan:** membantu pelanggan meninjau produk dan jumlah yang akan dipesan sebelum konfirmasi.

**Informasi wajib:**
- Nama produk dan varian.
- Jumlah setiap item.
- Harga satuan dan subtotal item bila tersedia.
- Opsi untuk mengubah atau menghapus item sebelum pesanan dikirim, jika alur pemesanan mengizinkannya.

**Perilaku pada layar kecil:**
- Susun item secara vertikal dengan jumlah dan harga tetap terkait secara jelas.
- Jika ringkasan diringkas dalam panel yang dapat dibuka, tampilkan total sementara dan kontrol untuk memperluasnya.
- Jangan menyembunyikan biaya atau isi penting di balik interaksi yang tidak jelas.

**Keadaan:**
- **Normal:** isi ringkasan mencerminkan pilihan pelanggan saat ini.
- **Loading:** saat isi keranjang atau ketersediaan sedang disinkronkan, tunjukkan proses dan cegah pengiriman berdasarkan data yang diketahui sedang kedaluwarsa.
- **Kosong:** jelaskan bahwa belum ada item yang dipilih dan sediakan tautan kembali ke katalog.
- **Error:** bila ringkasan gagal dimuat atau disimpan, beri tahu pelanggan dan sediakan tindakan pemulihan; jangan tampilkan total yang tampak final dari data yang gagal diperbarui.
- **Tidak tersedia:** tandai item yang stoknya berubah atau tidak lagi dapat dipesan, lalu minta pelanggan menyesuaikan pesanan sebelum melanjutkan.
- **Sukses:** setelah perubahan jumlah atau penghapusan tersimpan, perbarui ringkasan serta nilai biaya dan total yang terkait.

### 13.10 Tampilan ongkir dan total

**Tujuan:** memperlihatkan perhitungan biaya dengan transparan sebelum pesanan dikonfirmasi.

**Informasi wajib:**
- Subtotal barang.
- Ongkir dengan nilai dan aturan yang telah ditetapkan.
- Total akhir yang harus dibayar.
- Keterangan metode pembayaran bahwa pembayaran dilakukan saat pesanan diterima, sesuai keputusan MVP.
- Pemisahan jelas antara harga barang dan biaya pengantaran.

Tarif tetap, area layanan, kemungkinan pengecualian, dan istilah pembayaran harus bersumber dari kebijakan bisnis yang disetujui. Jika nilai atau aturannya belum dikonfirmasi, jangan tampilkan angka, estimasi, atau label “gratis” yang tidak berdasar.

**Perilaku pada layar kecil:**
- Tampilkan rincian biaya secara vertikal, dengan total akhir menonjol dan tetap mudah dibaca.
- Pertahankan rincian ongkir dekat dengan total; jangan menyembunyikan biaya hingga setelah pesanan dikirim.

**Keadaan:**
- **Normal:** semua komponen biaya dapat dihitung berdasarkan pilihan dan aturan yang berlaku.
- **Loading:** tandai perhitungan sedang diperbarui dan jangan menyebut total sebagai final.
- **Kosong:** jika belum ada item, tampilkan bahwa total belum dapat dihitung.
- **Error:** bila perhitungan atau penentuan ongkir gagal, jelaskan bahwa total belum dapat dipastikan dan jangan izinkan konfirmasi dengan biaya yang tidak diketahui.
- **Tidak tersedia:** bila alamat di luar area layanan yang telah ditetapkan, jelaskan ketidaktersediaan pengantaran dan metode alternatif hanya jika benar-benar tersedia.
- **Sukses:** setelah total terverifikasi, tampilkan jumlah akhir yang sama pada ringkasan konfirmasi dan catatan pesanan.

### 13.11 Konfirmasi pesanan

**Tujuan:** meminta persetujuan akhir pelanggan atas rincian pesanan sebelum pengiriman formulir, lalu mengonfirmasi hasil pemrosesan.

**Informasi wajib sebelum pengiriman:**
- Item, varian, dan jumlah.
- Data pelanggan dan alamat pengantaran yang diperlukan.
- Rincian ongkir dan total akhir.
- Keterangan pembayaran saat pesanan diterima.
- Tombol tindakan yang menyatakan dengan jelas bahwa pesanan akan dikirim.

**Informasi wajib setelah berhasil:**
- Status bahwa pesanan telah diterima sistem.
- Identitas atau nomor pesanan jika tersedia.
- Ringkasan penting pesanan.
- Petunjuk berikutnya yang telah dikonfirmasi oleh operasional.

**Perilaku pada layar kecil:**
- Tampilkan informasi dalam urutan yang mudah ditinjau dan sediakan tombol konfirmasi yang mudah dijangkau.
- Pastikan tombol kembali atau mengubah pesanan tidak menghapus input tanpa peringatan yang sesuai.

**Keadaan:**
- **Normal:** rincian lengkap, total terverifikasi, dan pelanggan dapat mengonfirmasi.
- **Loading:** tombol konfirmasi dinonaktifkan sementara dan menunjukkan bahwa pesanan sedang diproses; cegah pengiriman ganda.
- **Kosong:** jika tidak ada item atau data wajib, arahkan pelanggan kembali untuk melengkapi pesanan.
- **Error:** jika pengiriman gagal, jelaskan bahwa pesanan belum dapat dikonfirmasi dan pertahankan data agar pelanggan dapat mencoba lagi. Jika hasil permintaan tidak pasti, periksa status pesanan sebelum mengirim ulang untuk menghindari duplikasi.
- **Tidak tersedia:** bila stok atau kapasitas harian berubah sebelum konfirmasi, jelaskan perubahan dan minta pelanggan meninjau pilihan yang diperbarui.
- **Sukses:** tampilkan halaman konfirmasi hanya setelah sistem memastikan pesanan tersimpan. Jangan menjanjikan notifikasi, jadwal, atau pembatalan sebelum kebijakannya ditetapkan.

### 13.12 Pesan validasi dan umpan balik

**Tujuan:** membantu pengguna memahami masalah, memperbaiki input, dan mengetahui hasil tindakan.

**Informasi wajib:**
- Apa yang salah atau berubah.
- Bagian yang terdampak.
- Tindakan yang dapat dilakukan selanjutnya, jika ada.

**Perilaku pada layar kecil:**
- Tempatkan pesan dekat dengan kolom atau tindakan terkait, gunakan baris teks yang dapat dibaca, dan jangan menutupi kontrol.
- Untuk kesalahan umum halaman, tampilkan pesan di area yang terlihat tanpa memaksa pengguna menebak sumber masalah.
- Pesan harus tetap dapat diakses pembaca layar melalui asosiasi label dan pengumuman status yang tepat.

**Keadaan:**
- **Normal:** pesan kesalahan tidak ditampilkan sebelum ada konteks, kecuali petunjuk permanen yang memang diperlukan.
- **Loading:** sampaikan status proses secara ringkas untuk tindakan yang membutuhkan waktu.
- **Kosong:** gunakan pesan kosong yang memberi konteks dan langkah berikutnya, bukan kesalahan.
- **Error:** gunakan bahasa spesifik dan netral, hindari kode teknis yang tidak berguna bagi pelanggan. Sertakan opsi coba lagi bila aman.
- **Tidak tersedia:** jelaskan keterbatasan stok, kapasitas, area, atau tindakan dengan alasan yang diketahui; hindari janji kapan ketersediaan akan pulih jika belum pasti.
- **Sukses:** berikan konfirmasi singkat setelah perubahan penting, seperti pembaruan keranjang atau pesanan berhasil.

### 13.13 Daftar atau tabel pesanan admin

**Tujuan:** membantu admin meninjau pesanan, memahami statusnya, dan mengambil tindakan yang diizinkan dalam cakupan MVP.

**Informasi wajib:**
- Identitas pesanan.
- Nama pelanggan dan informasi kontak yang dibutuhkan untuk operasional.
- Waktu pesanan dibuat.
- Ringkasan item atau akses ke detail pesanan.
- Total pesanan.
- Status pesanan yang didefinisikan sistem.
- Tindakan admin yang memang didukung, seperti membuka detail atau memperbarui status jika alur status telah ditetapkan.

Jangan memperkenalkan status, tindakan pembatalan, atau proses pengiriman yang belum disepakati. Batasi data pribadi pada yang diperlukan dan tampilkan hanya bagi pengguna admin berwenang.

**Perilaku pada layar kecil:**
- Utamakan tampilan kartu berisi identitas, status, total, dan tindakan utama; jangan memaksa tabel lebar bergulir tanpa petunjuk.
- Jika tabel digunakan, pertahankan nama kolom yang jelas, sediakan gulir horizontal hanya sebagai pilihan terakhir, dan pastikan setiap baris tetap dapat dipahami.
- Sediakan akses ke detail pesanan tanpa menjejalkan seluruh informasi ke daftar.

**Keadaan:**
- **Normal:** pesanan ditampilkan dengan status dan tindakan yang konsisten; urutan dan penyaringan, jika ada, harus memiliki indikator yang jelas.
- **Loading:** gunakan placeholder baris atau kartu dan hindari menampilkan data lama tanpa penanda bahwa data sedang diperbarui.
- **Kosong:** jelaskan bahwa belum ada pesanan yang cocok atau belum ada pesanan, serta sediakan cara menghapus filter jika relevan.
- **Error:** tampilkan kegagalan memuat daftar dan opsi mencoba lagi; jangan menganggap daftar kosong sebagai hasil yang berhasil.
- **Tidak tersedia:** pesanan yang tidak dapat diproses atau stok yang berubah harus ditandai dengan alasan yang tersedia. Tindakan yang tidak diizinkan tidak boleh tampak aktif.
- **Sukses:** setelah admin melakukan perubahan yang didukung, perbarui status dan konfirmasikan perubahan. Jika perubahan gagal, pertahankan status sebelumnya yang terverifikasi dan jelaskan kegagalannya.

### 13.14 Konsistensi status pesanan dan stok

Label status pelanggan dan admin harus berasal dari himpunan status yang sama dan terdokumentasi. Setiap status perlu memiliki makna operasional yang jelas sebelum digunakan. Perubahan stok dan kapasitas harian harus divalidasi pada saat tindakan yang dapat mengubah ketersediaan, terutama ketika pesanan dibuat. Jika data berubah di antara pemilihan produk dan konfirmasi, antarmuka harus menjelaskan perubahan tersebut, memperbarui ringkasan, dan meminta persetujuan ulang bila berdampak pada isi atau total pesanan.

### 13.15 Kesiapan sebelum implementasi final

Sebelum komponen terkait dibangun, konfirmasikan keputusan berikut:

- Area pengantaran dan cara memvalidasi kelayakannya.
- Nilai serta aturan tarif tetap, termasuk pengecualian bila ada.
- Jadwal, tanggal, atau rentang pengantaran yang tersedia.
- Cara menghitung dan menegakkan kapasitas harian.
- Kebijakan pembatalan dan tindakan yang boleh dilakukan pelanggan atau admin.
- Saluran, isi, dan pemicu notifikasi pesanan.
- Status pesanan yang digunakan dan siapa yang dapat mengubahnya.
- Aturan stok, termasuk kapan stok dikurangi dan bagaimana kehabisan stok ditangani.

Sampai keputusan tersebut disetujui, UI harus menghindari teks, angka, kontrol, atau konfirmasi yang menyiratkan kebijakan tertentu telah berlaku.

## 14. DESIGN.md: Responsivitas, Aksesibilitas, dan Konten

Bagian ini menetapkan prinsip desain antarmuka yang konsisten untuk website pemesanan kue Natal, baik di sisi pelanggan maupun admin. Desain harus mendukung pemesanan dengan mudah di berbagai perangkat, dapat digunakan oleh orang dengan beragam kebutuhan aksesibilitas, dan menyampaikan informasi produk serta status pesanan secara jelas. Terapkan panduan ini pada semua halaman, komponen, formulir, dan pesan sistem.

### 14.1 Prinsip desain

- **Mobile-first:** rancang pengalaman untuk layar kecil terlebih dahulu, lalu perluas untuk tablet dan desktop.
- **Jelas sebelum dekoratif:** utamakan informasi produk, harga, ketersediaan, dan tindakan yang perlu dilakukan.
- **Konsisten:** gunakan pola navigasi, label, tombol, dan pesan yang sama untuk tindakan yang setara.
- **Aksesibel:** antarmuka harus dapat digunakan dengan keyboard, pembaca layar, pembesaran teks, dan kontras yang memadai.
- **Jujur:** tampilkan hanya informasi yang sudah dikonfirmasi. Jangan mengarang ketersediaan, bahan, alergen, jadwal, area pengantaran, atau kebijakan toko.
- **Toleran terhadap kesalahan:** bantu pengguna memahami masalah dan cara memperbaikinya tanpa menyalahkan mereka.

### 14.2 Pendekatan responsif dan mobile-first

Mulai dari kebutuhan pengguna pada layar ponsel: melihat produk, memahami harga dan ketersediaan, mengisi pesanan, serta mengetahui langkah berikutnya. Perluas tata letak untuk layar yang lebih lebar tanpa menyembunyikan atau mengubah makna informasi.

- Gunakan tata letak satu kolom pada layar kecil. Hindari gulir horizontal untuk konten utama.
- Pastikan teks tetap terbaca ketika diperbesar dan tata letak tetap berfungsi pada lebar layar yang sempit.
- Gunakan ukuran teks, jarak, dan lebar kolom yang nyaman; jangan memadatkan formulir hanya demi menampilkan lebih banyak konten sekaligus.
- Pada layar besar, gunakan ruang tambahan untuk menampilkan produk dalam kisi atau membagi konten menjadi kolom. Pertahankan urutan baca yang logis.
- Jangan mengandalkan efek arah kursor (*hover*) sebagai satu-satunya cara untuk menemukan informasi atau menjalankan tindakan.
- Pastikan tombol dan kontrol tetap mudah digunakan dengan sentuhan, termasuk ketika pengguna memakai satu tangan.
- Uji halaman pada ukuran layar sempit, orientasi potret dan lanskap, serta pembesaran teks. Pastikan dialog, menu, dan pesan tidak terpotong.

Titik henti (*breakpoint*) mengikuti kebutuhan konten, bukan model perangkat tertentu. Saat ruang tidak cukup untuk menampilkan elemen berdampingan dengan jelas, susun elemen secara vertikal.

### 14.3 Navigasi dan sasaran sentuh

Navigasi harus ringkas, dapat diprediksi, dan mudah digunakan dengan sentuhan maupun keyboard.

- Gunakan nama tautan dan tombol yang menjelaskan tujuannya, seperti **Lihat produk** atau **Lanjut ke pembayaran**. Hindari label samar seperti **Klik di sini**.
- Buat area sentuh cukup besar dan beri jarak agar kontrol yang berdekatan tidak mudah salah ditekan.
- Pastikan menu dapat dibuka, ditutup, dan digunakan dengan keyboard serta pembaca layar. Tampilkan status buka atau tutup secara programatis.
- Berikan penanda yang jelas untuk tautan dan kontrol interaktif; jangan membedakannya hanya dengan warna.
- Jika halaman memiliki beberapa bagian panjang, gunakan struktur judul yang bermakna dan tautan lompat ke konten utama bila diperlukan.
- Jangan menyembunyikan tindakan penting—misalnya melanjutkan pemesanan atau melihat ringkasan pesanan—di menu yang sulit ditemukan.

### 14.4 Tata letak katalog produk

Katalog harus memudahkan pelanggan membandingkan produk tanpa harus membuka setiap detail untuk mengetahui informasi dasar.

**Layar kecil**
- Tampilkan produk dalam satu kolom atau susunan ringkas yang tetap memberi ruang bagi gambar, nama, harga, dan status ketersediaan.
- Pastikan tombol atau tautan untuk melihat detail produk mudah ditemukan dan tidak bertumpuk dengan informasi lain.

**Layar menengah dan besar**
- Gunakan kisi dengan jumlah kolom sesuai ruang yang tersedia dan lebar kartu yang menjaga teks tetap nyaman dibaca.
- Jaga ukuran gambar, jarak antarkartu, dan posisi informasi konsisten. Hindari tinggi kartu yang berubah-ubah secara ekstrem akibat perbedaan panjang konten.

Pada setiap kartu produk, prioritaskan informasi dalam urutan berikut:

1. Nama produk.
2. Harga.
3. Status ketersediaan atau batas pemesanan, jika informasinya tersedia dan sudah terkonfirmasi.
4. Foto produk.
5. Ringkasan atau detail yang membantu pemilihan.
6. Tindakan untuk melihat detail atau memulai pemesanan.

Jangan tampilkan status stok atau kapasitas yang menyesatkan. Jika informasi belum tersedia, jangan menyiratkan bahwa produk pasti tersedia; arahkan pengguna untuk memeriksa ketersediaan saat mengisi pesanan atau tampilkan keterangan yang telah disetujui toko.

Pada halaman detail produk, letakkan nama dan harga di bagian awal. Sajikan foto dan deskripsi secara terstruktur, diikuti informasi pemesanan yang relevan. Jelaskan bahwa pembayaran dilakukan saat pesanan diterima hanya jika alur tersebut telah dikonfirmasi untuk MVP. Informasi jadwal pengantaran, area layanan, ongkir, pembatalan, dan notifikasi hanya boleh ditampilkan sebagai ketentuan operasional setelah disetujui toko.

### 14.5 Urutan informasi dan tindakan

Pada setiap halaman, dahulukan informasi yang paling membantu pengguna mengambil keputusan atau menyelesaikan tugas.

- **Katalog:** nama dan harga produk, ketersediaan, lalu detail dan tindakan.
- **Formulir pemesanan:** ringkasan produk dan harga, informasi yang perlu diisi, biaya yang telah dikonfirmasi, lalu tindakan untuk meninjau atau mengirim pesanan.
- **Konfirmasi pesanan:** status pesanan, ringkasan pesanan, langkah berikutnya, dan cara menghubungi toko bila tersedia.
- **Admin:** status pesanan, tanggal atau periode yang relevan, kapasitas dan stok, lalu tindakan pengelolaan.

Bedakan tindakan utama dari tindakan sekunder melalui hierarki visual dan label yang jelas, bukan warna saja. Sebelum pesanan dikirim, tampilkan ringkasan yang memungkinkan pelanggan memeriksa kembali pilihannya. Jangan menyajikan biaya total yang belum dapat dihitung seolah-olah sudah final.

### 14.6 Formulir, label, dan kesalahan

Formulir harus meminta hanya informasi yang diperlukan untuk memproses pesanan. Jelaskan alasan permintaan informasi yang mungkin tidak langsung dipahami pengguna.

- Beri setiap kolom label yang terlihat dan deskriptif; jangan memakai teks placeholder sebagai pengganti label.
- Gunakan jenis kolom dan papan ketik yang sesuai, misalnya kolom nomor telepon untuk nomor telepon.
- Tunjukkan kolom wajib secara konsisten dan jelaskan penanda yang digunakan.
- Letakkan petunjuk dekat kolom yang berkaitan. Jangan meminta pengguna mengingat instruksi dari bagian lain halaman.
- Pertahankan data yang telah diisi jika validasi gagal, kecuali ada alasan keamanan atau teknis yang mengharuskannya dihapus.
- Jangan memakai singkatan atau istilah internal toko tanpa penjelasan.

Pesan kesalahan harus spesifik, sopan, dan menyebutkan tindakan yang dapat dilakukan pengguna. Tampilkan pesan dekat kolom terkait dan hubungkan secara programatis dengan kolom tersebut. Contoh:

- **Nomor telepon belum diisi.**
- **Masukkan nomor telepon yang dapat dihubungi.**
- **Jumlah pesanan harus lebih dari 0.**
- **Jumlah yang dipilih melebihi ketersediaan saat ini. Periksa jumlahnya atau hubungi toko.**
- **Pesanan belum terkirim. Periksa koneksi Anda dan coba lagi.**

Hindari pesan yang menyalahkan pengguna, seperti **Input salah**, atau pesan teknis yang tidak membantu, seperti **Error 500**. Jika kegagalan tidak dapat diperbaiki oleh pengguna, jelaskan bahwa tindakan belum berhasil dan berikan langkah berikutnya yang sesuai. Jangan mengklaim pesanan berhasil sebelum sistem mengonfirmasinya.

### 14.7 Aksesibilitas

#### Keyboard dan fokus

- Semua tautan, tombol, kolom, menu, dan kontrol harus dapat dijangkau serta digunakan dengan keyboard.
- Urutan fokus harus mengikuti urutan baca dan alur tugas yang wajar.
- Tampilkan indikator fokus yang jelas dan tidak tertutup elemen lain.
- Jangan memindahkan fokus secara tiba-tiba. Untuk dialog, pindahkan fokus ke dalam dialog saat dibuka, batasi fokus selama dialog aktif, lalu kembalikan fokus ke pemicu saat dialog ditutup.
- Jangan membuat tindakan hanya dapat dilakukan melalui gerakan tetikus atau sentuhan tertentu.
- Sediakan cara untuk melewati navigasi berulang dan langsung menuju konten utama bila halaman memiliki navigasi yang panjang.

#### Struktur dan pembaca layar

- Gunakan judul secara berurutan dan elemen HTML semantik sesuai fungsinya.
- Berikan nama yang dapat diakses pada tombol ikon dan kontrol tanpa teks yang terlihat.
- Pastikan perubahan status penting—misalnya pesanan dikirim, kapasitas berubah, atau kesalahan terjadi—dapat diketahui pembaca layar tanpa harus mengandalkan perubahan visual saja.
- Untuk formulir, kaitkan label, petunjuk, dan pesan kesalahan dengan kolom yang tepat.
- Jangan menyampaikan instruksi hanya melalui posisi atau bentuk visual.

#### Gambar dan teks alternatif

Berikan teks alternatif yang menjelaskan informasi penting dalam gambar secara singkat dan sesuai konteks. Untuk foto produk, gunakan deskripsi faktual, misalnya nama produk yang terlihat atau unsur visual yang benar-benar tampak. Jangan menyimpulkan bahan, rasa, ukuran, isi, atau karakteristik yang tidak dapat dipastikan dari gambar atau data produk.

Jika gambar hanya bersifat dekoratif dan tidak menambah informasi, gunakan teks alternatif kosong agar pembaca layar melewatinya. Hindari nama berkas, pengulangan teks di sekitarnya, dan deskripsi promosi sebagai teks alternatif.

#### Kontras, warna, dan status

- Pastikan teks dan komponen memiliki kontras yang cukup terhadap latar belakang sesuai standar aksesibilitas yang berlaku.
- Jangan menyampaikan informasi, status, atau kesalahan melalui warna saja. Sertakan teks, ikon yang bermakna, pola, atau penanda lain.
- Untuk status seperti **Tersedia**, **Penuh**, atau **Menunggu konfirmasi**, tampilkan label tekstual yang jelas. Pastikan makna ikon dapat dipahami atau diberi nama aksesibel.
- Uji keterbacaan pada mode kontras tinggi dan kondisi pencahayaan yang berbeda.
- Jangan menghapus garis fokus atau batas kontrol tanpa pengganti yang terlihat jelas.

### 14.8 Microcopy Bahasa Indonesia

Gunakan Bahasa Indonesia yang ramah, ringkas, dan mudah dipahami. Pilih istilah yang konsisten di seluruh halaman, terutama untuk produk, pesanan, ketersediaan, biaya, dan status. Gunakan nada membantu tanpa berlebihan atau memaksa.

Contoh microcopy:

- **Lihat produk**
- **Tambahkan ke pesanan**
- **Periksa pesanan**
- **Pesanan Anda belum dikirim.**
- **Pesanan berhasil dikirim. Kami akan memberi tahu langkah berikutnya sesuai informasi dari toko.**
- **Produk ini belum tersedia untuk dipesan.**
- **Ada bagian yang perlu diperiksa sebelum pesanan dikirim.**
- **Coba lagi**
- **Hubungi toko**

Sesuaikan pesan dengan keadaan nyata. Jangan menjanjikan waktu balasan, konfirmasi otomatis, notifikasi, atau jadwal pengantaran jika belum dikonfirmasi. Hindari huruf kapital penuh, tanda seru berlebihan, jargon teknis, serta kalimat panjang yang menyulitkan pemahaman.

### 14.9 Akurasi informasi produk dan kebijakan

Dilarang membuat atau menyimpulkan klaim tentang bahan, kandungan, alergen, keamanan pangan, proses produksi, atau kesesuaian untuk kebutuhan diet yang belum diverifikasi dan disetujui toko. Jangan menggunakan frasa seperti **bebas alergen**, **aman untuk**, atau **mengandung** tanpa data yang dapat dipertanggungjawabkan.

Jika pelanggan memerlukan informasi bahan atau alergen, arahkan untuk menghubungi toko hanya apabila saluran kontak yang sesuai telah disediakan. Jangan memberi jaminan bahwa permintaan khusus dapat dipenuhi sebelum toko mengonfirmasinya.

Jadwal dan area pengantaran, nilai ongkir, kebijakan pembatalan, serta notifikasi masih memerlukan konfirmasi. Jangan menetapkan atau menampilkan ketentuan tersebut sebagai fakta produk sampai keputusan operasionalnya disetujui. Jika informasi yang diperlukan belum tersedia, gunakan pesan netral yang menjelaskan bahwa detailnya akan diberikan setelah dikonfirmasi—tanpa mengesankan adanya kebijakan yang belum ditetapkan.

### 14.10 Pemeriksaan sebelum rilis

Sebelum setiap perubahan desain dirilis, pastikan bahwa:

- halaman tetap berfungsi pada ponsel, tablet, dan desktop tanpa gulir horizontal yang tidak perlu;
- navigasi dan formulir dapat digunakan sepenuhnya dengan keyboard;
- fokus terlihat, urutannya masuk akal, dan dialog dapat digunakan dengan benar;
- label, petunjuk, pesan kesalahan, dan status dapat dipahami secara visual maupun oleh pembaca layar;
- kontras memadai dan status tidak dibedakan melalui warna saja;
- gambar memiliki teks alternatif yang tepat, atau ditandai sebagai dekoratif bila sesuai;
- katalog menampilkan informasi penting dalam urutan yang jelas;
- microcopy ringkas, konsisten, dan tidak menjanjikan hal yang belum dipastikan;
- klaim bahan dan alergen, serta ketentuan pengantaran, ongkir, pembatalan, dan notifikasi telah diverifikasi sebelum ditampilkan.

## 15. Risiko, Dependensi, dan Langkah Berikutnya

Bagian ini mencatat risiko utama, dependensi yang perlu tersedia, dan keputusan yang harus diselesaikan sebelum MVP dirancang secara final, dibangun, diuji, dan diluncurkan. Risiko yang masih bergantung pada keputusan bisnis harus diperlakukan sebagai hal terbuka—bukan diasumsikan oleh tim implementasi.

### 15.1 Risiko

| Risiko | Dampak | Mitigasi dan tindakan |
|---|---|---|
| **Stok tidak sinkron** antara ketersediaan yang ditampilkan dan pesanan yang masuk | Pelanggan dapat memesan produk yang sudah habis; admin perlu menghubungi pelanggan dan mengubah atau membatalkan pesanan. | Tetapkan satu sumber data stok. Kurangi stok secara konsisten saat pesanan diterima sesuai aturan bisnis yang disepakati, dan sediakan cara bagi admin untuk memperbarui stok. Uji pemesanan bersamaan serta perubahan stok. |
| **Lonjakan pesanan** melebihi stok, kapasitas produksi, atau kemampuan pengantaran | Pesanan terlambat atau tidak terpenuhi, kualitas layanan menurun, dan beban admin meningkat. | Tetapkan batas kapasitas harian dan aturan ketika kapasitas tercapai. Tampilkan ketersediaan yang diperbarui, tolak atau tutup slot yang penuh, dan uji skenario lonjakan sebelum peluncuran. |
| **Area pengantaran tidak jelas** | Pelanggan di luar jangkauan dapat menyelesaikan pemesanan, atau pesanan ditolak setelah diterima. | Konfirmasikan area layanan dan cara memvalidasi alamat. Jelaskan batasan area pada katalog atau formulir pemesanan sebelum pelanggan mengirim pesanan. |
| **Admin terlambat memantau pesanan** | Konfirmasi, persiapan, atau pengantaran dapat terlambat; pelanggan tidak mengetahui status pesanan. | Tetapkan penanggung jawab pemantauan, jam operasional, dan waktu respons yang diharapkan. Pastikan admin dapat melihat pesanan dengan mudah dan dokumentasikan prosedur penanganan pesanan baru. Notifikasi otomatis atau kanal pemberitahuan harus diputuskan sebelum implementasi terkait. |
| **Keamanan data pelanggan** | Informasi pribadi dapat diakses atau digunakan tanpa izin yang semestinya. | Kumpulkan hanya data yang diperlukan, batasi akses admin, gunakan koneksi aman, dan jangan menyimpan data pembayaran sensitif karena pembayaran dilakukan saat pesanan diterima. Tentukan kebijakan akses, retensi, dan penghapusan data sebelum peluncuran. |
| **Jadwal pengantaran belum diputuskan** | Formulir, kapasitas, estimasi pemenuhan, dan alur operasional dapat dirancang berdasarkan asumsi yang keliru. | Konfirmasikan hari dan jam pengantaran, pilihan tanggal atau slot, batas waktu pemesanan, serta penanganan hari yang kapasitasnya penuh sebelum desain final. |
| **Aturan pembatalan belum jelas** | Admin dan pelanggan dapat memiliki ekspektasi berbeda, khususnya setelah produksi dimulai. | Tentukan apakah pembatalan diperbolehkan, sampai kapan, dan siapa yang mengubah status pesanan. Cantumkan aturan yang disetujui pada alur pemesanan. |
| **Ongkir tetap tidak sesuai kondisi operasional** | Biaya yang dibayar pelanggan dapat tidak menutup biaya aktual, atau pelanggan mendapat informasi biaya yang berbeda dari kebijakan. | Konfirmasikan nilai ongkir, cakupan penerapan, dan apakah tarif berlaku per pesanan atau mengikuti ketentuan lain. Tampilkan tarif sebelum pesanan dikirim. |
| **Informasi pesanan tidak lengkap atau keliru** | Admin perlu meminta klarifikasi dan pemenuhan pesanan tertunda. | Tentukan data wajib pada formulir, validasi masukan, dan tampilkan ringkasan pesanan agar pelanggan dapat memeriksa detail sebelum mengirim. |

### 15.2 Dependensi

| Dependensi | Kebutuhan sebelum atau selama implementasi |
|---|---|
| **Konten produk** | Daftar produk, nama, deskripsi, ukuran atau varian, ketersediaan musiman, dan informasi relevan bagi pelanggan. |
| **Harga** | Harga yang disetujui untuk setiap produk dan varian, serta keputusan tentang cara menampilkan total pesanan dan ongkir. |
| **Foto produk** | Foto yang siap digunakan dan disetujui, termasuk format, resolusi, hak penggunaan, dan teks alternatif bila diperlukan. |
| **Aturan stok dan kapasitas** | Sumber data stok, cara admin memperbaruinya, batas produksi atau pemenuhan harian, serta tindakan sistem ketika stok atau kapasitas habis. |
| **Konfigurasi ongkir** | Nilai tarif tetap, area penerapan, cara menampilkan biaya, dan pihak yang berwenang mengubah konfigurasi. |
| **Aturan jadwal dan pembatalan** | Hari dan jam layanan, pilihan tanggal atau slot, batas waktu pemesanan, prosedur pembatalan, dan aturan perubahan pesanan. |
| **Hosting dan domain** | Penyedia hosting, domain, lingkungan produksi, konfigurasi HTTPS, pencadangan, pemantauan, serta pihak yang mengelola akses teknis. |
| **Penanggung jawab operasional** | Nama atau peran admin yang memantau pesanan, jadwal pemantauan, prosedur pemrosesan pesanan, dan jalur eskalasi ketika terjadi masalah. |
| **Keputusan notifikasi** | Kanal pemberitahuan yang akan digunakan—jika ada—penerima notifikasi, dan tanggung jawab menindaklanjutinya. |
| **Kebijakan data pelanggan** | Data yang boleh dikumpulkan, pihak yang boleh mengaksesnya, masa penyimpanan, serta prosedur penghapusan dan penanganan insiden. |

### 15.3 Langkah Berikutnya dan Urutan Konfirmasi

Keputusan berikut perlu diselesaikan secara berurutan agar desain dan implementasi tidak dibangun di atas asumsi yang belum disetujui.

1. **Konfirmasi aturan bisnis dan operasional.** Tetapkan jadwal serta slot pengantaran, batas waktu pemesanan, area layanan, nilai dan cakupan ongkir, aturan pembatalan, aturan stok dan kapasitas harian, serta cara menangani pesanan yang melebihi kapasitas.
2. **Konfirmasi konten dan penanggung jawab.** Kumpulkan daftar produk, harga, foto, dan informasi pelanggan yang diperlukan. Tetapkan admin operasional, jam pemantauan, prosedur pemrosesan, serta keputusan tentang kanal notifikasi.
3. **Selesaikan desain final.** Setelah aturan bisnis dan konten disetujui, finalkan alur pelanggan dan admin, formulir, ringkasan pesanan, tampilan ketersediaan, pesan kesalahan, dan penyampaian biaya serta batas area pengantaran.
4. **Konfirmasi kesiapan teknis sebelum implementasi.** Tetapkan hosting, domain, akses admin, keamanan, pencadangan, pemantauan, sumber data stok, dan konfigurasi tarif. Implementasikan sesuai keputusan yang telah disahkan; catat perubahan aturan sebagai perubahan kebutuhan.
5. **Lakukan uji operasional sebelum peluncuran.** Uji alur pemesanan dari awal hingga diterima admin, pembayaran saat pesanan diterima, ongkir, alamat dalam dan luar area, stok habis, kapasitas penuh, pesanan serentak, pembatalan sesuai kebijakan, serta prosedur admin saat pesanan masuk. Pastikan admin dapat menjalankan proses tanpa bantuan tim pengembang.
6. **Putuskan kesiapan dan luncurkan.** Luncurkan setelah konten dan konfigurasi produksi diverifikasi, penanggung jawab operasional siap, masalah kritis ditutup, serta prosedur pemantauan dan eskalasi disepakati. Pantau pesanan dan kendala awal, lalu tinjau hasilnya untuk menentukan perbaikan berikutnya.
