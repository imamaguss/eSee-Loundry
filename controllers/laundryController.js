const User = require('../models/').User;
const Order = require('../models/').Order;
const Laundry = require('../models/').Laundry;
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
apiKey: 'c475dd45',
apiSecret: 'yu7Jgp1om7IDmdWi'
});
class LaundryController {
  static edit(req, res) {
    Order
      .findOne({
        where: {id: req.params.id}
      })
      .then(data => {
        let order = data.dataValues;
        Laundry
          .findOne({where: {id: order.LaundryId}})
          .then(laundry => {
            res.render('orderProcessed', {
              id: req.params.id, order,
              laundry
            })
          })
      }) 
      .catch(err => {
        res.send(err);
      })
  }

  static edited(req, res) {
    Order
      .update({
        quantity: +req.body.quantity,
        totalPrice: +req.body.totalPrice,
        dueDate: new Date(req.body.dueDate),
        status: 'On Process'
      }, {
        where: {id: req.params.id}
      })
      .then(data => {
        Order
          .findOne({where: {id: req.params.id}})
          .then(order => {
            User.findOne({
              where: {id: order.dataValues.UserId}
            })
            .then(user => {
              const from = 'Nexmo';
              const to = user.phone;
              const text = 'Hii, ' + user.name + ' kami sedang memproses orderan Anda. Perkiraan akan selesai pada'+ order.dueDate + ' . Terimakasih...';
        
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
              res.redirect('/laundry/login');
            })
          })
      })
      .catch(err => {
        res.send(err)
      })
    
  }
}

module.exports = LaundryController;