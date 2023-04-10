import './ListingReservationTool.css'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import ContinueButton from '../../Buttons/ContinueButton/ContinueButton';
import CheckInCheckOut from './ReservationPicker/CheckInCheckOut/CheckInCheckOut';
import ReservationPicker from './ReservationPicker/ReservationPicker';
import GuestPicker from './GuestPicker/GuestPicker';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

const ListingReservationTool = ({listing}) => {
	const [showReservationPicker, setShowReservationPicker] = useState(false);
	const [showGuestAmountPicker, setShowGuestAmountPicker] = useState(false);
	const [checkInDate, setCheckInDate] = useState("");
	const [checkOutDate, setCheckOutDate] = useState("");
	const [guestsChosen, setGuestsChosen] = useState(1);

	const checkInDateObj = new Date(`${checkInDate} GMT`)
	const checkOutDateObj = new Date(`${checkOutDate} GMT`)
	
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

	useEffect(() => {
		if (!showGuestAmountPicker) return;
		const closeGuestPicker = () => {
			setShowGuestAmountPicker(false);
		}
		document.addEventListener('click', closeGuestPicker)
		return () => document.removeEventListener("click", closeGuestPicker);
	}, [showGuestAmountPicker]) 

	const amountOfNights = () => {
		if (checkInDate && checkOutDate) {
		return (differenceInCalendarDays(checkInDateObj, checkOutDateObj) * -1).toString();
		} else {
			return "1";
		}
 }

	const updateShowReservationPicker = (status) => {
		setShowReservationPicker(status);
	} 

	const updateCheckInDate = (date) => {
		setCheckInDate(date);
	}

	const updateCheckOutDate = (date) => {
		setCheckOutDate(date);
	}

	const updateGuestsChosen = (amount) => {
		setGuestsChosen(amount);
	}

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

	const handleGuestPickerClick = () => {
		setShowGuestAmountPicker(true);
	}

	const handleInsideClick = (e) => {
		e.stopPropagation();
	}

	const totalNightlyCost = () => {
		let nightlyPrice = listing.nightlyPrice;
		return listing.nightlyPrice;
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

				<div id="rt_inputs_wrapper">
					<div id="rt_checkin_checkout_wrapper" onClick={handleCheckinCheckoutClick}>
						<CheckInCheckOut 
							checkInDate={checkInDate} 
							checkOutDate={checkOutDate}
						/>
					</div>	
					<div id="rt_reservation_picker_wrapper">
						{showReservationPicker && 
							<ReservationPicker 
								chooseCheckInDate={updateCheckInDate} 
								chooseCheckOutDate={updateCheckOutDate} 
								chooseShowReservationPicker={updateShowReservationPicker} 
							/>}
					</div>
					<div id="rt_numGuests_wrapper" onClick={handleGuestPickerClick}>
							<input id="rt_num_guests" value={`${guestsChosen} guests`} type="text" ></input>
					</div>
					<div id="rt_guestoption_picker_wrapper" >
						{showGuestAmountPicker && <GuestPicker maxGuests={listing.maxGuests} guestsChosenUpdater={updateGuestsChosen}/>}
					</div>
				</div>
			
				<ContinueButton textContent={"Reserve"}/>

				<div id="rt_notice_wrapper">
					<div id="rt_notice">You won't be charged yet</div>
				</div>

				<div id="rt_costs_wrapper">
					<div className="rt_cost_wrapper" id="rt_nightly_cost_wrapper">
						<div className="rt_cost_description" id="rt_nightly_cost">${listing?.nightlyPrice} x {amountOfNights()} nights</div>
						<div className="rt_cost_item" id="rt_total_nightly_cost">{totalNightlyCost()}</div>
					</div>
					<div className="rt_cost_wrapper" id="rt_cleaning_cost_wrapper">
						<div className="rt_cost_description" id="rt_cleaning_cost">Cleaning fee</div>
						<div className="rt_cost_item" id="rt_total_nightly_cost">$125</div>
					</div>
					<div className="rt_cost_wrapper" id="rt_accio_service_fee_wrapper">
						<div className="rt_cost_description" id="accio_service_fee_title">Acciobnb service fee</div>
						<div className="rt_cost_item" id="accio_service_fee">$282</div>
					</div>
				</div>

				<div id="rt_total_costs_wrapper">
					<div className="rt_total_cost_item" id="rt_total_costs_description">Total before taxes</div>
					<div className="rt_total_cost_item" id="rt_total_cost_amount">$2,282</div>
				</div>
			</form>
		</div>
	</div>
 )
}

export default ListingReservationTool;