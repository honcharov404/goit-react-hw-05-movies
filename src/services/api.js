import axios from 'axios';

const API_KEY = 'c5b7272df39592d3708482e6a1d8527d';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export async function getTrending() {
  const resp = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  //   console.log(resp.data.results);
  return resp.data.results;
}

export async function getSearchedMovies(query) {
  const resp = await axios.get(
    `/search/movie?api_key=${API_KEY}&query=${query}`
  );
  //   console.log(resp.data.results);
  return resp.data.results;
}

export async function getMovieInfo(movieId) {
  const resp = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
  //   console.log(resp.data);
  return resp.data;
}

export async function getMovieCredits(movieId) {
  const resp = await axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}`);
  //   console.log(resp.data.cast);
  return resp.data.cast;
}

export async function getMovieReviews(movieId) {
  const resp = await axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
  //   console.log(resp.data.results);
  return resp.data.results;
}
