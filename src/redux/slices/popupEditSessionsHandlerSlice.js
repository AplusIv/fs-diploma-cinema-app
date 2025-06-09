import { createSlice } from "@reduxjs/toolkit";
import { compareFnByDateAssending } from "../../services/sorterFunctions";

const initialState = {
  popupSelectedMovieTitle: undefined,
  popupEditSessionsData: [],

  popupSelectedSession: undefined,
  popupHalls: []
}

export const popupEditSessionsHandlerSlice = createSlice({
  name: 'popupEditSessionsData',
  initialState,
  reducers: {
    setHalls: (state, action) => {
      const { payload } = action;
      state.popupHalls = [...payload];
    },
    setSelectedSession: (state, action) => {
      const { payload } = action;
      state.popupSelectedSession = payload;
    },
    setSelectedMovieTitle: (state, action) => {
      const { payload } = action;
      const { title } = payload;
      state.popupSelectedMovieTitle = title;
    },
    setData: (state, action) => {
      const { payload } = action;
      const { sessions, movies } = payload; // все неотфильтрованные сеансы

      const filtredSessions = sessions.filter(session => session.movie_id === movies.find(movie => movie.title === state.popupSelectedMovieTitle).id);
      filtredSessions.sort(compareFnByDateAssending); // сортировать массив по столбцам "дата" и "время" по возрастанию

      state.popupEditSessionsData = [...filtredSessions];
    },
    setToInitialData: state => {
      state.popupSelectedMovieTitle = undefined,
        state.popupEditSessionsData = []
    },
    changeData: (state, action) => {
      const { payload } = action;
      const { property, value } = payload;

      if (property === 'hall_id') {
        const editedHallId = state.popupHalls.find(hall => hall.title === value).id;
        state.popupEditSessionsData[state.popupSelectedSession][property] = editedHallId;
      } else {
        state.popupEditSessionsData[state.popupSelectedSession][property] = value;
      }
    },
    filterData: (state, action) => {
      const { payload } = action;
      const { id } = payload;

      state.popupEditSessionsData = state.popupEditSessionsData.filter(session => session.id !== id);
    },
    putSessionData: () => { }, // запускает worker saga handleEditSessionData
    deleteSession: () => { } // запускает worker saga handleDeleteSession
  }
})

// Action creators are generated for each case reducer function
export const {
  setHalls,
  setSelectedSession,
  setData,
  setSelectedMovieTitle,
  setToInitialData,
  changeData,
  filterData,
  putSessionData,
  deleteSession
} = popupEditSessionsHandlerSlice.actions;

export default popupEditSessionsHandlerSlice.reducer;