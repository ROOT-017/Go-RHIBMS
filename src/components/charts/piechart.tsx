// src/DoughnutChart.tsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data1: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data1,labels }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data1,
        backgroundColor: ['#CCD4FF', '#FAE9C6'],
        borderColor: ['#CCD4FF', '#FAE9C6'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.raw;
            return label;
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
