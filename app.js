const express = require('express')
const { globalErrorHandler } = require('./controllers/error.controllers')
const { mealRouter } = require('./routes/meal.routes')
const { restaurantRouter } = require('./routes/restaurant.routes')
const { userRouters } = require('./routes/user.routes')

const app = express()

app.use(express.json())

app.use('/api/v1/users', userRouters)

app.use('/api/v1/restaurant', restaurantRouter)

app.use('/api/v1/meals', mealRouter)

app.use('*', globalErrorHandler)

module.exports = {
  app
}