import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  halls: []
}

export const guestHallSlice = createSlice({
  name: 'guest halls',
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
      
        state.halls = [...payload];
      }
    },
    dataFailed: (state) => {
      // console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.halls = [];
      }
    },
    getHalls: () => {}, // запуск worker saga get halls
    setHalls: (state, action) => {
      const { payload } = action;
      
      state.halls = [...payload];
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  getHalls, 
  setHalls, 
  dataLoading, 
  dataReceived,
  dataFailed,
} = guestHallSlice.actions;

export default guestHallSlice.reducer;