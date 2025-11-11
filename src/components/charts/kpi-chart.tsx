'use client';

import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface KPIChartProps {
  metric: string;
  value: string;
  description: string;
}

interface TooltipPayload {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">{payload[0].value.toFixed(0)}</p>
      </div>
    );
  }
  return null;
}

export function KPIChart({ metric, value, description }: KPIChartProps) {
  // Parse the value to extract percentage or numeric improvement
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
  const isPercentage = value.includes('%');
  const isIncrease =
    value.includes('+') ||
    value.includes('increase') ||
    value.includes('higher') ||
    value.includes('faster');
  const isDecrease =
    value.includes('-') ||
    value.includes('decrease') ||
    value.includes('lower') ||
    value.includes('reduction');

  // Calculate before and after values for visualization
  let beforeValue = 100;
  let afterValue = 100;

  if (isPercentage && numericValue) {
    if (isIncrease) {
      afterValue = 100 + numericValue;
    } else if (isDecrease) {
      afterValue = 100 - numericValue;
    }
  } else if (numericValue) {
    // For non-percentage metrics, use the numeric value as after
    afterValue = numericValue;
    beforeValue = isIncrease ? numericValue / 1.5 : numericValue * 1.5;
  }

  const data = [
    {
      name: 'Before',
      value: beforeValue,
      fill: '#94a3b8', // muted color
    },
    {
      name: 'After',
      value: afterValue,
      fill: '#3b82f6', // primary blue
    },
  ];

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="mb-1 text-sm font-medium text-muted-foreground">{metric}</h3>
        <p className="text-2xl font-bold text-primary">{value}</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} className="text-muted-foreground" />
          <YAxis
            tick={{ fontSize: 12 }}
            className="text-muted-foreground"
            tickFormatter={(tickValue: number) =>
              isPercentage ? `${tickValue}%` : tickValue.toString()
            }
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <p className="mt-4 text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}
