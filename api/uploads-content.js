const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // callback(null, "assets/img/content/");
    callback(null, "static/uploads/content/");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage: storage });

app.post("/uploads-content", upload.array("files"), (req, res) => {
  res.json(req.files);
});

export default {
  path: "/api",
  handler: app,
};
