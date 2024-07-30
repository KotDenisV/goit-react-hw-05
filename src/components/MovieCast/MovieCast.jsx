import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCastById } from "../../api";
import Loader from "../Loader/Loader";

const MovieCast = () => {
    const [actors, setActors] = useState();
    const [loader, setLoader] = useState(false);
    const { movieId } = useParams();
    console.log("MovieCast:", movieId);

    useEffect(() => {
        const fetchCast = async () => {
            try {
                setLoader(true);
                const data = await getCastById(movieId);                
                setActors(data);                
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        };        
        fetchCast();        
    }, [movieId]);

    if (!actors) {
        return <Loader />;
    }

    return (
        <div>
            {loader && <Loader />}
            <h1>Movie Cast</h1>
            <ul>
                {actors.map(actor => (
                    <li key={actor.id}>
                        <img src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`} alt={actor.name} />
                        <p>{actor.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieCast;