const { app } = require('./app')
const { database } = require('./utils/database')
const dotenv = require('dotenv')

//models
const {Meal} =  require('./models/meal.model')
const {Order} =  require('./models/order.model')
const {Restaurant} =  require('./models/restaurant.model')
const {Review} =  require('./models/review.model')
const {User} =  require('./models/user.model')

dotenv.config({path: './config.env'})

database.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err))

Meal.hasOne(Order)
Order.belongsTo(Meal)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Restaurant.hasMany(Review)
Review.belongsTo(Restaurant)

Restaurant.hasMany(Meal)
Meal.belongsTo(Restaurant)

database.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`)
})