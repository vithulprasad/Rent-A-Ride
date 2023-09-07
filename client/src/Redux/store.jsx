import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import userAuth from '../Redux/storeSlices/userAuth'

const rootReducer = combineReducers({
     userAuth:userAuth,
  
})
const store = configureStore({
    reducer: rootReducer
})

export default store; 


