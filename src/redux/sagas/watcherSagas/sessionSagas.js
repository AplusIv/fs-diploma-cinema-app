import { takeLatest } from "redux-saga/effects";
import { handleAddSessionData, handleDeleteSession, handleEditSessionData, handleGetGuestSessions, handleGetSessions, handleGetSessionsByDate, handleToggleSessionsSalesActive } from "../handlers/session";
import { postSessionData } from "../../slices/popupAddSessionHandlerSlice";
import { deleteSession, putSessionData } from "../../slices/popupEditSessionsHandlerSlice";
import { getSessions, putToggleSessionsSalesActive } from "../../slices/sessionSlice";
import { getSessionsByDate } from "../../slices/sessionsByDateSlice";

import { getSessions as getGuestSessions} from "../../slices/guestSessionSlice";


export function* getSessionsWatcherSaga() {
  yield takeLatest(getSessions.type, handleGetSessions);
}

export function* sessionPostWatcherSaga() {
  yield takeLatest(postSessionData.type, handleAddSessionData);
}

export function* sessionPutWatcherSaga() {
    yield takeLatest(putSessionData.type, handleEditSessionData);
}

export function* sessionDeleteWatcherSaga() {
  yield takeLatest(deleteSession.type, handleDeleteSession);
}

// Клиентская часть
export function* getSessionsByDateWatcherSaga() {
  yield takeLatest(getSessionsByDate.type, handleGetSessionsByDate);
}

export function* getGuestSessionsWatcherSaga() {
  yield takeLatest(getGuestSessions.type, handleGetGuestSessions);
}

export function* putToggleSessionsSalesActiveWatcherSaga() {
  yield takeLatest(putToggleSessionsSalesActive.type, handleToggleSessionsSalesActive);
}