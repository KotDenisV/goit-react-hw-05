import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../../api";
import Loader from "../Loader/Loader";
import s from './MovieReviews.module.css';

const MovieReviews = () => {
   const [reviews, setReviews] = useState([]);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const { movieId } = useParams();
    console.log("MovieCast:", movieId);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoader(true);
                const data = await getReviewsById(movieId);                
                setReviews(data || []);                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoader(false);
            }
        };        
        fetchReviews();        
    }, [movieId]);

    if (loader) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={s.wrapper}>                   
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map(review => (
                        <li key={review.id}>
                            <div className={s.wrapperReviews}>
                                <h3>Author: {review.author_details.username}</h3>
                                <p>{review.content}</p>                            
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>We don`t have any reviews for this movie.</p>
            )}
        </div>
    );
};

export default MovieReviews;