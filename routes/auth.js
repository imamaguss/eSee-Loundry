const router = require('express').Router()
const AuthController = require('../controllers/authController')

router.get('/login',AuthController.loginForm)

router.post('/login',AuthController.login)

router.get('/logout',AuthController.logout)


module.exports = router