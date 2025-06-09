import { createSlice } from "@reduxjs/toolkit";

// popup states:
// statuses: 'adding hall popup', 'adding film popup', 'editing film popup', 'editing sessions' 'hide popup'
// titles: 'Добавить зал', 'Добавить фильм', 'Изменить фильм', 'Редактировать сеансы', 'popup is hidden'
// isActive: true, false (показать / скрыть)
const initialState = {
  hallPopupInfo: {
    status: 'hide popup',
    title: 'popup is hidden',
    hallPopup: true,
    isActive: false
  }
}

export const hallPopupSlice = createSlice({
  name: 'hallPopupInfo',
  initialState,
  reducers: {
    addHall: state => {
      state.hallPopupInfo.status = 'adding hall popup',
        state.hallPopupInfo.title = 'Добавить зал',
        state.hallPopupInfo.isActive = true
    },
    hidePopup: state => {
      state.hallPopupInfo.status = 'hide popup',
        state.hallPopupInfo.title = 'popup is hidden',
        state.hallPopupInfo.isActive = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { addHall, hidePopup } = hallPopupSlice.actions;

export default hallPopupSlice.reducer;