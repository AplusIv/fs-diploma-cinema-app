import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  tickets: [],
  newOrderTickets: [],
}

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    dataLoading: (state) => {
      state.loading = 'pending'
    },
    dataReceived: (state) => {
      if (state.loading === 'pending') {
        state.loading = 'idle'
      }
    },
    dataFailed: (state) => {
      // console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.tickets = [];
      }
    },
    getTickets: () => { }, // запуск worker saga get tickets
    setTickets: (state, action) => {
      const { payload } = action;
      state.tickets = [...payload];
    },
    getNewOrderTickets: () => { }, // запуск worker saga get new order tickets
    setNewOrderTickets: (state, action) => {
      const { payload } = action;
      // console.log({ payload });
      state.newOrderTickets = [...payload];
      sessionStorage.setItem('newOrderTickets', JSON.stringify([...payload])); // запись в сессию браузера
    },
    setToInitialData: (state) => {
      state.loading = 'idle';

      state.tickets = [];
      state.newOrderTickets = [];

      sessionStorage.removeItem('newOrderTickets'); // очистка сессии
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      state.newOrderTickets = JSON.parse(sessionStorage.getItem('newOrderTickets'));
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading,
  dataReceived,
  dataFailed,
  getTickets,
  setTickets,
  getNewOrderTickets,
  setNewOrderTickets,
  setToInitialData,
  setStateByStorageData,
} = ticketSlice.actions;

export default ticketSlice.reducer;