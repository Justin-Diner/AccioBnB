import csrfFetch from './csrf';

// ACTION TYPES 
const RECEIVE_SIGNUP_MODAL = 'ui/RECEIVE_SIGNUP_MODAL'
const RECEIVE_LOGIN_MODAL = 'ui/RECEIVE_LOGIN_MODAL'

export const receiveSignUpModal = (modalState) => ({
	type: RECEIVE_SIGNUP_MODAL,
	modalState
})

export const receiveLogInModal = (modalState) => ({
	type: RECEIVE_LOGIN_MODAL, 
	modalState
})

// Selectors 
export const retrieveSignUpModalState = (state) => {
	return state.ui.signUpModal ? state.ui.signUpModal : null;
}

export const retrieveLogInModalState = (state) => {
	return state.ui.logInModal ? state.ui.logInModal : null;
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
		default: 
			return state; 
	}
}

export default uiReducer;