import React from 'react';
import { Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignUpForm from './components/SignupFormPage';
import Navigation from './components/Navigation';
import CategoryFilter from './components/CategoryFilter/index';
import './index.css'

function App() {
  return (
		<>
			<div id="main_container">
				<div id="nav_bar_filler"></div>
				<Navigation />
				<CategoryFilter />
			</div>
			<Switch>
				<Route exact path="/signup" > 
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