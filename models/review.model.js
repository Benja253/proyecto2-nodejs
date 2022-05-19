const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const Review = database.define('review' ,{
  id:{
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    foreignKey: true
  },
  comment: {
    allowNull: false,
    type: DataTypes.STRING
  },
  restaurantId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  status: {
    defaultValue: 'published',
    allowNull: false,
    type: DataTypes.STRING
  }
})

module.exports = {Review}