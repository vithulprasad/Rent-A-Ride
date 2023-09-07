const express = require('express')
const partnerController = require('../controllers/Partner');
const Partner_router = express()

Partner_router.get('/login',partnerController.login)


module.exports= Partner_router;