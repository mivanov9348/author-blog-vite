const express = require("express");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const mongoose = require("./database");
const { User, Post, Comment, Story } = require("../models/ModelsCollection"); // Adjust the path as necessary

const app = express();

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads")); // Removed the leading slash for consistency
  },
  filename: function (req, file, cb) {
    const firstThreeLetters = file.originalname.substring(0, 3);
    const dateNow = Date.now();
    const newFilename = `${firstThreeLetters}${dateNow}${path.extname(
      file.originalname
    )}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

// Static Files Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Upload Endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  // Make sure the file is received
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  res.json({ imagePath: `/uploads/${req.file.filename}` });
});

// Error Handling Middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/uploads", (req, res) => {
  fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error reading files");
    }
    const filePaths = files.map((file) => `uploads/${file}`);
    res.json(filePaths);
  });
});

app.get("/api/stories", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).send("Error fetching stories");
  }
});

//dbb

function createSummary(text) {
  return text.substring(0, 50) + (text.length > 50 ? "..." : "");
}

app.post("/api/posts", (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    summary: createSummary(req.body.content),
    content: req.body.content,
    image: req.body.image,
    upvotes: req.body.upvotes,
    comments: req.body.comments,
  });

  newPost
    .save()
    .then((post) => res.status(201).json(post))
    .catch((err) =>
      res.status(400).json({ message: "Error creating Post", error: err })
    );
});

app.post("/api/stories", (req, res) => {
  const newStory = new Story({
    title: req.body.title,
    summary: createSummary(req.body.content),
    content: req.body.content,
    image: req.body.image,
    upvotes: req.body.upvotes,
    comments: req.body.comments,
    mainPost: false,
  });

  newStory
    .save()
    .then((story) => res.status(201).json(story))
    .catch((err) =>
      res.status(400).json({ message: "Error for the Post", error: err })
    );
});

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
