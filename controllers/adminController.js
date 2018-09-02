const {Laundry} = require('../models')

class AdminController {
    static showLaundry (req,res) {
        Laundry.findAll({
            order: [['name','asc']]
        })
        .then(function(laundries){
            res.render('admin',{laundries:laundries,currentUser:req.session.user.name})
        })
        .catch(function(err){
            console.log(err)
        })
    }

    static addLaundry (req,res) {
        Laundry.create({
            name: req.body.name,
            address: req.body.address,
            pricePerKg: req.body.price,
            photo: req.body.photo,
            username: req.body.username,
            password: req.body.password
        })
        .then(function(){
            res.redirect('/admin/dashboard')
        })
        .then(function(err){
            res.send(err)
        })
    }
}

module.exports = AdminController