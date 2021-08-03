import React from "react";
import { useSelector } from "react-redux";
import { State } from "./Reducer";
import { Pie } from "react-chartjs-2";

function Chart() {
  // Generate colors of countries randomly
  const dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          position: "bottom",
          color: "#fff",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  const data = useSelector<State, State["data"]>((state) => state.data);
  let labels = data.map((a) => a.label);
  let population = data.map((a) => a.population);
  let dynamicColorsfun = data.map((a) => dynamicColors());

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "countries populations",
        data: population,
        backgroundColor: dynamicColorsfun,
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Pie
        data={chartData}
        className="pie"
        style={{ color: "#fff" }}
        options={pieOptions}
      />
    </>
  );
}

export default Chart;
