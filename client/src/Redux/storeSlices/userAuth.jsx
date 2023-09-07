import { createSlice } from "@reduxjs/toolkit";


 const userAuth = createSlice({
    name:"userAuath",
    initialState:{
        token:false,
        user:false,
        id:false,
        roll:false,
    },
    reducers:{
        userDetails :(state,action)=>{
            const newItem = action.payload;
            state.token = newItem.token
            state.user = newItem.name
            state.id = newItem.id
            state.roll = newItem.roll
        },
        userLogOut:(state)=>{
            console.log("COMING TO LOGOUT",state.token);
            state.token =null
            state.user =null
            state.id=null
            state.roll = null
            console.log(state.token,'this ');
        }
    }
})

export const { userDetails,userLogOut } = userAuth.actions;
export default userAuth.reducer;