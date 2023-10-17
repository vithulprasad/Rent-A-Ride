import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import userAuth from '../Redux/storeSlices/userAuth'
import AdminAuth from './storeSlices/AdminAuth'
import partnerAuth from './storeSlices/PartnerAuth'
import dateAndTime from './storeSlices/dateAndTime'
import Bike from './storeSlices/bikeList'
import booking from './storeSlices/bookingSlice'
import partnerBooking from './storeSlices/partnerBooking'
import bookingAdmin from './storeSlices/AdminBooking'
import smallAmount from './storeSlices/smallAmount'
const rootReducer = combineReducers({
     userAuth:userAuth,
     AdminAuth:AdminAuth,
     partnerAuth:partnerAuth,
     dateAndTime:dateAndTime,
     Bike:Bike,
     booking:booking,
     partnerBooking:partnerBooking,
     AdminBooking:bookingAdmin,
     smallAmount:smallAmount
})
const store = configureStore({
    reducer: rootReducer
})

export default store; 


