import './NoReservation.css'
import { Link } from 'react-router-dom';

const NoReservationItem = () => {
 return (
	<div id="NRI_container">
		<div id="NRI_wrapper">
			<div id="NRI_notrips">No trips booked...yet!</div>
			<div id="NRI_sentence">Time to dust off your bags and start planning your next adventure</div>
			<Link to="/">
				<div id="NRI_search_button">
					<div id="NRI_search_button_text">Start Searching</div>
				</div>
			</Link>
		</div>
	</div>
 )
}

export default NoReservationItem;