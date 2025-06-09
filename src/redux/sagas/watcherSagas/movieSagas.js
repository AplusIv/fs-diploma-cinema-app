import { takeLatest } from "redux-saga/effects";
import { deleteMovie, putMovieData } from "../../slices/popupEditMovieHandlerSlice";
import { handleAddMovieData, handleDeleteMovie, handleEditMovieData, handleGetGuestMovies, handleGetMovies } from "../handlers/movie";
import { postMovieData } from "../../slices/popupAddMovieHandlerSlice";
import { getMovies } from "../../slices/movieSlice";

import { getMovies as getGuestMovies} from "../../slices/guestMovieSlice";


export function* getMoviesWatcherSaga() {
  yield takeLatest(getMovies.type, handleGetMovies);
}

export function* moviePutWatcherSaga() {
    yield takeLatest(putMovieData.type, handleEditMovieData);
}

export function* movieDeleteWatcherSaga() {
  yield takeLatest(deleteMovie.type, handleDeleteMovie);
}

// скорректировать заглавную букву
export function* MoviePostWatcherSaga() {
  yield takeLatest(postMovieData.type, handleAddMovieData);
}

// guest
export function* getGuestMoviesWatcherSaga() {
  yield takeLatest(getGuestMovies.type, handleGetGuestMovies);
}