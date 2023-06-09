import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import sessionReducer from './session';
import usersReducer from './users';
import uiReducer from './ui';
import listingsReducer from './listings';
import reservationsReducer from './reservations';
import reviewReducer from './reviews';
import searchReducer from './search';

const rootReducer = combineReducers({
	session: sessionReducer,
	users: usersReducer,
	listings: listingsReducer,
	reservations: reservationsReducer,
	reviews: reviewReducer,
	searchResults: searchReducer,
	ui: uiReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer)
}

export default configureStore;