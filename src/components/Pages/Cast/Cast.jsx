import Loader from 'components/Loader/Loader';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getMovieCredits, IMAGE_URL } from 'services/api';

const Cast = ({ id }) => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(cast);

  useEffect(() => {
    setIsLoading(true);
    getMovieCredits(id)
      .then(resp => setCast(resp))
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <ul>
      {cast.map(el => {
        return (
          <li key={el.id}>
            <img src={IMAGE_URL + el.profile_path} alt="poster" />
            <p>{el.name}</p>
            <p>Character: {el.character}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Cast;
