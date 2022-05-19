const express = require('express')
const { 
  createRestaurant, 
  getAllRestaurant, 
  getRestaurantById, 
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/restaurant.controllers')
const { 
  restaurantExist,
  reviewExist,
  restaurantIdExist 
} = require('../middlewares/restaurant.middlewares')
const { 
  protectToken, 
  checkValidations, 
  createRestaurantValidations, 
  protectAdmin
} = require('../middlewares/validations.middlewares')

const restaurantRouter = express.Router()

restaurantRouter
  .route('/')
  .post(protectToken, createRestaurantValidations, checkValidations, createRestaurant)
  .get(getAllRestaurant)

restaurantRouter
  .route('/reviews/:id')
  .post(protectToken, restaurantExist, createReview)
  
restaurantRouter
  .route('/reviews/:restaurantId/:id')
  .patch(protectToken, restaurantIdExist, reviewExist, updateReview)
  .delete(protectToken, restaurantIdExist, reviewExist, deleteReview)

restaurantRouter
  .use('/:id', restaurantExist)
  .route('/:id')
  .get(getRestaurantById)
  .patch(protectToken, protectAdmin, updateRestaurant)
  .delete(protectToken, protectAdmin, deleteRestaurant)

module.exports = { restaurantRouter }