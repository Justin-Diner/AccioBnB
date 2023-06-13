import './ROItem.css'
import { capitalizeFirstLetter } from '../../../utils/Utils'

const ROItem = ({ category, rating }) => {

	const determineRating = (rating) => {
		return `${Math.ceil((rating / 5))}%`;
	}

	return (
		<div id="ROItem_container">
			<div id="ROItem_category_Text">{category ? capitalizeFirstLetter(category) : category}</div>
			<div id="ROI_rating_bar_wrapper"> 
				<div id="ROItem_gray_rating_bar">
					<div id="ROItem_black_rating_bar"></div>
				</div>
				<div id="ROItem_category_rating">{rating}</div>
			</div>
		</div>
	)
}

export default ROItem