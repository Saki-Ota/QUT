// multer - https://www.geeksforgeeks.org/node-js/upload-files-to-local-public-folder-in-nodejs-using-multer/
// https://www.freecodecamp.org/news/simplify-your-file-upload-process-in-express-js/

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const authorization = require("../middleware/authorization");

router.get("/", authorization, function (req, res) {
  const { imdbId } = req.query;

  if (!imdbId) {
    return res.status(400).json({ Error: true, Message: "Missing imdbId" });
  }

  const imagePath = path.join(__dirname, `../public/images/${imdbId}.jpg`);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ Error: true, Message: "Poster not found" });
    }
    res.sendFile(imagePath);
  });
});

// Upload poster using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, cb) => {
    const imdbId = req.body.imdbId;
    if (!imdbId) {
      return cb(new Error("Missing imdbId"));
    }
    cb(null, `${imdbId}.jpg`);
  },
});

const upload = multer({ storage: storage });

router.post("/add", authorization, upload.single("poster"), (req, res) => {
  const imdbId = req.body.imdbId;

  if (!imdbId) {
    return res
      .status(400)
      .json({ Error: true, Message: "Missing imdbId in body" });
  }

  if (!req.file) {
    return res.status(400).json({ Error: true, Message: "No file uploaded" });
  }

  res.json({
    Error: false,
    Message: "Poster uploaded successfully",
    Data: {
      imdbId: imdbId,
      filePath: `/images/${imdbId}.jpg`,
    },
  }).catch((err) => {
    console.error("Error uploading poster:", err);
    res.status(500).json({ Error: true, Message: "Internal server error" });
  });
});

module.exports = router;
