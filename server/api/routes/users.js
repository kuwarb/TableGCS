const express = require("express");
const router = express.Router();

var fs = require("fs");

const dataPath = "./data/users.json";

router.get("/search/:name", (req, res, next) => {
  const name = req.params.name;

  fs.readFile(dataPath, "utf8", (err, data) => {
    let result = [];
    if (err) {
      throw err;
    }

    if (data) {
      var parsedData = JSON.parse(data);
    }
    if (name !== "null") {
      result = parsedData.output.filter((item) => item.name.includes(name));
    } else {
      result = parsedData.output;
    }
    res.status(200).json(result);
  });
});

module.exports = router;
