import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom';

import App from './App';
import configureStore from  './store';
import csrfFetch from './store/csrf';
import * as sessionActions from './store/session';
import './reset.css';
import './index.css';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
	window.store = store;
	window.csrfFetch = csrfFetch; 
	window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const renderApplication = () => {
	ReactDOM.render(
		<React.StrictMode>
			<Root />
		</React.StrictMode>,
		document.getElementById('root')
	);
}

// Top function that sets the X-CSRF-Token prior to rendering. Doing so ensures that the CSRF token is set. 
if (sessionStorage.getItem("X-CSRF-Token") === null || sessionStorage.getItem("currentUser" === null)) {
	store.dispatch(sessionActions.restoreSession())
		.then(renderApplication);
} else {
	renderApplication();
}