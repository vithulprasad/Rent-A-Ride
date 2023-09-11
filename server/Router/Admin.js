const express = require ('express');
const adminController = require('../controllers/Admin');
const admin_route = express();

admin_route.post('/login',adminController.login)
admin_route.get('/request',adminController.request)
admin_route.get('/accessConfirmation',adminController.accessConfirmation)
admin_route.get('/findPartner',adminController.findPartner)
admin_route.post('/rejected',adminController.rejected)
module.exports = admin_route;