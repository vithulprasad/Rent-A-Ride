const express = require('express')
const partnerController = require('../controllers/Partner');
const Partner_router = express()
const Auth =  require('../MiddleWare/partnerMiddleware/prtnerAuth')

Partner_router.post('/partnerLogin',partnerController.login)
Partner_router.get('/navProfileDetails', partnerController.navProfileDetails)



Partner_router.post('/AddBike',Auth.partnerAuth,Auth.isBlocked,partnerController.AddBike)
Partner_router.get('/listBike',Auth.partnerAuth,Auth.isBlocked,partnerController.listBike)
Partner_router.get('/PartnerDetails',Auth.partnerAuth,Auth.isBlocked,partnerController.PartnerDetails)
Partner_router.post('/partnerEdit',Auth.partnerAuth,Auth.isBlocked,partnerController.partnerEdit)
Partner_router.get('/locationDetails',Auth.partnerAuth,Auth.isBlocked,partnerController.locationDetails)
Partner_router.get('/bikeDelete',Auth.partnerAuth,Auth.isBlocked,partnerController.bikeDelete)
Partner_router.post('/editBike',Auth.partnerAuth,Auth.isBlocked,partnerController.editBike)
Partner_router.get('/partnerBookings',Auth.partnerAuth,Auth.isBlocked,partnerController.partnerBookings)
Partner_router.get('/unlist',Auth.partnerAuth,Auth.isBlocked,partnerController.unlist)
Partner_router.get('/list',Auth.partnerAuth,Auth.isBlocked,partnerController.list)
Partner_router.get('/completeBooking',Auth.partnerAuth,Auth.isBlocked,partnerController.completeBooking)
Partner_router.get('/chat',Auth.partnerAuth,Auth.isBlocked,partnerController.chat)
Partner_router.post('/chatSave',Auth.partnerAuth,Auth.isBlocked,partnerController.chatSave)
Partner_router.post('/socket',Auth.partnerAuth,Auth.isBlocked,partnerController.socket)
module.exports= Partner_router;