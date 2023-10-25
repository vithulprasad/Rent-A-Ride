const express = require ('express');
const adminController = require('../controllers/Admin');
const admin_route = express();
const Auth = require('../MiddleWare/AdminMIddleware/adminAuth')



admin_route.post('/login',adminController.login)

admin_route.get('/request',Auth.AdminAuth,adminController.request)
admin_route.get('/accessConfirmation',Auth.AdminAuth,adminController.accessConfirmation)
admin_route.get('/findPartner',Auth.AdminAuth,adminController.findPartner)
admin_route.post('/rejected',Auth.AdminAuth,adminController.rejected)
admin_route.get('/partnerBlocking',Auth.AdminAuth,adminController.partnerBlocking)
admin_route.get('/userDetails',Auth.AdminAuth,adminController.userDetails)
admin_route.get('/userBlocking',Auth.AdminAuth,adminController.userBlocking)
admin_route.get('/bikeDetails',Auth.AdminAuth,adminController.bikeDetails)
admin_route.post('/partnerBikeReject',Auth.AdminAuth,adminController.partnerBikeReject)
admin_route.post('/addCoupon',Auth.AdminAuth,adminController.addCoupon)
admin_route.get('/getCoupons',Auth.AdminAuth,adminController.couponDetails)
admin_route.get('/bookingAdmin',Auth.AdminAuth,adminController.bookingAdmin)
admin_route.get('/singleOrderDetails',Auth.AdminAuth,adminController.singleOrderDetails)
admin_route.get('/dashboardData',Auth.AdminAuth,adminController.dashboardData)
admin_route.get('/dashboardChartOrder',Auth.AdminAuth,adminController.dashboardChartOrder)
admin_route.get('/dashboardChartPartner',Auth.AdminAuth,adminController.dashboardChartPartner)

module.exports = admin_route;