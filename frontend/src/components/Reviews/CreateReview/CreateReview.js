import './CreateReview.css'
import StarComponent from './StarComponent/StarComponent';
import { useState } from 'react';
import ContinueButton from '../../Buttons/ContinueButton/ContinueButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { retrieveCreateReviewModalState } from '../../../store/ui';
import { receiveCreateReviewModal } from '../../../store/ui';
import * as sessionAction from '../../../store/session';
import { createReview } from '../../../store/reviews';


const CreateReview = ({listing, host}) => {
	const dispatch = useDispatch();
	const [showing, setShowing] = useState(false);
	const [accuracy, setAccuracy] = useState(5);
	const [checkIn, setCheckIn] = useState(5);
	const [cleanliness, setCleanliness] = useState(5);
	const [communication, setCommunication] = useState(5);
	const [location, setLocation] = useState(5);
	const [value, setValue] = useState(5);
	const [description, setDescription] = useState("");
	const createReviewState = useSelector(retrieveCreateReviewModalState);
	const sessionUser = useSelector(sessionAction.sessionUser);

	useEffect(() => {
		if (createReviewState || showing) {
			setShowing(true)
		}
	}, [createReviewState])
 
	if (!showing) {
		return 
	}

	const closeWindow = () => {
		setShowing(false);
		dispatch(receiveCreateReviewModal(false));
		window.removeEventListener("click", closeWindow);
	}


	if (showing) {
		window.addEventListener("click", closeWindow)
	}

	const handleClick = (e) => {
		e.stopPropagation();
	}

	const submitReview = () => {
		const newReview = {
			user_id: sessionUser.id,
			listing_id: listing.id,
			description: description, 
			cleanliness: cleanliness,
			accuracy: accuracy, 
			communication: communication, 
			location: location,
			check_in: checkIn, 
			value: value
		}
		dispatch(createReview(newReview));
		dispatch(receiveCreateReviewModal(false));
		setShowing(false);
	}

	return (
		<div id="create_review_modal" >
		<div id="create_review_container" onClick={(e) => handleClick(e)}>
			<div id="create_review_wrapper">
				<div id="create_review_title">{listing.title}</div>
				<div id="create_review_subtitle">{listing.propertyType} Hosted By {host?.firstName} {host?.lastName}</div>
				<div id="create_review_content_wrapper">
					<div id="star_component_wrapper">
						<div className="star_component_rating_count_wrapper">
							<StarComponent setter={setAccuracy} category="Accuracy"/> 
							<div className="star_component_starcount">
								{accuracy}
							</div>
						</div>
						<div className="star_component_rating_count_wrapper">
						<StarComponent category="Check In" setter={setCheckIn}/> 
						<div className="star_component_starcount">
							{checkIn}
						</div>
						</div>
						<div className="star_component_rating_count_wrapper">
							<StarComponent category="Cleanliness" setter={setCleanliness}/>
							<div className="star_component_starcount"> 
								{cleanliness}
							</div>
						</div>
						<div className="star_component_rating_count_wrapper">
							<StarComponent category="Communication" setter={setCommunication}/>
							<div className="star_component_starcount"> 
							 	{communication}
							</div>
						</div>
						<div className="star_component_rating_count_wrapper">
							<StarComponent category="Location" setter={setLocation}/> 
							<div className="star_component_starcount"> 
								{location}
							</div>
						</div>
							<div className="star_component_rating_count_wrapper">
								<StarComponent category="Value" setter={setValue}/> 
								<div className="star_component_starcount"> 
									{value}
								</div>
						</div>
					</div>
						<div id="create_review_description_wrapper">
							<div id="create_review_comment">
								<div id="create_review_textarea_title">Tell Us About Your Magical Stay</div>
								<textarea onChange={(e) => setDescription(e.target.value)} id="create_review_comment_textarea"></textarea>
							</div>
							<div id="create_review_submit_button_container">
								<div id="create_review_submit_button_wrapper">
									<ContinueButton textContent={"Submit Review"} clickFunction={submitReview}/> 
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateReview;