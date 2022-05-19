const  express = require('express')
const { createMeal, updateMeal, deleteMeal, getAllMeal, getMealById } = require('../controllers/meal.controllers')
const { mealExists } = require('../middlewares/meal.middlewares')
const { restaurantExist } = require('../middlewares/restaurant.middlewares')
const { createMealValidations, checkValidations, protectToken, protectAdmin } = require('../middlewares/validations.middlewares')

const mealRouter = express.Router()

mealRouter
  .route('/')
  .get(getAllMeal)

mealRouter
  .route('/:id')
  .post(createMealValidations, checkValidations, protectToken, protectAdmin, restaurantExist, createMeal)
  .get(mealExists, getMealById)
  .patch(protectToken, protectAdmin, mealExists, updateMeal)
  .delete(protectToken, protectAdmin, mealExists, deleteMeal)

module.exports = { mealRouter }