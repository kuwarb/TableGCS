const express = require('express')
const router = express.Router()


router.get('/', (req, res, next) => {
  res.status(200).json([
    {
      id: 6690,
      status: 'COMPLETED',
      createdOn: 1543325977000,
      name: 'gallant_chandrasekhar',
      description: 'Etincidunt etincidunt ut voluptatem numquam dolore aliquam dolore.',
      delta: 1770,
    },
    {
      id: 6689,
      status: 'COMPLETED',
      createdOn: 1543325975000,
      name: 'vibrant_hypatia',
      description: 'Quisquam eius quiquia eius dolor.',
      delta: 1273,
    },
  ])
})

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST requests to /products',
  })
})

router.get('/:name', (req, res, next) => {
  const name = req.params.name
  if (name === 'gallant_chandrasekhar') {
    res.status(200).json({
      id: 6690,
      status: 'COMPLETED',
      createdOn: 1543325977000,
      name: 'gallant_chandrasekhar',
      description: 'Etincidunt etincidunt ut voluptatem numquam dolore aliquam dolore.',
      delta: 1770,
    })
  } else if (name === 'vibrant_hypatia') {
    res.status(200).json({
      id: 6689,
      status: 'COMPLETED',
      createdOn: 1543325975000,
      name: 'vibrant_hypatia',
      description: 'Quisquam eius quiquia eius dolor.',
      delta: 1273,
    })
  }
})

module.exports = router
