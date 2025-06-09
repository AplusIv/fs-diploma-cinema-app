/* eslint-disable react/prop-types */
const MovieInfo = ({ movie, poster }) => {
  return (
    <div className="movie__info">
      <div className="movie__poster">
        <img className="movie__poster-image" alt={movie.title + ' постер'} src={poster} />
      </div>
      <div className="movie__description">
        <h2 className="movie__title">{movie.title}</h2>
        <p className="movie__synopsis">{movie.description}</p>
        <p className="movie__data">
          <span className="movie__data-duration">{movie.duration} минут </span>
          <span className="movie__data-origin">{movie.country}</span>
        </p>
      </div>
    </div>
  )
}

export default MovieInfo