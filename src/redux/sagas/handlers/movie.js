import { call, put } from 'redux-saga/effects';
import { addDataToDB, changeDataInDB, deleteDataInDB, getGuestMoviesFromDB, getMoviesFromDB } from '../requests/movieRequests';
import { dataFailed, dataLoading, dataReceived, getMovies } from '../../slices/movieSlice';
import { setLoggedOut } from '../../slices/loginSlice';

// guest route
import { dataFailed as guestDataFailed, dataLoading as guestDataLoading, dataReceived as guestDataReceived } from '../../slices/guestMovieSlice';
import { getSessions } from '../../slices/sessionSlice';

// worker Saga: will be fired on SOME actions

// guest get movies
export function* handleGetGuestMovies() {
  try {
    yield put(guestDataLoading());

    const response = yield call(getGuestMoviesFromDB);
    const { data } = response;
    console.log({ data });

    yield put(guestDataReceived([...data])); // добавление полученных данных в payload     
    // yield put(setPlaces([...data])); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(guestDataFailed());
  }
}

export function* handleGetMovies() {
  try {
    yield put(dataLoading());

    const response = yield call(getMoviesFromDB);
    const { data } = response;
    console.log({ data });

    yield put(dataReceived([...data])); // добавление полученных данных в payload 
    // yield put(setPlaces([...data])); // добавление полученных данных в payload 
  } catch (e) {
    console.log(e);
    yield put(dataFailed(e));

    if (e.response.status === 401) {
      yield put(setLoggedOut());
    }
  }
}

export function* handleAddMovieData(action) {
  try {
    const { payload } = action;
    const { dataArray, url } = payload;
    // console.log({payload});
    // console.log({dataArray});

    const response = yield call(addDataToDB, dataArray, url); // просмотреть response.data
    console.log({ response });

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getMovies());
  } catch (e) {
    console.log(e);
  }
}

export function* handleEditMovieData(action) {
  try {
    const { payload } = action;
    const { dataArray, url } = payload;
    // console.log({payload});
    // console.log({dataArray});

    const response = yield call(changeDataInDB, dataArray, url); // просмотреть response.data
    console.log({ response });

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getMovies());
  } catch (e) {
    console.log(e);
  }
}

export function* handleDeleteMovie(action) {
  try {
    const { payload } = action;
    const { dataArray, url } = payload;
    // console.log({payload});
    // console.log({dataArray});

    const responseArray = yield call(deleteDataInDB, dataArray, url); // просмотреть response.data

    responseArray.forEach(response => {
      console.log({
        movie_deleted: true,
        status: response.status
      });
    });

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());
    yield put(getMovies());
  } catch (e) {
    console.log(e);
  }
}


