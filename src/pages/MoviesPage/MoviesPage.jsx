import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getSearchMovies } from '../../api';
import Loader from '../../components/Loader/Loader';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import MovieList from '../../components/MovieList/MovieList';
import { Toaster } from 'react-hot-toast';


const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movie, setMovie] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(false);
    
    


    useEffect(() => {
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