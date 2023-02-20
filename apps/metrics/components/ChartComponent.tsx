import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ labels, data, color }: any) => {
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

export default ChartComponent;
