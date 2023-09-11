const express = require('express');
const userController = require('../controllers/User');
const user_route = express()
const {localVariables} =require('../MiddleWare/auth')





user_route.get('/otpGenerate',localVariables,userController.otpGenerate)
user_route.post('/otp',localVariables,userController.otp)
user_route.post('/loginUser',userController.loginUser)
user_route.post('/companyRegistration',userController.companyRegistration)

module.exports = user_route