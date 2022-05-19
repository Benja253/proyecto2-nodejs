const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const Restaurant = database.define('restaurant' ,{
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
  address: {
    allowNull: false,
    type: DataTypes.STRING
  },
  rating: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  status: {
    defaultValue: 'active',
    allowNull: false,
    type: DataTypes.STRING
  }
})

module.exports = {Restaurant}