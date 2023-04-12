import './IndividualReview.css';

const IndividualReview = ({review, user}) => {
	return (
		<div id="IR_container">
			<div id="IR_wrapper">
				<div id="IR_top_bar_wrapper">
					<div id="IR_reviewer_image"></div>
					<div id="IR_top_bar_leftside">
						<div id="IR_review_name">Testing</div>
					</div>
				</div>
				<div id="IR_bottom_bar_wrapper">
					<div id="IR_description"></div>
				</div>
			</div>
		</div>
	)
}

export default IndividualReview;