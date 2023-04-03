import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/session';
import { Redirect, Link } from 'react-router-dom';
import './SignupForm.css'
import ContinueButton from '../Buttons/ContinueButton/ContinueButton';
import StandardFormButton from '../Buttons/StandardFormButton/StandardFormButton';



const SignUpForm = () => {
	const dispatch = useDispatch(); 
	const [showing, setShowing] = useState(true);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [mouseClickedForm, setMouseClickedForm] = useState(false);
	const sessionUser = useSelector(state => state.session.user)

	if (sessionUser) {
		return <Redirect to="/" />
	}

	if (!showing) {
		return
	}
	
	const handleClick = (e) => {
		e.preventDefault(); 
		const newUser = {
			first_name: firstName,
			last_name: lastName,
			email: email 
		}

		if (password === confirmPassword) {
			console.log(newUser);
			newUser.password = password; 
		} else {
			return setErrors(["Passwords do not match!"])
		}

		setErrors([]);

		return dispatch(signup(newUser))
			.catch(async (res) => {
				let data;
				
				try {
					data = await res.clone().json();
				} catch {
					data = await res.text();
				}
				const allErrors = data.map(error => error)
				if (data?.errors) setErrors(allErrors);
				else if (data) setErrors(allErrors);
				else setErrors([res.statusText])
			});
	}

	const handleOutsideClick = (e) => {
		if (mouseClickedForm) {
			setMouseClickedForm(false);
			return 
		} else {
			setShowing(false);
		}
	}

	const handleInsideClick = (e) => {	
		e.stopPropagation(); 
		if (e.type === "mousedown") {
			setMouseClickedForm(true);
		}
	}

	return (
		<div id="signup_wrapper" onClick={(e) => handleOutsideClick(e)}>
			<div onMouseDown={(e) => handleInsideClick(e)}> 
			<form id="signup_form"> 
				<div id="top_signup_bar">
					<div id="xbutton_container" onClick={() => setShowing(false)}>
						<i class="fa-sharp fa-solid fa-xmark"></i>
					</div>
					<div id="signup_sentence">Create an Account</div>
					<div></div>
				</div>

				<h1 id="welcome">Welcome to Acciobnb</h1>
				<ul>
						{errors.map(error => {
							if (error.includes("do not match!")) {
								return <li className="errors">{error}</li>
							} else {
								return <li className="errors" key={error}>{error}</li>
							}
						})}
				</ul>

				<div id="inputs_wrapper">
					<label> 
						<input className="form_input" type="text" placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)} />
					</label>

					<label> 
						<input className="form_input" type="text" placeholder="Last Name" onChange={(e)=> setLastName(e.target.value)} />
					</label>

					<label > 
						<input className="form_input" type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
					</label>

					<label > 
						<input className="form_input" type="password" placeholder="Password" onChange={(e)=> setPassword(e.target.value)}/>
					</label>

					<label> 
						<input className="form_input" type="password" placeholder="Confirm Password" onChange={(e)=> setConfirmPassword(e.target.value)}/>
					</label>
				</div>
				
				<ContinueButton id="continue_button" clickFunction={handleClick} />

				<div id="spacer">
					<div>Already Have an Account</div>
				</div>
				<div id="testing"> 
					<Link id="login_link" to='/login'>
						<StandardFormButton text="Click to Sign In"/>
					</Link>
				</div>
			
			</form>
			</div>
		</div>
	)
}

export default SignUpForm;
