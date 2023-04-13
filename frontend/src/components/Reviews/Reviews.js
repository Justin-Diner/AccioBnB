import './Reviews.css'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchListingReviews } from '../../store/reviews';
import IndividualReview from './IndividualReview/IndividualReview';
import { getReviews } from '../../store/reviews';
import { retrieveUsers } from '../../store/users';


const Reviews = () => {
	const {listingId} = useParams();
	const dispatch = useDispatch();
	const reviews = useSelector(getReviews)
	const users = useSelector(retrieveUsers)
	let content;

	if (reviews.length) {
		let holder = [];

		reviews.forEach((review) => {
			let reviewAuthor = users.find((user) => user.id === review.userId)
			debugger
			if (review.listingId === parseInt(listingId)) {
				debugger
				holder.push(<IndividualReview review={review} user={reviewAuthor} />)
			}
		})
		content = holder;
	}

	useEffect(() => {
		dispatch(fetchListingReviews(listingId));
	}, [])

	return ( 
		<div id="reviews_container">
			{content}
		</div>
	)
}

export default Reviews; 