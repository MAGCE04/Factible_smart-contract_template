import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { formatNumber } from '../utils/helpers';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  gradient?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  subtitle,
  gradient = 'from-primary-500 to-primary-600'
}) => {
  return (
    <div className="stats-card">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${gradient}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-white">
          {typeof value === 'number' ? formatNumber(value) : value}
        </p>
        <p className="text-sm font-medium text-white/80">{title}</p>
        {subtitle && (
          <p className="text-xs text-white/60">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;