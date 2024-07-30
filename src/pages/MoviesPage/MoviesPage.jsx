import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getSearchMovies } from '../../api';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MovieList from '../../components/MovieList/MovieList';
import { Toaster } from 'react-hot-toast';
import { useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movie, setMovie] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        const query = searchParams.get("query") ?? "";
        if (!query) return;
        setLoader(true);
        setError(false);
        const fetchSearchMovie = async () => {
            try {
                const searchingMovies = await getSearchMovies(query);
                setMovie(searchingMovies);
            } catch {
                setError(true);
            } finally {
                setLoader(false);
            }
        };
        fetchSearchMovie();
    }, [query]);

    const handleSearchSubmit = (newQuery) => {
        setQuery(newQuery);
        if (!newQuery) {      
          return setSearchParams({});
        }
        searchParams.set('query', newQuery);
        setSearchParams(searchParams);    
    };

    return (
        <div>           
            <SearchBar onSubmit={handleSearchSubmit} />
            {loader && <Loader />}            
            {!loader && (error ? <NotFoundPage /> : <MovieList movie={movie} />)}
            <Toaster />
        </div>
    );
};

export default MoviesPage;