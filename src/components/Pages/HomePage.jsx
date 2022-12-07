import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrending, IMAGE_URL } from 'services/api';
import Loader from 'components/Loader/Loader';

const HomePage = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      <h2>Trending today</h2>
      <ul>
        {trends.map(trend => {
          return (
            <li key={trend.id}>
              <img src={IMAGE_URL + trend.poster_path} alt="poster" />
              <Link to={`/movies/${trend.id}`}>{trend.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
