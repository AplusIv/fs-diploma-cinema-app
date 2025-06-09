import { createSlice } from "@reduxjs/toolkit";
import { handleNewPlaces, prepareHallPlaces } from "../../services/hallConfiguratorFunctions";
import { compareFnByIdAssending, compareFnByPlaceAssending } from "../../services/sorterFunctions";

const initialState = {
  halls: undefined,
  places: undefined,
  placesCombinedByHalls: undefined,

  configuration: [], // Конфигурации мест всех залов undefined
  selectedHallId: undefined,

  refreshDataStatus: 'initial data is loaded',
}

export const hallPlacesSlice = createSlice({
  name: 'hallPlaces',
  initialState,
  reducers: {
    setHalls: (state, action) => {
      const { payload } = action;     
      state.halls = [...payload];

      state.selectedHallId = state.halls.length > 0 ? state.halls[0]?.id : null; // установить первый выбранный зал или null
    },
    setPlaces: (state, action) => {
      const { payload } = action;
      // Конфигурации рядов/мест в залах
      state.places = payload.map(place => {
        return {
          id: place.id,
          hall_id: place.hall_id,
          row: place.row,
          place: place.place,
          type: place.type,
          is_selected: false
        };
      });
    },
    setConfiguration: (state, action) => {
      const { payload } = action;
      // Конфигурации рядов/мест в залах
      state.configuration = payload.map(hall => {
        return {
          hall_id: hall.id,
          rows: hall.rows,
          places: hall.places
        }
      });
    },
    setSelectedHallId: (state, action) => {
      const { payload } = action;
      const selectedHallTitle = state.halls.find(hall => hall.title === payload);
      state.selectedHallId = selectedHallTitle.id;
    },
    setPlacesCombinedByHalls: (state) => {
      state.placesCombinedByHalls = prepareHallPlaces(
        state.places, 
        state.configuration.find(configuration => configuration.hall_id === state.selectedHallId), 
        state.halls.find(hall => hall.id === state.selectedHallId), 
        compareFnByPlaceAssending
      )
    },
    changeData: (state, action) => {
      const { property, value } = action.payload;

      // 1) изменение конфигурации зала
      state.configuration.find(configuration => configuration.hall_id === state.selectedHallId)[property] = value ? Number.parseFloat(value) : 0;

      // 2) подготовка и запись новых мест при изменившейся конфигурации зала
      const filtredSortedStatePlaces = state.places.filter(place => !(place.hall_id === state.selectedHallId)); // удаление мест с прошлой конфигурацией
      const newConfiguration = state.configuration.find(configuration => configuration.hall_id === state.selectedHallId);
      const lastStatePlacesId = filtredSortedStatePlaces[filtredSortedStatePlaces.length - 1].id;
      const newPlacesOfCurrentHall = handleNewPlaces(newConfiguration, lastStatePlacesId, compareFnByIdAssending); // создание мест с изменённой конфигурацией

      const newPlaces = [...filtredSortedStatePlaces, ...newPlacesOfCurrentHall].sort(compareFnByIdAssending);
      state.places = newPlaces;
    },
    setPlaceType: (state, action) => {
      const {payload} = action;      
      const modifiedPlaces = state.places.map(place => {
        if (place.id === payload) {  
          switch (place.type) {
            case 'standart':
              place.type = 'vip';
              break;
            case 'vip':
              place.type = 'disabled';
              break;
            case 'disabled':
              place.type = 'standart';
              break;
          }
        }
        return place;
      });      
      state.places = modifiedPlaces;
    },
    putPlaceData: () => {}, // запускает worker saga handleEditPlaceData (прежняя конфигурация, новые типы мест)
    handleNewHallsAndPlaces: () => {}, // запускает worker saga handleEditPlaceData (новая конфигурация, новые типы мест)
    setRefreshDataStatus: (state, action) => {
      const {payload} = action;      
      state.refreshDataStatus = payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setHalls, 
  setPlaces, 
  setConfiguration, 
  setSelectedHallId, 
  setPlacesCombinedByHalls, 
  changeData, 
  setPlaceType, 
  cancelPriceChanges, 
  putPlaceData,
  handleNewHallsAndPlaces,
  setRefreshDataStatus,
} = hallPlacesSlice.actions;

export default hallPlacesSlice.reducer;