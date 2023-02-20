import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartProps = {
  labels?: any;
  data?: any;
  color?: string;
  height?: string;
  width?: string;
};

const PieChart = ({
  labels = ['D1'],
  data = [1],
  color = '#3265af',
  height = 'auto',
  width = 'auto',
}: ChartProps) => {
  return (
    <>
      <div
        style={{
          position: 'relative',
          //   bottom: "10px",
          //   right: "25px",
          height: height,
          width: width,
        }}
      >
        <Pie
          data={{
            labels: labels,
            datasets: [{ data: data, backgroundColor: color }],
          }}
        />
      </div>
    </>
  );
};

export default PieChart;
