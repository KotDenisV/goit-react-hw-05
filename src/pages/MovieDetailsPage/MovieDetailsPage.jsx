import { useState, useEffect } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { getMovieById } from "../../api";
import Loader from "../../components/Loader/Loader";
import s from './MovieDetailsPage.module.css';
import clsx from 'clsx';



const MovieDetailsPage = () => {
    const [movie, setMovie] = useState({});
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const { movieId } = useParams();
    console.log("MovieDetailsPage:", movieId);

    useEffect(() => {
        const fetchMovieById = async () => {
            try {
                setLoader(true);
                const data = await getMovieById(movieId);
                console.log(`try:${data}`);
                setMovie(data);                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoader(false);
            }
        };        
        fetchMovieById();        
    }, [movieId]);

const buildLinkClass = ({ isActive }) => {
return clsx(s.link, isActive && s.active);
};

    if (error) return <div>Error: {error}</div>;
    if (!movie) {
        return <Loader />;
    }

    return (
        <div>
            {loader && <Loader />}
            <div className={s.wrapperMovie}>               
                <img
                  className={s.poster}
                  src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.original_title}
                />
                <div>
                  <h1>{movie.original_title}</h1>                  
                  {movie.genres && (
                        <div>
                      <h2>Genres:</h2>
                      <ul className={s.genres}>
                      {movie.genres.map(genre => (
                          <li key={genre.id}>{genre.name}</li>
                      ))}
                      </ul>
                  </div>
                  )}
                  <h2>Overview: </h2>
                  <p>{movie.overview}</p>
                  <h2>Release Date: </h2>
                  <p>{movie.release_date}</p>
                  <h2>Rating: </h2>
                  <p>{movie.vote_average}</p>
                </div>    
            </div>
            <div className={s.wrapperNav}>
                <NavLink className={buildLinkClass} to='cast'>
                    MovieCast
                </NavLink>
                <NavLink className={buildLinkClass} to='reviews'>
                    MovieReviews
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;