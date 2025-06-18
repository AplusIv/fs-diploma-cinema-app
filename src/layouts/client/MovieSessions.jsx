/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setHall, setMovie, setPlacesByHall, setSession } from "../../redux/slices/buyingSlice";

const MovieSessions = ({ movie, halls, sessions, places }) => {
  const dispatch = useDispatch();

  const handleBuy = ({
    movie,
    hall,
    session,
    places,
  }) => {
    dispatch(setMovie(movie));
    dispatch(setHall(hall));
    dispatch(setSession(session));
    dispatch(setPlacesByHall(places));
  }

  return (
    <>
      {halls.map(hall => (
        sessions.find(session => session.hall_id === hall.id) ?
          <div key={hall.id} className="movie-seances__hall">
            <h3 className="movie-seances__hall-title">{hall.title}</h3>
            <ul className="movie-seances__list">
              {sessions.map(session => (
                hall.id === session.hall_id ?
                  <li key={session.id} className="movie-seances__time-block">
                    {/* Проверка на возможность забронировать билеты на конкретный сеанс (is_sales_active должно быть truthy) */}
                    {session.is_sales_active
                      ? <Link
                        to="../buying"
                        className="movie-seances__time"
                        state={{ movie, hall, session, places: places.filter(place => place.hall_id === hall.id) }}
                        onClick={() => {
                          handleBuy({
                            movie,
                            hall,
                            session,
                            places: places.filter(place => place.hall_id === hall.id),
                          })
                        }}>
                        {session.time}
                      </Link>
                      : <div className="inactive-container">
                        <div className="movie-seances__time inactive">
                          {session.time}
                        </div>
                        <span className="movie-seances__time_tooltip-text">
                          Билеты на сеанс недоступны на данный момент. Попробуйте позднее.
                        </span>
                      </div>
                    }
                  </li>
                  : null
              ))}
            </ul>
          </div> : null
      ))}
    </>
  )
}

export default MovieSessions