import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  halls: undefined,
  movies: undefined,
  sessions: undefined,
  days: undefined,
  selectedDay: undefined,
  refreshDataStatus: 'initial data is loaded',
}

export const sessionManagerSlice = createSlice({
  name: 'sessionManager',
  initialState,
  reducers: {
    setHalls: (state, action) => {
      const { payload } = action;
      state.halls = payload.map(hall => {
        return {
          id: hall.id,
          title: hall.title,
          rows: hall.rows,
          places: hall.places,
          normal_price: hall.normal_price,
          vip_price: hall.vip_price
        };
      });
    },
    setMovies: (state, action) => {
      const { payload } = action;
      state.movies = payload.map(movie => {
        return {
          id: movie.id,
          title: movie.title,
          description: movie.description,
          duration: movie.duration,
          country: movie.country,
          // 
          poster: movie.poster,
        };
      });
    },
    setSessions: (state, action) => {
      const { payload } = action;
      state.sessions = payload.map(session => {
        return {
          id: session.id,
          movie_id: session.movie_id,
          hall_id: session.hall_id,
          date: session.date,
          time: session.time,
          // 
          is_sales_active: session.is_sales_active,
        };
      });
    },
    setDays: (state, action) => {
      const { payload } = action;
      // console.log({ payload }); // количество дней для выбора - 1
      const now = dayjs();
      let days = [];

      for (let index = 0; index < payload; index++) {
        const day = now.add(index, 'day');
        days.push(day);
      }

      state.days = days;
      state.selectedDay = days[0].format('YYYY-MM-DD');
    },
    setSelectedDay: (state, action) => {
      const { payload } = action;
      state.selectedDay = payload;
    },
    changeHalls: (state, action) => {
      const { payload } = action;
      state.halls = payload;
    },
    changeMovies: (state, action) => {
      const { payload } = action;
      state.movies = payload;
    },
    changeSessions: (state, action) => {
      const { payload } = action;
      state.sessions = payload;
    },
    setRefreshDataStatus: (state, action) => {
      const { payload } = action;
      state.refreshDataStatus = payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setHalls,
  setMovies,
  setSessions,
  setDays,
  setSelectedDay,
  changeHalls,
  changeMovies,
  changeSessions,
  setRefreshDataStatus,
} = sessionManagerSlice.actions;

export default sessionManagerSlice.reducer;