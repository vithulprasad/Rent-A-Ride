const express = require ('express');
const adminController = require('../controllers/Admin');
const admin_route = express();

admin_route.get('/login',adminController.login)
module.exports = admin_route;