// multer - https://www.geeksforgeeks.org/node-js/upload-files-to-local-public-folder-in-nodejs-using-multer/

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

router.get("/", function (req, res) {
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



module.exports = router;
