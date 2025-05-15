import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import s from './LineChart.module.css'
Chart.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip
);

const LineChart = () => {
  useEffect(() => {
    Chart.register(
      LinearScale,
      CategoryScale,
      PointElement,
      LineElement,
      Legend,
      Title,
      Tooltip
    );
  }, []);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Your Hours",
        data: [10, 20, 15, 25, 30, 22, 18, 14, 21, 27, 35, 42],
        fill: false,
        borderColor: "#0E5FD9",
        borderWidth: 5,
        cubicInterpolationMode: "monotone",
        pointStyle: "point",
        pointRadius: 2,
        pointBorderColor: "#0E5FD9",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={s.lineChart}>
      <h3>Time spent</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
