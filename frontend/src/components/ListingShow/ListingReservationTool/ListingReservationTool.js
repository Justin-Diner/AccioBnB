import './ListingReservationTool.css'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import ContinueButton from '../../Buttons/ContinueButton/ContinueButton';
import CheckInCheckOut from './ReservationPicker/CheckInCheckOut/CheckInCheckOut';
import ReservationPicker from './ReservationPicker/ReservationPicker';

const ListingReservationTool = ({listing}) => {
	const dispatch = useDispatch();
	const [showReservationPicker, setShowReservationPicker] = useState(false);

	const [checkInDate, setCheckInDate] = useState("04/05/2023")
	const rating = 4.95;
	const numReviews = 207;

	useEffect(() => {
		if (!showReservationPicker) return;

		const closeReservationPicker = () => {
			setShowReservationPicker(false);
		}

		document.addEventListener('click', closeReservationPicker)

		return () => document.removeEventListener("click", closeReservationPicker)

	}, [showReservationPicker])

	const getTodaysDate = () => {
		let todaysDate = new Date;
		let day = todaysDate.getDate(); 
		let month = todaysDate.getMonth() + 1;
		let year = todaysDate.getFullYear();

		return `${month}/${day}/${year}` 
	}

	const handleCheckinCheckoutClick = () => {
		setShowReservationPicker(true);
	}

	const handleInsideClick = (e) => {
		e.stopPropagation();
	}


 return(
	<div id="rt_container" onClick={handleInsideClick} >
		<div id="rt_wrapper">
			<form id="rt_reservation form">
				<div id="rt_top_bar">
					<div id="rt_top_bar_leftside">
						<div id="rt_top_bar_price_and_text">
							${listing.nightlyPrice}
						</div>
						<div id="rt_top_bar_night">
							night
						</div>
					</div>
					<div id="rt_top_bar_rightside">
						<div id="rt_rating">
							&#9733; {rating}
						</div>
						<div id="lsp_rating_reviews_sep">.</div>
						<div id="rt_reviews">
							{numReviews} reviews
						</div>
					</div>
				</div>

				<div id="inputs_wrapper">
					<div id="rt_checkin_checkout_wrapper" onClick={handleCheckinCheckoutClick}>
						<CheckInCheckOut />
					</div>
					<div id="rt_reservation_picker_wrapper">
						{showReservationPicker && <ReservationPicker/>}
					</div>

						<label>
							<input className="form_input" id="rt_num_guests" placeholder="1 guest" type="text" />
						</label>
				</div>

				<ContinueButton textContent={"Reserve"}/>

				<div id="rt_notice_wrapper">
					<div id="rt_notice">You won't be charged yet</div>
				</div>

				<div id="rt_costs_wrapper">
					<div class="rt_cost_wrapper" id="rt_nightly_cost_wrapper">
						<div class="rt_cost_description" id="rt_nightly_cost">$375 x 5 nights</div>
						<div class="rt_cost_item" id="rt_total_nightly_cost">$1875</div>
					</div>
					<div class="rt_cost_wrapper" id="rt_cleaning_cost_wrapper">
						<div class="rt_cost_description" id="rt_cleaning_cost">Cleaning fee</div>
						<div class="rt_cost_item" id="rt_total_nightly_cost">$125</div>
					</div>
					<div class="rt_cost_wrapper" id="rt_accio_service_fee_wrapper">
						<div class="rt_cost_description" id="accio_service_fee_title">Acciobnb service fee</div>
						<div class="rt_cost_item" id="accio_service_fee">$282</div>
					</div>
				</div>

				<div id="rt_total_costs_wrapper">
					<div class="rt_total_cost_item" id="rt_total_costs_description">Total before taxes</div>
					<div class="rt_total_cost_item" id="rt_total_cost_amount">$2,282</div>
				</div>
			</form>
		</div>
	</div>
 )
}

export default ListingReservationTool;