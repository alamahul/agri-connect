import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

const ActivityTimeline = () => {
  return (
    <Link
      to="/analisis"
      className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 p-5 min-h-[220px] hover:shadow-md hover:border-emerald-200 cursor-pointer transition-all duration-200"
    >
      {/* Card Header — only visible content */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Clock size={16} className="text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Aktivitas Terkini</h3>
            <p className="!text-xs text-slate-400">Analisis &amp; Laporan</p>
          </div>
        </div>
        <ArrowRight
          size={18}
          className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200"
        />
      </div>

      {/* Empty body — flex-1 keeps card height consistent */}
      <div className="flex-1" />
    </Link>
  );
};

export default ActivityTimeline;