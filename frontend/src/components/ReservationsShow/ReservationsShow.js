import './ReservationsShow.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReservations, fetchUserReservations } from '../../store/reservations';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoDisplay from "../Navigation/LogoDisplay/LogoDisplay";
import SearchBar from "../Navigation/SearchBar/SearchBar";
import SettingsOptions from "../Navigation/SettingsOptions/SettingsOptions";
import * as sessionAction from '../../store/session';
import NoReservationItem from './NoReservationItem/NoReservation';
import ReservationShowItem from './ReservationShowItem/ReservationShowItem';
import { fetchListing } from '../../store/listings';
import { getListings } from '../../store/listings';
import { retrieveUsers } from '../../store/users';
import Socials from '../Navigation/socials/Socials';

const ReservationsShow = () => {
	const dispatch = useDispatch();
	const {userId} = useParams(); 
	const reservations = useSelector(getReservations);
	const sessionUser = useSelector(sessionAction.sessionUser);
	const listings = useSelector(getListings);
	const hosts = useSelector(retrieveUsers);
	let content = [];

	useEffect(() => {
		dispatch(fetchUserReservations(userId));
	}, []);

	if (hosts.length && listings.length) {
		let holder = [];

		reservations.forEach((res) => {
			let reservation = res;
			let listing = listings.find((listing) => listing.id === res.listingId);
			let host = hosts.find((user) => user.id === listing.hostId);
			
			holder.push(<ReservationShowItem 
				reservation={reservation} 
				listing={listing} 
				host={host}/>)
		})
		content = holder; 
	} 

	if (!sessionUser) {
		content = [];
	}


	if (!content.length) {
		content = <NoReservationItem />
	}

	return (
		<div id="rsp_container">
			<div id="RSP_nav_container">
				<div id="RSP_top_nav_bar">
						<a href="/"><div className="RSP_nav_component" id="RSP_logo_wrapper">
							<LogoDisplay id="nav_logo" />
						</div></a>
						<div className="nav_component" id="RSP_search_wrapper"> 
							<SearchBar id="search_bar_comp"/>
						</div>
						<div className="nav_component" id="RSP_socials_wrapper">
							<Socials />
						</div>
						<div className="nav_component" id="RSP_settings_options_wrapper">		
							<SettingsOptions user={sessionUser}/>
						</div>
				</div>
			</div>
			<div id="rsp_nav_bar_filler"></div>
			<div id="rsp_title_wrapper">
				<div id="rsp_title">Trips</div>
			</div>
			{content}
		</div>
	)
}

export default ReservationsShow;