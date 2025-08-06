import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
  gradient: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient
}) => {
  // Map gradient names to CSS classes
  const gradientClass = 
    gradient === 'from-purple-600 to-purple-800' ? 'gradient-purple' :
    gradient === 'from-pink-500 to-fuchsia-600' ? 'gradient-pink' :
    gradient === 'from-indigo-500 to-blue-600' ? 'gradient-blue' :
    'gradient-purple'; // Default

  return (
    <div className="stats-card">
      <div className={`w-12 h-12 ${gradientClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value.toLocaleString()}</h3>
      <p className="text-lg font-semibold text-white mb-1">{title}</p>
      <p className="text-sm text-white-70">{subtitle}</p>
    </div>
  );
};

export default StatsCard;