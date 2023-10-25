import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "booking",
  initialState:[],
  reducers: {
    chatObject: (state, action) => {
      const data = action.payload;
      return data;
    }
}
   
});

export const {chatObject} = chat.actions;
export default chat.reducer;