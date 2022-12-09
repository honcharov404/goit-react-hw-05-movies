import { NavLink, Route, Routes } from 'react-router-dom';
import cn from 'classnames';

import s from './App.module.css';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./Pages/Home/Home'));
const Movies = lazy(() => import('./Pages/Movies/Movies'));
const MovieDetails = lazy(() => import('./Pages/MovieDetails/MovieDetails'));

export const App = () => {
  return (
    <div className={s.app}>
      <header className={s.header}>
        <nav className={s.nav}>
          <NavLink
            className={({ isActive }) =>
              cn(s.navLink, { [s.active]: isActive })
            }
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              cn(s.navLink, { [s.active]: isActive })
            }
            to="/movies"
          >
            MOVIES
          </NavLink>
        </nav>
      </header>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId/*" element={<MovieDetails />} />
        </Routes>
      </Suspense>
    </div>
  );
};
