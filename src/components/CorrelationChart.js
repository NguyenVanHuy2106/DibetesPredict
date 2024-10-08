import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CorrelationChart = ({ data }) => {
  const labels = data.map((item) => item[0]);
  const values = data.map((item) => item[1]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Correlation Coefficient",
        data: values,
        backgroundColor: values.map((v) => (v >= 0 ? "#76b5c5" : "#d95f02")),
      },
    ],
  };

  const options = {
    indexAxis: "y", // Biểu đồ nằm ngang
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Feature Correlation with Target",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CorrelationChart;
