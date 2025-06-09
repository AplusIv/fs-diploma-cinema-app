import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastMovieId: -1,
  popupAddMovieData: {
    id: 0,
    // пустой объект, который будет заполнен данными из формы
  }
}

export const popupAddMovieHandlerSlice = createSlice({
  name: 'popupAddMovieData',
  initialState,
  reducers: {
    setMovieId: (state, action) => {
      const { payload } = action;

      state.lastMovieId = payload && payload.at(-1)?.id;
      state.popupAddMovieData.id = ++state.lastMovieId;
    },
    setToInitialData: state => {
      state.lastMovieId = -1;
      state.popupAddMovieData = {
        id: 0,
      }
    },
    changeData: (state, action) => {
      const { payload } = action;
      const { property, value } = payload;

      (property === 'duration') ?
        state.popupAddMovieData[property] = Number(value) :
        state.popupAddMovieData[property] = value;
    },
    postMovieData: () => { }, // запускает worker saga handleAddMovieData
  }
})

// Action creators are generated for each case reducer function
export const {
  setMovieId,
  changeData,
  setToInitialData,
  postMovieData
} = popupAddMovieHandlerSlice.actions;

export default popupAddMovieHandlerSlice.reducer;