const { Order } = require('../models/order.model')
const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/AppError')

const orderExist = catchAsync(async(req, res, next) => {
  const { id } = req.params

  const order = await Order.findOne({where: {
    id
  }})

  if(!order) {
    return next(new AppError('Order not exist', 404))
  }

  next()
})

const statusActive = catchAsync(async(req, res, next) => {
  const { id } = req.params

  const order = await Order.findOne({where: {
    id,
    status: 'active'
  }})

  if(!order) {
    return next(new AppError('The order is not active', 404))
  }

  req.order = order
  next()
})

module.exports = {
  orderExist,
  statusActive
}