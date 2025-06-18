import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, editMovie, editSessions, hidePopup } from '../redux/slices/popupSlice';
import { deleteMovie, putMovieData, setData, setToInitialData } from '../redux/slices/popupEditMovieHandlerSlice';
import { postMovieData, setMovieId, setToInitialData as setToInitialMovieData } from '../redux/slices/popupAddMovieHandlerSlice';
import { setData as setSessionsData, setSelectedMovieTitle, setToInitialData as setToInitialSessionsData, putSessionData, deleteSession } from '../redux/slices/popupEditSessionsHandlerSlice'
import { postSessionData, setToInitialData as setToInitialNewSessionData } from '../redux/slices/popupAddSessionHandlerSlice';
import { changeMovies, changeSessions, setDays, setHalls, setMovies, setRefreshDataStatus, setSelectedDay, setSessions } from '../redux/slices/sessionManagerSlice';
import { getSessions } from '../redux/slices/sessionSlice';

// import poster from '../img/admin/poster.png'
import SectionButtons from './SectionButtons'
import SectionHeader from './SectionHeader'
import Popup4 from './Popup4';
import SessionDates from './SessionDates';

import { BASEURL } from '../services/api';

const SessionManager = () => {
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);
  const toggleSectionVisibility = () => {
    setIsActiveHeaderState(!isActiveHeaderState);
  }

  // бэкграунд фильмов
  const moviesElements = document.querySelectorAll('.conf-step__movie');
  const backgroundColors = [...moviesElements].map(el => {
    return {
      // dataMovieId: el.dataset.movieId,
      movieId: el.id.slice(9), // убрать часть строки "movie_id="
      backgroundColor: window.getComputedStyle(el).backgroundColor,
    }
  });
  // console.log({ backgroundColors });


  // Фильмы для добавления в DB при обработке кнопки "Сохранить"
  const [moviesToAddInDB, setMoviesToAddInDB] = useState([]);
  // Сеансы для добавления в DB при обработке кнопки "Сохранить"
  const [sessionsToAddInDB, setSessionsToAddInDB] = useState([]);
  // Фильмы для изменения в DB при обработке кнопки "Сохранить"
  const [moviesToChangeInDB, setMoviesToChangeInDB] = useState([]);
  // Сеансы для изменения в DB при обработке кнопки "Сохранить"
  const [sessionsToChangeInDB, setSessionsToChangeInDB] = useState([]);
  // Фильмы для удаления в DB при обработке кнопки "Сохранить"
  const [moviesToDeleteInDB, setMoviesToDeleteInDB] = useState([]);
  // Сеансы для удаления в DB при обработке кнопки "Сохранить"
  const [sessionsToDeleteInDB, setSessionsToDeleteInDB] = useState([]);

  console.log({ moviesToAddInDB }, { sessionsToAddInDB });
  console.log({ moviesToChangeInDB }, { sessionsToChangeInDB });
  console.log({ moviesToDeleteInDB }, { sessionsToDeleteInDB });

  // Redux
  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  const moviesRedux = useSelector(state => state.moviesReducer.movies);
  const sessionsRedux = useSelector(state => state.sessionsReducer.sessions);

  // сатусы загрузки данных
  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  const moviesReduxLoading = useSelector(state => state.moviesReducer.loading);
  const sessionsReduxLoading = useSelector(state => state.sessionsReducer.loading);


  // sessionManagerSlice
  const refreshDataStatusRedux = useSelector(state => state.sessionManagerReducer.refreshDataStatus);
  const daysRedux = useSelector(state => state.sessionManagerReducer.days); // Сеансы на разные даты
  const selectedDayRedux = useSelector(state => state.sessionManagerReducer.selectedDay);
  const hallsInfoRedux = useSelector(state => state.sessionManagerReducer.halls); // Сеансы на разные даты
  const sessionsInfoRedux = useSelector(state => state.sessionManagerReducer.sessions); // Сеансы на разные даты
  const moviesInfoRedux = useSelector(state => state.sessionManagerReducer.movies); // Сеансы на разные даты

  // popupInfoRedux
  const popupInfoRedux = useSelector(state => state.popupInfoReducer.popupInfo)
  // console.log({ popupInfoRedux });

  const dispatch = useDispatch();

  const addMovieCallback = useCallback((movies) => {
    dispatch(addMovie());
    dispatch(setMovieId(movies));
  }, []);
  const editMovieCallback = useCallback((movie) => {
    dispatch(editMovie());
    dispatch(setData(movie));
  }, []);
  const editSessionsCallback = useCallback((title = 'i', sessions, movies) => {
    dispatch(editSessions());
    dispatch(setSelectedMovieTitle({
      title,
      // popupEditSessionsData: sessions
    }));
    dispatch(setSessionsData({
      // popupSelectedMovieTitle: title,
      sessions,
      movies
    }));
  }, []);
  const hidePopupCallback = useCallback(() => {
    dispatch(hidePopup());
    dispatch(setToInitialData()); // сбросить редактируемый фильм при закрытии окна формы
    dispatch(setToInitialMovieData()); // сбросить добавляемый фильм при закрытии окна формы
    dispatch(setToInitialSessionsData()); // сбросить список сеансов для редактирования при закрытии окна формы
    dispatch(setToInitialNewSessionData()); // сбросить добавляемый сеанс при закрытии окна формы
  }, []);

  // redux
  const handlePopupStatus = (status, movie = {}) => {
    console.log('popup status handler');
    if (status === 'adding movie popup') {
      addMovieCallback(moviesInfoRedux);
      // dispatch(addMovie());
    }
    if (status === 'editing movie popup') {
      editMovieCallback(movie);
      // dispatch(editMovie());
    }
    if (status === 'editing sessions') {
      editSessionsCallback(moviesInfoRedux[0].title, sessionsInfoRedux, moviesInfoRedux);
      // dispatch(editSessions());
    }
    if (status === 'hide popup') {
      hidePopupCallback();
    }
  }

  useEffect(() => {
    // console.log('SessionManager effect is on');
    dispatch(setHalls(hallsRedux));
    dispatch(setMovies(moviesRedux));
    dispatch(setSessions(sessionsRedux));
    dispatch(setDays(14)); // расписание на 14 дней

    if (refreshDataStatusRedux !== 'initial data is loaded') {
      dispatch(setRefreshDataStatus('data refreshed'));
    }
  }, [hallsRedux, moviesRedux, sessionsRedux, refreshDataStatusRedux]);


  const handleChangeDate = (e) => {
    const { value } = e.target;
    dispatch(setSelectedDay(value));
  }

  // Универсальный колбэк onChangeCallback + функции обновления массивов сущностей
  const handleChangeData = (newData, id) => {
    // изменение сеанса
    if (Object.prototype.hasOwnProperty.call(newData, "time")) {
      handleChangeSession(newData, id);
    }
    // изменение фильма
    if (Object.prototype.hasOwnProperty.call(newData, "duration")) {
      handleChangeMovie(newData, id);
    }
  }

  const handleChangeSession = (newSession, id) => {
    const updatedSessions = sessionsInfoRedux.map(session => {
      return session.id === id ? newSession : session
    })
    dispatch(changeSessions(updatedSessions));
    // console.log(updatedSessions);
    console.log('сеанс обновлён');

    // подготовка для DB
    // если уже проводились изменения -> не добавлять в массив для отправки в БД
    if (sessionsToChangeInDB.find(session => session.id === newSession.id)) {
      const filtredSessions = sessionsToChangeInDB.filter(session => session.id !== newSession.id);
      setSessionsToChangeInDB(filtredSessions.concat(newSession));
    } else {
      setSessionsToChangeInDB(sessionsToChangeInDB.concat(newSession));
    }
    // setSessionsToChangeInDB(sessionsToChangeInDB.concat(newSession));

    // Обновить данные в массиве для добавления (при изменении ранее добавленного элемента + убрать из массива изменения данных в БД)
    if (sessionsToAddInDB.find(session => session.id === newSession.id)) {
      const filtredSessionsToAdd = sessionsToAddInDB.filter(session => session.id !== newSession.id);
      setSessionsToAddInDB(filtredSessionsToAdd.concat(newSession));

      const filtredSessionsToChange = sessionsToChangeInDB.filter(session => session.id !== newSession.id);
      setSessionsToChangeInDB(filtredSessionsToChange);
    }
  }

  const handleChangeMovie = (newMovie, id) => {
    const updatedMovies = moviesInfoRedux.map(movie => {
      return movie.id === id ? newMovie : movie
    })

    dispatch(changeMovies(updatedMovies));
    // console.log(updatedMovies);
    console.log('фильм обновлен');

    // подготовка для DB
    // если уже проводились изменения -> не добавлять в массив для отправки в БД
    if (moviesToChangeInDB.find(movie => movie.id === newMovie.id)) {
      const filtredmovies = moviesToChangeInDB.filter(movie => movie.id !== newMovie.id);
      setMoviesToChangeInDB(filtredmovies.concat(newMovie));
    } else {
      setMoviesToChangeInDB(moviesToChangeInDB.concat(newMovie));
    }
    // setMoviesToChangeInDB(moviesToChangeInDB.concat(newMovie));

    // Обновить данные в массиве для добавления (при изменении ранее добавленного элемента + убрать из массива изменения данных в БД)
    if (moviesToAddInDB.find(movie => movie.id === newMovie.id)) {
      const filtredMoviesToAdd = moviesToAddInDB.filter(movie => movie.id !== newMovie.id);
      setMoviesToAddInDB(filtredMoviesToAdd.concat(newMovie));

      const filtredMoviesToChange = moviesToChangeInDB.filter(movie => movie.id !== newMovie.id);
      setMoviesToChangeInDB(filtredMoviesToChange);
    }
  }

  // Универсальный колбэк onAddCallback + функции обновления массивов сущностей
  const handleAddData = (newData) => {
    // добавление сеанса
    if (Object.prototype.hasOwnProperty.call(newData, "time")) {
      handleAddSession(newData);
    }
    // добавление фильма
    if (Object.prototype.hasOwnProperty.call(newData, "duration")) {
      handleAddMovie(newData);
    }
  }

  const handleAddSession = (newSession) => {
    const updatedSessions = sessionsInfoRedux.concat(newSession);
    dispatch(changeSessions(updatedSessions));
    // console.log(updatedSessions);
    console.log('сеанс добавлен');

    // подготовка для DB
    setSessionsToAddInDB(sessionsToAddInDB.concat(newSession));
  }

  const handleAddMovie = (newMovie) => {
    const updatedMovies = moviesInfoRedux.concat(newMovie);
    dispatch(changeMovies(updatedMovies));
    // console.log(updatedMovies);
    console.log('фильм добавлен');

    // подготовка для DB
    setMoviesToAddInDB(moviesToAddInDB.concat(newMovie));
  }

  // Универсальный колбэк onDeleteCallback + функции обновления массивов сущностей
  const handleDeleteData = (data) => {
    // удаление сеанса
    if (Object.prototype.hasOwnProperty.call(data, "time")) {
      handleDeleteSession(data.id);
    }
    // удаление фильма
    if (Object.prototype.hasOwnProperty.call(data, "duration")) {
      handleDeleteMovie(data.id);
    }
  }

  const handleDeleteSession = (sessionId) => {
    const updatedSessions = sessionsInfoRedux.filter(session => session.id !== sessionId);
    dispatch(changeSessions(updatedSessions));
    // console.log(updatedSessions);
    console.log('сеанс удалён');

    // Если удаленный элемент был добавлен/изменён ранее => удалить из данных для отправки на сервер
    const sessionsToChange = sessionsToChangeInDB.filter(session => session.id !== sessionId);
    setSessionsToChangeInDB(sessionsToChange);
    const sessionsToAdd = sessionsToAddInDB.filter(session => session.id !== sessionId);
    setSessionsToAddInDB(sessionsToAdd);

    // подготовка для DB
    // Если изменены элементы, сохраненные в БД, удаляются
    if (sessionsRedux.find(session => session.id == sessionId)) {
      setSessionsToDeleteInDB(sessionsToDeleteInDB.concat(sessionId)); // массив Id
    }
    // setSessionsToDeleteInDB(sessionsToDeleteInDB.concat(sessionId)); // массив Id
  }

  const handleDeleteMovie = (movieId) => {
    const updatedMovies = moviesInfoRedux.filter(movie => movie.id !== movieId);

    // redux
    dispatch(changeMovies(updatedMovies));
    // console.log(updatedMovies);
    console.log('фильм удалён');

    // Если удаленный элемент был добавлен/изменён ранее => удалить из данных для отправки на сервер
    const moviesToChange = moviesToChangeInDB.filter(movie => movie.id !== movieId);
    setMoviesToChangeInDB(moviesToChange);
    const moviesToAdd = moviesToAddInDB.filter(movie => movie.id !== movieId);
    setMoviesToAddInDB(moviesToAdd);

    // !!! сеансы удалятся из БД каскадно, нужно только почистить визуальное отображение
    const updatedSessions = sessionsInfoRedux.filter(session => session.movie_id !== movieId);
    dispatch(changeSessions(updatedSessions))
    // console.log(updatedSessions);
    console.log('удалены сеансы на конкретный удалённый фильм');


    // // подготовка для DB
    // setMoviesToDeleteInDB(moviesToDeleteInDB.concat(movieId));
    // подготовка для DB
    // Если изменены элементы, сохраненные в БД

    if (moviesRedux.find(movie => movie.id == movieId)) {
      setMoviesToDeleteInDB(moviesToDeleteInDB.concat(movieId)); // массив Id
    }

    // найти Id связанных с фильмом сеансов и поместить в новый массив

    // Удалить связаннные с фильмом сеансы из массивов для передачи в БД
    const sessionsToChange = sessionsToChangeInDB.filter(session => session.movie_id !== movieId)
    setSessionsToChangeInDB(sessionsToChange);
    const sessionsToAdd = sessionsToAddInDB.filter(session => session.movie_id !== movieId)
    setSessionsToAddInDB(sessionsToAdd);
  }

  const handleDBUpdate = async (e) => {
    e.preventDefault();

    // добавление в БД (1)
    if (moviesToAddInDB.length > 0) {
      dispatch(postMovieData({
        dataArray: moviesToAddInDB,
        url: 'api/movies'
      }))
      // setMoviesToAddInDB([]);
    }
    if (sessionsToAddInDB.length > 0) {
      dispatch(postSessionData({
        dataArray: sessionsToAddInDB,
        url: 'api/sessions'
      }))
      // setSessionsToAddInDB([]);
    }

    // изменение сущностей в БД (2)
    if (moviesToChangeInDB.length > 0) {
      dispatch(putMovieData({
        dataArray: moviesToChangeInDB,
        url: 'api/movies'
      }))
      // setMoviesToChangeInDB([]);
    }
    if (sessionsToChangeInDB.length > 0) {
      dispatch(putSessionData({
        dataArray: sessionsToChangeInDB,
        url: 'api/sessions'
      }))
      // setSessionsToChangeInDB([]);
    }

    // удаление сущностей в БД (3)
    if (moviesToDeleteInDB.length > 0) {
      dispatch(deleteMovie({
        dataArray: moviesToDeleteInDB, // array with ids
        url: 'api/movies'
      }))
      // setMoviesToDeleteInDB([]);
    }
    if (sessionsToDeleteInDB.length > 0) {
      dispatch(deleteSession({
        dataArray: sessionsToDeleteInDB, // array with ids
        url: 'api/sessions'
      }))
      // setSessionsToDeleteInDB([]);
    }

    if (sessionsToDeleteInDB.length > 0 ||
      sessionsToChangeInDB.length > 0 ||
      sessionsToAddInDB.length > 0
    ) {
      // dispatch(getSessions()); // загрузка сеансов   

      setSessionsToAddInDB([]);
      setSessionsToChangeInDB([]);
      setSessionsToDeleteInDB([]);
    }

    if (moviesToDeleteInDB.length > 0 ||
      moviesToChangeInDB.length > 0 ||
      moviesToAddInDB.length > 0
    ) {
      // dispatch(getMovies()); // загрузка фильмов
      dispatch(getSessions()); // загрузка сеансов   

      setMoviesToAddInDB([]);
      setMoviesToChangeInDB([]);
      setMoviesToDeleteInDB([]);
    }
  }

  const handleRefresh = () => {
    dispatch(setRefreshDataStatus('refresh data'));

    // сброс данных для подготовки к отправке в БД
    setSessionsToAddInDB([]);
    setMoviesToAddInDB([]);
    setMoviesToChangeInDB([]);
    setSessionsToChangeInDB([]);
    setMoviesToDeleteInDB([]);
    setSessionsToDeleteInDB([]);
  }

  if (hallsReduxLoading !== 'idle' || moviesReduxLoading !== 'idle' || sessionsReduxLoading !== 'idle') {
    return (
      <section className="conf-step" >
        <SectionHeader name={'Сетка сеансов'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />
        <div className="conf-step__wrapper">
          <span className="loader" ></span>
        </div>
      </section>
    )
  }

  return (
    <section className="conf-step">
      <Popup4
        popupInfo={popupInfoRedux}
        halls={hallsInfoRedux}
        movies={moviesInfoRedux}
        sessions={sessionsInfoRedux}
        onChangeCallback={handleChangeData}
        onAddCallback={handleAddData}
        onDeleteCallback={handleDeleteData}
        handlePopup={handlePopupStatus}
      >
      </Popup4>

      <SectionHeader name={'Сетка сеансов'} isActiveHeaderState={isActiveHeaderState} handleClick={toggleSectionVisibility} />

      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={() => handlePopupStatus('adding movie popup')}>Добавить фильм</button>
        </p>

        <div className="conf-step__movies">
          {moviesInfoRedux && moviesInfoRedux.map(movie => {
            const movieCard =
              <div
                key={movie.id}
                id={`movie_id=${movie.id}`}
                className="conf-step__movie"
                onClick={() => {
                  // console.log(window.getComputedStyle(e.currentTarget).backgroundColor);
                  handlePopupStatus('editing movie popup', movie)
                }}>
                {/* <img className="conf-step__movie-poster" alt="poster" src={poster} /> */}
                <img className="conf-step__movie-poster" alt="poster" src={BASEURL + movie.poster} />
                <h3 className="conf-step__movie-title">{movie.title}</h3>
                <p className="conf-step__movie-duration">{movie.duration} минут</p>
              </div>
            return movieCard;
          }
          )}
        </div>

        {/* редактирование сеансов */}
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={() => handlePopupStatus('editing sessions')}>Редактировать сеансы</button>
        </p>

        {/* переключатели дат */}
        <p className="conf-step__paragraph">Выберите дату сеансов для конфигурации:</p>
        <SessionDates days={daysRedux} handleChangeDate={handleChangeDate} date={selectedDayRedux} />

        <div className="conf-step__seances">
          {hallsInfoRedux && hallsInfoRedux.map(hall => (
            <div key={hall.id} className="conf-step__seances-hall">
              <h3 className="conf-step__seances-title">{hall.title}</h3>
              <div className="conf-step__seances-timeline">
                {
                  backgroundColors.length && sessionsInfoRedux && sessionsInfoRedux.map(session => (
                    // const duration = Number({session.duration});
                    // const sessionDurationWidth = 'calc(' + duration + '*' + '0.5)';
                    session.hall_id === hall.id && session.date === selectedDayRedux
                      ? (<div
                        key={session.id}
                        className="conf-step__seances-movie"
                        style={
                          {
                            width: `calc(${session.duration}px * 0.5)`,
                            backgroundColor: backgroundColors.find(el => session.movie_id === Number(el.movieId)).backgroundColor, // выбрать нужный фильм и назначить ему его цвет
                            // backgroundColor: 'rgb(133, 255, 137)',
                            left: `calc((${session.time.slice(0, 2)} + ${session.time.slice(3)} / 60) * 720px / 24)`
                          }
                        }>
                        <p className="conf-step__seances-movie-title">{moviesInfoRedux && moviesInfoRedux.find(movie => movie.id === session.movie_id).title}</p> {/* нужно будет скорректировать, пока работает только для индексов от 1 и так далее */}
                        <p className="conf-step__seances-movie-start">{session.time}</p>
                      </div>)
                      : null
                  ))
                }
              </div>
            </div>
          )
          )}
        </div>
        <SectionButtons handleRefresh={handleRefresh} handleDBUpdate={handleDBUpdate} />
      </div>
    </section>
  )
}

export default SessionManager