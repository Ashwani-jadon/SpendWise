import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = ({ income, expense }) => {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transaction Analytics",
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderColor: ["#16a34a", "#b91c1c"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
        },
      },
    },
    maintainAspectRatio: false, // Important to control height
  };

  return (
    <div className="h-[250px] w-full">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Graph;
