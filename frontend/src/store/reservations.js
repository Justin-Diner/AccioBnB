import csrfFetch from "./csrf";
import { receiveReservationSuccessModal } from "./ui";

// Action Types 
export const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS';
const RECEIVE_RESERVATION = 'reservations/RECEIVE_RESERVATION';
const REMOVE_RESERVATION = 'reservations/REMOVE_RESERVATION';

// Action Creators 

export const receiveReservations = (payload) => ({
	type: RECEIVE_RESERVATIONS,
	payload 
})

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

export const getReservations = (state) => {
	return state.reservations ? Object.values(state.reservations) : [];
}

// Thunk Action Creators 
// Get all Reservations of a User
export const fetchUserReservations = (userId) => async (dispatch) => {
	const response = await csrfFetch(`/api/users/${userId}/reservations`);
	const data = await response.json();

	if (response.ok) {
		dispatch(receiveReservations(data));
	}
}

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
	const response = await csrfFetch('/api/reservations', {
		method: 'POST',
		body: JSON.stringify(reservation)
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(receiveReservation(data));
	}
	dispatch(receiveReservationSuccessModal(true));
}

// Update Reservation
export const updateReservation = (reservation) => async (dispatch) => {
	const response = await csrfFetch(`/api/reservations/${reservation.id}`, {
		method: "PATCH",
		body: JSON.stringify(reservation)
	})

	const data = await response.json();
	dispatch(receiveReservation(data));
}

export const deleteReservation = (reservationId) => async (dispatch) => {
	debugger
	const response = await csrfFetch(`/api/reservations/${reservationId}`, {
		method: "DELETE"
	});

	if (response.ok) {
		dispatch(removeReservation(reservationId))
	}
}

const reservationsReducer = (state = {}, action) => {
	switch(action.type) {
		case RECEIVE_RESERVATIONS: 
			return {...state, ...action.payload.reservations}
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