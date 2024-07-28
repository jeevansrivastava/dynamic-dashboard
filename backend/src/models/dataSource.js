const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const dataSourceSchema = new mongoose.Schema(
  {
    type: String,
    config: Object,
  },
  { timestamps: true }
);

const DataSource = mongoose.model("DataSource", dataSourceSchema);

module.exports = {
  DataSource,
};
