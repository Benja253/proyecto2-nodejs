const { User } = require('../models/user.model')
const { AppError } = require('../utils/AppError')
const { catchAsync } = require('../utils/catchAsync')

const userParamsExists = catchAsync(async(req, res, next) => {
  const { id } = req.params

  const user = await User.findOne({
    where: {
      id,
      status: 'active'
    },
    attributes: { 
      exclude: ['password'] 
    }
  })

  if(!user) {
    return next(new AppError('User not found', 404))
  }

  req.user = user
  next()
})

module.exports = {
  userParamsExists
}