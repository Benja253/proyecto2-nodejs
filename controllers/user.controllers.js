const { User } = require('../models/user.model')
const { catchAsync } = require('../utils/catchAsync')
const { AppError } = require('../utils/AppError')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

dotenv.config({path: './config.env'})

// BORRAR !!!!!!!!!!!!!!!!!!!!!!!!!
const getAllUsers = catchAsync(async(req, res, next) => {
  const users = await User.findAll({where: {status: 'active'}})
  
  res.status(200).json({
    users
  })
})
// BORRAR !!!!!!!!!!!!!!!!!!!!!!!!!

const createUser = catchAsync(async(req, res, next) => {
  const { name, email, password, role } = req.body

  const salt = await bcrypt.genSalt(12)
  const hashPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({ name, email, password: hashPassword, role })

  newUser.password = undefined

  res.status(201).json({ 
    status: 'User has been created successfully',
    newUser 
  })
})

const loginUser = catchAsync(async(req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({
    where: {
      email,
      status: 'active'
    }
  })

  if(!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400))
  }
  // Número hexadecimal de 64 dígitos es con:
  // require('crypto').randomBytes(64).toString('hex')
  const token = await jwt.sign(
    {id: user.id}, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )

  user.password = undefined

  res.status(200).json({
    status: 'User has been logged successfully',
    token,
    user
  })
})

const updateUser = catchAsync(async(req, res, next) => {
  const { name, email } = req.body
  const { user } = req

  await user.update({ name, email })

  res.status(200).json({
    status: 'The user information has been updated',
    user
  })
})

const deleteUser = catchAsync(async(req, res, next) => {
  const { user } = req

  await user.update({
    status: 'deleted'
  })

  res.status(200).json({
    status: 'The user has been deleted successfully',
    user
  })
})

const getAllOrders = catchAsync(async(req, res, next) => {
  res.status(200).json({
    saludo: 'Hola'
  })
})

const getOrderById = catchAsync(async(req, res, next) => {
  const { userLogged } = req
  res.status(200).jason({
    userLogged
  })
})

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllOrders,
  getOrderById
}