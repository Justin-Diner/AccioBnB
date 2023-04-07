import './ListingReservationTool.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import ContinueButton from '../../Buttons/ContinueButton/ContinueButton';

const ListingReservationTool = ({listing}) => {
	const dispatch = useDispatch();

	const [checkInDate, setCheckInDate] = useState("04/05/2023")
	const rating = 4.90;
	const reviews = 207;

	const getTodaysDate = () => {
		let todaysDate = new Date;
		let day = todaysDate.getDate(); 
		let month = todaysDate.getMonth() + 1;
		let year = todaysDate.getFullYear();

		return `${month}/${day}/${year}` 
	}

 return(
	<div id="rt_container">
		<div id="rt_wrapper">
			<form id="rt_reservation form">
				<div id="rt_top_bar">
					<div id="rt_top_bar_price_and_text">
						{listing.nightlyPrice}
					</div>
					<div id="rt_top_bar_night">
						night
					</div>
				</div>

				<div id="inputs_wrapper">
						<label> 
							<input className="form_input" id="rt_checkin" placeholder="CHECK-IN" type="text" />
						</label>

						<label> 
							<input className="form_input" id="rt_checkout" placeholder="CHECKOUT" type="text" />
						</label>

						<label>
							<input className="form_input" id="rt_num_guests" placeholder="1 guest" type="text" />
						</label>
				</div>

				<ContinueButton />

			</form>

		</div>
	</div>
 )
}

export default ListingReservationTool;