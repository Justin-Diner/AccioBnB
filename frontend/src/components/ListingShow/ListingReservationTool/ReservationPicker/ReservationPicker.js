import './ReservationPicker.css'
import DatePicker from './DatePicker/DatePicker';
import CheckInCheckOut from './CheckInCheckOut/CheckInCheckOut';
import { useState, useEffect } from 'react';

const ReservationPicker = ({chooseCheckInDate, chooseCheckOutDate, chooseShowReservationPicker}) => {
	const [checkInDateText, setCheckInDateText] = useState("") 
	const [checkOutDateText, setCheckOutDateText] = useState("") 

	useEffect(() => {
		if (checkInDateText) {
			updateCheckInDateText(checkInDateText);
			chooseCheckInDate(checkInDateText);
		}

		if (checkOutDateText) {
			updateCheckOutDateText(checkOutDateText);
			chooseCheckOutDate(checkOutDateText);
		}
	}, [checkInDateText, checkOutDateText])

	const updateCheckInDateText = (date) => {
		setCheckInDateText(date);
	}

	const updateCheckOutDateText = (date) => {
		setCheckOutDateText(date);
	}

	const closeReservationPicker = () => {
		chooseShowReservationPicker(false);
	}

	return (
		<div id="dp_container">
			<div id="dp_top_options">
				<div id="dp_top_selectdates">
					Select Dates
				</div>
				<div id="dp_top_checkin_checkout">
					<CheckInCheckOut checkInDate={checkInDateText} checkOutDate={checkOutDateText}/>
				</div>
			</div>
			<div id="dp_top_datepicker_wrapper">
				<DatePicker chooseCheckInDate={updateCheckInDateText} chooseCheckOutDate={updateCheckOutDateText} />
			</div>
			<div id="dp_bottom_row_wrapper">
				<div id="dp_close_button" onClick={closeReservationPicker}>Close</div>
			</div>
			<div id="dp_margin_bottom"> </div>
		</div>
	)
}

export default ReservationPicker;

