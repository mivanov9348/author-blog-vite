const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mongoose = require("./database");
const { User, Post, Comment, Story } = require("../models/ModelsCollection");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// CORS Middleware
//app.use((req, res, next) => {
//res.header("Access-Control-Allow-Origin", "*");
//res.header(
//"Access-Control-Allow-Methods",
//"GET, POST, OPTIONS, PUT, PATCH, DELETE"
// );
//res.header(
//"Access-Control-Allow-Headers",
//"Origin, X-Requested-With, Content-Type, Accept"
//);
//next();
//});

//loginregister

//register
app.post("/api/register", async (req, res) => {
  try {
    console.log("Registering user:", req.body);
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).send("User is successfully registered!");
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, "secretkey", {
      expiresIn: "1h",
    });
    const userForResponse = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    res.json({
      message: "Logged in successfully",
      user: userForResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//authentication

function authenticate(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    return res.status(401).send("Access Denied");
  }

  const token = bearerHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Acess Denied");
  }

  try {
    const verified = jwt.verify(token, "secretkey1");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

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

//posts

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

//stories

app.post("/api/stories", (req, res) => {
  const newStory = new Story({
    title: req.body.title,
    summary: createSummary(req.body.content),
    content: req.body.content,
    image: req.body.image,
    upvotes: req.body.upvotes,
    comments: req.body.comments,
    mainStory: false,
  });

  newStory
    .save()
    .then((story) => res.status(201).json(story))
    .catch((err) =>
      res.status(400).json({ message: "Error for the Post", error: err })
    );
});

// Inside your Express server setup

app.delete("/api/stories/:id", authenticate, async (req, res) => {
  try {
    // Add authentication middleware to check if the user is an admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).send("Unauthorized");
    }

    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).send("No story found with that ID");
    }

    res.status(200).send("Story deleted successfully");
  } catch (error) {
    console.error("Error deleting story:", error);
    res.status(500).send("Error deleting story");
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
