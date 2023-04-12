import './IndividualReview.css';
import { deleteReview } from '../../../store/reviews';
import { useDispatch } from 'react-redux';

const IndividualReview = ({review, user}) => {
	const dispatch = useDispatch();

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

	const monthName = (createdAt) => {
		console.log(createdAt)
		let month = createdAt.slice(5, 7)
		let year = createdAt.slice(0, 4)
		return `${months[month]} ${year}`;
	} 

	const handleDelete = () => {
		dispatch(deleteReview(review.id))
	}
	
	return (
		<div id="IR_container">
			<div id="IR_wrapper">
				<div id="IR_top_bar_wrapper">
					<div id="IR_reviewer_image"></div>
					<div id="IR_top_bar_leftside">
						<div id="IR_name_and_date_wrapper">
							<div id="IR_review_name">{user.firstName}</div>
							<div id="IR_review_month">{monthName(review.createdAt)}</div>
						</div>
						<div id="IR_delete_wrapper">
							<div id="IR_delete_button" onClick={handleDelete}>Delete Post</div>
						</div>
					</div>
				</div>
				<div id="IR_bottom_bar_wrapper">
					<div id="IR_description">{review.description}</div>
				</div>
			</div>
		</div>
	)
}

export default IndividualReview;