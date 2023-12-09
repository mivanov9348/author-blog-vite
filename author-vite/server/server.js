const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/images", (req, res) => {
  const directoryPath = path.join(__dirname, "../public/Images"); // Adjust this path as needed
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send("Unable to scan directory");
    } else {
      res.json(files);
    }
  });
});

app.get("/api/posts", (req, res) => {
  const jsonFilePath = path.join(__dirname, "../public/data/posts.json"); // Adjust this path as needed

  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading JSON file");
    } else {
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseError) {
        res.status(500).send("Error parsing JSON data");
      }
    }
  });
});

const port = 3001;
app.listen(port, () => console.log("Server is running MAZNAA"));
