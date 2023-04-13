import './IndividualReview.css';
import { deleteReview } from '../../../store/reviews';
import { useDispatch } from 'react-redux';
import * as sessionAction from '../../../store/session';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const IndividualReview = ({review, user}) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(sessionAction.sessionUser);
	const [allowDelete, setAllowDelete] = useState(false)

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
		if (sessionUser?.id === user.id) {
			setAllowDelete(true);
		} else {
			setAllowDelete(false);
		}
	
	}, [sessionUser])


	const monthName = (createdAt) => {
		let month = createdAt?.slice(5, 7)
		let year = createdAt?.slice(0, 4)
		return `${months[month]} ${year}`;
	} 

	const handleDelete = () => {
		dispatch(deleteReview(review.id))
	}
	
	return (
		<div id="IR_container">
			<div id="IR_wrapper">
				<div id="IR_top_bar_wrapper">
					<div id="IR_reviewer_image">
						<img src={user?.photoUrl}></img>
					</div>
					<div id="IR_top_bar_leftside">
						<div id="IR_name_and_date_wrapper">
							<div id="IR_review_name">{user?.firstName}</div>
							<div id="IR_review_month">{monthName(review?.createdAt)}</div>
						</div>
						{allowDelete && 
						<div id="IR_delete_wrapper" onClick={handleDelete}>
							<div id="IR_delete_button" >Delete Post</div>
						</div>
						}
					</div>
				</div>
				<div id="IR_bottom_bar_wrapper">
					<div id="IR_description">{review?.description}</div>
				</div>
			</div>
		</div>
	)
}

export default IndividualReview;