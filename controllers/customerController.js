const {Laundry} = require('../models')
const {User} = require('../models')
const {Order} = require('../models')
const crypto = require('crypto')

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
        // console.log(req.params)
        Order.create({
            LaundryId : req.params.laundryId,
            UserId : req.params.userId,
            status : 'waiting',
            orderDate : new Date
        })
        .then(function(){
            res.redirect('/customer')
        })
        .catch(function(err){
            res.send(err)
        })

    }

}

module.exports = CustomerController