import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  errorStatus: sessionStorage.getItem('hallRequestErrorStatus') || undefined,
  errorStatusText: sessionStorage.getItem('hallRequestErrorStatusText') || undefined,
  halls: []
}

export const hallSlice = createSlice({
  name: 'halls',
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

        state.errorStatus = null;        
        state.errorStatusText = null;
        sessionStorage.removeItem('hallRequestErrorStatus');
        sessionStorage.removeItem('hallRequestErrorStatusText');
      }
    },
    dataFailed: (state, action) => {
      const { payload } = action;

      // console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.halls = [];

        state.errorStatus = payload.response.status;
        state.errorStatusText = payload.response.statusText;
        sessionStorage.setItem('hallRequestErrorStatus', payload.response.status);
        sessionStorage.setItem('hallRequestErrorStatusText', payload.response.statusText);
      }
    },
    getHalls: () => {}, // запуск worker saga get halls
    setHalls: (state, action) => {
      const { payload } = action;
      
      state.halls = [...payload];
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      if (sessionStorage.getItem('hallRequestErrorStatus') && sessionStorage.getItem('hallRequestErrorStatusText')) {
        state.errorStatus = sessionStorage.getItem('hallRequestErrorStatus');
        state.errorStatusText = sessionStorage.getItem('hallRequestErrorStatusText');
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  getHalls, 
  setHalls, 
  dataLoading, 
  dataReceived,
  dataFailed,
  setStateByStorageData,
} = hallSlice.actions;

export default hallSlice.reducer;