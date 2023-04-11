import csrfFetch from "./csrf";

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

export const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER, 
	user
})

export const removeCurrentUser = () => ({
	type: REMOVE_CURRENT_USER
})

// Session Selector 
export const sessionUser = (state) => {
	return state.session.user ? state.session.user : null;
}

export const login = (user) => async (dispatch) => {
	const {email, password } = user; 
	const response = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({
			email, 
			password
		})
	});

	if (response.ok) {
	const data = await response.json();
		storeCurrentUser(data);
		dispatch(setCurrentUser(data));
	}
	return response; 
}

export const logout = () => async (dispatch) => {
	const response = await csrfFetch(`/api/session/`, {
		method: "DELETE"
	})

	if (response.ok) {
		storeCurrentUser(null);
		dispatch(removeCurrentUser())
	}
}

export const signup = (user) => async (dispatch) => {
	const response = await csrfFetch('/api/users', {
		method: "POST", 
		body: JSON.stringify(user)
	});

	if (response.ok) {
		const data = await response.json(); 
		storeCurrentUser(data);
		dispatch(setCurrentUser(data));
	}
	return response;
}

export function storeCSRFToken(response) {
	const csrfToken = response.headers.get("X-CSRF-Token");
	if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken)
}

export const restoreSession = () => async (dispatch) => {
	const response = await csrfFetch('/api/session')
	if (response.ok) {
		storeCSRFToken(response);
		const data = await response.json();
		storeCurrentUser(data.user);
		dispatch(setCurrentUser(data.user));
	}
	return response; 
}

const storeCurrentUser = (user) => {
	const currentUser = JSON.stringify(user);
	if (user) {
		sessionStorage.setItem("currentUser", currentUser)
	} else {
		sessionStorage.removeItem("currentUser");
	}
}

const initialState = {user: JSON.parse(sessionStorage.getItem("currentUser"))}

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER: 
			return {
				...state, 
				user: action.user 
			}
		case REMOVE_CURRENT_USER: 
			const newState = {...state, user: null}
			return newState;
		default: 
			return state;
	}
}

export default sessionReducer;