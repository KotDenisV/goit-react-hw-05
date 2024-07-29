import { Link } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movie }) => {
  return (
    <ul className={s.list}>
          {movie.map((movies) => (
          <Link key={movies.id} to='/movies/:movieId'>
            <li className={s.listItem}>{movies.title} ({movies.release_date})</li>
          </Link>
      ))}
    </ul>
  );
};

export default MovieList;