'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topup = sequelize.define('Topup', {
    amount: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    verified: DataTypes.BOOLEAN
  }, {});
  Topup.associate = function(models) {
    // associations can be defined here
    Topup.belongsTo(models.User)
  };
  return Topup;
};