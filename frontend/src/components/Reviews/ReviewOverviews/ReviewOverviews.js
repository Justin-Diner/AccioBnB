import './ReviewOverviews.css'
import ROItem from './ROItem/ROItem';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListing } from '../../../store/listings';
import { useEffect } from 'react';
import { calculateRating } from '../../utils/Utils';
import { getReviews } from '../../../store/reviews';

const ReviewOverviews = () => {
	const {listingId} = useParams()
	const listing = useSelector(getListing(listingId))
	const reviews = useSelector(getReviews);

	return (
		<div id="RO_container">
			<div id="RO_stars_RAmount_container">
				<div id="RO_stars_RAmount">&#9733; {calculateRating(listing.overallRating)}</div>
				<div id="RO_stars_RAmount_sep">.</div>
				<div id="RO_amount_of_reviews">{reviews.length} reviews</div>
			</div>
			<div id="RO_each_review_container">
				<div id="RO_each_review_left">
					<ROItem category="Cleanliness" rating={listing.overallCleanliness}/>
					<ROItem category="Communication" rating={listing.overallCleanliness}/>
					<ROItem category="Check-in" rating={listing.overallCleanliness}/>
				</div>
				<div id="RO_each_review_right">
					<ROItem category="Accuracy" rating={listing.overallCleanliness}/>
					<ROItem category="Location" rating={listing.overallCleanliness}/>
					<ROItem category="Value" rating={listing.overallCleanliness}/>
				</div>
			</div>
		</div>

	)
}

export default ReviewOverviews;