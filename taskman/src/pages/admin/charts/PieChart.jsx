// PieChart.js
import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // Dummy data for enquiries per department
  const data = {
    labels: ["HR", "Engineering", "Sales", "Support"],
    datasets: [
      {
        label: "Enquiries per Department",
        data: [12, 19, 5, 10], // Replace with actual data
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverOffset: 4,
      },
    ],
  };

  // Chart configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default PieChart;
