require("app-module-path").addPath(require("path").resolve(__dirname));
require("dotenv-safe").config();
require("models/db");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const axios = require("axios");

const DataSource = require("models/dataSource");
const Widgets = require("models/widgets");

const app = express();

const corsOptions = {
  origin: "*", // allow requests from this domain
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.set("port", process.env.PORT);
app.use(cors(corsOptions));
// Request Body Parsing
app.use(express.text({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));

const upload = multer({ dest: "uploads/" });

app.post("/api/data-source/ds1", (req, res) => {
  const mockData = [
    {
      month: "Jan",
      "Factor A": 10,
      "Factor B": 15,
      "Factor C": 20,
    },
    {
      month: "Feb",
      "Factor A": 12,
      "Factor B": 18,
      "Factor C": 22,
    },
    {
      month: "Mar",
      "Factor A": 14,
      "Factor B": 20,
      "Factor C": 24,
    },
    {
      month: "Apr",
      "Factor A": 16,
      "Factor B": 25,
      "Factor C": 26,
    },
    {
      month: "May",
      "Factor A": 18,
      "Factor B": 22,
      "Factor C": 28,
    },
    {
      month: "Jun",
      "Factor A": 20,
      "Factor B": 24,
      "Factor C": 30,
    },
  ];
  res.json(mockData);
});

app.post("/api/data-source/ds2", (req, res) => {
  const mockData = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 30 },
    { label: "Mar", value: 60 },
  ];
  res.json(mockData);
});

app.post("/api/data-source/ds3", (req, res) => {
  const mockData = [
    { label: "Jan", value: 50 },
    { label: "Feb", value: 40 },
    { label: "Mar", value: 70 },
  ];
  res.json(mockData);
});

app.post("/widgets", async (req, res) => {
  try {
    const widget = await Widgets.create(req.body);
    res.status(201).send(widget);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/widgets", async (req, res) => {
  try {
    const widgets = await Widgets.find({ query: {}, projection: {} });
    res.send(widgets);
  } catch (e) {
    res.status(500).send(e);
  }
});

const PORT = app.get("port");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
