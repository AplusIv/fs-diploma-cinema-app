import { createSlice } from "@reduxjs/toolkit";

// popup states:
// statuses: 'adding hall popup', 'adding movie popup', 'editing movie popup', 'editing sessions' 'hide popup'
// titles: 'Добавить зал', 'Добавить фильм', 'Изменить фильм', 'Редактировать сеансы', 'popup is hidden'
// isActive: true, false (показать / скрыть)
const initialState = {
  popupInfo: {
    status: 'hide popup',
    title: 'popup is hidden',
    hallPopup: false,
    isActive: false
  }
}

export const popupSlice = createSlice({
  name: 'popupInfo',
  initialState,
  reducers: {
    addMovie: state => {
      state.popupInfo.status = 'adding movie popup',
        state.popupInfo.title = 'Добавить фильм',
        state.popupInfo.isActive = true
    },
    editMovie: state => {
      state.popupInfo.status = 'editing movie popup',
        state.popupInfo.title = 'Изменить фильм',
        state.popupInfo.isActive = true
    },
    editSessions: state => {
      state.popupInfo.status = 'editing sessions',
        state.popupInfo.title = 'Редактировать сеансы',
        state.popupInfo.isActive = true
    },
    hidePopup: state => {
      state.popupInfo.status = 'hide popup',
        state.popupInfo.title = 'popup is hidden',
        state.popupInfo.isActive = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { addMovie, editMovie, editSessions, hidePopup } = popupSlice.actions;

export default popupSlice.reducer;