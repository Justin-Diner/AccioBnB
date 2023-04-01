import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {logout} from '../../store/session'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
	const dispatch = useDispatch();
	let res;
	let profileIcon;
	const sessionUser = useSelector(state => state.session.user ? state.session.user : undefined);

	if (sessionUser) {
		res = <li><button onClick={() => dispatch(logout())}>Logout</button></li>
		profileIcon = <ProfileButton/>
	} else {
		res = [
			<li><NavLink key="login" to='/login'>Login</NavLink></li>,
			<li><NavLink key="signup" to='/signup'>Sign Up</NavLink></li>
		]
	}
	return (
		<>
			{profileIcon}
			<ul>
				{res}
			</ul>
		</>
	)

}

export default Navigation;