import { call, put } from "redux-saga/effects";
import { addDataToDB, changeDataInDB, deleteDataInDB, getGuestSessionsFromDB, getSessionsByDate, getSessionsFromDB, toggleSessionsSalesActive } from "../requests/sessionRequests";
import { dataLoading, dataReceived, getSessions, dataFailed as sessionRequestFailed } from "../../slices/sessionSlice";
import { dataFailed, dataLoading as sessionsByDateLoading, dataReceived as sessionsByDateReceived, setSessionsByDate } from "../../slices/sessionsByDateSlice";
import { setLoggedOut } from "../../slices/loginSlice";
import { dataLoading as guestDataLoading, dataReceived as guestDataReceived, dataFailed as guestDataFailed } from "../../slices/guestSessionSlice";
import { getMovies } from "../../slices/movieSlice";
import { getHalls } from "../../slices/hallSlice";
import { getPlaces } from "../../slices/placeSlice";

// worker Saga: will be fired on SOME actions

// guest get sessions
export function* handleGetGuestSessions() {
  try {
    yield put(guestDataLoading());

    const response = yield call(getGuestSessionsFromDB);
    const { data } = response;
    console.log({ data });

    yield put(guestDataReceived([...data])); // добавление полученных данных в payload     
    // yield put(setPlaces([...data])); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(guestDataFailed());
  }
}

export function* handleGetSessions() {
  try {
    yield put(dataLoading());

    const response = yield call(getSessionsFromDB);
    const { data } = response;
    console.log({ data });

    yield put(dataReceived([...data])); // добавление полученных данных в payload 
    // yield put(setPlaces([...data])); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(sessionRequestFailed(e));

    if (e.response.status === 401) {
      yield put(setLoggedOut());
    }
  }
}

export function* handleAddSessionData(action) {
  try {
    const { payload } = action;
    const { dataArray, url } = payload;
    // console.log({ payload });
    // console.log({ dataArray });

    const response = yield call(addDataToDB, dataArray, url);
    console.log({ response });

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());
  } catch (e) {
    console.log(e);
  }
}

export function* handleEditSessionData(action) {
  try {
    const { payload } = action;
    const { dataArray, url } = payload;
    // console.log({ payload });
    // console.log({ dataArray });

    const response = yield call(changeDataInDB, dataArray, url);
    console.log({ response });

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());
  } catch (e) {
    console.log(e);
  }
}

export function* handleDeleteSession(action) {
  try {
    const { payload } = action;
    const { dataArray, url } = payload;
    // console.log({ payload });
    // console.log({ dataArray });

    const responseArray = yield call(deleteDataInDB, dataArray, url);

    responseArray.forEach(response => {
      console.log({
        session_deleted: true,
        status: response.status
      });
    });

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());
  } catch (e) {
    console.log(e);
  }
}

export function* handleToggleSessionsSalesActive(action) {
  try {
    const { payload } = action;
    console.log({payload});
    
    const response = yield call(toggleSessionsSalesActive, payload);
    console.log({ response });

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());

    // yield put(getMovies());
    // yield put(getHalls());
    // yield put(getPlaces());
  } catch (e) {
    console.log(e);
  }
}

// Клиентская часть. Показ сеансов на конкретную дату.
export function* handleGetSessionsByDate(action) {
  try {
    const { payload } = action;

    yield put(sessionsByDateLoading());

    const response = yield call(getSessionsByDate, payload);
    const { data } = response;
    console.log({ data });

    yield put(sessionsByDateReceived()); // успешно загружено 
    yield put(setSessionsByDate([...data])); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
  }
}



