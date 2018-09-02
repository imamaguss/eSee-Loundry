const {User} = require('../models')
const {Laundry} = require('../models')
const crypto = require('crypto')

class AuthController {
    static loginForm(req,res) {
        res.render('login')
    }

    static login (req,res) {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(user => {
            if (user == null) {
                res.redirect('/customer/register')
            } else {
                let salt = crypto.createHash('md5').update(req.body.username).digest('hex')
                let combined = req.body.password + salt
                let encryptedPassword = crypto.createHash('md5').update(combined).digest('hex')
                User.findOne({
                        where: {
                            username: req.body.username, //it should be email
                            password: encryptedPassword
                        }
                    })
                    .then(user => {
                        Laundry.findAll()
                        .then(function(laundries){
                            if (user) {
                                req.session.user = user
                                if(user.role==='customer'){
                                    res.redirect('/customer/dashboard')
                                } else if (user.role==='admin'){
                                    res.redirect('/admin/dashboard')
                                } else {
                                    res.render('laundry',{user:user,laundries:laundries})
                                }
                            } else {
                                res.redirect('customer/register')
                            }
                        })
                    })
                    .catch(err => {
                        res.send('Something is wrong')
                    })
            }
        })
    }

    static logout (req,res){
        req.session.user = null
        res.redirect('/login')
    }
}

module.exports = AuthController