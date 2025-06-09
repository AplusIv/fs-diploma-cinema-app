import { takeLatest } from "redux-saga/effects";
import { getOrders, postNewOrder, putNewOrderAndTickets } from "../../slices/orderSlice";
import { handleGetOrders, handlePostNewOrder, handlePutNewOrder } from "../handlers/order";

export function* getOrdersWatcherSaga() {
  yield takeLatest(getOrders.type, handleGetOrders);
}

export function* postNewOrderWatcherSaga() {
  yield takeLatest(postNewOrder.type, handlePostNewOrder);
}

export function* putNewOrderWatcherSaga() {
  yield takeLatest(putNewOrderAndTickets.type, handlePutNewOrder);
}