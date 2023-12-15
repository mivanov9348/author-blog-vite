const express = require("express");
const multer = require("multer");
const path = require("path");

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

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
