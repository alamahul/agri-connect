const colorMap = {
  emerald: {
    iconBg: 'bg-emerald-600',
    bar: 'bg-emerald-500',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  blue: {
    iconBg: 'bg-blue-600',
    bar: 'bg-blue-500',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  amber: {
    iconBg: 'bg-amber-500',
    bar: 'bg-amber-400',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
  },
  violet: {
    iconBg: 'bg-violet-600',
    bar: 'bg-violet-500',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-700',
  },
};

const StatCard = ({
  label = 'Label',
  value = '—',
  badge = null,
  trend = '',
  trendUp = true,
  progressValue = 0,
  icon: Icon,
  colorClass = 'emerald',
}) => {
  const colors = colorMap[colorClass] || colorMap.emerald;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      {/* Top row */}
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-slate-500 leading-snug">{label}</p>
        <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
          {Icon && <Icon size={15} className="text-white" />}
        </div>
      </div>

      {/* Value + badge */}
      <div className="flex items-end justify-between">
        <p className="text-xl font-bold text-slate-800 tracking-tight leading-none">{value}</p>
        <div className="text-right">
          {badge && (
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badgeBg} ${colors.badgeText} mb-0.5`}>
              {badge}
            </span>
          )}
          <p className={`text-[11px] font-semibold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
          <span>Progress</span>
          <span>{progressValue}%</span>
        </div>
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${colors.bar} transition-all duration-700`}
            style={{ width: `${progressValue}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatCard;