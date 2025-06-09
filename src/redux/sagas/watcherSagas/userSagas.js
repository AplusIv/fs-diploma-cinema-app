import { takeLatest } from "redux-saga/effects";
import { getUser } from "../../slices/loginSlice";
import { handleGetUSer } from "../handlers/user";

export function* getUserWatcherSaga() {
  yield takeLatest(getUser.type, handleGetUSer);
}