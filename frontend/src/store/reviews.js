import csrfFetch from "./csrf";

// Action Types 
const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

// Action Creators 
export const receiveReview = (review) => ({
	type: RECEIVE_REVIEW,
	review
})

export const receiveReviews = (payload) => ({
	type: RECEIVE_REVIEWS,
	payload
})

export const removeReview = (reviewId) => ({
	type: REMOVE_REVIEW, 
	reviewId
})

// Selectors 
export const getReview = reviewId => (state) => {
	return state.reviews ? state.reviews[reviewId] : null;
}

export const getReviews = (state) => {
	return state.reviews ? Object.values(state.reviews) : [];
}

// Thunk Action Creators 
// Get all Reviews for a listing
export const fetchListingReviews = (listingId) => async (dispatch) => {
	const response = await csrfFetch(`/api/listings/${listingId}/reviews`)
	const data = await response.json(); 

	if (response.ok) {
		dispatch(receiveReviews(data));
	}
}

// Create a New Review
export const createReview = review => async (dispatch) => {
	const response = await csrfFetch('/api/reviews', {
		method: "POST",
		body: JSON.stringify(review)
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(receiveReview(data));
	}
}

export const deleteReview = (reviewId) => async (dispatch) => {
	debugger
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE"
	})

	if (response.ok) {
		dispatch(removeReview(reviewId));
	}
}

const reviewReducer = (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_REVIEWS:
			return {...state, ...action.payload.reviews}
		case RECEIVE_REVIEW: 
			return {...state, [action.review.id]: action.review}
		case REMOVE_REVIEW:
			const newState = {...state};
			delete newState[action.reviewId];
			return newState;
		default: 
			return state; 
	}
}

export default reviewReducer;