import Loader from 'components/Loader/Loader';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getMovieReviews } from 'services/api';

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   console.log(reviews);

  useEffect(() => {
    setIsLoading(true);
    getMovieReviews(id)
      .then(resp => setReviews(resp))
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : !!reviews.length ? (
    <ul>
      {reviews.map(review => {
        return (
          <li key={review.id}>
            <h2>Author: {review.author}</h2>
            <p>{review.content}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>No reviews</p>
  );
};

export default Reviews;
