import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionsByDate } from '../../redux/slices/sessionsByDateSlice';
import MovieInfo from './MovieInfo';
import MovieSessions from './MovieSessions';

// import poster1 from '../../img/client/poster1.jpg';
// import poster2 from '../../img/client/poster2.jpg'

import { BASEURL } from '../../services/api';

import dayjs from 'dayjs';
import { compareFnByDateAssending } from '../../services/sorterFunctions';


const MovieList = () => {
  const hallsRedux = useSelector(state => state.guestHallsReducer.halls);
  const moviesRedux = useSelector(state => state.guestMoviesReducer.movies);
  const placesRedux = useSelector(state => state.guestPlacesReducer.places);
  const sessionsByDateRedux = useSelector(state => state.sessionsByDateReducer.sessionsByDate);

  // сатусы загрузки данных
  const hallsReduxLoading = useSelector(state => state.guestHallsReducer.loading);
  const moviesReduxLoading = useSelector(state => state.guestMoviesReducer.loading);
  const placesReduxLoading = useSelector(state => state.guestPlacesReducer.loading);
  const sessionsByDateReduxLoading = useSelector(state => state.sessionsByDateReducer.loading);
   
  // логи
  // console.log({ hallsRedux });
  // console.log({ moviesRedux });
  // console.log({ placesRedux });
  // console.log({ sessionsByDateRedux });  
  // console.log({ hallsReduxLoading });
  // console.log({ moviesReduxLoading });
  // console.log({ placesReduxLoading });
  // console.log({ sessionsByDateReduxLoading });

  const dispatch = useDispatch();

  const { date } = useParams();

  useEffect(() => {
    // Получение сеансов на конкретные даты
    dispatch(getSessionsByDate(date));
  }, [date])

  const now = dayjs().format('YYYY-MM-DD');

  // некорректная дата/отсутствие даты в адресной строке
  if (sessionsByDateReduxLoading === 'failed') {
    return (
      <main>
        <section className='movie'>
          <h2>Вы выбрали некорректную дату.</h2>
          <p>
            <span>Дата сеансов не выбрана, либо менее текущей. <br/>Укажите корректную дату в адресной строке в допустимом формате (например, 2019-07-30) или воспользуйтесь навигатором дат. </span>
            <br/>
            <span>Также вы можете посмотреть сеансы на текущую дату по ссылке. <br/><Link to={`../schedule/${now}`}>Показать сеансы на текущую дату?</Link></span>
          </p>
        </section>
      </main>
    )
  }

  // Загрузка
  if (
    hallsReduxLoading !== 'idle' ||
    moviesReduxLoading !== 'idle' ||
    placesReduxLoading !== 'idle' ||
    sessionsByDateReduxLoading !== 'idle'
  ) {
    return (
      <main>
        <span className="loader" ></span>
      </main>
    )
  }

  if (sessionsByDateRedux && sessionsByDateRedux.length === 0) {
    return (
      <main>
        <section className='movie'>
          <h2>Сеансы на выбранную дату отсутствуют.</h2>
          <p>Выберите другую дату для поиска сеансов.</p>
        </section>
      </main>
    )
  }

  return (
    <main>
      {sessionsByDateRedux && moviesRedux.map(movie => {
        const sessionsByDateAndMovie = sessionsByDateRedux.filter(session => session.movie_id === movie.id);
        if (sessionsByDateAndMovie.length > 0) {
          sessionsByDateAndMovie.sort(compareFnByDateAssending); // сортировать массив по столбцам "дата" и "время" по возрастанию
          return (
            <section key={movie.id} className="movie">
              <MovieInfo movie={movie} poster={BASEURL + movie.poster} />

              <MovieSessions movie={movie} halls={hallsRedux} sessions={sessionsByDateAndMovie} places={placesRedux} />
            </section>
          )
        }
        return null;
      })}      
    </main>
  )
}

export default MovieList