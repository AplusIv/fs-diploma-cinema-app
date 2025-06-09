import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  errorStatus: sessionStorage.getItem('placeRequestErrorStatus') || undefined,
  errorStatusText: sessionStorage.getItem('placeRequestErrorStatusText') || undefined,
  places: []
}

export const placeSlice = createSlice({
  name: 'places',
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

        state.errorStatus = null;        
        state.errorStatusText = null;
        sessionStorage.removeItem('placeRequestErrorStatus');
        sessionStorage.removeItem('placeRequestErrorStatusText');
      }
    },
    dataFailed: (state, action) => {
      const { payload } = action;
      // console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.places = [];

        state.errorStatus = payload.response.status;
        state.errorStatusText = payload.response.statusText;
        sessionStorage.setItem('placeRequestErrorStatus', payload.response.status);
        sessionStorage.setItem('placeRequestErrorStatusText', payload.response.statusText);
      }
    },
    getPlaces: () => {}, // запуск worker saga get places
    setPlaces: (state, action) => {
      const { payload } = action;
      // console.log({ payload });
      
      state.places = [...payload];
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      if (sessionStorage.getItem('placeRequestErrorStatus') && sessionStorage.getItem('placeRequestErrorStatusText')) {
        state.errorStatus = sessionStorage.getItem('placeRequestErrorStatus');
        state.errorStatusText = sessionStorage.getItem('placeRequestErrorStatusText');
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading, 
  dataReceived, 
  dataFailed,
  getPlaces, 
  setPlaces,
  setStateByStorageData,
} = placeSlice.actions;

export default placeSlice.reducer;