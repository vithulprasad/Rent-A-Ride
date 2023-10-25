import { createSlice } from "@reduxjs/toolkit";

const chatSingle = createSlice({
  name: "booking",
  initialState:[],
  reducers: {
    single: (state, action) => {
      const data = action.payload;
      return data;
    },
  
}
   
});

export const {single} = chatSingle.actions;
export default chatSingle.reducer;