import './LogoDisplay.css';

const LogoDisplay = () => {
	return (
			<div id="logo_container">
				<img src={require("../../../assets/airbnblogo.png")} id="logo_image" alt="logo" ></img>
				<p id="app_name">Acciobnb</p>
			</div>
	)
}

export default LogoDisplay;