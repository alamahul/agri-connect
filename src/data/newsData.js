import imageFarmer4 from "./../assets/farmer4.jpeg";
import imageFarmer5 from "./../assets/farmer5.jpeg";
import imageFarmer6 from "./../assets/farmer6.jpeg";

export const newsData = {
  1: {
    id: 1,
    title: "AgriConnect Bantu Petani Milenial Tingkatkan Hasil Panen 40%",
    excerpt:
      "Program pelatihan digital farming yang dilakukan AgriConnect bersama Kementerian Pertanian berhasil meningkatkan produktivitas petani milenial hingga 40% dalam 6 bulan.",
    fullContent: `Program pelatihan digital farming yang dilakukan AgriConnect bersama Kementerian Pertanian telah menunjukkan hasil yang luar biasa. Dalam kurun waktu 6 bulan, produktivitas petani milenial yang mengikuti program ini berhasil meningkat hingga 40%.
      Program ini mencakup pelatihan penggunaan aplikasi pertanian digital, manajemen lahan modern, serta akses pasar langsung melalui platform AgriConnect. Para petani milenial juga dibekali dengan pengetahuan tentang sistem escrow yang menjamin keamanan transaksi mereka.
      "Saya sangat terbantu dengan program ini. Sebelumnya saya hanya bisa menjual hasil panen ke tengkulak dengan harga murah. Sekarang, saya bisa menjual langsung ke konsumen melalui AgriConnect dan mendapatkan harga yang lebih baik," ujar Budi, salah satu peserta program asal Lembang.
      Keberhasilan program ini mendapat apresiasi dari Kementerian Pertanian. "AgriConnect telah membuktikan bahwa teknologi digital dapat menjadi solusi nyata bagi permasalahan petani. Kami berharap program ini dapat diperluas ke lebih banyak daerah," kata perwakilan Kementerian Pertanian.
      AgriConnect berencana untuk terus mengembangkan program ini dan menjangkau lebih banyak petani milenial di seluruh Indonesia. Targetnya, pada akhir tahun 2026, sebanyak 10.000 petani milenial akan tergabung dalam program ini.`,
    date: "15 Maret 2026",
    image: "https://plus.unsplash.com/premium_photo-1681913190822-8e9bac0d90a9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Program Petani",
    author: "Tim AgriConnect",
    readTime: "5 menit",
  },
  2: {
    id: 2,
    title: "Sistem Escrow AgriConnect Raih Penghargaan Inovasi Digital",
    excerpt:
      "Sistem pembayaran aman Rekening Bersama (Escrow) dari AgriConnect mendapatkan penghargaan sebagai inovasi digital terbaik di ajang Techsoft 2026.",
    fullContent: `Sistem pembayaran aman Rekening Bersama (Escrow) yang dikembangkan AgriConnect berhasil meraih penghargaan sebagai inovasi digital terbaik dalam ajang Techsoft 2026. Penghargaan ini diberikan atas kontribusi AgriConnect dalam menciptakan solusi transaksi yang aman bagi petani dan pembeli.
      Sistem escrow ini memastikan bahwa dana pembeli akan disimpan dengan aman hingga barang diterima dengan baik. Setelah pembeli mengonfirmasi penerimaan barang, dana baru akan diteruskan kepada petani. Sistem ini melindungi kedua belah pihak dari potensi penipuan.
      "Kami sangat bangga dengan penghargaan ini. Ini adalah bukti bahwa inovasi yang kami hadirkan benar-benar memberikan manfaat bagi masyarakat, terutama petani dan pembeli," ujar CEO AgriConnect dalam sambutannya.
      Penghargaan ini juga menjadi motivasi bagi AgriConnect untuk terus mengembangkan fitur-fitur inovatif lainnya. Ke depan, AgriConnect berencana untuk mengintegrasikan teknologi blockchain untuk meningkatkan transparansi dan keamanan transaksi.`,
    date: "5 Maret 2026",
    image: "https://images.unsplash.com/photo-1771922748624-b205cf5d002d?q=80&w=1120&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Penghargaan",
    author: "Tim AgriConnect",
    readTime: "4 menit",
  },
  3: {
    id: 3,
    title: "Kemitraan Strategis dengan 500 Petani Lokal di Jawa Barat",
    excerpt:
      "AgriConnect resmi bermitra dengan lebih dari 500 petani lokal di wilayah Jawa Barat untuk memastikan ketersediaan produk segar sepanjang tahun.",
    fullContent: `AgriConnect resmi menjalin kemitraan strategis dengan lebih dari 500 petani lokal di wilayah Jawa Barat. Kemitraan ini bertujuan untuk memastikan ketersediaan produk segar sepanjang tahun serta memberikan kepastian harga yang adil bagi petani.
      Melalui kemitraan ini, AgriConnect akan membantu petani dalam hal pemasaran, pendampingan teknis, serta akses ke pasar yang lebih luas. Para petani mitra juga akan mendapatkan pelatihan mengenai praktik pertanian berkelanjutan.
      "Kami sangat antusias dengan kemitraan ini. Dengan adanya AgriConnect, kami tidak perlu khawatir lagi tentang penjualan hasil panen. Harga yang kami terima pun lebih baik," ungkap Ibu Siti, salah satu petani mitra.
      Kemitraan ini juga menjadi langkah awal AgriConnect untuk memperluas jangkauan ke daerah-daerah lain di Indonesia. Targetnya, pada tahun 2027, AgriConnect dapat bermitra with 5.000 petani lokal di seluruh Indonesia.`,
    date: "20 Februari 2026",
    image: "https://images.unsplash.com/photo-1623652554515-91c833e3080e?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Kemitraan",
    author: "Tim AgriConnect",
    readTime: "3 menit",
  },
};

export const relatedNews = Object.values(newsData).map(({ id, title, excerpt, date, image, category }) => ({
  id, title, excerpt, date, image, category
}));
