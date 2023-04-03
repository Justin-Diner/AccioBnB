import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { receiveSignUpModal, receiveLogInModal } from "../../store/ui";

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
			<ul id="top-nav">
				{res}
			</ul>
		</>
	)

}

export default Navigation;