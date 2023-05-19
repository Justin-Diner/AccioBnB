import './CreateReview.css'
import StarComponent from './StarComponent/StarComponent';
import { useState } from 'react';
import ContinueButton from '../../Buttons/ContinueButton/ContinueButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { retrieveCreateReviewModalState, retrieveEditReviewModalState } from '../../../store/ui';
import { receiveCreateReviewModal, receiveEditReviewModal } from '../../../store/ui';
import * as sessionAction from '../../../store/session';
import { createReview, updateReview } from '../../../store/reviews';
import { fetchUser } from '../../../store/users';

const CreateReview = ({listing, host, review}) => {
	const dispatch = useDispatch();
	let reviewType;
	const [showing, setShowing] = useState(false);
	const [accuracy, setAccuracy] = useState(5);
	const [checkIn, setCheckIn] = useState(5);
	const [cleanliness, setCleanliness] = useState(5);
	const [communication, setCommunication] = useState(5);
	const [location, setLocation] = useState(5);
	const [value, setValue] = useState(5);
	const [description, setDescription] = useState("");
	const createReviewState = useSelector(retrieveCreateReviewModalState);
	const editReviewState = useSelector(retrieveEditReviewModalState);
	const sessionUser = useSelector(sessionAction.sessionUser);

	useEffect(() => {
		if (review) {
			setShowing(true);
			setAccuracy(review.accuracy);
			setCheckIn(review.checkIn);
			setCleanliness(review.cleanliness);
			setCommunication(review.communication);
			setLocation(review.location);
			setValue(review.value);
			setDescription(review.description);
			dispatch(receiveEditReviewModal(true));
		} 
	}, [])

	useEffect(() => {
		if (createReviewState) {
			setShowing(true)
			dispatch(receiveCreateReviewModal(true));
		} 
	}, [createReviewState])

	useEffect(() => {
		if (showing) {
			window.addEventListener("click", closeWindow)
		}
	}, [showing])

 
	if (!showing) {
		return 
	}

	const closeWindow = () => {
		window.removeEventListener("click", closeWindow);
		setShowing(false);
		if (review) {
			dispatch(receiveEditReviewModal(false));
		} else {
			dispatch(receiveCreateReviewModal(false));
		}
	}

	const handleOutsideClick = () => {
		closeWindow();
	}

	const handleClick = (e) => {
		e.stopPropagation();
	}

	const submitReview = (e) => {
		e.preventDefault();
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

		if (reviewType === "Submit") {
			dispatch(createReview(newReview));
			if (createReviewState) {
				dispatch(fetchUser(sessionUser.id));
				dispatch(receiveCreateReviewModal(false));
			}
		} else if (reviewType === "Edit") {
			newReview.id = review.id
			dispatch(updateReview(newReview));
			dispatch(receiveEditReviewModal(false));
		}
		setShowing(false);
	}

	const setReviewType = () => {
		if (review) {
			reviewType = "Edit"
		} else {
			reviewType = "Submit"
		}
		return `${reviewType} Review`;
	}

	return (
		<div id="create_review_modal" onClick={() => handleOutsideClick()}>
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
									<textarea value={description} onChange={(e) => setDescription(e.target.value)} id="create_review_comment_textarea"></textarea>
							</div>
							<div id="create_review_submit_button_container">
								<div id="create_review_submit_button_wrapper">
									<ContinueButton textContent={setReviewType()} clickFunction={(e) => submitReview(e)}/> 
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