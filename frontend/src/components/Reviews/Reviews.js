import './Reviews.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchListingReviews } from '../../store/reviews';
import IndividualReview from './IndividualReview/IndividualReview';
import { getReviews } from '../../store/reviews';
import ReviewOverviews from './ReviewOverviews/ReviewOverviews';

const Reviews = ({users }) => {
	const dispatch = useDispatch();
	const {listingId} = useParams();
	const [displayedReviews, setDisplayedReviews] = useState([]); 
	const reviews = useSelector(getReviews);

	useEffect(() => {
		dispatch(fetchListingReviews(listingId));
	}, [dispatch, listingId])

	useEffect(() => {
		let reviewsToDisplay = []; 

		reviews.forEach(review => {
			let reviewAuthor = users.find((user) => user.id === review.userId);

			if (review.listingId === parseInt(listingId)) {
				reviewsToDisplay.push(<IndividualReview key={review.id}
				review={review} user={reviewAuthor} />)
			}
		})
		setDisplayedReviews(reviewsToDisplay);
	}, [reviews])

	return (
		<>
			<div id="reviews_ROOverview_Container">
				<ReviewOverviews /> 
			</div>
			<div id="reviews_container">
				{displayedReviews}
			</div>
		</> 
	)
}

export default Reviews; 