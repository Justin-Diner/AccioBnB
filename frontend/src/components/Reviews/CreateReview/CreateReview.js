import './CreateReview.css'
import StarComponent from './StarComponent/StarComponent';
import { useState } from 'react';

const CreateReview = ({listing, host}) => {
	const [cleanliness, setCleanliness] = useState(5);
	const [accuracy, setAccuracy] = useState(5);
	const [communication, setCommunication] = useState(5);
	const [location, setLocation] = useState(5);
	const [checkIn, setCheckIn] = useState(5);
	const [value, setValue] = useState(5);

	return (
		<div id="create_review_container">
			<div id="create_review_wrapper">
				<div id="create_review_title">{listing.title}</div>
				<div id="create_review_subtitle">{listing.propertyType} Hosted By {host?.firstName} {host?.lastName}</div>
				<div id="create_review_content_wrapper">
					<div id="star_component_wrapper">
						<StarComponent setter={setCleanliness} category="Cleanliness"/>
						<StarComponent category="Accuracy"/>
						<StarComponent category="Communication"/>
						<StarComponent category="Location"/>
						<StarComponent category="Check In"/>
						<StarComponent category="Value"/>
					</div>
					<div id="create_review_comment">
						<textarea id="create_review_comment_textarea"></textarea>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateReview;