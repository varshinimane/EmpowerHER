// Update your server code to handle file uploads
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Routes
app.post("/api/content", upload.single("file"), (req, res) => {
  // Handle file upload
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Save file information to database or respond with file details
  const fileInfo = {
    filename: file.filename,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    // Add additional properties as needed
  };
  res.json({ message: "File uploaded successfully", file: fileInfo });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
