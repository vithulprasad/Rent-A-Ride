const express = require('express')
const partnerController = require('../controllers/Partner');
const Partner_router = express()
const Auth =  require('../MiddleWare/partnerMiddleware/prtnerAuth')

Partner_router.post('/partnerLogin',partnerController.login)
Partner_router.get('/navProfileDetails', partnerController.navProfileDetails)
Partner_router.post('/AddBike',Auth.partnerAuth,partnerController.AddBike)
Partner_router.get('/listBike',Auth.partnerAuth, partnerController.listBike)
Partner_router.get('/PartnerDetails',Auth.partnerAuth, partnerController.PartnerDetails)
Partner_router.post('/partnerEdit',Auth.partnerAuth, partnerController.partnerEdit)
Partner_router.get('/locationDetails',Auth.partnerAuth, partnerController.locationDetails)
Partner_router.get('/bikeDelete',Auth.partnerAuth,partnerController.bikeDelete)
Partner_router.post('/editBike',Auth.partnerAuth, partnerController.editBike)

module.exports= Partner_router;