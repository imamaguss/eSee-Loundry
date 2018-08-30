const {Laundry} = require('../models')

class AdminController {
    static showLaundry (req,res) {
        Laundry.findAll({
            order: [['name','asc']]
        })
        .then(function(laundries){
            res.render('addLaundry',{laundries:laundries})
        })
        .catch(function(err){
            console.log(err)
        })
    }
}

module.exports = AdminController