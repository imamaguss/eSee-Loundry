const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/addLaundry',AdminController.showLaundry)

module.exports = router