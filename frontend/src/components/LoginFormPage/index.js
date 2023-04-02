import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/session";
import './LoginForm.css'
import { Redirect } from 'react-router-dom';
import { createUser, fetchUser } from "../../store/users";
import { retrieveUser } from "../../store/users";
import ContinueButton from "../Buttons/ContinueButton/ContinueButton";
import StandardFormButton from "../Buttons/StandardFormButton/StandardFormButton";


const LoginFormPage = () => {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user); 

	const [showing, setShowing] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) {
		return <Redirect to="/" />
	} 

	if (!showing) {
		return
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

		const newDemoUser = {
			first_name: "Squib",
			last_name: "Guest",
			email: "squib@demouser.com",
			password: "password"
		}

			dispatch(login(newDemoUser))
		}
	
	return (
		<div id="login_wrapper">
			<form id="login_form">
				<div id="top_login_bar">
					<div id="xbutton_container" onClick={() => setShowing(false)}>
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
				<ContinueButton clickFunction={handleClick} onClick={handleClick}/>
				<div id="spacer">
					<div>or</div>
				</div>
				<StandardFormButton clickFunction={demoUserLogin} text="Continue As Demo User"/>
				
			</form>
		</div>
		
	)
}

export default LoginFormPage;
