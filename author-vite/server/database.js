const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/authorblog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDb"))
  .catch((err) => console.error("No Connection", err));

module.exports = mongoose;
