const { Restaurant } = require('../models/restaurant.model')
const { Review } = require('../models/review.model')
const { catchAsync } = require('../utils/catchAsync')

const createRestaurant = catchAsync(async(req, res, next) => {
  const { name, address, rating } = req.body

  const newRestaurant = await Restaurant.create({
    name, address, rating
  })

  res.status(200).json({
    status: 'Restaurant has been created successfully',
    newRestaurant
  })
})

const getAllRestaurant = catchAsync(async(req, res, next) => {
  const restaurants = await Restaurant.findAll({where: {status: 'active'}})

  res.status(200).json({
    status: 'success',
    restaurants
  })
})

const getRestaurantById = catchAsync(async(req, res, next) => {
  const { restaurant } = req

  res.status(200).json({
    status: 'success',
    restaurant
  })
})

const updateRestaurant = catchAsync(async(req, res, next) => {
  const { name, address } = req.body
  const { restaurant } = req

  await restaurant.update({name, address})

  res.status(200).json({
    status: 'The database has been updated',
    restaurant
  })

})

const deleteRestaurant = catchAsync(async(req, res, next) => {
  const { restaurant } = req

  await restaurant.update({status: 'deleted'})

  res.status(200).json({
    status: 'The restaurant has been deleted',
    restaurant
  })
})

const createReview = catchAsync(async(req, res, next) => {
  const { comment, rating } = req.body
  const { restaurant, userLogged } = req

  console.log(comment, rating, restaurant.id, userLogged.id)

  const newReview = await Review.create({
    comment,
    rating,
    userId: userLogged.id,
    restaurantId: restaurant.id
  })

  res.status(200).json({
    status: 'The review has been created',
    newReview
  })
})

const updateReview = catchAsync(async(req, res, next) => {
  const { comment, rating } = req.body
  const { review } = req

  await review.update({
    comment,
    rating
  })

  res.status(200).json({
    status: 'The comment has been updated',
    review
  })
})

const deleteReview = catchAsync(async(req, res, next) => {
  const { review } = req

  await review.update({ status: 'deleted' })

  res.status(200).json({
    status: 'The comment has been deleted',
    review
  })
})

module.exports = {
  createRestaurant,
  getAllRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview
}