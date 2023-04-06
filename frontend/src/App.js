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
			<Switch>
				<Route exact path="/">
					<div id="main_container">
						<div id="nav_bar_filler"></div>
						<CategoryFilter />
						<ListingsIndex />
						<Navigation />	
					</div>
				</Route>
				<Route exact path="/listings/:listingId" component={ListingShow} />
				<Route exact path="/signup"> 
					<SignUpForm reloadTrigger={true} />
				</Route>
				<Route exact path="/login" >
					<LoginFormPage />
				</Route>
			</Switch>
		</>
  );
}

export default App;