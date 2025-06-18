import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { setStateByStorageData as setHallsErrorStorageData } from '../../redux/slices/hallSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setStateByStorageData as setPlacesErrorStorageData } from '../../redux/slices/placeSlice';
import { setStateByStorageData as setMoviesErrorStorageData } from '../../redux/slices/movieSlice';
import { setStateByStorageData as setSessionsErrorStorageData } from '../../redux/slices/sessionSlice';
// import { dataFailed, getUser, setErrors, setLoggedIn, setLoggedOut } from '../../redux/slices/loginSlice';
import { getUser } from '../../redux/slices/loginSlice';


//pages
import HallManager from '../../pages/HallManager'
import HallConfigurator from '../../pages/HallConfigurator';
import PriceConfigurator from '../../pages/PriceConfigurator';
import SessionManager from '../../pages/SessionManager';
import SellsConfigurator from '../../pages/SellsConfigurator';
import { frontendBase } from '../../services/api';

const Home = () => {
  const loginRedux = useSelector(state => state.loginReducer.loggedIn);
  const userIsAdminRedux = useSelector(state => state.loginReducer.userIsAdmin);
  const apiTokenRedux = useSelector(state => state.loginReducer.apiToken);

  // статусы загрузки данных
  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  const placesReduxLoading = useSelector(state => state.placesReducer.loading);
  const moviesReduxLoading = useSelector(state => state.moviesReducer.loading);
  const sessionsReduxLoading = useSelector(state => state.sessionsReducer.loading);
  const loginReduxLoading = useSelector(state => state.loginReducer.loading);


  // // статусы наличия ошибок при загрузке основных данных
  // const loginReduxErrorStatus = useSelector(state => state.loginReducer.loginErrorStatus);
  // const hallsReduxErrorStatus = useSelector(state => state.hallsReducer.errorStatus);
  // const placesReduxErrorStatus = useSelector(state => state.placesReducer.errorStatus);
  // const moviesReduxErrorStatus = useSelector(state => state.moviesReducer.errorStatus);
  // const sessionsReduxErrorStatus = useSelector(state => state.sessionsReducer.errorStatus);

  // logs
  // console.log({ hallsReduxLoading });
  // console.log({ placesReduxLoading });
  // console.log({ moviesReduxLoading });
  // console.log({ sessionsReduxLoading });
  // console.log({ hallsReduxErrorStatus });
  // console.log({ placesReduxErrorStatus });
  // console.log({ moviesReduxErrorStatus });
  // console.log({ sessionsReduxErrorStatus });
  // console.log({ loginReduxLoading });
  // console.log({ loginRedux });
  // console.log({ userIsAdminRedux });
  // console.log({ apiTokenRedux });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // проверка аутентификации пользователя 
    console.log('проверка аутентификации пользователя');

    dispatch(getUser());
    // Если пользователь с правами администратора -> загрузить основные сущности: залы, места, фильмы, сеансы
  }, [apiTokenRedux, loginRedux]);


  useEffect(() => {
    // console.log('Home page effect is on');
    dispatch(setHallsErrorStorageData()); // синхронизация с хранилищем при перезагрузке
    dispatch(setPlacesErrorStorageData()); // синхронизация с хранилищем при перезагрузке
    dispatch(setMoviesErrorStorageData()); // синхронизация с хранилищем при перезагрузке
    dispatch(setSessionsErrorStorageData()); // синхронизация с хранилищем при перезагрузке
  }, []);


  // big Spinner во время запросов
  if (loginReduxLoading === 'pending') {
    return (
      <main className="conf-steps">
        <div className='loader-centred'>
          <span className="main-loader"></span>
        </div>
      </main>)
  }

  if (loginReduxLoading === 'failed') {
    navigate(frontendBase + '/login');
  }

  return (loginReduxLoading === 'idle' && !userIsAdminRedux)
    // пользователь не является администратором
    ? (
      <main className="conf-steps">
        <section className="conf-step" >
          <div className="conf-step__wrapper">
            <h1>Текущий пользователь не обладает правами администратора для просмотра этой страницы.</h1>
            <p>
              Выйдите и авторизуйтесь заново.
            </p>
          </div>
        </section>
      </main>
    )
    : (hallsReduxLoading === 'failed'
      && placesReduxLoading === 'failed'
      && moviesReduxLoading === 'failed'
      && sessionsReduxLoading === 'failed')
      ? (
        <main className="conf-steps">
          <section className="conf-step" >
            <div className="conf-step__wrapper">
              <h1>Упс, всё сломалось, попробуйте перезагрузить страницу.</h1>
            </div>
          </section>
        </main>
      )
      : (
        <main className="conf-steps">
          <HallManager />
          <HallConfigurator />
          <PriceConfigurator />
          <SessionManager />
          <SellsConfigurator />
        </main>
      )
}

export default Home