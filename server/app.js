const express = require('express')
const app = express()

const productRoutes = require('./api/routes/products')
const usersRoutes = require('./api/routes/users')
const sortingRoutes = require('./api/routes/sort')
const paginationRoutes = require('./api/routes/pagination')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization')
  if (req.method === 'OPTION') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/products', productRoutes)
app.use('/users', usersRoutes)
app.use('/sort', sortingRoutes)
app.use('/pagination', paginationRoutes)

module.exports = app
