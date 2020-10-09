const express = require("express");
const router = express.Router();

var fs = require("fs");

const dataPath = "./data/users.json";

router.get("/", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }
    var parsedData = JSON.parse(data);
    res.send(parsedData.output);
  });
});

router.get("/search/:name", (req, res, next) => {
  const name = req.params.name;

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    if (data) {
      var parsedData = JSON.parse(data);
    }
    const result = parsedData.output.filter((item) => item.name.includes(name));
    res.status(200).json(result);
  });
});

module.exports = router;
