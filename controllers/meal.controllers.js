const { Meal } = require('../models/meal.model')
const { Restaurant } = require('../models/restaurant.model')
const { catchAsync } = require('../utils/catchAsync')

const createMeal = catchAsync(async(req, res, next) => {
  const { name, price } = req.body
  const { restaurant } = req

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId: restaurant.id
  })

  res.status(200).json({
    status: 'Meal has been created successfully',
    newMeal
  })
})

const updateMeal = catchAsync(async(req, res, next) => {
  const { name, price } = req.body
  const { meal } = req
  
  await meal.update({name, price})

  res.status(200).json({
    status: 'The meal has been updated',
    meal
  })
})

const deleteMeal = catchAsync(async(req, res, next) => {
  const { meal } = req

  await meal.update({status: 'deleted'})

  res.status(200).json({
    status: 'The meal has been deleted',
    meal
  })
})

const getAllMeal = catchAsync(async(req, res, next) => {
  const meals = await Meal.findAll({
    where: {status: 'active'},
    include: [{model: Restaurant}]
  })

  res.status(200).json({
    status: 'success',
    meals
  })

})

const getMealById = catchAsync(async(req, res, next) => {
  const { meal } = req
  
  res.status(200).json({
    status: 'success',
    meal
  })
})

module.exports = {
  createMeal,
  updateMeal,
  deleteMeal,
  getAllMeal,
  getMealById
}