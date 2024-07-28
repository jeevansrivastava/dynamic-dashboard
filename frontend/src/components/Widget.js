import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Chart from "./Chart";
import axios from "axios";

const Widget = ({
  visualizationType,
  barColors,
  resData,
  setVisualizationType,
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [xAxisLabel, setXAxisLabel] = useState("");
  const [yAxisLabel, setYAxisLabel] = useState("");
  const [barColor, setBarColor] = useState("#4bc0c0");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(apiUrl);
        setData(resData);
        setLoading(false);
        if (resData.length > 0) {
          setColumns(Object.keys(resData[0]));
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [resData]);

  const saveWidget = async () => {
    const widgetConfig = {
      sourceType: "api", // or 'csv' or 'database', based on your implementation
      sourceConfig: {}, // Add relevant source configuration here
      xAxis: JSON.stringify(xAxis),
      yAxis: JSON.stringify(yAxis),
      xAxisLabel: xAxisLabel,
      yAxisLabel: yAxisLabel,
      barColors: JSON.stringify([barColor]),
      data: JSON.stringify(data),
      visualizationType,
    };

    try {
      await axios.post("http://localhost:4000/widgets", widgetConfig);
      alert("Widget saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save widget.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="widget">
      <Sidebar
        columns={columns}
        setXAxis={setXAxis}
        setYAxis={setYAxis}
        setXAxisLabel={setXAxisLabel}
        setYAxisLabel={setYAxisLabel}
        setBarColor={setBarColor}
        saveWidget={saveWidget}
        setVisualizationType={setVisualizationType}
      />
      <Chart
        data={data}
        visualizationType={visualizationType}
        xAxis={xAxis}
        yAxis={yAxis}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        barColor={barColor}
      />
    </div>
  );
};

export default Widget;
