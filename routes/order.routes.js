const express = require('express')
const { createOrder, getAllOrderByUser, updateOrder, deleteOrder } = require('../controllers/order.controllers')
const { orderExist, statusActive } = require('../middlewares/order.middlewares')
const { protectToken } = require('../middlewares/validations.middlewares')

const orderRouter = express.Router()

orderRouter
  .post('/', protectToken, createOrder)
  
orderRouter
  .route('/me')
  .get(protectToken, getAllOrderByUser)
  
orderRouter
  .route('/:id')
  .patch(protectToken, orderExist, statusActive, updateOrder)
  .delete(protectToken, orderExist, statusActive, deleteOrder)

module.exports = { orderRouter }