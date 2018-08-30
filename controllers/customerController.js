const {Laundry} = require('../models')
const {User} = require('../models')

class CustomerController {
    static showLaundry (req,res) {
        Laundry.findAll({
            order: [['name','asc']]
        })
        .then(function(laundries){
            res.render('laundry',{laundries:laundries})
        })
        .catch(function(err){
            console.log(err)
        })
    }

    static register(req,res) {
        res.render('customerRegister')
    }

    static registerCustomer(req,res) {
        console.log(req.body)
        User.create({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            gender: req.body.gender,
            address: req.body.address,
            phone: req.body.phone,
            role: 'customer'
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