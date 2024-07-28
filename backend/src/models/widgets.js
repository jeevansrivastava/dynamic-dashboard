const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;
const WidgetSchema = new mongoose.Schema(
  {
    sourceType: String,
    sourceConfig: Object,
    xAxis: Array,
    yAxis: String,
    xAxisLabel: Array,
    yAxisLabel: String,
    barColors: String,
    visualizationType: String,
    data: String,
  },
  { timestamps: true }
);

const Widget = mongoose.model("Widget", WidgetSchema);

module.exports = {
  Widget,
  create: async (insertDict) => new Widget(insertDict).save(),
  find: ({ query, projection }) => Widget.find(query, projection),
};
