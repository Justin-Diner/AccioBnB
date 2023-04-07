import React from 'react';
import { Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpForm from './components/SignupFormPage';
import Navigation from './components/Navigation';
import CategoryFilter from './components/CategoryFilter/CategoryFilter';
import './index.css'
import ListingsIndex from './components/ListingsIndex/ListingsIndex';
import ListingShow from './components/ListingShow/ListingShow';

function App() {
  return (
		<>	
			<Route exact path="/">
				<div id="main_container">
					<div id="nav_bar_filler"></div>
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
			</Switch>
		</>
  );
}

export default App;