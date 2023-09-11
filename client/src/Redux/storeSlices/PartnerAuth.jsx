import { createSlice } from "@reduxjs/toolkit";


 const partnerAuth = createSlice({
    name:"PartnerAuth",
    initialState:{
        PartnerToken:false,
        user:false,
        roll:false,
    },
    reducers:{
        partnerDetails :(state,action)=>{
            const newItem = action.payload;
            state.PartnerToken = newItem.token
            state.user = newItem.name
            state.roll = newItem.role
        },
        partnerLogOut:(state)=>{
            console.log("COMING TO LOGOUT",state.token);
            state.PartnerToken =null
            state.user =null
            state.roll = null
        }
    }
})

export const { partnerDetails,partnerLogOut } = partnerAuth.actions;
export default partnerAuth.reducer;