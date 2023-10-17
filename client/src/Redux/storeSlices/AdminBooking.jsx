import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const bookingAdmin = createSlice({
  name: "AdminBookingPage",
  initialState: [],
  reducers: {
    setBookingList: (state, action) => {
      const data = action.payload;
      return data;
    },
    filter: (state, action) => {
      const { date1, date2, order } = action.payload;
      const minDate = new Date(date1);
      const maxDate = new Date(date2);
      const value = order.key === undefined ? "all" : order.key;
      
      if (value === "all") {
        toast.success(`Entering filter for all`);
        const filteredData = state.filter((item) => {
          const purchaseDate = new Date(item.purchaseDate);
          return minDate < purchaseDate && maxDate > purchaseDate;
        });
        return filteredData;
      } else if (value === "complete") {
        toast.success("Entering filter for complete");
        const filteredData = state.filter((item) => {
          const purchaseDate = new Date(item.purchaseDate);
          return minDate < purchaseDate && maxDate > purchaseDate && item.bikeStatus === "complete";
        });
        return filteredData;
      } else if (value === "booked") {
        toast.success("Entering filter for booked");
        const filteredData = state.filter((item) => {
          const middleDate = new Date(item.purchaseDate);
          return minDate < middleDate && maxDate > middleDate && item.bikeStatus === "booked";
        });
        return filteredData;
      } else {
        toast.success("Entering filter for cancel");
        const filteredData = state.filter((item) => {
          const middleDate = new Date(item.purchaseDate);
          return minDate < middleDate && maxDate > middleDate && item.bikeStatus === "canceled";
        });
        return filteredData;
      }
    },
  },
});

export const { setBookingList, filter } = bookingAdmin.actions;
export default bookingAdmin.reducer;
