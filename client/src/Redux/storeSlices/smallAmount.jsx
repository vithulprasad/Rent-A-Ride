import { createSlice } from "@reduxjs/toolkit";

const smallAmountSlice = createSlice({
  name: "smallAmount",
  initialState: {
    small: 0,
  },
  reducers: {
    setSmall: (state, action) => {
      state.small = action.payload;
    },
  },
});

export const { setSmall } = smallAmountSlice.actions;
export default smallAmountSlice.reducer;
