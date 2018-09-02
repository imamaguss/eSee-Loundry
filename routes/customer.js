const router = require('express').Router()
const CustomerController = require('../controllers/customerController')
const Authentication = require('../helpers/authentication')


router.get('/register',CustomerController.register)

router.post('/register',CustomerController.registerCustomer)

router.get('/order/:laundryId/:userId',Authentication.isLogin,CustomerController.createOrder)

router.get('/dashboard', Authentication.isLogin, CustomerController.dashboard)

router.get('/dashboard/orders', Authentication.isLogin, CustomerController.orderHistory)

module.exports = router
