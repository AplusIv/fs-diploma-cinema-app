import { fork } from "redux-saga/effects";
import { getGuestHallsWatcherSaga, getHallsWatcherSaga, hallDeleteWatcherSaga, hallPostWatcherSaga, hallPutWatcherSaga } from "./watcherSagas/hallSagas";
import { getGuestMoviesWatcherSaga, getMoviesWatcherSaga, movieDeleteWatcherSaga, MoviePostWatcherSaga, moviePutWatcherSaga } from "./watcherSagas/movieSagas";
import { getGuestSessionsWatcherSaga, getSessionsByDateWatcherSaga, getSessionsWatcherSaga, putToggleSessionsSalesActiveWatcherSaga, sessionDeleteWatcherSaga, sessionPostWatcherSaga, sessionPutWatcherSaga } from "./watcherSagas/sessionSagas";
import { getPlacesWatcherSaga, putPlaceTypeWatcherSaga, putHallAndPlaceWatcherSaga, getGuestPlacesWatcherSaga } from "./watcherSagas/placeSagas";
import { getNewOrderTicketsWatcherSaga, getTicketsWatcherSaga } from "./watcherSagas/ticketSagas";
import { getOrdersWatcherSaga, postNewOrderWatcherSaga, putNewOrderWatcherSaga } from "./watcherSagas/orderSagas";
import { getUserWatcherSaga } from "./watcherSagas/userSagas";

export default function* rootSaga() {
  // Admin
  yield fork(getUserWatcherSaga);

  yield fork(getHallsWatcherSaga);
  yield fork(getPlacesWatcherSaga);
  yield fork(getMoviesWatcherSaga);
  yield fork(getSessionsWatcherSaga);

  yield fork(hallPostWatcherSaga);
  yield fork(hallPutWatcherSaga); // edit prices
  yield fork(hallDeleteWatcherSaga);

  yield fork(moviePutWatcherSaga);
  yield fork(movieDeleteWatcherSaga);
  yield fork(MoviePostWatcherSaga);

  yield fork(sessionPostWatcherSaga);
  yield fork(sessionPutWatcherSaga);
  yield fork(sessionDeleteWatcherSaga);

  yield fork(putPlaceTypeWatcherSaga);
  yield fork(putHallAndPlaceWatcherSaga);
  yield fork(putToggleSessionsSalesActiveWatcherSaga); // открыть/показать сеансы

  // Client
  yield fork(getGuestHallsWatcherSaga);
  yield fork(getGuestMoviesWatcherSaga);
  yield fork(getGuestPlacesWatcherSaga);
  yield fork(getGuestSessionsWatcherSaga);

  yield fork(getTicketsWatcherSaga);
  yield fork(getOrdersWatcherSaga);
  yield fork(getNewOrderTicketsWatcherSaga);
  yield fork(putNewOrderWatcherSaga);

  yield fork(getSessionsByDateWatcherSaga);
  yield fork(postNewOrderWatcherSaga);

  // yield takeLatest(postHallData.type, handleAddHallData);
  // get main data

  // yield all(
  //   [
  //     call(getHallsWatcherSaga),
  //     call(getPlacesWatcherSaga),
  //     call(getMoviesWatcherSaga),
  //     call(getSessionsWatcherSaga),
  //   ]
  // );
}