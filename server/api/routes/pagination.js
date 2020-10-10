const express = require("express");
const router = express.Router();

var fs = require("fs");

const dataPath = "server/data/users.json";

router.get("/:page", (req, res, next) => {
  const curr_page = req.params.page;

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    if (data) {
      var parsedData = JSON.parse(data);
    }

    function Paginator(items, page=1, per_page=20) {
      var offset = (page - 1) * per_page,
        paginatedItems = items.slice(offset,+offset+20);
        total_pages = Math.ceil(items.length / per_page);
      return {
        page: Number(page),
        prev: page - 1 ? page - 1 : null,
        next: Number(page) + 1 <= total_pages ? Number(page) + 1 : null,
        total_pages: total_pages,
        data: paginatedItems,
      };
    }

    const response = Paginator(parsedData.output, curr_page, 20);

    res.status(200).json(response);
  });
});

module.exports = router;
