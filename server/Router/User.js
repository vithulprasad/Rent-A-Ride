const express = require('express');
const userController = require('../controllers/User');
const user_route = express()
const {localVariables} =require('../MiddleWare/UserMiddleware/auth')
const Auth = require('../MiddleWare/UserMiddleware/auth')




user_route.get('/otpGenerate',localVariables,userController.otpGenerate)
user_route.post('/otp',localVariables,userController.otp)
user_route.post('/loginUser',userController.loginUser)
user_route.post('/companyRegistration',userController.companyRegistration)
user_route.post('/googleAuthentication',userController.googleAuthentication)
user_route.get('/getBikeInformation',userController.getBikeInformation)

user_route.get('/navDetails',userController.navDetails)
user_route.get('/profileEditDataDetails',Auth.userAuth,userController.profileEditDataDetails)
user_route.post('/editProfileData',Auth.userAuth,userController.editProfileData)
module.exports = user_route