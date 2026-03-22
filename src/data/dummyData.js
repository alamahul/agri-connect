import { Package, ShoppingBag, Banknote, TrendingUp } from 'lucide-react';

// ─── Stat Cards (4 kartu ringkasan) ───────────────────────────────────────────
export const statData = [
  {
    id: 1,
    label: 'Total Produksi Gudang',
    value: '12,500 Kg',
    badge: 'Bulan ini',
    trend: '+8.2%',
    trendUp: true,
    progressValue: 83,
    icon: Package,
    colorClass: 'emerald',
  },
  {
    id: 2,
    label: 'Pesanan Masuk',
    value: '185',
    badge: 'Hari ini',
    trend: '+12.5%',
    trendUp: true,
    progressValue: 65,
    icon: ShoppingBag,
    colorClass: 'blue',
  },
  {
    id: 3,
    label: 'Pendapatan',
    value: 'Rp 45,85 Jt',
    badge: 'Bulan ini',
    trend: '+4.1%',
    trendUp: true,
    progressValue: 75,
    icon: Banknote,
    colorClass: 'amber',
  },
  {
    id: 4,
    label: 'Rata-rata Penjualan',
    value: '12 / Hari',
    badge: null,
    trend: '-2.3%',
    trendUp: false,
    progressValue: 52,
    icon: TrendingUp,
    colorClass: 'violet',
  },
];

// ─── Chart Data ───────────────────────────────────────────────────────────────
export const chartData = {
  Hari: [
    { label: 'Sen', value: 30 },
    { label: 'Sel', value: 45 },
    { label: 'Rab', value: 28 },
    { label: 'Kam', value: 50 },
    { label: 'Jum', value: 42 },
    { label: 'Sab', value: 60 },
    { label: 'Min', value: 55 },
  ],
  Minggu: [
    { label: 'Minggu 1', value: 320 },
    { label: 'Minggu 2', value: 410 },
    { label: 'Minggu 3', value: 380 },
    { label: 'Minggu 4', value: 490 },
  ],
  Bulan: [
    { label: 'Jan', value: 1450 },
    { label: 'Feb', value: 1620 },
    { label: 'Mar', value: 1580 },
    { label: 'Apr', value: 1700 },
    { label: 'Mei', value: 1890 },
  ],
};

// ─── Recent Orders (8 baris) ──────────────────────────────────────────────────
export const recentOrders = [
  { id: 'INV-001', customer: 'Pak Budi', product: 'Padi IR64', total: 'Rp 2.500.000', status: 'Selesai' },
  { id: 'INV-002', customer: 'Tani Maju CV', product: 'Jagung Hibrida', total: 'Rp 4.200.000', status: 'Diproses' },
  { id: 'INV-003', customer: 'Kelompok Tani Subur', product: 'Kedelai', total: 'Rp 1.800.000', status: 'Dikirim' },
  { id: 'INV-004', customer: 'Ibu Siti', product: 'Cabai Merah', total: 'Rp 3.000.000', status: 'Selesai' },
  { id: 'INV-005', customer: 'UD Makmur', product: 'Bawang Merah', total: 'Rp 5.500.000', status: 'Diproses' },
  { id: 'INV-006', customer: 'Koperasi Tani', product: 'Padi IR64', total: 'Rp 7.200.000', status: 'Dikirim' },
  { id: 'INV-007', customer: 'PT Agro Nusantara', product: 'Kedelai', total: 'Rp 9.800.000', status: 'Selesai' },
  { id: 'INV-008', customer: 'Pak Ahmad', product: 'Cabai Rawit', total: 'Rp 1.200.000', status: 'Dibatalkan' },
];

// ─── Low Stock Products ───────────────────────────────────────────────────────
export const lowStock = [
  { product: 'Cabai Merah', stock: 15, maxStock: 200, unit: 'kg', status: 'Kritis' },
  { product: 'Jagung Hibrida', stock: 45, maxStock: 300, unit: 'kg', status: 'Kritis' },
  { product: 'Kedelai', stock: 80, maxStock: 300, unit: 'kg', status: 'Peringatan' },
  { product: 'Bawang Merah', stock: 60, maxStock: 250, unit: 'kg', status: 'Peringatan' },
  { product: 'Padi IR64', stock: 120, maxStock: 500, unit: 'kg', status: 'Aman' },
];

// ─── Recent Activities ────────────────────────────────────────────────────────
export const activities = [
  { time: '10:30', action: 'Pesanan #INV-007 diselesaikan', user: 'Sistem', type: 'success' },
  { time: '09:45', action: 'Pengiriman #INV-003 keluar gudang', user: 'Gudang', type: 'info' },
  { time: '09:15', action: 'Stok Padi masuk 500 kg', user: 'Gudang', type: 'success' },
  { time: '08:45', action: 'Pembayaran dari Pak Budi diterima', user: 'Keuangan', type: 'success' },
  { time: '08:00', action: 'Stok Cabai Merah kritis (15 kg)', user: 'Sistem', type: 'warning' },
  { time: 'Kemarin', action: 'Laporan penjualan bulanan tersedia', user: 'Sistem', type: 'info' },
];

// ─── Inventory Products (Gudang) ─────────────────────────────────────────────
export const inventoryProducts = [
  { id: 'PRD-001', nama: 'Padi IR64', stok: 2500, harga: 5500, satuan: 'kg', status: 'In Stock', kategori: 'Serealia' },
  { id: 'PRD-002', nama: 'Jagung Hibrida', stok: 45, harga: 4800, satuan: 'kg', status: 'Low Stock', kategori: 'Serealia' },
  { id: 'PRD-003', nama: 'Kedelai Premium', stok: 800, harga: 9200, satuan: 'kg', status: 'In Stock', kategori: 'Kacang' },
  { id: 'PRD-004', nama: 'Cabai Merah Besar', stok: 15, harga: 32000, satuan: 'kg', status: 'Kritis', kategori: 'Sayuran' },
  { id: 'PRD-005', nama: 'Bawang Merah', stok: 60, harga: 28000, satuan: 'kg', status: 'Low Stock', kategori: 'Umbi' },
  { id: 'PRD-006', nama: 'Cabai Rawit', stok: 320, harga: 45000, satuan: 'kg', status: 'In Stock', kategori: 'Sayuran' },
  { id: 'PRD-007', nama: 'Tomat Segar', stok: 280, harga: 12000, satuan: 'kg', status: 'In Stock', kategori: 'Sayuran' },
  { id: 'PRD-008', nama: 'Singkong', stok: 1200, harga: 2500, satuan: 'kg', status: 'In Stock', kategori: 'Umbi' },
  { id: 'PRD-009', nama: 'Ubi Jalar', stok: 30, harga: 4000, satuan: 'kg', status: 'Low Stock', kategori: 'Umbi' },
  { id: 'PRD-010', nama: 'Kangkung', stok: 180, harga: 3500, satuan: 'ikat', status: 'In Stock', kategori: 'Sayuran' },
];

// ─── Notifications ─────────────────────────────────────────────────────────────
export const notifications = [
  { id: 1, type: 'order', title: 'Pesanan Baru Masuk', message: 'PT Agro Nusantara memesan 500 kg Kedelai', time: '5 menit lalu', isRead: false },
  { id: 2, type: 'stock', title: 'Stok Kritis', message: 'Cabai Merah tersisa 15 kg — segera restok!', time: '1 jam lalu', isRead: false },
  { id: 3, type: 'order', title: 'Pesanan Selesai', message: 'INV-007 dari PT Agro Nusantara telah selesai', time: '2 jam lalu', isRead: true },
  { id: 4, type: 'stock', title: 'Stok Menipis', message: 'Jagung Hibrida tersisa 45 kg', time: '3 jam lalu', isRead: true },
  { id: 5, type: 'payment', title: 'Pembayaran Diterima', message: 'Rp 2.500.000 dari Pak Budi (INV-001)', time: '5 jam lalu', isRead: true },
];

// ─── Sales by Product (Analisis) ──────────────────────────────────────────────
export const salesByProduct = [
  { nama: 'Padi IR64', terjual: 5200, pendapatan: 28600000, persen: 38 },
  { nama: 'Kedelai', terjual: 2100, pendapatan: 19320000, persen: 26 },
  { nama: 'Cabai Merah', terjual: 980, pendapatan: 31360000, persen: 18 },
  { nama: 'Jagung Hibrida', terjual: 1400, pendapatan: 6720000, persen: 12 },
  { nama: 'Bawang Merah', terjual: 540, pendapatan: 15120000, persen: 6 },
];

// ─── Revenue Monthly (Analisis) ──────────────────────────────────────────────
export const revenueMonthly = [
  { bulan: 'Jan', pendapatan: 32500000, pesanan: 98 },
  { bulan: 'Feb', pendapatan: 38200000, pesanan: 112 },
  { bulan: 'Mar', pendapatan: 45850000, pesanan: 135 },
  { bulan: 'Apr', pendapatan: 41700000, pesanan: 120 },
  { bulan: 'Mei', pendapatan: 52300000, pesanan: 158 },
];