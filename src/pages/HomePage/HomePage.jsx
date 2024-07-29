import { useEffect, useState } from "react";
import { getTrendingMovies } from '../../api';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MovieList from '../../components/MovieList/MovieList';
import s from './HomePage.module.css';


const HomePage = () => {
    const [movie, setMovie] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                setLoader(true);
                const trendingMovies = await getTrendingMovies();
                setMovie(trendingMovies);
            } catch {
                setError(true);
            } finally {
                setLoader(false);
            }
        };
        fetchTrendingMovies();
    }, []);


    return (
        <div className={s.wrapper}>
            <h1>Trending Movies</h1>
            {loader && <Loader />}
            {!loader && (error ? <NotFoundPage /> : <MovieList movie={movie} />)}
        </div>
    );
};

export default HomePage;