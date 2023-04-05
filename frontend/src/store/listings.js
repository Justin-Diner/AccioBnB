import csrfFetch from "./csrf";

// Action Types 
const RECEIVE_LISTINGS = 'listings/RECEIVE_LISTING';
const RECEIVE_LISTING = 'listings/RECEIVE_LISTING';
const REMOVE_LISTING = 'listings/REMOVE_LISTING';

// Action Creators 
export const receiveListings = () => ({
	type: RECEIVE_LISTINGS
});

export const receiveListing = (listing) => ({
	type: RECEIVE_LISTING, 
	listing
});

export const removeListing = (listingId) => ({
	type: REMOVE_LISTING, 
	listingId
});

// Selectors 
export const retrieveListings = (state) => {
	return state.listings ? state.listings : [];
}

export const retriveListing = listing => (state) => {
	return state.listings ? state.listings[listing.id] : null;
}

// Get All Listings 
export const fetchListings = () => async (dispatch) => {
	const response = await csrfFetch('api/listings');
	const data = await response.json(); 
	dispatch(receiveListings(data));
}

// Get Listing by ID
export const fetchListing = listingId => async (dispatch) => {
	const response = await csrfFetch(`api/listings/${listingId}`);
	const data = await response.json(); 
	dispatch(receiveListing(data));
}

// Create a New Listing 
export const createListing = listing => async (dispatch) => {
	const response = await csrfFetch('api/listings', {
		method: 'POST',
		body: JSON.stringify(listing)
	});

	if (response.ok) {
		const data = await response.json(); 
		dispatch(receiveListing(data));
	}
}

export const updateListing = (listing) => async (dispatch) => {
	const response = await csrfFetch(`api/listings/${listing.id}`, {
		method: "PATCH",
		body: JSON.stringify(listing)
	})

	const data = await response.json(); 
	dispatch(receiveListing(data));
}

export const deleteUser = listingId => async (dispatch) => {
	const response = await csrfFetch(`api/listings/${listingId}`, {
		method: "DELETE"
	})

	if (response.ok) {
		dispatch(removeListing(listingId));
	}
}

const listingsReducer = (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_LISTINGS:
			return {...state, ...action.listings}
		case RECEIVE_LISTING: 
			return {...state, [action.listing.id]: action.listing}
		case REMOVE_LISTING:
			const newState = {...state};
			delete newState[action.listingId];
			return newState;
		default:
			return state; 
	}
}

export default listingsReducer;