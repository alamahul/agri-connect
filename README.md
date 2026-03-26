# AgriConnect - Revolusi Ekonomi Agribisnis Digital

AgriConnect adalah platform E-Commerce Agribisnis inovatif yang menghubungkan petani lokal langsung ke pelanggan untuk memotong rantai tengkulak dan meningkatkan transparansi harga.

## 🏛️ Institusi
Institut Teknologi Garut

## 👥 Anggota Tim
- **Ketua:** Alamahul Bayan 
- **Anggota 1:** Rifki Ramdani
- **Anggota 2:** Karina Hoirun Nisa

## 📝 Deskripsi Karya
Karya ini dibuat untuk **TECHSOFT 2026 - Web Design Competition** dengan mengangkat subtema **EKONOMI**. 

* **Latar Belakang:** Mengatasi masalah asimetri informasi harga dan rantai distribusi pangan yang terlalu panjang di Indonesia yang merugikan petani dan konsumen.
* **Tujuan:** Memberdayakan ekonomi petani lokal dengan memotong jalur distribusi serta menyediakan akses pangan segar berkualitas tinggi bagi masyarakat luas.
* **Inovasi:** Integrasi Dashboard Ekonomi khusus petani (Real-time Analytics), sistem pelacakan pesanan transparan, dan fitur Bantuan interaktif.

## ✨ Fitur Utama

### 🛒 Untuk Pelanggan (Customer)
- **Marketplace Produk Segar:** Telusuri berbagai produk pertanian langsung dari petani.
- **Sistem Pre-Order:** Pesan hasil tani sebelum masa panen untuk harga yang lebih kompetitif.
- **Pelacakan Pesanan:** Pantau status pengiriman pesanan secara real-time.
- **Riwayat Transaksi:** Dokumentasi lengkap semua pembelian dan invoice.

### 👨‍🌾 Untuk Petani (Farmer)
- **Dashboard Analitik:** Visualisasi data penjualan dan tren pasar.
- **Manajemen Inventaris:** Kelola stok produk dengan mudah.
- **Manajemen Pesanan:** Proses pesanan masuk dari pelanggan secara efisien.
- **Sistem Notifikasi:** Pemberitahuan real-time untuk setiap aktivitas transaksi.

### 🛡️ Untuk Admin
- **Manajemen Pengguna:** Pantau dan kelola akun pelanggan serta petani.
- **Monitoring Produk:** Validasi dan kelola katalog produk di platform.
- **Pusat Bantuan:** Kelola tiket bantuan dan interaksi pengguna.
- **Analitik Platform:** Data statistik pertumbuhan platform secara keseluruhan.

## 📁 Struktur Proyek

```text
agri-connect/
├── public/              # Aset statis (gambar, ikon)
├── src/
│   ├── assets/          # File media & gambar
│   ├── components/      # Komponen UI reusable (Button, Card, Sidebar, dll)
│   ├── contexts/        # React Context untuk State Management
│   ├── data/            # Data dummy & konfigurasi
│   ├── layouts/         # Layout utama untuk setiap role
│   ├── pages/           # Halaman aplikasi berdasarkan role
│   │   ├── admin/       # Halaman khusus Admin
│   │   ├── customer/    # Halaman khusus Customer
│   │   ├── farmer/      # Halaman khusus Farmer
│   │   └── ...          # Landing Page, Login, Register
│   ├── App.jsx          # Konfigurasi Routing
│   └── main.jsx         # Entry point aplikasi
├── tailwind.config.js   # Konfigurasi Tailwind CSS
└── vite.config.js       # Konfigurasi Vite
```

## 🌐 Link Website (Deploy)


## 🛠️ Tech Stack & Dependencies

Proyek ini menggunakan library modern untuk memastikan performa tinggi dan tampilan premium:

| Layer | Technology | Fungsi |
|-------|-----------|--------|
| **Core** | React.js (Vite) | Framework UI & Build Tool utama |
| **Styling** | Tailwind CSS | Framework CSS untuk desain responsif & modern |
| **Icons** | Lucide React | Library ikon untuk navigasi dan UI |
| **Data Viz** | Recharts | Visualisasi grafik ekonomi pada Dashboard Petani |
| **Navigation** | React Router Dom | Manajemen routing dan Single Page Application (SPA) |

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat (Prerequisites)
Pastikan perangkat Anda sudah terinstal:
- **Node.js** v22 atau versi lebih baru
- **npm** v10 atau versi lebih baru

### 2. Instalasi & Setup
Lakukan langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal:

```bash
# 1. Clone repositori ini
git clone https://github.com/yourusername/agriculture-landing.git

# 2. Masuk ke direktori proyek
cd agriculture-landing

# 3. Instal semua dependensi agar sistem berjalan lancar
npm install

# 4. Jalankan aplikasi dalam mode pengembangan
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173/` secara default.

## 📄 Dokumentasi Tambahan

Untuk informasi lebih mendalam, silakan merujuk pada dokumen berikut:
- 📘 [Panduan Pengguna (User Guide)](USER_GUIDE.md)
- 💻 [Panduan Pengembang (Developer Guide)](DEVELOPER_GUIDE.md)
- 🚀 [Daftar Fitur Lengkap](FEATURES.md)

---
© 2026 AgriConnect Team - TECHSOFT 2026
