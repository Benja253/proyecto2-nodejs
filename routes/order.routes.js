const express = require('express')
const { createOrder } = require('../controllers/order.controllers')
const { protectToken } = require('../middlewares/validations.middlewares')

const orderRouter = express.Router()

orderRouter
  .post('/', protectToken, createOrder)
  

module.exports = { orderRouter }