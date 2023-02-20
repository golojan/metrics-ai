import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  PointElement,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  CategoryScale,
  LineElement
);

const LineChart = ({ labels, data, color }: any) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "25px",
          height: "90px",
          width: "90px",
        }}
      >
        <Line
          data={{
            labels: labels,
            datasets: [{ data: data, backgroundColor: color }],
          }}
        />
      </div>
    </>
  );
};

export { LineChart };
