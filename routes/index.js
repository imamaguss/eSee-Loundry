const router = require('express').Router()
const IndexController = require('../controllers/indexController')

router.get('/',IndexController.home)

module.exports = router