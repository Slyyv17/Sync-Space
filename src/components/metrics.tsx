"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MetricsProps {
  containers: {
    id: number;
    title: string;
    cards: { id: number; title: string; editing: boolean }[];
  }[];
}

export default function Metrics({ containers }: MetricsProps) {
  // Extract container titles and card counts for the chart
  const labels = containers.map((container) => container.title || "Untitled");
  const dataValues = containers.map((container) => container.cards.length);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Tasks per Container",
        data: dataValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(50, 205, 50, 0.6)",    // Lime Green
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 0, 255, 0.6)",    // Bright Magenta
          "rgba(0, 255, 255, 0.6)",    // Bright Cyan
          "rgba(255, 69, 0, 0.6)",     // Bright Red-Orange
          "rgba(0, 255, 127, 0.6)",    // Bright Spring Green
          "rgba(255, 20, 147, 0.6)",   // Deep Pink
          "rgba(138, 43, 226, 0.6)",   // Blue Violet
          "rgba(255, 105, 180, 0.6)",  // Hot Pink
          "rgba(255, 140, 0, 0.6)",    // Dark Orange
          "rgba(255, 206, 86, 0.6)",
          "rgba(0, 191, 255, 0.6)",    // Deep Sky Blue
          "rgba(255, 99, 71, 0.6)",    // Tomato
          "rgba(255, 228, 181, 0.6)",  // Moccasin
    ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(50, 205, 50, 0.6)",    // Lime Green
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 0, 255, 0.6)",    // Bright Magenta
          "rgba(0, 255, 255, 0.6)",    // Bright Cyan
          "rgba(255, 69, 0, 0.6)",     // Bright Red-Orange
          "rgba(0, 255, 127, 0.6)",    // Bright Spring Green
          "rgba(255, 20, 147, 0.6)",   // Deep Pink
          "rgba(138, 43, 226, 0.6)",   // Blue Violet
          "rgba(255, 105, 180, 0.6)",  // Hot Pink
          "rgba(255, 140, 0, 0.6)",    // Dark Orange
          "rgba(255, 206, 86, 1)",
          "rgba(0, 191, 255, 0.6)",    // Deep Sky Blue
          "rgba(255, 99, 71, 0.6)",    // Tomato
          "rgba(255, 228, 181, 0.6)",  // Moccasin
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-80 h-fit shadow-lg bg-background">
      {containers.length > 0 ? (
        <Doughnut data={chartData} />
      ) : (
        <p className="text-center">No data to display</p>
      )}
    </div>
  );
}
