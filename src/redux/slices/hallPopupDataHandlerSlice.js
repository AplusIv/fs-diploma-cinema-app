import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hallPopupData: {
    title: '',
    rows: 5,
    places: 8,
    normal_price: Number(250).toFixed(2),
    vip_price: Number(550.5).toFixed(2)
  }
}

export const hallPopupDataHandlerSlice = createSlice({
  name: 'hallPopupData',
  initialState,
  reducers: {
    changeData: (state, action) => {
      const { property, value } = action.payload;
      state.hallPopupData[property] = value;
    },
    setToInitialData: state => {
      state.hallPopupData.title = ''
    },
    postHallData: () => { }, // запускает worker saga handleAddHallData
    deleteHall: () => { } // запускает worker saga handleAddHallData
  }
})

// Action creators are generated for each case reducer function
export const {
  changeData,
  setToInitialData,
  postHallData,
  deleteHall
} = hallPopupDataHandlerSlice.actions;

export default hallPopupDataHandlerSlice.reducer;