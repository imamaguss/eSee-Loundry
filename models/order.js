'use strict';
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
apiKey: 'c475dd45',
apiSecret: 'yu7Jgp1om7IDmdWi'
});
const User = require('../models').User;

module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    LaundryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER
  }, {hooks: {
    afterBulkUpdate: (order, option) => {
      const Nexmo = require('nexmo');
      const nexmo = new Nexmo({
      apiKey: 'c475dd45',
      apiSecret: 'yu7Jgp1om7IDmdWi'
      });

      User
        .findOne({where: {id: order.UserId}})
        .then(user => {
          const from = 'Nexmo';
          const to = user.phone;
          const text = 'Hii, ' + user.name + ' kami sedang memproses orderan Anda. Perkiraan akan selesai pada'+ order.dueDate + '. Terimakasih...';
    
          nexmo.message.sendSms(from, to, text, (error, response) => {
            if(error) {
                throw error;
            } else if(response.messages[0].status != '0') {
                console.error(response);
                throw 'Nexmo returned back a non-zero status';
            } else {
                console.log(response);
            }
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }});
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsTo(models.User)
    Order.belongsTo(models.Laundry)
  };
  return Order;
};