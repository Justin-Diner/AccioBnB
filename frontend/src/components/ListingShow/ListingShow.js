import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListing, fetchListing } from "../../store/listings";
import { fetchUser } from '../../store/users';
import { useParams } from "react-router-dom";
import './ListingShow.css'
import './ListingShowPicDisplay/ListingShowPicDisplay';
import ListingShowPicDisplay from "./ListingShowPicDisplay/ListingShowPicDisplay";
import LogoDisplay from "../Navigation/LogoDisplay/LogoDisplay";
import SearchBar from "../Navigation/SearchBar/SearchBar";
import SettingsOptions from "../Navigation/SettingsOptions/SettingsOptions";
import * as sessionAction from '../../store/session';
import ListingReservationTool from "./ListingReservationTool/ListingReservationTool";
import ReservationSuccessful from './ReservationSuccessful/ReservationSuccessful'
import Reviews from "../Reviews/Reviews";
import CreateReview from "../Reviews/CreateReview/CreateReview";
import { receiveCreateReviewModal, receiveLogInModal } from "../../store/ui";
import { retrieveUsers } from '../../store/users';
import Socials from "../Navigation/socials/Socials";
import { getReviews } from "../../store/reviews";
import GMapLS from './GMapLS/GMapLS';
import ThreeFacts from './ThreeFacts/ThreeFacts';
import { calculateRating } from '../utils/Utils';
import ListingShowDatePicker from './ListingShowDatePicker/ListingShowDatePicker';

const ListingShow = () => {
 const dispatch = useDispatch();
 const sessionUser = useSelector(sessionAction.sessionUser);
 const { listingId } = useParams(); 
 const listing = useSelector(getListing(listingId));
 const hostId = listing ? listing.hostId : null;
 const host = useSelector(state => state.users ? state.users[hostId] : null);
 const users = useSelector(retrieveUsers);
 const reviews = useSelector(getReviews);
 const [checkInDate, setCheckInDate] = useState("");
 const [checkOutDate, setCheckOutDate] = useState("");

 useEffect(() => {
	dispatch(fetchListing(listingId));
 }, [dispatch, listingId]);

 useEffect(() => {
	if (listing) {
		dispatch(fetchUser(listing.hostId))
	 }
 }, [dispatch, listing]);

 useEffect(() => {
	console.log(checkInDate)
 }, [checkInDate])

 useEffect(() => {
	console.log(checkOutDate)
 }, [checkOutDate])

 if (!listing) {
	return null;
 }

 const handleCreateReview = () => {
	if (!sessionUser) {
		dispatch(receiveLogInModal(true));
	} else {
		dispatch(receiveCreateReviewModal(true));
	}
 }


 
 return (
	<>
		<div id="lsp_container">
			<div id="LSP_nav_container">
				<div id="LSP_top_nav_bar">
						<a href="/"><div className="LSP_nav_component" id="LSP_logo_wrapper">
							<LogoDisplay id="nav_logo" />
						</div></a>
						<div className="nav_component" id="LSP_search_wrapper"> 
							<SearchBar id="search_bar_comp" index={false}/>
						</div>
						<div className="nav_component" id="LSP_socials_wrapper">
							<Socials />
						</div>
						<div className="nav_component" id="LSP_settings_options_wrapper">		
							<SettingsOptions user={sessionUser}/>
						</div>
				</div>
			</div>
			<div id="lsp_nav_bar_filler"></div>
			<div id="lsp_title">{listing.title}</div>
					
			<div id="lsp_initial_details">
				<div id="lsp_initial_rating">&#9733; {calculateRating(listing.overallRating)}</div>
				<div id="lsp_rating_reviews_sep">.</div>
				<a id="lsp_amount_of_reviews_link" href="#lsp_reservation_prompt_wrapper">
				<div id="lsp_initial_amount_of_reviews">{reviews.length} reviews</div>
				</a>
					<span>.</span>
					<i className="fa-sharp fa-solid fa-medal"></i>
				<div id="lsp_id_superhost"> Superhost</div>
					<span>.</span>
				<a id="lsp_id_location_link" href="#GMapLS_container">
				<div id="lsp_id_location">{`${listing.city}, ${listing.state}, ${listing.country}`}</div>
				</a>
			</div>
	
			<div id="LSPD_container">
				<ListingShowPicDisplay listing={listing}/>
			</div> 

			<div id="lsp_property_details_container">
				<div id="lsp_property_details_wrapper"> 
					<div id="lsp_property_details_text_container">
						<div id="lsp_property_details_text_and_beds_container">
							<div id="lsp_property_type_and_hostname">
								{listing.propertyType} Hosted By {host?.firstName} {host?.lastName}
							</div>
							<div id="lsp_property_bedbath_details">
								<div>{listing.maxGuests} guests </div>
								<div id="lsp_rating_reviews_sep">.</div>
								<div>{listing.numBedrooms} bedrooms</div>
								<div id="lsp_rating_reviews_sep">.</div>
								<div>{listing.numBeds} beds </div>
								<div id="lsp_rating_reviews_sep">.</div>
								<div>{listing.numBathrooms} bathrooms</div>
							</div>
						</div>
						<div id="lsp_host_profile_container">
							<img id="lsp_host_profile_photo" src={host?.photoUrl} alt="host_profile_pic"></img>
						</div>
					</div>

					<div id="lsp_tf_container"> 
						<ThreeFacts host={host?.firstName} />
					</div>

					<div id="lsp_listing_description">{listing.description.split("\n").map((line, index) => 
						<React.Fragment key={index}>
							{line}<br></br>
							</React.Fragment>)}
					</div>

					<section>
						<ListingShowDatePicker LSSetCheckInDate={setCheckInDate} LSSetCheckOutDate={setCheckOutDate}/>
					</section>

					<div id="lsp_reviews_wrapper">
						<div id="lsp_reservation_prompt_wrapper" onClick={handleCreateReview}>
							<div id="lsp_reservation_prompt">Write a review</div>
						</div>
						<Reviews users={users}/> 
						<div id="lsp_create_new_review_wrapper">
							<CreateReview listing={listing} host={host}/>
						</div>
					</div>

					</div>
					<div id="lsp_res_successful_wrapper">
						<ReservationSuccessful />
					</div>
				<div id="ListingReservationTool_wrapper"> 
					<ListingReservationTool listing={listing} type="reservation" LSCheckInDate={checkInDate} LSCheckOutDate={checkOutDate}/>
				</div>
			</div>

			<div id="lsp_gmap_wrapper">
				<GMapLS listing={listing}/>
			</div>

		</div>
	</>
 )
}

export default ListingShow;