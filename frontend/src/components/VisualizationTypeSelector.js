import React from "react";

const VisualizationTypeSelector = ({ setVisualizationType }) => {
  return (
    <div className="widget">
      <div className="sidebar">
        <h2>Select Visualization Type</h2>
        <select onChange={(e) => setVisualizationType(e.target.value)}>
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>
    </div>
  );
};

export default VisualizationTypeSelector;
