import { createSlice } from "@reduxjs/toolkit";

const booking = createSlice({
  name: "booking",
  initialState: [],
  reducers: {
    setBookingList: (state, action) => {
      const data = action.payload;
      return data;
    },
    preBooking: (state) => {
      
        const datas = state.filter((value)=>{
            return  new Date(value.dates.startDate) > new Date(Date.now()) && value.bikeStatus !="canceled"
        })
        return datas
      },
      ongoing: (state) => {
        const datas = state.filter((value)=>{
            return  new Date(value.dates.startDate) < new Date(Date.now())&& value.bikeStatus =="booked"
        })
        return datas
      },
      cancel: (state) => {
        const datas = state.filter((data)=>{
            return data.bikeStatus == "canceled"
        })
        return datas;
      },
      complete: (state) => {
        const datas = state.filter((data)=>{
            return data.bikeStatus == "complete"
        })
        return datas;
      },
}
   
});

export const {setBookingList,preBooking,ongoing,cancel,complete} = booking.actions;
export default booking.reducer;