import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, AlertTriangle, XCircle, Settings } from 'lucide-react';

type StatusType = 'operational' | 'degraded' | 'partial' | 'outage' | 'maintenance';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  operational: {
    label: 'Operational',
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: CheckCircle2,
    iconColor: 'text-green-600',
  },
  degraded: {
    label: 'Degraded Performance',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: AlertCircle,
    iconColor: 'text-yellow-600',
  },
  partial: {
    label: 'Partial Outage',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    icon: AlertTriangle,
    iconColor: 'text-orange-600',
  },
  outage: {
    label: 'Major Outage',
    color: 'bg-red-100 text-red-700 border-red-200',
    icon: XCircle,
    iconColor: 'text-red-600',
  },
  maintenance: {
    label: 'Maintenance',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: Settings,
    iconColor: 'text-blue-600',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

const iconSizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function StatusBadge({ status, size = 'md', showIcon = true, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.color,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Icon className={cn(iconSizeClasses[size], config.iconColor)} />}
      <span>{config.label}</span>
    </div>
  );
}
