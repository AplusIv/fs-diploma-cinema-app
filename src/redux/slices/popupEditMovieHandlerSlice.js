import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popupEditedMovieData: {}
}

export const popupEditMovieHandlerSlice = createSlice({
  name: 'popupEditedMovieData',
  initialState,
  reducers: {
    setData: (state, action) => {
      const { payload } = action;
      // console.log({payload});
      
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          state.popupEditedMovieData[key] = payload[key];          
        }
      }
    },
    setToInitialData: state => {
      state.popupEditedMovieData = {}
    },
    changeData: (state, action) => {
      const { payload } = action;
      const { property, value } = payload;

      (property === 'duration') ? 
      state.popupEditedMovieData[property] = Number(value) : 
      state.popupEditedMovieData[property] = value;
    },
    putMovieData: () => {}, // запускает worker saga handleEditMovieData
    deleteMovie: () => {} // запускает worker saga handleDeleteMovie
  }
})

// Action creators are generated for each case reducer function
export const {setData, changeData, setToInitialData, putMovieData, deleteMovie} = popupEditMovieHandlerSlice.actions;

export default popupEditMovieHandlerSlice.reducer;