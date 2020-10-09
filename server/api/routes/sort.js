const express = require('express')
const router = express.Router()

var fs = require('fs')

const dataPath = './data/users.json'

router.get('/:sortDirection/:column/', (req, res, next) => {
  const sortDirection = req.params.sortDirection
  const column = req.params.column

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }

    if (data) {
      var parsedData = JSON.parse(data)
    }

    if (sortDirection === 'desc') {
      const jsonAsArray = Object.keys(parsedData.output)
        .map(function (key) {
          return parsedData.output[key]
        })
        .sort(function (itemA, itemB) {
          return itemB.id - itemA.id
        })
      res.status(200).json(jsonAsArray)
    }
    if (sortDirection === 'asc') {
      const jsonAsArray = Object.keys(parsedData.output)
        .map(function (key) {
          return parsedData.output[key]
        })
        .sort(function (itemA, itemB) {
          return itemA.id - itemB.id
        })
      res.status(200).json(jsonAsArray)
    }
  })
})

module.exports = router
