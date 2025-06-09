import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  sessionsByDate: undefined,
}

export const sessionsByDateSlice = createSlice({
  name: 'sessionsByDate',
  initialState,
  reducers: {
    dataLoading: (state) => {
      state.loading = 'pending'
    },
    dataReceived: (state) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
        // const { payload } = action;
        // console.log({ payload });

        // state.sessionsByDate = [...payload];
      }
    },
    dataFailed: (state) => {
      console.log(state.loading);

      if (state.loading === 'pending') {
        state.loading = 'failed';
        state.sessionsByDate = undefined;
      }
    },
    getSessionsByDate: () => { }, // запуск worker saga get sessions by date
    setSessionsByDate: (state, action) => {
      const { payload } = action;
      console.log({ payload });

      state.sessionsByDate = [...payload];
    }
  }
})

// Action creators are generated for each case reducer function
export const { dataLoading, dataReceived, dataFailed, getSessionsByDate, setSessionsByDate } = sessionsByDateSlice.actions;

export default sessionsByDateSlice.reducer;