const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const Order = database.define('order' ,{
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  mealId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  status: {
    defaultValue: 'active',
    allowNull: false,
    type: DataTypes.STRING
  }
})

module.exports = {Order}