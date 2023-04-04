import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./SettingsOptions/ProfileButton/ProfileButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receiveSignUpModal, receiveLogInModal } from "../../store/ui";
import LogoDisplay from "./LogoDisplay/LogoDisplay.js";
import SearchBar from "./SearchBar/SearchBar";
import './Navigation.css';

const Navigation = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user ? state.session.user : null);

	let res;

	const showLogIn = () => {
		dispatch(receiveLogInModal(true));
	}

	const showSignUp = () => {
		dispatch(receiveSignUpModal(true));
	}

	if (sessionUser) {
		res = <ProfileButton user={sessionUser}/>
	} else {
		res = [
			<li key="login" onClick={showLogIn}><NavLink key="login" to='/login'>Login</NavLink></li>,
			<li key="signup" onClick={showSignUp}><NavLink key="signup" to='/signup'>Sign Up</NavLink></li>
		]
	} 
	return (
		<>
			<div id="top_nav_bar_container">
					<div id="top_nav_bar">
						<div className="nav_component" id="logo_wrapper">
							<LogoDisplay id="nav_logo" />
						</div>
						<div className="nav_component" id="search_wrapper"> 
							<SearchBar id="search_bar_comp"/>
						</div>
						<div className="nav_component" id="options_drop_down">
							<ul id="top_nav_list">
								{res}
							</ul>
						</div>
					</div>
			</div>
		</>
	)

}

export default Navigation;