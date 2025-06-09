import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  errorStatus: sessionStorage.getItem('movieRequestErrorStatus') || undefined,
  errorStatusText: sessionStorage.getItem('movieRequestErrorStatusText') || undefined,
  movies: []
}

export const movieSlice = createSlice({
  name: 'movies',
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

        state.errorStatus = null;        
        state.errorStatusText = null;
        sessionStorage.removeItem('movieRequestErrorStatus');
        sessionStorage.removeItem('movieRequestErrorStatusText');
      }
    },
    dataFailed: (state, action) => {
      const { payload } = action;
      console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.movies = [];

        state.errorStatus = payload.response.status;
        state.errorStatusText = payload.response.statusText;
        sessionStorage.setItem('movieRequestErrorStatus', payload.response.status);
        sessionStorage.setItem('movieRequestErrorStatusText', payload.response.statusText);
      }
    },
    getMovies: () => {}, // запуск worker saga get movies
    setMovies: (state, action) => {
      const { payload } = action;
      
      state.movies = [...payload];
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      if (sessionStorage.getItem('movieRequestErrorStatus') && sessionStorage.getItem('movieRequestErrorStatusText')) {
        state.errorStatus = sessionStorage.getItem('movieRequestErrorStatus');
        state.errorStatusText = sessionStorage.getItem('movieRequestErrorStatusText');
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading, 
  dataReceived, 
  dataFailed,
  getMovies, 
  setMovies,
  setStateByStorageData,
} = movieSlice.actions;

export default movieSlice.reducer;