const router = require('express').Router()
const CustomerController = require('../controllers/customerController')



router.get('/register',CustomerController.register)

router.post('/register',CustomerController.registerCustomer)

router.get('/order/:laundryId/:userId',CustomerController.createOrder)

module.exports = router
