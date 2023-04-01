import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
	const sessionUser = useSelector(state => state.session.user ? state.session.user : null);

	let res;

	if (sessionUser) {
		res = <ProfileButton user={sessionUser}/>
	} else {
		res = [
			<li><NavLink key="login" to='/login'>Login</NavLink></li>,
			<li><NavLink key="signup" to='/signup'>Sign Up</NavLink></li>
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