import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  places: []
}

export const guestPlaceSlice = createSlice({
  name: 'guest places',
  initialState,
  reducers: {
    dataLoading: (state) => {
      if (state.loading === 'idle' || state.loading === 'failed') {
        state.loading = 'pending'
      }
    },
    dataReceived: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        const { payload } = action;
        // console.log({ payload });
      
        state.places = [...payload];
      }
    },
    dataFailed: (state) => {
      // console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.places = [];
      }
    },
    getPlaces: () => {}, // запуск worker saga get guest places
    setPlaces: (state, action) => {
      const { payload } = action;
      
      state.places = [...payload];
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading, 
  dataReceived, 
  dataFailed,
  getPlaces, 
  setPlaces,
} = guestPlaceSlice.actions;

export default guestPlaceSlice.reducer;