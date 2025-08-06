import React from 'react';
import type { LucideIcon } from 'lucide-react';
interface StatsCardProps {
    title: string;
    value: number;
    subtitle: string;
    icon: LucideIcon;
    gradient: string;
}
declare const StatsCard: React.FC<StatsCardProps>;
export default StatsCard;
