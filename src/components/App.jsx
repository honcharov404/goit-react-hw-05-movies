import { Link, Route, Routes } from 'react-router-dom';

import HomePage from './Pages/HomePage';
import Movies from './Pages/Movies';

import s from './App.module.css';
import MovieDetails from './Pages/MovieDetails';

export const App = () => {
  return (
    <div className={s.app}>
      <header className={s.header}>
        <nav className={s.nav}>
          <Link className={s.navLink} to="/">
            HOME
          </Link>
          <Link className={s.navLink} to="/movies">
            MOVIES
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId/*" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};
