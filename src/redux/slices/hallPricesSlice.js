import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  halls: [],
  prices: [], // Конфигурации цен всех залов

  selectedHallId: undefined,  
  refreshDataStatus: 'initial data is loaded',
}

export const hallPricesSlice = createSlice({
  name: 'hallPrices',
  initialState,
  reducers: {
    setHalls: (state, action) => {
      const { payload } = action;      
      state.halls = [...payload];
      state.selectedHallId = state.halls[0]?.id; // установить первый выбранный зал
    },
    setPrices: (state, action) => {
      const { payload } = action;
      // Конфигурации цен всех залов
      state.prices = payload.map(hall => {
        return {
          hall_id: hall.id,
          normal_price: hall.normal_price,
          vip_price: hall.vip_price,
        }
      });
    },
    setSelectedHallId: (state, action) => {
      const { payload } = action;
      const selectedHallTitle = state.halls.find(hall => hall.title === payload);
      state.selectedHallId = selectedHallTitle.id;
    },
    changeData: (state, action) => {
      const { property, value } = action.payload;     
      state.prices.find(priceConfiguration => priceConfiguration.hall_id === state.selectedHallId)[property] = value;
    },
    handleBlurData: (state, action) => {
      const { property, value } = action.payload;      
      state.prices.find(priceConfiguration => priceConfiguration.hall_id === state.selectedHallId)[property] = value ? Number(parseFloat(value).toFixed(2)) : 0; 
    },
    putHallData: () => {}, // запускает worker saga handleEditHallData
    setRefreshDataStatus: (state, action) => {
      const {payload} = action;      
      state.refreshDataStatus = payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const {setHalls, setPrices, setSelectedHallId, changeData, handleBlurData, putHallData, setRefreshDataStatus} = hallPricesSlice.actions;

export default hallPricesSlice.reducer;