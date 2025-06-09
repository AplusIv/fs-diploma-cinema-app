import { call, put } from "redux-saga/effects";
import { checkUserIsAdmin, dataFailed, dataLoading, dataReceived, setErrors, setLoggedIn } from "../../slices/loginSlice";
import { CheckAuth } from "../requests/userRequests";
import { getHalls } from "../../slices/hallSlice";
import { getPlaces } from "../../slices/placeSlice";
import { getMovies } from "../../slices/movieSlice";
import { getSessions } from "../../slices/sessionSlice";

// worker Saga: will be fired on SOME actions

// Админская часть. Получение аутентифицированного пользователя.
export function* handleGetUSer() {
  try {
    yield put(dataLoading());

    const response = yield call(CheckAuth);
    const { data } = response;
    console.log({ data });

    yield put(dataReceived()); // успешно загружено
    yield put(setLoggedIn()); // пользователь получен
    yield put(checkUserIsAdmin(data.is_admin)); // проверка на администратора 

    // Если пользователь с правами администратора -> загрузить основные сущности: залы, места, фильмы, сеансы
    if (data.is_admin) {
     yield put(getHalls());
     yield put(getPlaces());
     yield put(getMovies());
     yield put(getSessions());
    }
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе или пользователь не авторизован
    yield put(setErrors(e)); // сохранение ошибок
  }
}