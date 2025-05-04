import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useWallet } from "../context/WalletContext";

// Register required elements and plugins
ChartJS.register(ArcElement, Tooltip, Legend);

export default function HomeAnalytics() {
  const { transactions } = useWallet();

  const income = transactions
    .filter((t) => t.type === "receive")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "spend")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"], // green and red
        borderColor: "#1e1e1e",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff", // white labels for dark background
        },
      },
    },
  };

  return (
    <div className="text-white space-y-8">
      <h1 className="text-2xl font-bold">📊 Analytics Summary</h1>

      {/* Summary Cards */}
      <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-900 p-4 rounded-md">
          <p className="text-sm text-gray-400">Total Transactions</p>
          <p className="text-2xl font-semibold">{transactions.length}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-md">
          <p className="text-sm text-gray-400">Total Income</p>
          <p className="text-2xl font-semibold text-green-400">
            ₹{income.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-900 p-4 rounded-md">
          <p className="text-sm text-gray-400">Total Expense</p>
          <p className="text-2xl font-semibold text-red-400">
            ₹{expense.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-[#1e1e1e] p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Income vs Expense Chart
        </h3>

        {/* Chart container with fixed height */}
        <div className="relative h-50 w-full">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
