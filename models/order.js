'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    LaundryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};