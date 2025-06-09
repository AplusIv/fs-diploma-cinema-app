import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  orders: [],
  newOrder: undefined,
}

export const orderSlice = createSlice({
  name: 'orders',
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
      if (state.loading === 'pending') {
        state.loading = 'failed'

        state.orders = [];
        state.newOrder = undefined;
        state.selectedTickets = [];
      }
    },
    getOrders: () => { }, // запуск worker saga get orders
    setOrders: (state, action) => {
      const { payload } = action;
      console.log({ payload });
      state.orders = [...payload];
    },
    // setSelectedTickets: (state, action) => {
    //   const { payload } = action;
    //   console.log({ payload });      
    //   state.selectedTickets = [...payload];
    // },
    postNewOrder: () => { }, // запуск worker saga post new order
    setNewOrder: (state, action) => {
      const { payload } = action;
      // console.log({ payload });
      state.newOrder = payload;
      sessionStorage.setItem('newOrder', JSON.stringify(payload)); // запись в сессию браузера
    },
    putNewOrderAndTickets: () => { }, // запуск worker saga post new order
    setToInitialData: (state) => {
      state.loading = 'idle';

      state.orders = [];
      state.newOrder = undefined;

      sessionStorage.removeItem('newOrder'); // очистка сессии
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      state.newOrder = JSON.parse(sessionStorage.getItem('newOrder'));
    },
    // setNewOrderTickets: (state, action) => {
    //   const { payload } = action;
    //   console.log({ payload });      
    //   state.newOrderTickets = [...payload];
    // },
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading,
  dataReceived,
  dataFailed,
  getOrders,
  setOrders,
  // setSelectedTickets, 
  postNewOrder,
  setNewOrder,
  putNewOrderAndTickets,
  setToInitialData,
  setStateByStorageData,
  // setNewOrderTickets,
} = orderSlice.actions;

export default orderSlice.reducer;