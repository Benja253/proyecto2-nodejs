const { DataTypes } = require('sequelize')
const { database } = require('../utils/database')

const User = database.define('user' ,{
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
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    defaultValue: 'normal',
    allowNull: false,
    type: DataTypes.STRING
  },
  status: {
    defaultValue: 'active',
    allowNull: false,
    type: DataTypes.STRING
  }
})

module.exports = {User}