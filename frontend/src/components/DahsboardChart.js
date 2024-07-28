import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DahsboardChart = ({
  data,
  visualizationType,
  barColor,
  xAxis,
  yAxis,
  xAxisLabel,
  yAxisLabel,
}) => {
  if (!xAxis || !yAxis) return <div>Please select both X and Y axes.</div>;
  const labels = data.map((item) =>
    xAxis.map((axis) => item[axis]).join(" - ")
  );
  console.log(barColor);
  const chartData = {
    labels,
    datasets: [
      {
        label: `${xAxis} vs ${yAxis}`,
        data: data.map((item) => item[yAxis]),
        backgroundColor: barColor,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLabel || xAxis,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel || yAxis,
        },
      },
    },
  };

  const renderChart = () => {
    switch (visualizationType) {
      case "bar":
        return <Bar data={chartData} options={options} />;
      case "line":
        return <Line data={chartData} options={options} />;
      case "pie":
        return <Pie data={chartData} options={options} />;
      default:
        return null;
    }
  };

  return <div style={{ width: "100%", height: "100%" }}>{renderChart()}</div>;
};

export default DahsboardChart;
