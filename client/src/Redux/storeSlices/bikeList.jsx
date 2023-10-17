import { createSlice } from "@reduxjs/toolkit";

const bike = createSlice({
  name: "Bike",
  initialState: [],
  reducers: {
    setBikeList: (state, action) => {
      const data = action.payload;
      const sortedData = [...data].sort((a, b) => {
        const aValue = a.isBooked ? 1 : 0;
        const bValue = b.isBooked ? 1 : 0;
        return aValue - bValue;
      });
      return sortedData;
    },
    filterCategory: (state, action) => {
     
      const filteringCriteria = action.payload;
      return state.filter((bike) => {
        return bike.NormalCategory === filteringCriteria;
      });
    },
    filterBrand: (state, action) => {
        const filteringCriteria = action.payload;
        return state.filter((bike) => {
          return bike.BrandName === filteringCriteria;
        });
      },
      filterLow: (state) => {
     
        return [...state].sort((a, b) => a.rentPerHour - b.rentPerHour);
      },
      filterHigh: (state) => {
     
        return [...state].sort((a, b) => b.rentPerHour - a.rentPerHour);
      },
      filterNormal: (state) => {
        function shuffleArray(array) {
            const shuffledArray = [...array];
            for (let i = shuffledArray.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray;
          }
        const shuffledState = shuffleArray(state);
        return shuffledState;
      },
      searching: (state, action) => {
        const filteringCriteria = action.payload;
        const regex = new RegExp(filteringCriteria, 'i'); 
      
        return state.filter((bike) => {
          return regex.test(bike.name);
        });
      }
  },
});

export const { setBikeList,filterCategory,filterBrand,filterLow,filterHigh,filterNormal,searching } = bike.actions;
export default bike.reducer;