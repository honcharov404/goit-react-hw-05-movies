import Loader from 'components/Loader/Loader';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { getMovieInfo, IMAGE_URL } from 'services/api';
import Cast from '../Cast/Cast';
import { Reviews } from '../Reviews/Reviews';

import s from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // console.log(movie);

  useEffect(() => {
    setIsLoading(true);
    getMovieInfo(movieId)
      .then(resp => setMovie(resp))
      .finally(() => {
        setIsLoading(false);
      });
  }, [movieId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <button className={s.btn} type="button">
        GO BACK
      </button>
      <div className={s.wrap}>
        <img
          className={s.img}
          src={IMAGE_URL + movie.poster_path}
          alt="poster"
        />
        <div className={s.wrapDetails}>
          <h2 className={s.title}>{movie.title}</h2>
          <p className={s.text}>User Score: {movie.vote_average}%</p>
          <h3 className={s.subTitle}>Overview</h3>
          <p className={s.text}>{movie.overview}</p>
          <h3 className={s.subTitle}>Genres</h3>
          <ul className={s.genresList}>
            {movie.genres?.map(genre => {
              return (
                <li className={s.genresItem} key={genre.id}>
                  {genre.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div>
        <p className={s.text}>Additional information</p>
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
          <Route path="reviews" element={<Reviews id={movieId} />} />
        </Routes>
      </div>
    </div>
  );
};

export default MovieDetails;
