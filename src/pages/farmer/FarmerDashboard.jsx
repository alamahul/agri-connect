import StatCard from '../../components/StatCard';
import SalesBarChart from '../../components/BarChart';
import RecentOrdersTable from '../../components/RecentOrdersTable';
import LowStockList from '../../components/LowStockList';
import ActivityTimeline from '../../components/ActivityTimeline';
import { statData } from '../../data/dummyData';

const FarmerDashboard = () => {
  return (
    <div className="space-y-4">
      {/* Page Title */}
      <div>
        <h2 className="text-base font-bold text-slate-800">Farmer Dashboard</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Welcome back! Here's a summary of today's activities.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statData.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      {/* Main: Chart (8 col) + Table (4 col) */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-8">
          <SalesBarChart />
        </div>
        <div className="col-span-12 lg:col-span-4">
          <RecentOrdersTable />
        </div>
      </div>

      {/* Bottom: Stock + Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <LowStockList />
        <ActivityTimeline />
      </div>
    </div>
  );
};

export default FarmerDashboard;
