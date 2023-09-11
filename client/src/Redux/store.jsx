import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import userAuth from '../Redux/storeSlices/userAuth'
import AdminAuth from './storeSlices/AdminAuth'
import partnerAuth from './storeSlices/PartnerAuth'
const rootReducer = combineReducers({
     userAuth:userAuth,
     AdminAuth:AdminAuth,
     partnerAuth:partnerAuth
})
const store = configureStore({
    reducer: rootReducer
})

export default store; 


