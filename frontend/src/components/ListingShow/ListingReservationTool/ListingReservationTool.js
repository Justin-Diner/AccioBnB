import './ListingReservationTool.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react';

const ListingReservationTool = ({listing}) => {
	const dispatch = useDispatch();

	const checkInDate = useState("04/05/2023")

	const getTodaysDate = () => {
		let todaysDate = new Date;
		let day = todaysDate.getDate(); 
		let month = todaysDate.getMonth() + 1;
		let year = todaysDate.getFullYear();

		return `${day}/${month}/${year}` 
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
							<input className="form_input" id="login_email" placeholder="Email" type="text" />
						</label>

						<label>
							<input className="form_input" id="login_password" placeholder="Password" type="text" />
						</label>
				</div>


			</form>

		</div>
	</div>
 )
}

export default ListingReservationTool;