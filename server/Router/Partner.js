const express = require('express')
const partnerController = require('../controllers/Partner');
const Partner_router = express()

Partner_router.post('/partnerLogin',partnerController.login)
Partner_router.get('/navProfileDetails', partnerController.navProfileDetails)
Partner_router.post('/AddBike', partnerController.AddBike)
Partner_router.get('/listBike', partnerController.listBike)

module.exports= Partner_router;