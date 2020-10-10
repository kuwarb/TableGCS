const express = require("express");
const router = express.Router();

var fs = require("fs");

const dataPath = "server/data/users.json";

const sort = (data, sortDirection, column) => {
  let jsonAsArray = data;
  column = column.substr(0, 1).toLowerCase() + column.substr(1);
  if (sortDirection === "desc") {
    if (column === "name") {
      jsonAsArray = data.sort(function (itemA, itemB) {
        return itemB[column].localeCompare(itemA[column]);
      });
    } else
      jsonAsArray = data.sort(function (itemA, itemB) {
        return itemB[column] - itemA[column];
      });
  }
  if (sortDirection === "asc") {
    if (column === "name") {
      jsonAsArray = data.sort(function (itemA, itemB) {
        return itemA[column].localeCompare(itemB[column]);
      });
    } else
      jsonAsArray = data.sort(function (itemA, itemB) {
        return itemA[column] - itemB[column];
      });
  }
  return jsonAsArray;
};

const search = (data, name) => {
  let result = data;
  if (name !== null) {
    result = data.filter((item) => item.name.includes(name));
  } else {
    result = data;
  }
  return result;
};

const filter = (data, status) => {
  let jsonArray = data;
  if (status !== "All") {
    console.log('inside not ALL')
    jsonArray = data.filter((item) => item.status === status);
    console.log("filteredArray lengrh",jsonArray.length);
  }
  return jsonArray;
};

router.get("/:page", (req, res, next) => {
  const params = JSON.parse(req.query.params);
  const curr_page = req.params.page;

  const searchedname = params.name;
  const sortingColumn = params.sort.columName;
  const sortingDirection = params.sort.sortDirection;
  const status = params.status;

  console.log("curr_page", curr_page);
  console.log("searchedname", searchedname);
  console.log("sortingColumn", sortingColumn);
  console.log("sortingDirection", sortingDirection);
  console.log("status", status);

  fs.readFile(dataPath, "utf8", (err, data) => {
    let resultRows = [];

    if (err) {
      throw err;
    }

    if (data) {
      var parsedData = JSON.parse(data);
      parsedData = parsedData.output;
    }

    console.log("parsedData", parsedData[1]);

    resultRows = search(parsedData, searchedname);
    console.log("after search", resultRows.length);
    resultRows = sort(resultRows, sortingDirection, sortingColumn);
    console.log("after sort", resultRows.length);
    resultRows = filter(resultRows, status);
    console.log("after filter",resultRows.length);

    function Paginator(items, page = 1, per_page = 20) {
      var offset = (page - 1) * per_page,
        paginatedItems = items.slice(offset, +offset + 20);
      total_pages = Math.ceil(items.length / per_page);
      return {
        page: Number(page),
        prev: page - 1 ? page - 1 : null,
        next: Number(page) + 1 <= total_pages ? Number(page) + 1 : null,
        total_pages: total_pages,
        data: paginatedItems,
      };
    }

    const response = Paginator(resultRows, curr_page, 20);

    console.log("after pagination",response.data.length);

    res.status(200).json(response);
  });
});

module.exports = router;
