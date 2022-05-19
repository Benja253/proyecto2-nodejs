const { Meal } = require('../models/meal.model')
const { Order } = require('../models/order.model')
const { AppError } = require('../utils/AppError')
const { catchAsync } = require('../utils/catchAsync')

const createOrder = catchAsync(async(req, res, next) => {
  const { quantity, mealId } = req.body
  const { userLogged } = req

  const meal = await Meal.findOne({where: {
    id: mealId
  }})

  if(!meal) {
    return next(new AppError('Meal not found' ,404))
  }

  const price = quantity * meal.price

  const newOrder = await Order.create({
    price,
    userId: userLogged.id,
    mealId
  })

  res.status(201).json({
    status: 'The Order has been created',
    newOrder
  })
})

module.exports = {
  createOrder
}