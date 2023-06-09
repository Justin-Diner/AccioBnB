import './SettingsOptions.css'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../../store/session'
import * as uiActions from '../../../store/ui'
import { receiveSignUpModal, receiveLogInModal } from "../../../store/ui";
import { Link } from 'react-router-dom';

const SettingsOptions = ({ user = null}) => {
	const dispatch = useDispatch(); 
	const [showMenu, setShowMenu] = useState(false);
	const sessionUser = useSelector(sessionActions.sessionUser);
	let dropDownOptions;
	let profileIcon;

	useEffect(() => {
    if (!showMenu) return;

		document.addEventListener('click', closeMenu);
		
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

	const closeMenu = () => {
		setShowMenu(false);
	};

	const openMenu = (e) => {
		e.stopPropagation();
		if (showMenu) return;
		setShowMenu(true);
	}

	const showLogIn = () => {
		dispatch(receiveLogInModal(true));
	}

	const showSignUp = () => {
		dispatch(receiveSignUpModal(true));
	}

	const logout = (e) => {
    e.preventDefault();
		dispatch(uiActions.receiveLogInModal(false));
		dispatch(uiActions.receiveSignUpModal(false));
    dispatch(sessionActions.logout());
  };

	
	if (sessionUser) {
		profileIcon = require("../../../assets/harry_potter_profile.png");
	} else {
		profileIcon = require("../../../assets/profile_icon.png");
	}


	if (sessionUser) {
		dropDownOptions = 		
		<>
			<div id="settings_options_container">
				<div id="settings_options_background" onClick={(e) => openMenu(e)}>
					<i className="fa-solid fa-bars"></i>
					<img id="profile_image" src={profileIcon}></img>
				</div>
				{showMenu && (
				<div id="settings_options_dropdown">
					<ul className="profile_dropdown">
						<li className="settings_dropdown_item">{`${user.firstName} ${user.lastName}`}</li>
						<li className="settings_dropdown_item">{user.email}</li>
						<Link to={`/users/${sessionUser.id}/reservations`}>
							<li className="settings_dropdown_item">Reservations</li>
						</Link>
					
						<li onClick={logout} className="settings_dropdown_item">
							Sign Out
						</li>
					</ul>
				</div>
				)}
			</div>
		</>
	} else {
		dropDownOptions =
		<>
			<div id="settings_options_container">
				<div id="settings_options_background" onClick={openMenu}>
					<i className="fa-solid fa-bars"></i>
					<img id="profile_image" src={require("../../../assets/profile_icon.png")}></img>
				</div>
				{showMenu && (
				<div id="settings_options_dropdown">
					<ul className="profile_dropdown">
						<li className="settings_dropdown_item" id="login_from_loggedout_dropdown" onClick={showLogIn}>Log In</li> 
						<li className="settings_dropdown_item" id="signup_from_loggedout_dropdown" onClick={showSignUp}>Sign Up</li>
						<li className="settings_dropdown_item" onClick={showLogIn}>AccioBnB Your Home</li>
						<li className="settings_dropdown_item" onClick={showLogIn}>Help</li>
					</ul>
				</div>
				)}
			</div>
		</>
	}

	return (
		<>
			{dropDownOptions}
		</>
			
	)
}

export default SettingsOptions;