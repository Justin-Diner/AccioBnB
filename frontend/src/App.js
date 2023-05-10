import React from 'react';
import { Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpForm from './components/SignupFormPage';
import Navigation from './components/Navigation';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import './index.css'
import ListingsIndex from './components/ListingsIndex/ListingsIndex';
import ListingShow from './components/ListingShow/ListingShow';
import ReservationsShow from './components/ReservationsShow/ReservationsShow';

function App() {
  return (
		<>	
			<Route exact path="/">
				<div id="main_container">
					<Navigation />
					<CategoryFilter />
					<ListingsIndex />
					<LoginFormPage initialShow={false} />
					<SignUpForm initialShow={false} />
				</div>
			</Route>
			<Switch>
				<Route exact path="/listings/:listingId">
					<ListingShow />
					<LoginFormPage initialShow={false} />
					<SignUpForm initialShow={false} />	
				</Route> 
				<Route exact path="/users/:userId/reservations">
					<ReservationsShow />
					<LoginFormPage initialShow={false} />
					<SignUpForm initialShow={false} />
				</Route>
			</Switch>
		</>
  );
}

export default App;