const express = require("express");
const router = express.Router();

var fs = require("fs");

const dataPath = "./data/users.json";

router.get("/:sortDirection/:column/", (req, res, next) => {
  const sortDirection = req.params.sortDirection;
  const column =
    req.params.column.substr(0, 1).toLowerCase() + req.params.column.substr(1);

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    if (data) {
      var parsedData = JSON.parse(data);
    }

    if (sortDirection === "desc") {
      let jsonAsArray = [];
      if (column === "name") {
        jsonAsArray = parsedData.output.sort(function (itemA, itemB) {
          return itemB[column].localeCompare(itemA[column]);
        });
      } else
        jsonAsArray = parsedData.output.sort(function (itemA, itemB) {
          return itemB[column] - itemA[column];
        });
      res.status(200).json(jsonAsArray);
    }
    if (sortDirection === "asc") {
      let jsonAsArray = [];
      if (column === "name") {
        jsonAsArray = parsedData.output.sort(function (itemA, itemB) {
          return itemA[column].localeCompare(itemB[column]);
        });
      } else
        jsonAsArray = parsedData.output.sort(function (itemA, itemB) {
          return itemA[column] - itemB[column];
        });
      res.status(200).json(jsonAsArray);
    }
  });
});

module.exports = router;
