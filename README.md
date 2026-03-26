# AgriConnect - Revolusi Ekonomi Agribisnis Digital

> **AgriConnect** adalah platform E-Commerce Agribisnis inovatif yang menghubungkan petani lokal langsung ke pelanggan untuk memotong rantai tengkulak dan meningkatkan transparansi harga serta kedaulatan pangan nasional.

---

## 🏛️ Institusi
**Institut Teknologi Garut**

## 🏆 Kompetisi
**TECHSOFT 2026 – Web Design Competition** | Subtema: **EKONOMI**

---

## 👥 Anggota Tim

| Peran         | Nama               |
| ------------- | ------------------ |
| **Ketua**     | Alamahul Bayan     |
| **Anggota 1** | Rifki Ramdani      |
| **Anggota 2** | Karina Hoirun Nisa |

---

## 📝 Deskripsi Karya

Karya ini dibuat untuk **TECHSOFT 2026 - Web Design Competition** dengan mengangkat subtema **EKONOMI**.

* **Latar Belakang:** Mengatasi masalah asimetri informasi harga dan rantai distribusi pangan yang terlalu panjang di Indonesia yang merugikan petani dan konsumen.
* **Tujuan:** Memberdayakan ekonomi petani lokal dengan memotong jalur distribusi serta menyediakan akses pangan segar berkualitas tinggi bagi masyarakat luas.
* **Inovasi:** Integrasi Dashboard Ekonomi khusus petani (Real-time Analytics), sistem pelacakan pesanan transparan, dan fitur Bantuan interaktif.

---

## 🌐 Link Website (Deploy)

**[https://agriconnect.web.id/](https://agriconnect.web.id/)**

---

## ✨ Fitur Unggulan (Key Features)

### 🔐 Sistem Escrow (Rekening Bersama)
Dana pembeli ditahan oleh platform dan hanya diteruskan ke petani setelah barang diterima dengan baik. Melindungi kedua pihak dari penipuan dan membangun kepercayaan ekosistem.

### 🌱 Pre-Order "Panen Besok"
Sistem inovatif yang memungkinkan pelanggan memesan sayuran *sebelum dipanen*. Mencegah *food loss* karena petani hanya memanen sesuai jumlah pesanan yang masuk.

### 🤖 AgriBot AI Assistant
Asisten kecerdasan buatan yang siap membantu pengguna sejak di halaman depan untuk pertanyaan seputar produk, logistik, dan rekomendasi pembelian.

### 📍 Keterlacakan Petani (Traceability)
Setiap produk memiliki **Profil Petani** lengkap dengan verifikasi KYC, lokasi geotagging berbasis **Leaflet.js** (peta interaktif real-time), jarak dari pembeli, dan katalog khusus dari petani tersebut.

### 📦 Manajemen Logistik Cerdas
- **Split Order Status**: Pembeda visual di keranjang antara item *Ready Stock* dan *Pre-Order*
- **Kalkulasi Berat Otomatis**: Ongkos kirim dihitung berdasarkan total berat produk
- **Pilihan Pengiriman**: Antar ke rumah atau Self-Pickup ke Hub terdekat
- **Kemasan Ramah Lingkungan (ESG)**: Opsi eco-packaging mendukung narasi zero-waste

### 📊 Dashboard Multi-Peran
Platform ini memiliki tiga sesi pengguna yang terpisah dan aman:
- **Admin**: Command Center dengan KYC petani, arbitrase sengketa Escrow, peta logistik live, dan analitik platform.
- **Petani**: Dashboard ekonomi dengan laporan panen, manajemen inventaris, pesanan masuk, dan analitik penjualan.
- **Pelanggan**: Dashboard pesanan, riwayat transaksi, fitur Pre-Order, dan bantuan dengan AgriBot.

---

## 🛠️ Tech Stack & Dependencies

Proyek ini menggunakan library modern untuk memastikan performa tinggi dan tampilan premium:

| Layer          | Technology          | Fungsi                                                    |
| -------------- | ------------------- | --------------------------------------------------------- |
| **Core**       | React.js (Vite)     | Framework UI & Build Tool utama                           |
| **Styling**    | Tailwind CSS        | Framework CSS untuk desain responsif & modern             |
| **Icons**      | Lucide React        | Library ikon untuk navigasi dan UI                        |
| **Data Viz**   | Recharts            | Visualisasi grafik ekonomi pada Dashboard Petani          |
| **Navigation** | React Router Dom    | Manajemen routing dan Single Page Application (SPA)       |
| **Maps**       | React-Leaflet       | Peta interaktif untuk verifikasi geotagging lokasi petani |
| **Auth**       | Context API (React) | Manajemen state sesi login untuk tiga peran pengguna      |

---

## 🗂️ Arsitektur & Struktur Proyek

```
agri-connect/
├── public/                     # Aset statis (favicon, dll.)
├── src/
│   ├── assets/                 # Gambar lokal (foto petani, sponsor, dll.)
│   ├── components/             # Komponen UI yang dapat digunakan ulang
│   │   ├── Navbar.jsx          # Navigasi utama dengan menu responsif
│   │   ├── Footer.jsx          # Footer halaman publik
│   │   ├── FloatingActions.jsx # Tombol melayang (AgriBot, scroll-to-top)
│   │   └── DemoAlert.jsx       # Modal informasi "Demo Only" untuk kompetisi
│   ├── contexts/
│   │   ├── AuthContext.jsx     # Manajemen state autentikasi & sesi pengguna
│   │   └── AlertContext.jsx    # Manajemen notifikasi global (Custom Alert)
│   ├── layouts/                # Layout wrapper untuk setiap peran
│   │   ├── AdminLayout.jsx
│   │   ├── FarmerLayout.jsx
│   │   └── CustomerLayout.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx     # Halaman utama publik
│   │   ├── ProductCatalog.jsx  # Katalog produk dengan filter & pencarian
│   │   ├── DetailProduct.jsx   # Halaman detail produk & rekomendasi AgriBot
│   │   ├── FarmerProfile.jsx   # Profil petani dengan peta Leaflet & katalog
│   │   ├── CartPage.jsx        # Keranjang belanja dengan logistik kompleks
│   │   ├── CheckoutPage.jsx    # Halaman pembayaran dengan alur Escrow
│   │   ├── NewsPage.jsx        # Halaman berita & artikel agrikultur
│   │   ├── admin/              # Halaman-halaman panel **Admin**
│   │   ├── farmer/             # Halaman-halaman sesi Petani
│   │   └── customer/           # Halaman-halaman sesi Pelanggan
│   └── App.jsx                 # Definisi routing utama aplikasi
├── index.html                  # Entry point HTML
├── tailwind.config.js          # Konfigurasi Tailwind CSS
├── vite.config.js              # Konfigurasi Vite
└── package.json
```

---

## 🗺️ Peta Rute (Application Routes)

| URL                       | Deskripsi            | Akses       |
| ------------------------- | -------------------- | ----------- |
| `/`                       | Landing Page         | Publik      |
| `/catalog`                | Katalog Produk       | Publik      |
| `/product/:id`            | Detail Produk        | Publik      |
| `/petani/:id`             | Profil Petani        | Publik      |
| `/cart`                   | Keranjang Belanja    | Publik      |
| `/checkout`               | Checkout             | Publik      |
| `/berita`                 | Halaman Berita       | Publik      |
| `/berita/:id`             | Detail Berita        | Publik      |
| `/login`                  | Halaman Login        | Publik      |
| `/register`               | Halaman Registrasi   | Publik      |
| `/pelanggan/dashboard`    | Dashboard Pelanggan  | 🔒 Pelanggan |
| `/pelanggan/orders`       | Pesanan Saya         | 🔒 Pelanggan |
| `/pelanggan/preorder`     | Pre-Order Aktif      | 🔒 Pelanggan |
| `/pelanggan/history`      | Riwayat Transaksi    | 🔒 Pelanggan |
| `/petani/dashboard`       | Dashboard Petani     | 🔒 Petani    |
| `/petani/inventory`       | Gudang Produk        | 🔒 Petani    |
| `/petani/orders`          | Pesanan Masuk        | 🔒 Petani    |
| `/petani/analytics`       | Analitik Penjualan   | 🔒 Petani    |
| `/adminAgriConnect/login` | Login Admin          | Terbatas    |
| `/admin/dashboard`        | Command Center Admin | 🔒 Admin     |
| `/admin/users`            | Manajemen Pengguna   | 🔒 Admin     |
| `/admin/products`         | Manajemen Produk     | 🔒 Admin     |

---

## 🔑 Akun Demo (Demo Credentials)

> ⚠️ Aplikasi ini berjalan dalam mode **Demo** untuk keperluan kompetisi. Semua data bersifat simulasi.

| Peran         | Email                      | Password       |
| ------------- | -------------------------- | -------------- |
| **Admin**     | `admin@agriconnect.id`     | `admin123`     |
| **Petani**    | `petani@agriconnect.id`    | `petani123`    |
| **Pelanggan** | `pelanggan@agriconnect.id` | `pelanggan123` |

note : 
1. "untuk login admin gunakan link /adminAgriConnect/login"
2. semua data diatas dummy bahkan bisa login degan username/email dan password apapun.
---

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat (Prerequisites)
Pastikan perangkat Anda sudah terinstal:
- **Node.js** v22 atau versi lebih baru
- **npm** v10 atau versi lebih baru

### 2. Instalasi & Setup
Lakukan langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal:

```bash
# 1. Clone repositori ini
git clone https://github.com/yourusername/agri-connect.git

# 2. Masuk ke direktori proyek
cd agri-connect

# 3. Instal semua dependensi yang diperlukan
npm install

# 4. Jalankan server development
npm run dev
```

### 3. Build untuk Produksi

```bash
# Membuat bundle produksi yang dioptimalkan
npm run build

# Preview hasil build secara lokal
npm run preview
```

Aplikasi akan berjalan di `http://localhost:5173` secara default.

---

## 📱 Responsivitas

Seluruh halaman dirancang dengan pendekatan **mobile-first** menggunakan breakpoint Tailwind CSS:
- **Mobile**: `< 640px` — Layout satu kolom, navigasi hamburger menu
- **Tablet**: `640px – 1024px` — Layout dua kolom, elemen UI yang lebih besar
- **Desktop**: `> 1024px` — Layout penuh, sidebar, multi-kolom

---

## 🤝 Kontribusi

Proyek ini dikembangkan dalam rangka kompetisi **TECHSOFT 2026**. Kontribusi eksternal tidak dibuka saat ini namun sangat disambut untuk pengembangan ke depan.

---

## 📄 Lisensi

Didistribusikan di bawah **Lisensi MIT**. Lihat file `LICENSE` untuk informasi lebih lanjut.

---

<p align="center">Dibuat dengan ❤️ oleh Tim AgriConnect — Institut Teknologi Garut</p>
