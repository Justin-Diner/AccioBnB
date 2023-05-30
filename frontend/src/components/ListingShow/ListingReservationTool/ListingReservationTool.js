import './ListingReservationTool.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import ContinueButton from '../../Buttons/ContinueButton/ContinueButton';
import CheckInCheckOut from './ReservationPicker/CheckInCheckOut/CheckInCheckOut';
import ReservationPicker from './ReservationPicker/ReservationPicker';
import GuestPicker from './GuestPicker/GuestPicker';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { createReservation, updateReservation } from '../../../store/reservations';
import { receiveLogInModal } from '../../../store/ui';
import { getReviews } from "../../../store/reviews";
import { calculateRating } from '../../utils/Utils';

const ListingReservationTool = ({listing, type, reservation}) => {
	const dispatch = useDispatch();
	const [showReservationPicker, setShowReservationPicker] = useState(false);
	const [showGuestAmountPicker, setShowGuestAmountPicker] = useState(false);
	const [checkInDate, setCheckInDate] = useState("");
	const [checkOutDate, setCheckOutDate] = useState("");
	const [guestsChosen, setGuestsChosen] = useState(1);
	const user = useSelector(state => state.session.user ? state.session.user : null)
	const reviewAmount = useSelector(getReviews);

	const checkInDateObj = new Date(`${checkInDate} GMT`)
	const checkOutDateObj = new Date(`${checkOutDate} GMT`)
	
	const rating = 4.95;

	useEffect(() => {
		if (reservation) {
			setCheckInDate(reservationDateFormat(reservation.checkIn));
			setCheckOutDate(reservationDateFormat(reservation.checkOut));
			setGuestsChosen(reservation.numGuests);
		}
	}, [])

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

	const reservationDateFormat = (dateText) => {
		const splitYear = dateText.slice(0, 4);
		const splitMonth = dateText.slice(5, 7);
		const splitDay = dateText.slice(8, 10);
		return `${splitMonth}/${splitDay}/${splitYear}`;
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

	const continueButtonText = () => {
		if (type === "reservation") {
			return "Reserve"
		} else if (type === "edit") {
			return "Edit Reservation"
		}
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

	const amountOfNights = () => {
		if (checkInDate && checkOutDate) {
		return (differenceInCalendarDays(checkInDateObj, checkOutDateObj) * -1).toString();
		} else {
			return "1";
		}
 }

	const totalNightlyCost = () => {
		let nightlyPrice = listing.nightlyPrice;
		let totalDays;
		if (checkInDate && checkOutDate) {
			totalDays = amountOfNights();
			return nightlyPrice * totalDays;
		} 
		return nightlyPrice;
	}

	const accioFee = () => {
		return Math.floor(.12 * (totalNightlyCost() + listing.cleaningFee));
	}

	const totalReservationCost = () => {
		return totalNightlyCost() + listing.cleaningFee + accioFee();
	}

	const formatDates = (date) => {
		const dateYr = date.slice(6);
		const dateMonth = date.slice(0, 2)
		const dateDay = date.slice(3, 5)
		return `${dateYr}-${dateMonth}-${dateDay}`
	}

	const makeReservation = () => {
		if (user && !reservation) {
			const newReservation = {
				user_id: user.id, 
				listing_id: listing.id,
				check_in: formatDates(checkInDate),
				check_out: formatDates(checkOutDate), 
				num_guests: guestsChosen,
				total_price: totalReservationCost() 
			}
				dispatch(createReservation(newReservation));
		} else if (user && reservation) {
				const updatedReservation = {
					id: reservation.id,
					user_id: user.id,
					listing_id: listing.id, 
					check_in: formatDates(checkInDate),
					check_out: formatDates(checkOutDate),
					num_guests: guestsChosen, 
					total_price: totalReservationCost()
				}
				dispatch(updateReservation(updatedReservation))
		} else {
				dispatch(receiveLogInModal(true));
			}
	}

 return(
	<div id="rt_container" onClick={handleInsideClick} >
		<div id="rt_wrapper">
			<form id="rt_reservation_form">
				<div id="rt_top_bar">
					<div id="rt_top_bar_leftside">
						<div id="rt_top_bar_price_and_text">
							${listing.nightlyPrice.toLocaleString()}
						</div>
						<div id="rt_top_bar_night">
							night
						</div>
					</div>
					<div id="rt_top_bar_rightside">
						<div id="rt_rating">
							&#9733; {calculateRating(listing.overallRating)}
						</div>
						<div id="lsp_rating_reviews_sep">.</div>
						<div id="rt_reviews">
							{reviewAmount.length ? reviewAmount.length : 0} reviews
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
							<input readOnly={true} id="rt_num_guests" value={`${guestsChosen} guests`} type="text" ></input>
					</div>
					<div id="rt_guestoption_picker_wrapper" >
						{showGuestAmountPicker && <GuestPicker maxGuests={listing.maxGuests} guestsChosenUpdater={updateGuestsChosen}/>}
					</div>
				</div>
			
				<ContinueButton textContent={continueButtonText()} clickFunction={makeReservation}/>

				<div id="rt_notice_wrapper">
					<div id="rt_notice">You may need a Portkey for this location</div>
				</div>

				<div id="rt_costs_wrapper">
					<div className="rt_cost_wrapper" id="rt_nightly_cost_wrapper">
						<div className="rt_cost_description" id="rt_nightly_cost">${(listing?.nightlyPrice).toLocaleString()} x {amountOfNights()} nights</div>
						<div className="rt_cost_item" id="rt_total_nightly_cost">${totalNightlyCost().toLocaleString()}</div>
					</div>
					<div className="rt_cost_wrapper" id="rt_cleaning_cost_wrapper">
						<div className="rt_cost_description" id="rt_cleaning_cost">Cleaning fee</div>
						<div className="rt_cost_item" id="rt_total_nightly_cost">${listing.cleaningFee.toLocaleString()}</div>
					</div>
					<div className="rt_cost_wrapper" id="rt_accio_service_fee_wrapper">
						<div className="rt_cost_description" id="accio_service_fee_title">Acciobnb service fee</div>
						<div className="rt_cost_item" id="accio_service_fee">${accioFee().toLocaleString()}</div>
					</div>
				</div>

				<div id="rt_total_costs_wrapper">
					<div className="rt_total_cost_item" id="rt_total_costs_description">Total before taxes</div>
					<div className="rt_total_cost_item" id="rt_total_cost_amount">${totalReservationCost().toLocaleString()}</div>
				</div>
			</form>
		</div>
	</div>
 )
}

export default ListingReservationTool;