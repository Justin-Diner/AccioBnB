import './IndividualReview.css';
import { deleteReview } from '../../../store/reviews';
import { receiveEditReviewModal, retrieveEditReviewModalState } from '../../../store/ui';
import { useDispatch } from 'react-redux';
import * as sessionAction from '../../../store/session';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateReview from '../CreateReview/CreateReview';
import { getListing } from '../../../store/listings';
import { retrieveUser } from '../../../store/users';

const IndividualReview = ({review, user}) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(sessionAction.sessionUser);
	const [allowDelete, setAllowDelete] = useState(false);
	const [allowEditButton, setAllowEditButton] = useState(false);
	const [promptReviewEdit, setPromptReviewEdit] = useState(false);
	const [author, setAuthor] = useState(false);

	const reviewListing = useSelector(getListing(review.listingId))
	const host = useSelector(retrieveUser(reviewListing.hostId))
	const editReviewUIState = useSelector(retrieveEditReviewModalState);

	const months = {
		"01": "January",
		"02": "February",
		"03": "March",
		"04": "April",
		"05": "May",
		"06": "June",
		"07": "July",
		"08": "August",
		"09": "Septemper",
		"10": "October",
		"11": "November",
		"12": "December"
	}

	useEffect(() => {
		if (authorCheck()) {
			setAllowDelete(true);
			setAllowEditButton(true);
		} else {
			setAllowDelete(false);
			setAllowEditButton(false);
		}
	}, []);


	useEffect(() => {
		if (!editReviewUIState) {
			setPromptReviewEdit(false);
		} 
	}, [editReviewUIState])

	useEffect(() => {
		if (authorCheck()) {
			setAllowDelete(true);
			setAllowEditButton(true);
		} else {
			setAllowDelete(false);
			setAllowEditButton(false);
		}
	}, [sessionUser, user])

	const authorCheck = () => {
		if (sessionUser && (sessionUser?.id === user?.id)) {
			return true; 
		} else {
			return false; 
		}
	}

	const monthName = (createdAt) => {
		let month = createdAt?.slice(5, 7)
		let year = createdAt?.slice(0, 4)
		return `${months[month]} ${year}`;
	} 

	const handleDelete = () => {
		setAllowDelete(false);
		setAllowEditButton(false);
		dispatch(deleteReview(review.id))
	}

	const handleEdit = () => {
		setPromptReviewEdit(true)
		dispatch(receiveEditReviewModal(true));
	}
	
	return (
		<div id="IR_container">
			<div id="IR_wrapper">
				<div id="IR_top_bar_wrapper">
					<div id="IR_reviewer_image">
						<img alt="user photo" src={user?.photoUrl}></img>
					</div>
					<div id="IR_top_bar_leftside">
						<div id="IR_name_and_date_wrapper">
							<div id="IR_review_name">{user?.firstName}</div>
							<div id="IR_review_month">{monthName(review?.createdAt)}</div>
						</div>
						<div id="IR_buttons_wrapper">
							{allowEditButton &&
								<div className="IR_button" id="IR_edit_wrapper" onClick={handleEdit}>
									<div id="IR_edit_button">Edit Post</div>
								</div>
							} 
							{allowDelete && 
							<div className="IR_button" id="IR_delete_wrapper" onClick={handleDelete}>
								<div id="IR_delete_button">Delete Post</div>
							</div>
							}
						</div>
					</div>
				</div>
				<div id="IR_bottom_bar_wrapper">
					<div id="IR_description">{review?.description}</div>
				</div>
			</div>
			{promptReviewEdit && <CreateReview listing={reviewListing} host={host} review={review}/>}
		</div>
	)
}

export default IndividualReview;