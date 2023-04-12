import './ReservationShowItem.css'
import { Link } from 'react-router-dom'

const ReservationShowItem = ({listing, reservation, host}) => {
	const months = {
		"01": "Jan",
		"02": "Feb",
		"03": "March",
		"04": "April",
		"05": "May",
		"06": "June",
		"07": "July",
		"08": "Aug",
		"09": "Sept",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	}

	const getMonth = (checkInDate) => {
		const monthAbr = checkInDate.slice(5, 7);
		return months[monthAbr];
	}

	const city = listing.city;
	const propertyType = listing.propertyType;
	const hostName = host.firstName;
	const monthAbrreviated = getMonth(reservation.checkIn);
	const year = reservation.checkIn.slice(0, 4);
	const state = listing.state; 
	const country = listing.country;
	let image;

	if (listing.photosUrl) {
		image = listing.photosUrl[0];
	}
	


	return (
		<Link to={`/listings/${listing.id}`}>
		<div id="RSI_container">
			<div id="RSI_wrapper">
				<div id="RSI_left_wrapper">
					<div id="RSI_topleft_wrapper">
						<div id="RSI_title">{city}</div>
						<div id="RSI_home_description">{propertyType} hosted by {hostName}</div>
					</div>
					<div id="RSI_bottom_wrapper">
						<div id="RSI_bottomleft_leftside_wrapper">
							<div id="RSI_date_container">
									<div id="RSI_date_month">{monthAbrreviated}</div>
									<div id="RSI_date_days"></div>
									<div id="RSI_date_year">{year}</div>
							</div>
						</div>
							<div id="RSI_bottomleft_rightside_wrapper">
								<div id="RSI_city">{city}, {state}</div>
								<div id="RSI_country">{country}</div>
							</div>
					</div>
				</div>
				<div id="RSI_right_side_wrapper">
					<img id="RSI_image" src={image} />
				</div>
			</div>
		</div>
		</Link>
	)
}

export default ReservationShowItem;