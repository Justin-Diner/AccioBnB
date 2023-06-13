import csrfFetch from './csrf';

// ACTION TYPES 
const RECEIVE_SIGNUP_MODAL = 'ui/RECEIVE_SIGNUP_MODAL'
const RECEIVE_LOGIN_MODAL = 'ui/RECEIVE_LOGIN_MODAL'
const RECEIVE_RESERVATION_MODAL = 'ui/RECEIVE_RESERVATION_MODAL'
const RECEIVE_CREATE_REVIEW_MODAL = 'ui/CREATE_REVIEW_MODAL'
const RECEIVE_EDIT_REVIEW_MODAL = 'ui/EDIT_REVIEW_MODAL'
const RECEIVE_CLEAR_SELECTED_DATES = 'ui/CLEAR_SELECTED_DATES'
const RECEIVE_CHECK_IN_DATE = 'ui/SELECTED_CHECK_IN_DATE'
const RECEIVE_CHECK_OUT_DATE = 'ui/SELECTED_CHECK_OUT_DATE'

export const receiveSignUpModal = (modalState) => ({
	type: RECEIVE_SIGNUP_MODAL,
	modalState
})

export const receiveLogInModal = (modalState) => ({
	type: RECEIVE_LOGIN_MODAL, 
	modalState
})

export const receiveReservationSuccessModal = (modalState) => ({
	type: RECEIVE_RESERVATION_MODAL, 
	modalState
})

export const receiveCreateReviewModal = (modalState) => ({
	type: RECEIVE_CREATE_REVIEW_MODAL, 
	modalState
})

export const receiveEditReviewModal = (modalState) => ({
	type: RECEIVE_EDIT_REVIEW_MODAL, 
	modalState
})

export const receiveClearSelectedDates = (clearBool) => ({
	type: RECEIVE_CLEAR_SELECTED_DATES,
	clearBool
})

export const receiveCheckInDate = (checkInDate) => ({
	type: RECEIVE_CHECK_IN_DATE,
	checkInDate
})

export const receiveCheckOutDate = (checkOutDate) => ({
	type: RECEIVE_CHECK_OUT_DATE,
	checkOutDate
})

// Selectors 
export const retrieveSignUpModalState = (state) => {
	return state.ui.signUpModal ? state.ui.signUpModal : null;
}

export const retrieveLogInModalState = (state) => {
	return state.ui.logInModal ? state.ui.logInModal : null;
}

export const retrieveReservationModalState = (state) => {
	return state.ui.reservationModal ? state.ui.reservationModal : null; 
}

export const retrieveCreateReviewModalState = (state) => {
	return state.ui.createReviewModal ? state.ui.createReviewModal : null; 
}

export const retrieveEditReviewModalState = (state) => {
	return state.ui.editReviewModal ? state.ui.editReviewModal : null; 
}

export const retrieveClearSelectedDatesStatus = (state) => {
	return state.ui.clearSelectedDatesStatus ? state.ui.clearSelectedDatesStatus : null;
}

export const retrieveCheckInDate = (state) => {
	return state.ui.checkInDate ? state.ui.checkInDate : null; 
}

export const retrieveCheckOutDate = (state) => {
	return state.ui.checkOutDate ? state.ui.checkOutDate : null; 
}

const uiReducer = (state = {}, action) => {
	const nextState = {...state};

	switch(action.type) {
		case RECEIVE_SIGNUP_MODAL:
			nextState.signUpModal = action.modalState;
			return nextState;
		case RECEIVE_LOGIN_MODAL: 
		nextState.logInModal = action.modalState;
			return nextState;
		case RECEIVE_RESERVATION_MODAL:
			nextState.reservationModal = action.modalState;
			return nextState;
		case RECEIVE_CREATE_REVIEW_MODAL:
			nextState.createReviewModal = action.modalState;
			return nextState;
		case RECEIVE_EDIT_REVIEW_MODAL:
			nextState.editReviewModal = action.modalState;
			return nextState;
		case RECEIVE_CLEAR_SELECTED_DATES:
			nextState.clearSelectedDatesStatus = action.clearBool;
			return nextState;
		case RECEIVE_CHECK_IN_DATE:
			nextState.checkInDate = action.checkInDate;
			return nextState;
		case RECEIVE_CHECK_OUT_DATE: 
			nextState.checkOutDate = action.checkOutDate
			return nextState;
		default: 
			return state; 
	}
}

export default uiReducer;