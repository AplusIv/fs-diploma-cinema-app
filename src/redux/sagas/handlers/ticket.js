import { call, put } from "redux-saga/effects";
import { dataFailed, dataLoading, dataReceived, setNewOrderTickets, setTickets } from "../../slices/ticketSlice";
import { getDataById, getTicketsFromDB } from "../requests/ticketRequests";

// worker Saga: will be fired on SOME actions

// Клиентская часть. Получение всех билетов.
export function* handleGetTickets() {
  try {
    yield put(dataLoading());

    const response = yield call(getTicketsFromDB);
    const { data } = response;
    console.log({ data });

    yield put(dataReceived()); // успешно загружено 

    yield put(setTickets([...data])); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
  }
}

// Клиентская часть. Получение билетов по конкретному ID заказа.
export function* handleGetNewOrderTickets(action) {
  try {
    const { payload } = action;
    const { url, id } = payload;

    yield put(dataLoading());

    const response = yield call(getDataById, url, id);
    const { data } = response;
    console.log({ data });

    yield put(dataReceived()); // успешно загружено 

    yield put(setNewOrderTickets(data)); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
  }
}