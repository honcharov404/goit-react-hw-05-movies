import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { getTrending, IMAGE_URL } from 'services/api';
import Loader from 'components/Loader/Loader';

import s from './Home.module.css';

const HomePage = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    getTrending()
      .then(resp => setTrends(resp))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  //   console.log(trends);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h2 className={s.title}>Trending today</h2>
      <ul className={s.list}>
        {trends.map(trend => {
          return (
            <li className={s.item} key={trend.id}>
              <Link
                state={{ from: location }}
                className={s.link}
                to={`/movies/${trend.id}`}
              >
                <img
                  className={s.img}
                  src={IMAGE_URL + trend.poster_path}
                  alt="poster"
                />
                <span className={s.inner}>{trend.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
