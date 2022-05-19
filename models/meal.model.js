const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const Meal = database.define('meal' ,{
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  restaurantId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    foreignKey: true
  },
  status: {
    defaultValue: 'active',
    allowNull: false,
    type: DataTypes.STRING
  }
})

module.exports = {Meal}