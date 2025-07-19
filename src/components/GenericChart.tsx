// src/components/GenericChart.tsx
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type ChartType = 'line' | 'bar' | 'area';

interface ChartData {
  [key: string]: string | number;
}

interface GenericChartProps {
  data: ChartData[];
  xKey: string;
  dataKeys: string[]; // e.g., ['producao', 'gastos']
  labels?: string[];  // e.g., ['Produção', 'Gastos']
  type?: ChartType;
  height?: number;
  colors?: string[];
}

export default function GenericChart({
  data,
  xKey,
  dataKeys,
  labels,
  type = 'line',
  height = 300,
  colors = ['#22c55e', '#3b82f6'],
}: GenericChartProps) {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 20, left: 0, bottom: 0 },
    };

    const elements = dataKeys.map((key, index) => {
      const label = labels?.[index] || key;
      const color = colors[index % colors.length];

      switch (type) {
        case 'bar':
          return <Bar key={key} dataKey={key} fill={color} name={label} />;
        case 'area':
          return (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              fill={color}
              name={label}
            />
          );
        case 'line':
        default:
          return (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              name={label}
            />
          );
      }
    });

    const ChartComponent =
      type === 'bar'
        ? BarChart
        : type === 'area'
        ? AreaChart
        : LineChart;

    return (
      <ChartComponent {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {elements}
      </ChartComponent>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
