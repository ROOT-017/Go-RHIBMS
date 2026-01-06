import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface HorizontalBarChartProps {
  data1?: { data: number[], label?: string };
  data2?: { data: number[], label?: string };
  labels?: string[];
  title: string,
  indexAxis?: 'x' | 'y',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scales?: Record<string, any>,
  barThickness?: number,
  borderWidth?: number,
}

export const HorizontalBarChart = ({ data1, data2, labels, title, scales, indexAxis, barThickness, borderWidth }: HorizontalBarChartProps) => {
  const data = {
    labels: labels,
    datasets: [
      ...(data1 ? [{
        ...data1,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: borderWidth || 1,
        barThickness: barThickness || 10,
      }] : []),
      ...(data2 ? [{
        ...data2,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: borderWidth || 1,
        barThickness: barThickness || 10,
      }] : []),
    ],
  };

  const options = {
    indexAxis: indexAxis ?? 'y' as const, // This will make the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    scales: scales ?? {
      x: {
        beginAtZero: true,
        max: 100, // Set the maximum value to 100
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Bar data={data} options={options} />;
};
