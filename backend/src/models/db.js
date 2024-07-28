const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(config.get("mongodbUri"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Mongo connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });
