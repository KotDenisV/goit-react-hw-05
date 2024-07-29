import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "../../api";
import Loader from "../../components/Loader/Loader";

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
            } catch {
                setError(true);
            } finally {
                setLoader(false);
            }
        };        
        fetchMovieById();        
    }, [movieId]);

    if (!movie) {
        return <Loader />;
    }

    return (
        <div>
            <h1>Movie Details Page</h1>
            {loader && <Loader />}
            <h1>{movie.original_title}</h1>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>           
        </div>
    );
};

export default MovieDetailsPage;