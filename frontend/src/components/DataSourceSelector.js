import React, { useState } from "react";

const DataSourceSelector = ({ setDataSource, fetchData, setBarColors }) => {
  const [sourceType, setSourceType] = useState("");
  const [sourceConfig, setSourceConfig] = useState({});

  const handleSelect = () => {
    setDataSource({ type: sourceType, config: sourceConfig });
    fetchData(sourceType, sourceConfig);
  };

  return (
    <div className="form-container">
      <h2>Select Data Source</h2>
      <select onChange={(e) => setSourceType(e.target.value)}>
        <option value="">Choose Data Source</option>
        <option value="ds1">DataSource 1</option>
        <option value="ds2">DataSource 2</option>
        <option value="ds3">DataSource 3</option>
      </select>
      <button onClick={handleSelect}>Fetch Data</button>
    </div>
  );
};

export default DataSourceSelector;
