const { Meal } = require('../models/meal.model')
const { Order } = require('../models/order.model')
const { Restaurant } = require('../models/restaurant.model')
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

const getAllOrderByUser = catchAsync(async(req, res, next) => {
  const { userLogged } = req

  const orders = await Order.findAll({
    where: {
      userId: userLogged.id,
      status: 'active'
    },
    include: [{
      model: Meal,
      include: [{model: Restaurant}]
    }]
})

  res.status(200).json({
    status: 'success',
    orders
  })

})

const updateOrder = catchAsync(async(req, res, next) => {
  const { order } = req

  await order.update({
    status: 'Completed'
  })

  res.status(200).json({
    status: 'Order has been completed',
    order
  })
})

const deleteOrder = catchAsync(async(erq, res, next) => {
  const { order } = req

  await order.update({
    status: 'cancelled'
  })

  res.status(200).json({
    status: 'Order has been cancelled',
    order
  })
})

module.exports = {
  createOrder,
  getAllOrderByUser,
  updateOrder,
  deleteOrder
}