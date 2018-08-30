'use strict';
module.exports = (sequelize, DataTypes) => {
  var Laundry = sequelize.define('Laundry', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    pricePerKg: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Laundry.associate = function(models) {
    // associations can be defined here
  };
  return Laundry;
};