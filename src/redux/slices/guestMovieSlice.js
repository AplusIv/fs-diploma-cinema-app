import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  movies: []
}

export const guestMovieSlice = createSlice({
  name: 'guest movies',
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
      
        state.movies = [...payload];
      }
    },
    dataFailed: (state) => {
      // console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.movies = [];
      }
    },
    getMovies: () => {}, // запуск worker saga get guest movies
    setMovies: (state, action) => {
      const { payload } = action;
      
      state.movies = [...payload];
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading, 
  dataReceived, 
  dataFailed,
  getMovies, 
  setMovies,
} = guestMovieSlice.actions;

export default guestMovieSlice.reducer;