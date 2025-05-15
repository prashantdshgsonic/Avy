import React from "react";
import { Pie } from "react-chartjs-2";
import s from "./CircleChart.module.css";

import { Chart, ArcElement, Legend, Title, Tooltip } from "chart.js";

Chart.register(ArcElement, Legend, Title, Tooltip);

const CircleChart = () => {
  const data = {
    labels: ["Completed Courses", "Courses in progress"],
    datasets: [
      {
        label: "Your Courses",
        data: [12, 7],
        backgroundColor: ["#E8B604", "#6B17D8"],
        hoverOffset: 10,
      },
    ],
  };

  return (
    <div className={s.circleChart}>
      <h3>Your courses info</h3>
      <Pie data={data} />
    </div>
  );
};

export default CircleChart;
