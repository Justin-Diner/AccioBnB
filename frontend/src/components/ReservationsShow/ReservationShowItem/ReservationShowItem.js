import './ReservationShowItem.css';
import { Link } from 'react-router-dom';
import ListingReservationTool from '../../ListingShow/ListingReservationTool/ListingReservationTool';
import { useState, useEffect } from 'react';
import { deleteReservation } from '../../../store/reservations';
import { useDispatch } from 'react-redux';

const ReservationShowItem = ({listing, reservation, host}) => {
	const dispatch = useDispatch();
	const [showReservationTool, setShowReservationTool] = useState(false);
	

	useEffect(() => {
		if (!showReservationTool) return; 
		const closeReservationTool = () => {
			setShowReservationTool(false);
		}
		document.addEventListener('click', closeReservationTool)
		return () => document.removeEventListener("click", closeReservationTool);
	}, [showReservationTool])

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

	const cancelReservation = () => {
		dispatch(deleteReservation(reservation.id));
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
					<div id="RSI_delete_and_edit_wrapper">
						<div className="RSI_button" id="RSI_edit_button" onClick={() => setShowReservationTool(true)}>Edit</div>
						<div className="RSI_button" id="RSI_delete_button" onClick={cancelReservation}>Cancel</div>
					</div>
					<Link className="RSI_link_back_to_listing" to={`/listings/${listing.id}`}>
						<img id="RSI_image" src={image} />
					</Link>
				</div>
			</div>
			{showReservationTool && 
				<div id="RSI_edit_tool_wrapper">
					<ListingReservationTool listing={listing} type="edit" reservation={reservation}/>
				</div>
			}
		</div>

	)
}

export default ReservationShowItem;