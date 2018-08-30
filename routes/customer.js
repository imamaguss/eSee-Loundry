const router = require('express').Router()
const CustomerController = require('../controllers/customerController')

router.get('/',CustomerController.showLaundry)
router.get('/register',CustomerController.register)
router.post('/register',CustomerController.registerCustomer)

module.exports = router
