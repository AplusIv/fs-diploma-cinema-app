import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../services/api";

const initialState = {
  loading: 'idle',
  loginErrorStatus: undefined,
  loginErrorStatusText: undefined,
  // loggedIn: JSON.parse(sessionStorage.getItem('loggedIn')) || false,
  // userIsAdmin: JSON.parse(sessionStorage.getItem('userIsAdmin')) || false,
  // loggedIn: undefined,
  // userIsAdmin: undefined,
  loggedIn: JSON.parse(sessionStorage.getItem('loggedIn')),
  userIsAdmin: JSON.parse(sessionStorage.getItem('userIsAdmin')),

  // 
  apiToken: getCookie().apiToken,
}

export const loginSlice = createSlice({
  name: 'login user',
  initialState,
  reducers: {
    dataLoading: (state) => {
      if (state.loading === 'idle' || state.loading === 'failed') {
        state.loading = 'pending'
      }
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
      }
    },
    // postToken: () => { }, // запуск worker saga
    getUser: () => { }, // запуск worker saga get user
    setLoggedIn: (state) => {
      sessionStorage.setItem('loggedIn', true);
      state.loggedIn = true;
      // sessionStorage.setItem('userIsAdmin', true);
      state.loginErrorStatus = undefined;
      state.loginErrorStatusText = undefined;

      sessionStorage.removeItem('loginErrorStatus');
      sessionStorage.removeItem('loginErrorStatusText');
    },
    checkUserIsAdmin: (state, action) => {
      const { payload } = action;
      state.userIsAdmin = payload;
      sessionStorage.setItem('userIsAdmin', payload);
    },
    setLoggedOut: (state) => {
      state.loggedIn = false;
      state.userIsAdmin = undefined;
      state.loginErrorStatus = undefined;
      state.loginErrorStatusText = undefined;

      // storage
      sessionStorage.setItem('loggedIn', false);
      sessionStorage.removeItem('loginErrorStatus');
      sessionStorage.removeItem('loginErrorStatusText');
      sessionStorage.removeItem('userIsAdmin');

      console.log('пользователь не авторизован, необходимо залогиниться');
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      state.loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
      if (sessionStorage.getItem('loginErrorStatus') && sessionStorage.getItem('loginErrorStatusText')) {
        state.loginErrorStatus = Number(sessionStorage.getItem('loginErrorStatus'));
        state.loginErrorStatusText = sessionStorage.getItem('loginErrorStatusText');
      }
    },
    setErrors: (state, action) => {
      const { payload } = action;

      const { status, statusText } = payload.response;

      if (status === 401) {
        state.loggedIn = false;
        sessionStorage.setItem('loggedIn', false);
      }

      state.loginErrorStatus = status;
      state.loginErrorStatusText = statusText;

      sessionStorage.setItem('loginErrorStatus', status);
      sessionStorage.setItem('loginErrorStatusText', statusText);
    },
    setApiToken: (state, action) => {
      const { payload } = action;
      state.apiToken = payload;

      // запись в sessionStorage для последующих запросов
      payload === null
        ? sessionStorage.removeItem('apiToken')
        : sessionStorage.setItem('apiToken', payload);
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading,
  dataReceived,
  dataFailed,
  // postToken,
  getUser,
  setLoggedIn,
  checkUserIsAdmin,
  setLoggedOut,
  setStateByStorageData,
  setErrors,
  setApiToken
} = loginSlice.actions;

export default loginSlice.reducer;