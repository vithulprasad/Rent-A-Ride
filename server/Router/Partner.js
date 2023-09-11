const express = require('express')
const partnerController = require('../controllers/Partner');
const Partner_router = express()

Partner_router.post('/partnerLogin',partnerController.login)
Partner_router.get('/navProfileDetails', partnerController.navProfileDetails)

module.exports= Partner_router;