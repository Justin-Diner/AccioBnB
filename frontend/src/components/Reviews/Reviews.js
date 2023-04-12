import './Reviews.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchListingReviews } from '../../store/reviews';
import IndividualReview from './IndividualReview/IndividualReview';


const Reviews = () => {
	const {listingId} = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchListingReviews(listingId));
	}, [])

	return ( 
		<div id="reviews_container">
			<IndividualReview />
		</div>
	)
}

export default Reviews; 