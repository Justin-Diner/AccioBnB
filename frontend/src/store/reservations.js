import csrfFetch from "./csrf";

// Action Types 
const RECEIVE_RESERVATION = 'reservations/RECEIVE_RESERVATION';
const REMOVE_RESERVATION = 'reservations/REMOVE_RESERVATION';

// Action Creators 
export const receiveReservation = (reservation) => ({
	type: RECEIVE_RESERVATION, 
	reservation
})

export const removeReservation = (reservationId) => ({
	type: REMOVE_RESERVATION,
	reservationId
})

// Selectors 
export const getReservation = reservationId => (state) => {
	return state.reservations ? state.reservations[reservationId] : null;
}

// Thunk Action Creators 
// Get Reservation By Id 
export const fetchReservation = (reservationId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reservations/${reservationId}`);
	const data = await response.json();

	if (response.ok) {
		dispatch(receiveReservation(data))
	}
}

// Create a New Reservation
export const createReservation = reservation => async (dispatch) => {
	const response = await csrfFetch('api/reservations', {
		method: 'POST',
		body: JSON.stringify(reservation)
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(receiveReservation(data));
	}
}

// Update Reservation
export const updateReservation = (reservation) => async (dispatch) => {
	const response = await csrfFetch(`api/reservations/${reservation.id}`, {
		method: "PATCH",
		body: JSON.stringify(reservation)
	})

	const data = await response.json();
	dispatch(receiveReservation(data));
}

export const deleteReservation = (reservationId) => async (dispatch) => {
	const response = await csrfFetch(`api/reservations/${reservationId}`, {
		method: "DELETE"
	});

	if (response.ok) {
		dispatch(removeReservation(reservationId))
	}
}

const reservationsReducer = (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_RESERVATION:
			return {...state, [action.reservation.id]: action.reservation}
		case REMOVE_RESERVATION:
			const newState = {...state};
			delete newState[action.reservationId];
			return newState; 
		default: 
			return state;
	}
}

export default reservationsReducer;