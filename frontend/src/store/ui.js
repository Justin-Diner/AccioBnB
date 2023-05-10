import csrfFetch from './csrf';

// ACTION TYPES 
const RECEIVE_SIGNUP_MODAL = 'ui/RECEIVE_SIGNUP_MODAL'
const RECEIVE_LOGIN_MODAL = 'ui/RECEIVE_LOGIN_MODAL'
const RECEIVE_RESERVATION_MODAL = 'ui/RECEIVE_RESERVATION_MODAL'
const RECEIVE_CREATE_REVIEW_MODAL = 'ui/CREATE_REVIEW_MODAL'
const RECEIVE_EDIT_REVIEW_MODAL = 'ui/EDIT_REVIEW_MODAL'

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

const uiReducer = (state = {}, action) => {
	const nextState = {...state};

	switch(action.type) {
		case RECEIVE_SIGNUP_MODAL:
			nextState.signUpModal = action.modalState;
			return nextState
		case RECEIVE_LOGIN_MODAL: 
		nextState.logInModal = action.modalState;
			return nextState;
		case RECEIVE_RESERVATION_MODAL:
			nextState.reservationModal = action.modalState
			return nextState
		case RECEIVE_CREATE_REVIEW_MODAL:
			nextState.createReviewModal = action.modalState
			return nextState;
		case RECEIVE_EDIT_REVIEW_MODAL:
			nextState.editReviewModal = action.modalState
			return nextState;
		default: 
			return state; 
	}
}

export default uiReducer;