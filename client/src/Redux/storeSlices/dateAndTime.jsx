import { createSlice } from "@reduxjs/toolkit";


 const DateAndTime = createSlice({

    name:"DateTime",
    initialState:{
       startDate:false,
       endDate:false,
       startTime:false,
       endTime:false,
       differenceInDays:false,
       differenceInHour:false,
       rent:false,
       total:false,
       bike:false,
       location:false,
       helmet:false,
    
    },
    reducers:{
        addDateTime :(state,action)=>{
            const newItem = action.payload;
            console.log(newItem);
            state.startDate = newItem.startingDate
            state.endDate = newItem.endingDate
            state.startTime = newItem.startingTime
            state.endTime = newItem.endingTime
            state.differenceInDays = newItem.differenceInDays
            state.differenceInHour = newItem.differenceInHour
        },
        bookedDetails:(state,action)=>{
            const newItem = action.payload;
           
            state.startDate = newItem.startingDate
            state.endDate = newItem.endingDate
            state.startTime = newItem.startingTime
            state.endTime = newItem.endingTime
            state.differenceInDays = newItem.differenceInDays
            state.differenceInHour = newItem.differenceInHour
            state.rent=newItem.rent
            state.total=newItem.total
            state.bike =newItem.bike
            state.location =newItem.location  
            state.helmet = newItem.helmet
          
             },   
    
    }
})

export const { addDateTime,bookedDetails } = DateAndTime.actions;
export default DateAndTime.reducer;