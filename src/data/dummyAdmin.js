export const ADMIN_STATS = {
  totalTransactions: 1284,
  totalUsers: 3472,
  activeOrders: 87,
  totalRevenue: 284500000,
  pendingVerification: 14,
  disputes: 3,
};

export const ADMIN_RECENT_TRANSACTIONS = [
  { id: "ORD-9921", customer: "Siti Aminah", farmer: "Pak Sugeng", amount: 54000, status: "Dalam Perjalanan", date: "20 Mar 2026" },
  { id: "ORD-9920", customer: "Budi Santoso", farmer: "Bu Kartini", amount: 90000, status: "Selesai", date: "19 Mar 2026" },
  { id: "ORD-9919", customer: "Rina Hapsari", farmer: "Pak Hendra", amount: 135000, status: "Sengketa", date: "18 Mar 2026" },
  { id: "ORD-9918", customer: "Ahmad Fauzi", farmer: "Pak Slamet", amount: 72000, status: "Selesai", date: "17 Mar 2026" },
  { id: "ORD-9917", customer: "Dewi Susanti", farmer: "Pak Sugeng", amount: 48000, status: "Diproses", date: "17 Mar 2026" },
];

export const ADMIN_USERS = [
  { id: 1, name: "Pak Sugeng", role: "Petani", location: "Indramayu", status: "Aktif", verified: true, joined: "Jan 2026", orders: 142 },
  { id: 2, name: "Bu Kartini", role: "Petani", location: "Brebes", status: "Aktif", verified: true, joined: "Feb 2026", orders: 87 },
  { id: 3, name: "Pak Hendra", role: "Petani", location: "Lembang", status: "Menunggu Verifikasi", verified: false, joined: "Mar 2026", orders: 0 },
  { id: 4, name: "Siti Aminah", role: "Pelanggan", location: "Jakarta Selatan", status: "Aktif", verified: true, joined: "Feb 2026", orders: 24 },
  { id: 5, name: "Budi Santoso", role: "Pelanggan", location: "Bekasi", status: "Aktif", verified: true, joined: "Jan 2026", orders: 18 },
  { id: 6, name: "Rina Hapsari", role: "Pelanggan", location: "Depok", status: "Diblokir", verified: true, joined: "Mar 2026", orders: 5 },
];

export const ADMIN_ARTICLES = [
  { id: 1, title: "Cara Menetapkan Harga Jual Panen yang Adil", category: "Edukasi Petani", status: "Tayang", date: "15 Mar 2026", views: 1240 },
  { id: 2, title: "Panduan Menggunakan Sistem Escrow AgriConnect", category: "Panduan Pengguna", status: "Tayang", date: "10 Mar 2026", views: 875 },
  { id: 3, title: "Strategi Pre-Order 'Panen Besok' untuk Petani Urban Farming", category: "Edukasi Petani", status: "Draft", date: "22 Mar 2026", views: 0 },
];

export const MONTHLY_REVENUE_CHART = [
  { month: "Okt", revenue: 18000000 },
  { month: "Nov", revenue: 22000000 },
  { month: "Des", revenue: 31000000 },
  { month: "Jan", revenue: 27000000 },
  { month: "Feb", revenue: 35000000 },
  { month: "Mar", revenue: 42000000 },
];

export const USER_GROWTH_CHART = [
  { month: "Okt", petani: 120, pelanggan: 310 },
  { month: "Nov", petani: 145, pelanggan: 420 },
  { month: "Des", petani: 180, pelanggan: 610 },
  { month: "Jan", petani: 210, pelanggan: 820 },
  { month: "Feb", petani: 265, pelanggan: 1100 },
  { month: "Mar", petani: 320, pelanggan: 1450 },
];
