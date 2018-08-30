'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.TEXT,
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};