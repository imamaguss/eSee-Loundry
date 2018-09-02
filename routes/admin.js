const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/dashboard',AdminController.showLaundry)

router.post('/addLaundry',AdminController.addLaundry)

module.exports = router