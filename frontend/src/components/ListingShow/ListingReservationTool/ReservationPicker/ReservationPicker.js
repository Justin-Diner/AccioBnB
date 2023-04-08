import './ReservationPicker.css'
import DatePicker from './DatePicker/DatePicker';
import CheckInCheckOut from './CheckInCheckOut/CheckInCheckOut';

const ReservationPicker = () => {
	return (
		<div id="dp_container">
			<div id="dp_top_options">
				<div id="dp_top_selectdates">
					Select Dates
				</div>
				<div id="dp_top_checkin_checkout">
					<CheckInCheckOut />
				</div>
			</div>
			<div id="dp_top_datepicker_wrapper">
				<DatePicker />
			</div>
			<div id="dp_margin_bottom"> </div>
		</div>
	)
}

export default ReservationPicker;

