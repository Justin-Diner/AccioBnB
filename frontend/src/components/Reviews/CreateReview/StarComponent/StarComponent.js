import './StarComponent.css'
import { useState } from 'react';

const StarComponent = ({category}) => {
	const [rating, setRating] = useState(5);
	const [hover, setHover] = useState(5);

	return (
		<>
		<div className="SC_title">{category}</div>
		<div className="star-rating">
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type="button"
						key={index}
						className={index <= (hover || rating) ? "on" : "off"}
						onClick={() => setRating(index)}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(hover)}
						>
						<span className="star">&#9733;</span>
					</button>
				);
			})}
		</div>
		</>
	)
}

export default StarComponent;