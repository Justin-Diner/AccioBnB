import csrfFetch from "./csrf";

// Action Types 
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

// Action Creators 
export const receiveReview = (payload) => ({
	type: RECEIVE_REVIEW,
	payload
})

export const receiveReviews = (payload) => ({
	type: RECEIVE_REVIEWS,
	payload
})

export const removeReview = (payload) => ({
	type: REMOVE_REVIEW, 
	payload
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

export const updateReview = (review) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${review.id}`, {
		method: "PATCH",
		body: JSON.stringify(review)
	})

	const data = await response.json();
	dispatch(receiveReview(data))
}

export const deleteReview = (reviewId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: "DELETE"
	})

	const data = await response.json(); 
	data.deletedReviewId = reviewId 
	if (response.ok) {
		dispatch(removeReview(data));
	}
}

const reviewReducer = (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_REVIEWS:
			return {...state, ...action.payload.reviews}
		case RECEIVE_REVIEW: 
			return {...state, [action.payload.reviews.id]: action.payload.reviews}
		case REMOVE_REVIEW:
			const newState = {...state};
			delete newState[action.payload.deletedReviewId];
			return newState;
		default: 
			return state; 
	}
}

export default reviewReducer;