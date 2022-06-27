import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

function Desc(props) {
  const id = useParams().id;

  const movie = props.movies[id];

  return (
    <div
      className="bg-image"
      style={{
        background: `url(${movie.backdropURLs.original}) no-repeat center center fixed`,
      }}
    >
      <div className="mask h-100">
        <div className="p-5 h-100">
          <h1 className="text-white mb-0 display-2 movie-title">
            {movie.title}
          </h1>
          <p className="movie-year text-muted">{movie.year}</p>
          <div className="button-container">
            <a
              className="watch-button btn btn-outline-success"
              href={
                movie.streamingInfo[Object.keys(movie.streamingInfo)[0]].us.link
              }
            >
              {"Watch on " + Object.keys(movie.streamingInfo)[0]}
            </a>
          </div>
          <div className="movie-details w-100">
            <div className="movie-desc-container">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <div className="movie-rating-details">
                <h3>Ratings</h3>
                <ul>
                  <li>IMDB Rating : {movie.imdbRating}</li>
                  <li>TMDB Rating : {movie.tmdbRating}</li>
                </ul>
              </div>
            </div>

            <div className="cast-details-container">
              <h3>Cast</h3>
              <ul>
                {movie.cast.map((cast, i) => (
                  <li key={i}>{cast}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    movies: state.movies,
  };
}

export default connect(mapStateToProps)(Desc);
