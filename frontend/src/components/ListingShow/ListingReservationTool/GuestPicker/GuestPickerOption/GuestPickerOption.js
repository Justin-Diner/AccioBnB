import { useState, useEffect } from "react";
import './GuestPickerOption.css';

const GuestPickerOption = ({title, category, guestsChosen, setterOfGuestsChosen, maxGuests}) => {
	const [itemCount, setItemCount] = useState(0); 

	useEffect(() => {
		if (title === "Adults") {
			setItemCount(1)
		} else {
			setItemCount(0);
		}
	}, [])

	const increaseCount = () => {
		if ((guestsChosen < maxGuests) && (itemCount >= 0)) {
			let newItemCount = itemCount + 1
				setItemCount(newItemCount)
				setterOfGuestsChosen(guestsChosen + 1);
		}
	}

	const decreaseCount = () => {
		if (itemCount > 1 && title === "Adults") {
			let newItemCount = itemCount - 1;
			setItemCount(newItemCount);
			setterOfGuestsChosen(guestsChosen - 1);
		} else if (title != "Adults" && itemCount > 0) {
			let newItemCount = itemCount - 1
			setItemCount(newItemCount)
			setterOfGuestsChosen(guestsChosen - 1);
		}
	}
	
	return (
		<div id="gpo_container">
			<div id="gpo_wrapper">
				<div id="gpo_left_wrapper">
					<div id="gpo_title">
						{title}
					</div>
					<div>
						{category}
					</div>
				</div>
				<div id="gpo_counter_wrapper">
					<div 
						className="gpo_counter_button" 
						id="gpo_minus_button_wrapper" 
						onClick={decreaseCount}>
							<i className="fa-solid fa-minus"></i>
					</div>
					<div id="gpo_item_count_wrapper">
						<div id="gpo_item_count">{itemCount}</div>
					</div>
					<div 
						className="gpo_counter_button" 
						id="gpo_plus_button_wrapper" 
						onClick={increaseCount}>
							<i className="fa-solid fa-plus"></i>
					</div>
				</div>
			</div>
		</div>
	)
}

export default GuestPickerOption;