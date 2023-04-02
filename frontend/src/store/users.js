import csrfFetch from "./csrf";

//  ACTION TYPES
const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';

// ACTION CREATORS
export const receiveUser = user => ({
	type: RECEIVE_USER,
	user
});

export const removeUser = userId => ({
	type: REMOVE_USER,
	userId
});

// Selectors 
export const retrieveUser = (user) => (state) => {
	return state.users ? state.users[user.id] : null; 
}

// Get User by ID
export const fetchUser = (userId) => async (dispatch) => {
	const response = await fetch(`api/users/${userId}`);
	const data = await response.json();
	dispatch(receiveUser(data));
}

// Create a new User 
export const createUser = user => async dispatch => {
    const response = await csrfFetch('api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });

		if (response.ok) {
    const data = await response.json();
    storeCurrentUser(data.user)
    dispatch(receiveUser(data.user))
		}
}

// Delete a User
export const deleteUser = userId => async (dispatch) => {
	const response = await csrfFetch(`api/users/${userId}`, {
		method: "DELETE"
	})

	if (response.ok){
		dispatch(removeUser(userId));
	}
}

// Updating the Session Storage on Login
const storeCurrentUser = (user) => {
	const currentUser = JSON.stringify(user);
	if (user) {
		sessionStorage.setItem("currentUser", currentUser)
	} else {
		sessionStorage.removeItem("currentUser");
	}
}

const usersReducer = (state={}, action) => {
    const nextState = { ...state };

    switch(action.type) {
        case RECEIVE_USER:
            nextState[action.user.id] = action.payload;
            return nextState;
        case REMOVE_USER:
            delete nextState[action.userId];
            return nextState;
        default:
            return state;
    }
}

export default usersReducer;
