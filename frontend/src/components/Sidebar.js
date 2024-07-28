import React, { useState } from "react";

const Sidebar = ({
  columns,
  setXAxis,
  setYAxis,
  setXAxisLabel,
  setYAxisLabel,
  setBarColor,
  saveWidget,
  setVisualizationType,
}) => {
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [color, setColor] = useState("#4bc0c0");

  const handleXLabelsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setXLabels(selectedOptions);
    setXAxis(selectedOptions);
  };

  const handleYLabelChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setYLabels(selectedOptions);
    setYAxis(selectedOptions);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setBarColor(e.target.value);
  };
  return (
    <div className="sidebar">
      <h2>Select Visualization Type</h2>
      <select onChange={(e) => setVisualizationType(e.target.value)}>
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
      </select>
      <h2>Select X Axis</h2>
      <select onChange={handleXLabelsChange}>
        <option value="">Select X Axis</option>
        {columns.map((column, index) => (
          <option key={index} value={column}>
            {column}
          </option>
        ))}
      </select>
      <h2>Custom X Axis Label</h2>
      {xLabels.map((label, index) => (
        <div key={index}>
          <input
            type="text"
            value={label}
            onChange={(e) => {
              const newLabels = [...xLabels];
              newLabels[index] = e.target.value;
              setXLabels(newLabels);
              setXAxis(newLabels);
            }}
            placeholder="Custom X Axis Label"
          />
        </div>
      ))}
      <h2>Select Y Axis</h2>
      <select onChange={handleYLabelChange}>
        <option value="">Select Y Axis</option>
        {columns.map((column, index) => (
          <option key={index} value={column}>
            {column}
          </option>
        ))}
      </select>
      <h2>Custom Y Axis Label</h2>
      {yLabels.map((label, index) => (
        <div key={index}>
          <input
            type="text"
            value={label}
            onChange={(e) => {
              const newLabels = [...yLabels];
              newLabels[index] = e.target.value;
              setYLabels(newLabels);
              setYAxis(newLabels);
            }}
            placeholder="Custom X Axis Label"
          />
        </div>
      ))}

      <h2>Select Bar Color</h2>
      <input type="color" value={color} onChange={handleColorChange} />
      <button onClick={saveWidget}>Save Widget</button>
    </div>
  );
};

export default Sidebar;
