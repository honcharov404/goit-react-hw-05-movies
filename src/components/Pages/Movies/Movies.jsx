import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getSearchedMovies, IMAGE_URL } from 'services/api';

import Loader from 'components/Loader/Loader';

const Movies = () => {
  const [value, setValue] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = e => {
    const query = e.target.value;
    setValue(query);
  };

  const onSubmit = e => {
    e.preventDefault();

    setIsLoading(true);
    getSearchedMovies(value)
      .then(resp => setMovies(resp))
      .finally(() => {
        setIsLoading(false);
      });
  };
  //   console.log(movies);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <img src={IMAGE_URL + movie.poster_path} alt="poster" />
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Movies;
