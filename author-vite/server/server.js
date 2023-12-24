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

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

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
    const token = jwt.sign({ userId: user._id }, "secretkey1", {
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
  // Extract the Authorization header
  const bearerHeader = req.headers.authorization;

  // Check if the Authorization header is present
  if (!bearerHeader) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // Attempt to extract the token
  const parts = bearerHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid authentication format" });
  }
  const token = parts[1];

  // Verify the token
  try {
    const verified = jwt.verify(token, "secretkey1"); // Replace "secretkey1" with your actual secret key
    req.user = verified;
    next();
  } catch (error) {
    // Handle different types of JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      // Generic error message for other types of JWT errors
      return res.status(401).json({ message: "Authentication failed" });
    }
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

//dbb
function createSummary(text) {
  return text.substring(0, 50) + (text.length > 50 ? "..." : "");
}

//posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    console.log(posts);
    res.json(posts); // This line is necessary to send the data back to the client.
  } catch (error) {
    console.error("Error fetching posts", error);
    res.status(500).send("Error fetching posts");
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Story not found");
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/posts", (req, res) => {
  const { title, content, image, upvotes, comments } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = new Post({
    title,
    summary: createSummary(content),
    content,
    image,
    upvotes: upvotes || 0,
    comments: comments || [],
  });

  newPost
    .save()
    .then((post) => res.status(201).json(post))
    .catch((err) =>
      res.status(400).json({ message: "Error creating Post", error: err })
    );
});

app.delete("/api/posts/:id", authenticate, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found!");
    }
    res.status(200).send("Post deleted successfully!");
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send("Error deleting post");
  }
});

//stories

//getallstories
app.get("/api/stories", async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.status(500).send("Error fetching stories");
  }
});

//getstorybyid
app.get("/api/stories/:id", async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).send("Story not found");
    }
    res.json(story);
  } catch (error) {
    console.error("Error fetching story:", error);
    res.status(500).send("Internal Server Error");
  }
});

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

app.put("/api/stories/:id", authenticate, async (req, res) => {
  try {
    const { content } = req.body;
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { content: content },
      { new: true }
    );

    if (!story) {
      return res.status(400).send("No story found with that Id");
    }

    res.json(story);
  } catch (error) {
    console.error("Error updating story", error);
    res.status(500).send("Error updating story");
  }
});

// Inside your Express server setup
app.options("/api/stories/:id", cors());

app.delete("/api/stories/:id", authenticate, async (req, res) => {
  try {
    // Add authentication middleware to check if the user is an admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).send("Unauthorized");
    }

    const story = await Story.findByIdAndDelete(req.params.id);
    console.log(story);

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
