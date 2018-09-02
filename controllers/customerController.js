const {Laundry} = require('../models')
const {User} = require('../models')
const {Order} = require('../models')
const crypto = require('crypto')
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
apiKey: 'c475dd45',
apiSecret: 'yu7Jgp1om7IDmdWi'
});
const Sequelize = require('../models').Sequelize;
const Op = Sequelize.Op
const convertDate = require('../helpers/convertDate')

class CustomerController {

    static register(req,res) {
        res.render('customerRegister')
    }

    static registerCustomer(req,res) {
        let salt = crypto.createHash('md5').update(req.body.username).digest('hex')
        let combined = req.body.password + salt
        let encryptedPassword = crypto.createHash('md5').update(combined).digest('hex')
        User.create({
            name: req.body.name,
            username: req.body.username,
            password: encryptedPassword,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            role: 'customer'
        })
        .then(function(){
            res.redirect('/login')
        })
        .catch(function(err){
            res.send(err)
        })
    }

    static createOrder(req,res) {
        
        Order.create({
            LaundryId : req.params.laundryId,
            UserId : req.params.userId,
            status : 'waiting',
            orderDate : new Date
        })
        .then(function(){
            User.findOne({where: {id: req.params.userId}})
                .then(user => {
                    const from = 'Nexmo';
                    const to = user.phone;
                    const text = 'Hii, ' + user.name + ' kami telah menerima orderan Anda. Mohon menunggu kedatangan rekan kami untuk penjemputan cucian Anda. Terimakasih...';

                    nexmo.message.sendSms(from, to, text, (error, response) => {
                    if(error) {
                        throw error;
                    } else if(response.messages[0].status != '0') {
                        console.error(response);
                        throw 'Nexmo returned back a non-zero status';
                    } else {
                        console.log(response);
                    }
                    });
                })
            res.redirect('/customer/dashboard')
        })
        .catch(function(err){
            res.send(err)
        })

    }

    static dashboard (req, res) {
        let orderBy = null
        let where = {}
        if (req.query.search) {
            where = {
                name: {
                    [Op.iLike]: '%'+req.query.search+'%'
                }
            }
        }
        if (req.query.sort==='asc'){
            orderBy = [['pricePerKg','asc']]
        } else {
            orderBy = [['pricePerKg','desc']]
        }
        Laundry.findAll({
            order: orderBy,
            where: where
        }).then(laundries => {
            console.log(req.session.user.name)
            res.render('customer', {user: req.session.user, laundries:laundries, currentUser:req.session.user.name})
        })
    }

    static orderHistory (req,res) {
        Order.findAll({
            include : [Laundry],
            where: {
                UserId : req.session.user.id
            }
        })
        .then(function(orders){
            res.render('orderCust',{orders:orders,convertDate:convertDate})
        })
        .catch(function(err){
            res.send(err)
        })
    }

}

module.exports = CustomerController