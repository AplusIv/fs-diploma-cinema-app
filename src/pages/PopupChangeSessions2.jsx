/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { setAddSessionFlag, setHalls, setMovies, setSessionId, setToInitialData } from "../redux/slices/popupAddSessionHandlerSlice";
import PopupSelect from "./PopupSelect";
import PopupNewDataAdding2 from "./PopupNewDataAdding2";
import PopupChangeSession from "./PopupChangeSession";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat' // ES 2015
dayjs.extend(customParseFormat);

const PopupChangeSessions2 = ({
  movies,
  sessions,
  halls,
  onChangeCallback,
  onAddCallback,
  onDeleteCallback
}) => {

  const sessionsRedux = useSelector(state => state.popupEditSessionsReducer.popupEditSessionsData);
  // const selectedMovieRedux = useSelector(state => state.popupEditSessionsReducer.popupSelectedMovieTitle);
  const addSessionFlagRedux = useSelector(state => state.popupAddSessionReducer.addSessionFlag);

  const dispatch = useDispatch();

  return (
    <div className="session-popup">
      <label>
        Выберете фильм:{' '}
        <PopupSelect
          belongsTo="sessions filter"
          optionsData={movies}
          name="movie-title"
          edit={true}
          sessions={sessions}
        />
      </label>

      <label>
        Текущие сеансы:
        {sessionsRedux.length > 0 ?
          <ul className="all-sessions">
            {sessionsRedux.map((session, index) =>
              <PopupChangeSession
                key={session.id}
                halls={halls}
                selectedIndex={index}
                onChangeCallback={onChangeCallback}
                onDeleteCallback={onDeleteCallback}
              />
            )}
          </ul>
          : <div>Сеансы на выбранный фильм отсутствуют</div>}
      </label>

      <div>
        {addSessionFlagRedux ?
          <button
            className="conf-step__button conf-step__button-accent"
            onClick={() => {
              dispatch(setToInitialData()); // сброс к начальному состоянию добавляемого сеанса при отмене
            }}>
            Отменить добавление сеанса
          </button>
          : <button
            className="conf-step__button conf-step__button-accent"
            onClick={() => {
              dispatch(setAddSessionFlag());
              dispatch(setSessionId(sessions));
              dispatch(setHalls(halls));
              dispatch(setMovies(movies));
            }}>
            Добавить сеанс
          </button>}
      </div>

      {addSessionFlagRedux && <PopupNewDataAdding2
        halls={halls}
        movies={movies}
        sessions={sessions}
        buttonTitle={'Подтвердить'}
        onAddCallback={onAddCallback}
      />}
    </div>
  )
}

export default PopupChangeSessions2