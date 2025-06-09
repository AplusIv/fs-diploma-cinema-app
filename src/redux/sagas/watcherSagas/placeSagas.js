import { takeLatest } from "redux-saga/effects";
import { getPlaces } from "../../slices/placeSlice";
import { handleEditPlaceData, handleGetGuestPlaces, handleGetPlaces, handleNewHallAndPlaceData } from "../handlers/place";
import { handleNewHallsAndPlaces, putPlaceData } from "../../slices/hallPlacesSlice";

import { getPlaces as getGuestPlaces} from "../../slices/guestPlaceSlice";


export function* getPlacesWatcherSaga() {
  yield takeLatest(getPlaces.type, handleGetPlaces);
}

// новая конфигурация зала
export function* putHallAndPlaceWatcherSaga() {
  yield takeLatest(handleNewHallsAndPlaces.type, handleNewHallAndPlaceData);
}

// прежняя конфигурация зала
export function* putPlaceTypeWatcherSaga() {
  yield takeLatest(putPlaceData.type, handleEditPlaceData);
}

// guest get places
export function* getGuestPlacesWatcherSaga() {
  yield takeLatest(getGuestPlaces.type, handleGetGuestPlaces);
}