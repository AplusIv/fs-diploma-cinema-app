import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addSessionFlag: false,

  lastSessionId: -1,
  popupAddSessionData: {
    id: undefined,
    hall_id: undefined,
    movie_id: undefined
  },

  popupHalls: [],
  popupMovies: []
}

export const popupAddSessionHandlerSlice = createSlice({
  name: 'popupAddSessionData',
  initialState,
  reducers: {
    setAddSessionFlag: (state) => {
      state.addSessionFlag = !state.addSessionFlag;
    },
    // lastSessionId = sessions.at(-1)?.id;
    setSessionId: (state, action) => {
      const { payload } = action;
      state.lastSessionId = payload && payload.at(-1)?.id;
      
      state.popupAddSessionData.id = ++state.lastSessionId;
    },
    setHalls: (state, action) => {
      const { payload } = action;
      state.popupHalls = [...payload];

      state.popupAddSessionData.hall_id = payload[0].id
    },
    setMovies: (state, action) => {
      const { payload } = action;
      state.popupMovies = [...payload];

      state.popupAddSessionData.movie_id = payload[0].id
    },
    setToInitialData: state => {
      state.addSessionFlag = false,

      state.lastSessionId = -1;
      state.popupAddSessionData = {
        id: undefined,
        hall_id: undefined,
        movie_id: undefined
      }
    },
    changeData: (state, action) => {
      const { payload } = action;
      const { property, value } = payload;

      if (property === "hall_id") {
        const editedHallId = state.popupHalls.find(hall => hall.title === value).id;
        state.popupAddSessionData[property] = editedHallId;
      } else if (property === "movie_id") {
        const editedMovieId = state.popupMovies.find(movie => movie.title === value).id;
        state.popupAddSessionData[property] = editedMovieId;
      } else {
        state.popupAddSessionData[property] = value;
      }
    },
    postSessionData: () => {}, // запускает worker saga handleAddSessionData
  }
})

// Action creators are generated for each case reducer function
export const {
  setAddSessionFlag, 
  setSessionId, 
  setHalls, 
  setMovies, 
  changeData, 
  setToInitialData, 
  postSessionData
} = popupAddSessionHandlerSlice.actions;

export default popupAddSessionHandlerSlice.reducer;