const express = require('express')
const router = express.Router()

var fs = require('fs')

const dataPath = './data/users.json'

router.get('/:rows/:page', (req, res, next) => {
  const rows = req.params.rows
  const curr_page = req.params.page

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }

    if (data) {
      var parsedData = JSON.parse(data)
    }

    function Paginator(items, page, per_page) {
      var page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,
        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page)
      return {
        page: page,
        per_page: per_page,
        pre_page: page - 1 ? page - 1 : null,
        next_page: total_pages > page ? page + 1 : null,
        total: items.length,
        total_pages: total_pages,
        data: paginatedItems,
      }
    }

    const response = Paginator(parsedData.output, curr_page, rows)

    res.status(200).json(response)
  })
})

module.exports = router
