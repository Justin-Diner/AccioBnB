import React from 'react';
import { useEffect } from "react";
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

const ListingShow = () => {
 const dispatch = useDispatch();
 const sessionUser = useSelector(sessionAction.sessionUser);
 const { listingId } = useParams(); 
 const listing = useSelector(getListing(listingId));
 const hostId = listing ? listing.hostId : null;
 const host = useSelector(state => state.users ? state.users[hostId] : null);
 const users = useSelector(retrieveUsers);
 const reviews = useSelector(getReviews)

 let rating = 4.95

 useEffect(() => {
	dispatch(fetchListing(listingId));
 }, [dispatch, listingId]);

 useEffect(() => {
	if (listing) {
		dispatch(fetchUser(listing.hostId))
	 }
 }, [dispatch, listing])

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
							<SearchBar id="search_bar_comp"/>
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
				<div id="lsp_initial_rating">&#9733; {rating}</div>
				<div id="lsp_rating_reviews_sep">.</div>
				<div id="lsp_initial_amount_of_reviews">{reviews.length} reviews</div>
					<span>.</span>
					<i className="fa-sharp fa-solid fa-medal"></i>
				<div id="lsp_id_superhost"> Superhost</div>
					<span>.</span>
				<div id="lsp_id_location">{`${listing.city}, ${listing.state}, ${listing.country}`}</div>
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
							<img id="lsp_host_profile_photo" src={host?.photosUrl} alt="host_profile_pic"></img>
						</div>
					</div>

					<div id="lsp_listing_description">{listing.description.split("\n").map((line, index) => 
						<React.Fragment key={index}>
							{line}<br></br>
							</React.Fragment>)}
					</div>

					<div id="lsp_reviews_wrapper">
						<div id="lsp_reservation_prompt_wrapper" onClick={handleCreateReview}>
							<div id="lsp_reservation_prompt"> Did you stay here? Wave your wand here to leave a review.</div>
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
					<ListingReservationTool listing={listing} type="reservation" />
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