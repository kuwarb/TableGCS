const express = require("express");
const router = express.Router();

var fs = require("fs");

const dataPath = "./data/users.json";

router.get("/:status", (req, res, next) => {
  const status = req.params.status.toUpperCase();

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    if (data) {
      var parsedData = JSON.parse(data);
    }

    const result = parsedData.output.filter((item) => item.status === status);
    res.status(200).json(result);
  });
});

module.exports = router;
