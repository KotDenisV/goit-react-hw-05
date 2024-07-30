import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movie }) => {
  const location = useLocation();
  return (
    <ul className={s.list}>
          {movie.map((movies) => (
          <Link key={movies.id} to={`/movies/${movies.id}`} state={location}>
            <li className={s.listItem}>{movies.title} ({movies.release_date})</li>
          </Link>
      ))}
    </ul>
  );
};

export default MovieList;