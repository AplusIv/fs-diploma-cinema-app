import { takeLatest } from "redux-saga/effects";
import { getNewOrderTickets, getTickets } from "../../slices/ticketSlice";
import { handleGetTickets, handleGetNewOrderTickets } from "../handlers/ticket";

export function* getTicketsWatcherSaga() {
  yield takeLatest(getTickets.type, handleGetTickets);
}

export function* getNewOrderTicketsWatcherSaga() {
  yield takeLatest(getNewOrderTickets.type, handleGetNewOrderTickets);
}