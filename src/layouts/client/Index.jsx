import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getHalls } from '../../redux/slices/guestHallSlice';
import { getMovies } from '../../redux/slices/guestMovieSlice';
import { getPlaces } from '../../redux/slices/guestPlaceSlice';
import PageNavigator from './PageNavigator';
import MovieList from './MovieList';

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('Client index page effect is on');
    dispatch(getHalls()); // загрузка залов для гостя (неавторизованного пользователя)
    dispatch(getMovies()); // загрузка фильмов для гостя (неавторизованного пользователя)
    dispatch(getPlaces()); // загрузка зрительских мест для гостя (неавторизованного пользователя)
  }, []);

  return (
    <>
      <PageNavigator />
      <MovieList />  
    </>
  )
}

export default Index