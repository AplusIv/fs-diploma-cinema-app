import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  errorStatus: sessionStorage.getItem('sessionRequestErrorStatus') || undefined,
  errorStatusText: sessionStorage.getItem('sessionRequestErrorStatusText') || undefined,
  sessions: []
}

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    dataLoading: (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    dataReceived: (state, action) => {
      if (state.loading === 'pending' || state.loading === 'failed') {
        state.loading = 'idle'
        const { payload } = action;
        // console.log({ payload });
      
        state.sessions = [...payload];

        state.errorStatus = null;        
        state.errorStatusText = null;
        sessionStorage.removeItem('sessionRequestErrorStatus');
        sessionStorage.removeItem('sessionRequestErrorStatusText');
      }
    },
    dataFailed: (state, action) => {
      const { payload } = action;
      // console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.sessions = [];

        state.errorStatus = payload.response.status;
        state.errorStatusText = payload.response.statusText;
        sessionStorage.setItem('sessionRequestErrorStatus', payload.response.status);
        sessionStorage.setItem('sessionRequestErrorStatusText', payload.response.statusText);
      }
    },
    getSessions: () => {}, // запуск worker saga get sessions
    setSessions: (state, action) => {
      const { payload } = action;
      
      state.sessions = [...payload];
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      if (sessionStorage.getItem('sessionRequestErrorStatus') && sessionStorage.getItem('sessionRequestErrorStatusText')) {
        state.errorStatus = sessionStorage.getItem('sessionRequestErrorStatus');
        state.errorStatusText = sessionStorage.getItem('sessionRequestErrorStatusText');
      }
    },
    putToggleSessionsSalesActive: () => {}, // запуск worker saga put sessions
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading, 
  dataReceived, 
  dataFailed,
  getSessions, 
  setSessions,
  setStateByStorageData,
  // 
  putToggleSessionsSalesActive,
} = sessionSlice.actions;

export default sessionSlice.reducer;