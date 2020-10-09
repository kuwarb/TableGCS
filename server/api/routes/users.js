const express = require('express')
const router = express.Router()

var fs = require('fs')

const dataPath = './data/users.json'

router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    res.send(JSON.parse(data))
  })
})

router.get('/:name', (req, res, next) => {
  const name = req.params.name

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }

    if (data) {
      var parsedData = JSON.parse(data)
    }

    for (let i = 0; i < parsedData.output.length; i++) {
      let parsedName = parsedData.output[i].name

      if (name === parsedName) {
        res.status(200).json(parsedData.output[i])
      }
    }
  })
})

module.exports = router
