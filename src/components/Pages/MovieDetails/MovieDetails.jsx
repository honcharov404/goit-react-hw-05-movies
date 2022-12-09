import Loader from 'components/Loader/Loader';
import React, { Suspense, useState } from 'react';
import { lazy } from 'react';
import { useEffect } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { getMovieInfo, IMAGE_URL } from 'services/api';

import s from './MovieDetails.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const backLink = location.state?.from ?? '/movies';
  // console.log(location);

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
      <Link to={backLink}>
        <button className={s.btn} type="button">
          GO BACK
        </button>
      </Link>
      <div className={s.wrap}>
        <img
          className={s.img}
          src={IMAGE_URL + movie.poster_path}
          alt="poster"
        />
        <div className={s.wrapDetails}>
          <h2 className={s.title}>{movie.title}</h2>
          <p className={s.text}>User Score: {movie.vote_average}</p>
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
      <div className={s.wrapInfo}>
        <p className={s.text}>Additional information</p>
        <ul className={s.infoList}>
          <li className={s.infoItem}>
            <Link state={{ from: backLink }} to={`cast`}>
              Cast
            </Link>
          </li>
          <li className={s.infoItem}>
            <Link state={{ from: backLink }} to={`reviews`}>
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense>
          <Routes>
            <Route path="cast" element={<Cast id={movieId} />} />
            <Route path="reviews" element={<Reviews id={movieId} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetails;
