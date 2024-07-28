// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [dataSources, setDataSources] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState(null);
  const [yAxis, setYAxis] = useState(null);

  useEffect(() => {
    axios
      .get("/data-sources")
      .then((response) => {
        setDataSources(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreateDataSource = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataSourceType = formData.get("type");
    const config = {
      filePath: formData.get("filePath"),
      url: formData.get("url"),
      method: formData.get("method"),
      headers: formData.get("headers"),
      connectionString: formData.get("connectionString"),
      query: formData.get("query"),
    };

    axios
      .post("/data-sources", { type: dataSourceType, config })
      .then((response) => {
        const newDataSource = response.data;
        setDataSources([...dataSources, newDataSource]);
        setSelectedDataSource(newDataSource);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectDataSource = (dataSource) => {
    setSelectedDataSource(dataSource);
    axios
      .get(`/data-sources/${dataSource._id}/data`)
      .then((response) => {
        const data = response.data;
        const columns = Object.keys(data[0]);
        setSelectedColumns(columns);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelectColumns = (columns) => {
    setSelectedColumns(columns);
  };

  const handleSelectChartType = (chartType) => {
    setChartType(chartType);
  };

  const handleSelectXAxis = (column) => {
    setXAxis(column);
  };

  const handleSelectYAxis = (column) => {
    setYAxis(column);
  };

  return (
    <div>
      <h1>Data Sources</h1>
      <ul>
        {dataSources.map((dataSource) => (
          <li key={dataSource._id}>
            <button onClick={() => handleSelectDataSource(dataSource)}>
              {dataSource.type}
            </button>
          </li>
        ))}
      </ul>
      {selectedDataSource && (
        <div>
          <h2>Selected Data Source</h2>
          <p>Type: {selectedDataSource.type}</p>
          <p>Config: {JSON.stringify(selectedDataSource.config)}</p>
          <h2>Columns</h2>
          <ul>
            {selectedColumns.map((column) => (
              <li key={column}>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(column)}
                  onChange={() => handleSelectColumns(column)}
                />
                <span>{column}</span>
              </li>
            ))}
          </ul>
          <h2>Chart Type</h2>
          <select
            value={chartType}
            onChange={(event) => handleSelectChartType(event.target.value)}
          >
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
          <h2>X Axis</h2>
          <select
            value={xAxis}
            onChange={(event) => handleSelectXAxis(event.target.value)}
          >
            {selectedColumns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
          <h2>Y Axis</h2>
          <select
            value={yAxis}
            onChange={(event) => handleSelectYAxis(event.target.value)}
          >
            {selectedColumns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
