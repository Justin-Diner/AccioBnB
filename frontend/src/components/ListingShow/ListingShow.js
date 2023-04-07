import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListing, fetchListing } from "../../store/listings";
import { useParams } from "react-router-dom";
import './ListingShow.css'
import './ListingShowPicDisplay/ListingShowPicDisplay';
import ListingShowPicDisplay from "./ListingShowPicDisplay/ListingShowPicDisplay";
import LogoDisplay from "../Navigation/LogoDisplay/LogoDisplay";
import SearchBar from "../Navigation/SearchBar/SearchBar";
import SettingsOptions from "../Navigation/SettingsOptions/SettingsOptions";
import * as sessionAction from '../../store/session';

const ListingShow = () => {
 const dispatch = useDispatch();
 const sessionUser = useSelector(sessionAction.sessionUser);
 const { listingId } = useParams(); 
 const listing = useSelector(getListing(listingId));
 console.log(listing);

 let reviews = 47;
 let rating = 4.95
 let numReviews = 400

 useEffect(() => {
	dispatch(fetchListing(listingId));
 }, [dispatch, listingId]);

 if (!listing) {
	return null;
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
				<div id="lsp_initial_amount_of_reviews">{numReviews} reviews</div>
					<span>.</span>
					<i className="fa-sharp fa-solid fa-medal"></i>
				<div id="lsp_id_superhost"> Superhost</div>
					<span>.</span>
				<div id="lsp_id_location">{`${listing.city}, ${listing.state}, ${listing.country}`}</div>
			</div>
	
			<div id="LSPD_container">
				<ListingShowPicDisplay />
			</div> 
		</div>
	</>
 )
}

export default ListingShow;