import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { getMovieInfo, IMAGE_URL } from 'services/api';
import Cast from './Cast';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(movie);

  useEffect(() => {
    setIsLoading(true);
    getMovieInfo(movieId)
      .then(resp => setMovie(resp))
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  return (
    <div>
      <button type="button">Go back</button>
      <div>
        <img src={IMAGE_URL + movie.poster_path} alt="poster" />
        <div>
          <h2>{movie.title}</h2>
          <p>User Score: {movie.vote_average}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres?.map(genre => {
              return <li key={genre.id}>{genre.name}</li>;
            })}
          </ul>
        </div>
      </div>
      <div>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
        </ul>
        <Routes>
          <Route path="cast" element={<Cast id={movieId} />} />
        </Routes>
      </div>
    </div>
  );
};

export default MovieDetails;
