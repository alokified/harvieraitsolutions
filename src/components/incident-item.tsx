import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

type IncidentStatus = 'investigating' | 'identified' | 'monitoring' | 'resolved';
type IncidentSeverity = 'minor' | 'major' | 'critical' | 'maintenance';

interface IncidentUpdate {
  timestamp: string;
  status: IncidentStatus;
  message: string;
}

interface Incident {
  id: string;
  title: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  createdAt: string;
  resolvedAt?: string;
  affectedServices: string[];
  updates: IncidentUpdate[];
}

interface IncidentItemProps {
  incident: Incident;
  serviceNames?: Record<string, string>;
}

const statusConfig = {
  investigating: {
    label: 'Investigating',
    color: 'bg-orange-100 text-orange-700',
    icon: AlertCircle,
  },
  identified: {
    label: 'Identified',
    color: 'bg-yellow-100 text-yellow-700',
    icon: AlertCircle,
  },
  monitoring: {
    label: 'Monitoring',
    color: 'bg-blue-100 text-blue-700',
    icon: Clock,
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-green-100 text-green-700',
    icon: CheckCircle2,
  },
};

const severityConfig = {
  minor: {
    label: 'Minor',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  },
  major: {
    label: 'Major',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  critical: {
    label: 'Critical',
    color: 'bg-red-100 text-red-700 border-red-200',
  },
  maintenance: {
    label: 'Maintenance',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function IncidentItem({ incident, serviceNames = {} }: IncidentItemProps) {
  const statusInfo = statusConfig[incident.status];
  const severityInfo = severityConfig[incident.severity];
  const StatusIcon = statusInfo.icon;

  // Sort updates by timestamp (most recent first)
  const sortedUpdates = [...incident.updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card className="p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">{incident.title}</h3>
            <Badge className={cn('border', severityInfo.color)}>{severityInfo.label}</Badge>
            <Badge variant="outline" className={statusInfo.color}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {statusInfo.label}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{formatDate(incident.createdAt)}</span>
            {incident.resolvedAt && (
              <>
                <span>•</span>
                <span className="text-green-600">
                  Resolved {formatRelativeTime(incident.resolvedAt)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Affected Services */}
      {incident.affectedServices.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-sm font-medium">Affected Services:</div>
          <div className="flex flex-wrap gap-2">
            {incident.affectedServices.map((serviceId) => (
              <Badge key={serviceId} variant="secondary">
                {serviceNames[serviceId] || serviceId}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        <div className="text-sm font-medium">Updates:</div>
        <div className="relative space-y-6 border-l-2 border-muted pl-6">
          {sortedUpdates.map((update, index) => {
            const updateStatusInfo = statusConfig[update.status];
            const UpdateIcon = updateStatusInfo.icon;
            return (
              <div key={`${update.timestamp}-${index}`} className="relative">
                <div
                  className={cn(
                    'absolute -left-[29px] flex h-8 w-8 items-center justify-center rounded-full border-2 border-background',
                    updateStatusInfo.color
                  )}
                >
                  <UpdateIcon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn('text-xs', updateStatusInfo.color)}>
                      {updateStatusInfo.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(update.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{update.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
