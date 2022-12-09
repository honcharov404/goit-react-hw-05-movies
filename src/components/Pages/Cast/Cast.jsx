import Loader from 'components/Loader/Loader';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getMovieCredits, IMAGE_URL } from 'services/api';

import s from './Cast.module.css';

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
    <ul className={s.list}>
      {cast.map(el => {
        return (
          <li className={s.item} key={el.id}>
            <img
              className={s.img}
              src={IMAGE_URL + el.profile_path}
              alt="poster"
            />
            <p className={s.text}>{el.name}</p>
            <p className={s.text}>Character: {el.character}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Cast;
