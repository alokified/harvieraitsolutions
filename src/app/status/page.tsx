import { Metadata } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import { StatusBadge } from '@/components/status-badge';
import { IncidentItem } from '@/components/incident-item';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'System Status',
  description: 'Real-time status and incident history for Harviera IT Solutions services',
};

type StatusType = 'operational' | 'degraded' | 'partial' | 'outage' | 'maintenance';

interface Service {
  id: string;
  name: string;
  status: StatusType;
  uptime: number;
  description: string;
}

interface Update {
  timestamp: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  message: string;
}

interface Incident {
  id: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'minor' | 'major' | 'critical' | 'maintenance';
  createdAt: string;
  resolvedAt?: string;
  affectedServices: string[];
  updates: Update[];
}

interface StatusData {
  status: StatusType;
  lastUpdated: string;
  uptime: {
    overall: number;
    last30Days: number;
    last90Days: number;
  };
  services: Service[];
  incidents: Incident[];
}

// Read status data from JSON file
function getStatusData(): StatusData {
  const filePath = join(process.cwd(), 'data', 'status.json');
  const fileContents = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
}

export default function StatusPage() {
  const data = getStatusData();
  const serviceNamesMap = data.services.reduce(
    (acc, service) => {
      acc[service.id] = service.name;
      return acc;
    },
    {} as Record<string, string>
  );

  const activeIncidents = data.incidents.filter((incident) => incident.status !== 'resolved');
  const pastIncidents = data.incidents.filter((incident) => incident.status === 'resolved');

  return (
    <>
      {/* Hero Section */}
      <section className="border-b bg-muted/30 py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">System Status</h1>
            <p className="mb-6 text-lg text-muted-foreground">
              Real-time monitoring of our services and infrastructure
            </p>
            <div className="flex flex-col items-center gap-4">
              <StatusBadge status={data.status} size="lg" />
              <p className="text-sm text-muted-foreground">
                Last updated: {formatDate(data.lastUpdated)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Uptime Stats */}
      <section className="border-b py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-bold">Overall Uptime</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="p-6 text-center">
                <div className="mb-2 text-3xl font-bold text-green-600">
                  {data.uptime.last30Days}%
                </div>
                <div className="text-sm text-muted-foreground">Last 30 Days</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="mb-2 text-3xl font-bold text-green-600">
                  {data.uptime.last90Days}%
                </div>
                <div className="text-sm text-muted-foreground">Last 90 Days</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="mb-2 text-3xl font-bold text-green-600">{data.uptime.overall}%</div>
                <div className="text-sm text-muted-foreground">All Time</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Status */}
      <section className="border-b py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-bold">Services</h2>
            <div className="space-y-3">
              {data.services.map((service) => (
                <Card key={service.id} className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        <StatusBadge status={service.status} size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <div className="text-2xl font-bold text-green-600">{service.uptime}%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Active Incidents */}
      {activeIncidents.length > 0 && (
        <section className="border-b bg-orange-50/50 py-12">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center gap-2">
                <h2 className="text-2xl font-bold">Active Incidents</h2>
                <Badge variant="destructive">{activeIncidents.length}</Badge>
              </div>
              <div className="space-y-6">
                {activeIncidents.map((incident) => (
                  <IncidentItem
                    key={incident.id}
                    incident={incident}
                    serviceNames={serviceNamesMap}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Incident History */}
      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-bold">Incident History</h2>
            {pastIncidents.length > 0 ? (
              <div className="space-y-6">
                {pastIncidents.map((incident) => (
                  <IncidentItem
                    key={incident.id}
                    incident={incident}
                    serviceNames={serviceNamesMap}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No past incidents to display</p>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-3 text-2xl font-bold">Stay Informed</h2>
            <p className="mb-6 text-muted-foreground">
              Subscribe to our status updates to receive notifications about incidents and
              maintenance windows.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="mailto:status@harviera.com?subject=Subscribe to Status Updates"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Subscribe via Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
