const { body } = require('express-validator')
const { validationResult } = require('express-validator')
const { catchAsync } = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
const { AppError } = require('../utils/AppError')
const { User } = require('../models/user.model')

// USERS
const createUserValidations = [
  body('name')
    .notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Must be a valid email'),
  body('password')
    .notEmpty().withMessage('Password cannot be empty')
    .isLength({ min: 8 }).withMessage('The minimal characters for the password is 8')
]

const validationLogin = [
  body('email')
    .notEmpty().withMessage('Email cannot be empty')
    .isEmail().withMessage('Must be a valid email'),
  body('password')
    .notEmpty().withMessage('Password cannot be empty')
]

// RESTAURANTS
const createRestaurantValidations = [
  body('name')
    .notEmpty().withMessage('Name cannot be empty'),
  body('address')
    .notEmpty().withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty().withMessage('Rating cannot be empty')
]

// RESTAURANTS
const createMealValidations = [
  body('name')
    .notEmpty().withMessage('Name cannot be empty'),
  body('price')
    .notEmpty().withMessage('Price cannot be empty'),
]

// GENERAL VALIDATION
const checkValidations = (req, res, next) => {
  const errors = validationResult(req)

  if(!errors.isEmpty()){
    const errorMessages = errors.array().map(({msg}) => msg)
    const errorMessagesString = errorMessages.join('. ')
    return new AppError(errorMessagesString, 400)
  }

  next()
}

// PROTECT USER ADMIN
const protectAdmin = catchAsync(async(req, res, next) => {
  const { userLogged } = req

  if(userLogged.role !== 'admin') {
    return next(new AppError('Action not allowed, talk to user administrator'), 401)
  }

  next()
})

// TOKEN VALIDATION
const protectToken = catchAsync(async (req, res, next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if(!token) {
    return next(new AppError('Session invalid', 403))
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET)

  const user = await User.findOne({where: { id: decoded.id }})

  if(!user) {
    return next(new AppError('The owner of this token is no longer available', 403))
  }

  req.userLogged = user
  next()
})

module.exports = {
  createUserValidations,
  validationLogin,
  createRestaurantValidations,
  createMealValidations,
  checkValidations,
  protectToken,
  protectAdmin
}