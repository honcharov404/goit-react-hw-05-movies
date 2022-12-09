import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

import { getSearchedMovies, IMAGE_URL } from 'services/api';

import Loader from 'components/Loader/Loader';

import s from './Movies.module.css';

const Movies = () => {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get('name');

  const onChange = e => {
    const query = e.target.value;
    setValue(query);
  };

  const onSubmit = e => {
    e.preventDefault();

    setSearchParams({ name: value });
  };
  //   console.log(movies);

  useEffect(() => {
    if (!name) return;
    setIsLoading(true);
    getSearchedMovies(name)
      .then(resp => setMovies(resp))
      .finally(() => {
        setIsLoading(false);
      });
  }, [name]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <form className={s.form} onSubmit={onSubmit}>
        <input
          className={s.input}
          type="text"
          placeholder="ENTER MOVIE TITLE..."
          value={value}
          onChange={onChange}
        />
        <button className={s.btn} type="submit">
          SEARCH
        </button>
      </form>
      {!!movies.length && name && (
        <ul className={s.list}>
          {movies.map(movie => {
            return (
              <li className={s.item} key={movie.id}>
                <Link
                  className={s.link}
                  state={{ from: location }}
                  to={`/movies/${movie.id}`}
                >
                  <img
                    className={s.img}
                    src={IMAGE_URL + movie.poster_path}
                    alt="poster"
                  />
                  <span className={s.inner}>{movie.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      {name && movies.length === 0 && <p>No results...</p>}
    </div>
  );
};

export default Movies;
