import { call, put } from "redux-saga/effects";
import { dataFailed, dataLoading, dataReceived, setNewOrder, setOrders } from "../../slices/orderSlice";
import { getOrdersFromDB, postNewOrderWithTickets, updateOrderAndTicketStatus } from "../requests/orderRequests";

// worker Saga: will be fired on SOME actions

// Клиентская часть. Получение всех заказов.
export function* handleGetOrders() {
  try {
    yield put(dataLoading());

    const response = yield call(getOrdersFromDB);
    const { data } = response;
    console.log({ data });

    yield put(dataReceived()); // успешно загружено     
    yield put(setOrders([...data])); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
  }
}

// Клиентская часть. Создание нового заказа.
export function* handlePostNewOrder(action) {
  const { payload } = action;

  try {
    yield put(dataLoading());

    const response = yield call(postNewOrderWithTickets, payload); // просмотреть response.data
    const { data } = response;
    console.log({ data });

    yield put(dataReceived()); // успешно загружено 
    yield put(setNewOrder(data.newOrder)); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
  }
}

// Клиентская часть. Изменение статуса заказа и билетов при оплате.
export function* handlePutNewOrder(action) {
  const { payload } = action;

  try {
    yield put(dataLoading());

    const response = yield call(updateOrderAndTicketStatus, payload); // просмотреть response.data
    const { data } = response;
    console.log({ data });

    yield put(dataReceived());
    yield put(setNewOrder(payload)); //обновление state после успешного выполнения запроса к БД
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
  }
}