import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import updateLocale from 'dayjs/plugin/updateLocale'; // ES 2015

// // обновить дни недели на русском
// dayjs.extend(updateLocale);

// dayjs.updateLocale('en', {
//   weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
// });

const initialState = {
  days: undefined,
  selectedDayIndex: undefined,
  selectedDate: undefined,

  paginateStep: 6,
  daysIntervalIndexes: {
    firstDay: 0,
    lastDay: 6,
  },
  refreshDays: 'initial days is set',
}

export const pageNavigatorSlice = createSlice({
  name: 'pageNavigator',
  initialState,
  reducers: {
    setDays: (state, action) => {
      const {payload} = action;

      const now = dayjs();
      let days = [];

      if (payload) {
        const date = dayjs(payload);
        const dateDiff = date.diff(now, 'day') + 1; // разница в днях между 2-мя датами + 1 день для корректного переноса календаря
        // console.log({dateDiff});

        const shift = Math.trunc(dateDiff / state.paginateStep);
        // console.log({shift});
        
        // сместить интервал календаря
        state.daysIntervalIndexes.firstDay = 0 + shift * state.paginateStep;
        state.daysIntervalIndexes.lastDay = state.paginateStep + shift * state.paginateStep;

        let selected = 0;
        for (let index = state.daysIntervalIndexes.firstDay; index < state.daysIntervalIndexes.lastDay; index++) {
          const day = now.add(index, 'day');
          days.push(day);
 
          if (day.isSame(date, 'day')) {
            state.selectedDayIndex = selected;
          }
          selected++;
        }
      } else {
        for (let index = state.daysIntervalIndexes.firstDay; index < state.daysIntervalIndexes.lastDay; index++) {
          const day = now.add(index, 'day');
          days.push(day);  
        }
        state.selectedDayIndex = undefined;
        state.selectedDate = undefined;
      }

      state.days = days;
    },
    // не используется
    setDaysIntervalToFuture: (state) => {
      state.daysIntervalIndexes = {
        firstDay: state.daysIntervalIndexes.firstDay + state.paginateStep,
        lastDay: state.daysIntervalIndexes.lastDay + state.paginateStep
      };
    },
    // не используется
    setDaysIntervalToPast: (state) => {
      if (state.daysIntervalIndexes.firstDay > 0) {
        state.daysIntervalIndexes = {
          firstDay: state.daysIntervalIndexes.firstDay - state.paginateStep,
          lastDay: state.daysIntervalIndexes.lastDay - state.paginateStep
        };
      }
    },
    // не используется
    setSelectedDayIndex: (state, action) => {
      const { payload } = action;
      state.selectedDayIndex = payload;
    },
    setSelectedDate: (state, action) => {
      const {payload} = action;
      console.log({payload});
      
      if (payload) {
        state.selectedDate = payload;
      } 
    },
    setPaginateStep: (state, action) => {
      const { payload } = action;
      state.paginateStep = payload;
    },
    setRefreshDays: (state, action) => {
      const { payload } = action;
      state.refreshDays = payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setDays,
  setDaysIntervalToFuture,
  setDaysIntervalToPast,
  setSelectedDayIndex,
  setSelectedDate,
  setPaginateStep,  
  setRefreshDays,
} = pageNavigatorSlice.actions;

export default pageNavigatorSlice.reducer;