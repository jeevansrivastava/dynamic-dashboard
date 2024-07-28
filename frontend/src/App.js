import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab } from "@mui/material";
import Widget from "./components/Widget";
import DataSourceSelector from "./components/DataSourceSelector";
import DahsboardChart from "./components/DahsboardChart";
import "./App.css";

const App = () => {
  const [dataSource, setDataSource] = useState(null);
  const [data, setData] = useState([]);
  const [visualizationType, setVisualizationType] = useState("bar");
  const [barColors, setBarColors] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const fetchData = async (sourceType, sourceConfig) => {
    // Mock API call to fetch data
    const response = await axios.post(
      `http://localhost:4000/api/data-source/${sourceType}`,
      sourceConfig
    );
    setData(response.data);
    setShowChart(true);
  };
  const fetchSavedWidgets = async () => {
    try {
      const response = await axios.get("http://localhost:4000/widgets");
      setWidgets(response.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchSavedWidgets();
  }, []);

  return (
    <div className="App">
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
      >
        <Tab label="Dashboard" />
        <Tab label="Widget" />
      </Tabs>
      {activeTab === 1 && (
        <div>
          <DataSourceSelector
            setDataSource={setDataSource}
            fetchData={fetchData}
            setBarColors={setBarColors}
          />
          {showChart && (
            <>
              <Widget
                setVisualizationType={setVisualizationType}
                resData={data}
                visualizationType={visualizationType}
                barColors={barColors}
              />
            </>
          )}
        </div>
      )}
      {activeTab === 0 && (
        <div className="widget">
          {widgets.map((widget) => (
            <DahsboardChart
              key={widget._id}
              data={JSON.parse(widget.data)}
              visualizationType={widget.visualizationType}
              xAxis={JSON.parse(widget.xAxis)}
              yAxis={JSON.parse(widget.yAxis)}
              xAxisLabel={widget.xAxisLabel}
              yAxisLabel={widget.yAxisLabel}
              barColor={JSON.parse(widget.barColors)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
