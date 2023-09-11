import { createSlice } from "@reduxjs/toolkit";


 const AdminAuth = createSlice({
    name:"adminAuath",
    initialState:{
        adminToken:false,
        adminEmail:false,
        roll:false
    },
    reducers:{
      adminDetails :(state,action)=>{
            const newItem = action.payload;
            state.adminToken = newItem.token
            state.adminEmail = newItem.name
            state.roll = newItem.roll
        },
       adminLogOut:(state)=>{
            console.log("COMING TO LOGOUT",state.token);
            state.adminToken =null
            state.adminEmail =null
            state.roll = null
        }
    }
})

export const { adminDetails,adminLogOut } = AdminAuth.actions;
export default AdminAuth.reducer;