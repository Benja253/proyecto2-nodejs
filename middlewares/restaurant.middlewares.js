const { Restaurant } = require('../models/restaurant.model')
const { Review } = require('../models/review.model')
const { AppError } = require('../utils/AppError')
const { catchAsync } = require('../utils/catchAsync') 

const restaurantExist = catchAsync(async(req, res, next) => {
  const { id } = req.params

  const restaurant = await Restaurant.findOne({where: {id, status: 'active'}})

  console.log(restaurant)

  if(!restaurant) {
    return next(new AppError('Restaurant not found', 404))
  }

  req.restaurant = restaurant
  next()
})

const restaurantIdExist = catchAsync(async(req, res, next) => {
  const { restaurantId } = req.params

  const restaurant = await Restaurant.findOne({where: {
    id: restaurantId,
    status: 'active'
  }})

  if(!restaurant) {
    return next(new AppError('the restaurant does not exist'), 404)
  }

  req.restaurant = restaurant
  next()
})

const reviewExist = catchAsync(async(req, res, next) => {
  const { id } = req.params
  const { userLogged, restaurant } = req

  const review = await Review.findOne({where: {
    id,
    userId: userLogged.id,
    restaurantId: restaurant.id,
    status: 'published'
  }})

  if(!review) {
    return next(new AppError('The review not found or you do not have permission to modify', 404))
  }

  req.review = review
  next()
})

module.exports = {
  restaurantExist,
  reviewExist,
  restaurantIdExist
}