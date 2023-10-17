const express = require('express');
const userController = require('../controllers/User');
const user_route = express()
const {localVariables} =require('../MiddleWare/UserMiddleware/auth')
const Auth = require('../MiddleWare/UserMiddleware/auth')
const details = require('../MiddleWare/UserMiddleware/personal');




user_route.get('/otpGenerate',localVariables,userController.otpGenerate)
user_route.post('/otp',localVariables,userController.otp)
user_route.post('/loginUser',userController.loginUser)
user_route.post('/companyRegistration',userController.companyRegistration)
user_route.post('/googleAuthentication',userController.googleAuthentication)
user_route.get('/getBikeInformation',userController.getBikeInformation)
user_route.get('/navDetails',userController.navDetails)
user_route.get('/listCoupons',userController.listCoupons)
user_route.get('/tariffPage',userController.tariffPage)


user_route.get('/profileEditDataDetails',Auth.userAuth,Auth.IsBlock,userController.profileEditDataDetails)
user_route.post('/editProfileData',Auth.userAuth,Auth.IsBlock,userController.editProfileData)
user_route.get('/orderPageDetails',Auth.userAuth,Auth.IsBlock,userController.orderPageDetails)
user_route.post('/checkout',Auth.userAuth,Auth.IsBlock,details.haveDetails,userController.checkout)
user_route.post('/paymentSuccess',Auth.userAuth,Auth.IsBlock,details.haveDetails,userController.paymentSuccess)
user_route.get('/paymentDetails',Auth.userAuth,Auth.IsBlock,userController.paymentDetails)
user_route.post('/applyCoupon',Auth.userAuth,Auth.IsBlock,details.haveDetails,userController.applyCoupon)
user_route.get('/cancelBooking',Auth.userAuth,Auth.IsBlock,details.haveDetails,userController.cancelBooking)
user_route.get('/walletDetails',Auth.userAuth,Auth.IsBlock,details.haveDetails,userController.walletDetails)
module.exports = user_route