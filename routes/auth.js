const router = require('express').Router()
const AuthController = require('../controllers/authController')

router.get('/login',AuthController.loginForm)

router.post('/login',AuthController.login)


module.exports = router