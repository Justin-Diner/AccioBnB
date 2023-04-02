import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import './LoginForm.css'
import { Redirect } from 'react-router-dom';
import { signup } from "../../store/session";

const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user); 
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [hoverStylePos, setHoverStylePos] = useState({x: 0, y: 0});
	const [isHovering, setIsHovering] = useState(false)
	const [styles, setStyles] = useState({});

	if (sessionUser) {
		return <Redirect to="/" />
	} 

	function handleClick(e) {
		e.preventDefault(); 

		const user = {
			email: email, 
			password: password
		}

		setErrors([]);

		return dispatch(login(user))
			.catch(async (res) => {
				let data; 
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text(); 
				}
				if (data?.errors) setErrors(data.errors);
				else if (data) setErrors([data]);
				else setErrors([res.statusText]);
			});
	}

	const demoUserLogin = (e) => {
		e.preventDefault();

		const demoUser = {
			first_name: "Squib",
			last_name: "Guest",
			email: "squib@demouser.com",
			password: "password"
		}

		dispatch(signup(demoUser));
	}

 // Hovering CSS on Login Button
 const submitHover = (e) => {
		setIsHovering(true);
		let location = {
			x: e.clientX,
			y: e.clientY
		}
		setHoverStylePos(location);
		setStyles({ 
			backgroundPosition: hoverStylePos.x.toString() + "px , " + hoverStylePos.y.toString() + "px"}
		);
	};
		
	return (
		<div id="login_wrapper">
			<form id="login_form">
				<div id="top_login_bar">
					<div id="xbutton_container">
						<i class="fa-sharp fa-solid fa-xmark"></i>
					</div>
					<div id="login_sentence">Log in or sign up</div>
					<div></div>
				</div>
				<h1 id="welcome">Welcome to Acciobnb</h1>

				<ul className="errors">
					{errors.map(error => {
						const errorText = error.slice(12)
						return <li key={error}>{errorText}</li>})
					}
				</ul>

				<div id="inputs_wrapper">
					<label> 
						<input className="form_input" id="login_email" placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
					</label>

					<label>
						<input className="form_input" id="login_password" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
					</label>
				</div>

				<div className="form_button" id={isHovering ? "login_button_hover" : "login_button"} onClick={handleClick} onMouseMove={(e) => submitHover(e)} onMouseLeave={() => setIsHovering(false)} style={styles}>Continue</div>

				<div id="spacer">
					<div>or</div>
				</div>

				<div className="form_button" id="demo_user_button" onClick={demoUserLogin}>Continue As Demo User</div>
			</form>
		</div>
		
	)
}

export default LoginFormPage;