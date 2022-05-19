const express = require('express')
const { createUser, loginUser, getAllUsers, updateUser, deleteUser, getAllOrders, getOrderById } = require('../controllers/user.controllers')
const { userParamsExists } = require('../middlewares/user.middlewares')
const { protectToken, createUserValidations, checkValidations, validationLogin } = require('../middlewares/validations.middlewares')

const userRouters = express.Router()

userRouters
  .route('/signup')
  .post(createUserValidations, checkValidations, createUser)

userRouters
  .route('/login')
  .post(validationLogin, loginUser)

// BORRAR!!!!!!!!!!!!!!!!!!!!!!!!!
userRouters
.route('/')
.get(getAllUsers)
// BORRAR!!!!!!!!!!!!!!!!!!!!!!!!!

userRouters.use(protectToken)

userRouters
  .route('/orders')
  .get(getAllOrders)

userRouters
  .route('/orders/:id')
  .get(getOrderById)

userRouters
  .use('/:id', userParamsExists)
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser)


module.exports = { userRouters }