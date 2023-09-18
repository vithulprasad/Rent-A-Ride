const express = require ('express');
const adminController = require('../controllers/Admin');
const admin_route = express();

admin_route.post('/login',adminController.login)
admin_route.get('/request',adminController.request)
admin_route.get('/accessConfirmation',adminController.accessConfirmation)
admin_route.get('/findPartner',adminController.findPartner)
admin_route.post('/rejected',adminController.rejected)
admin_route.get('/partnerBlocking',adminController.partnerBlocking)
admin_route.get('/userDetails',adminController.userDetails)
admin_route.get('/userBlocking',adminController.userBlocking)
admin_route.get('/bikeDetails',adminController.bikeDetails)
module.exports = admin_route;