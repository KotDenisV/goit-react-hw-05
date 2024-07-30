import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewsById } from "../../api";
import Loader from "../Loader/Loader";
import s from './MovieReviews.module.css';

const MovieReviews = () => {
   const [reviews, setReviews] = useState();
    const [loader, setLoader] = useState(false);
    const { movieId } = useParams();
    console.log("MovieCast:", movieId);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoader(true);
                const data = await getReviewsById(movieId);                
                setReviews(data);                
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        };        
        fetchReviews();        
    }, [movieId]);

    if (!reviews) {
        return <Loader />;
    }

    return (
        <div>
            {loader && <Loader />}
            <h1>Reviews</h1>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <div className={s.wrapperReviews}>
                            <h2>{review.author_details.username}</h2>
                            <p>{review.content}</p>                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieReviews;