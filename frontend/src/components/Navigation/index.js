import { useSelector } from "react-redux";
import LogoDisplay from "./LogoDisplay/LogoDisplay.js";
import SearchBar from "./SearchBar/SearchBar";
import SettingsOptions from "./SettingsOptions/SettingsOptions";
import * as sessionAction from '../../store/session';
import './Navigation.css';
import Socials from "./socials/Socials";

const Navigation = () => {
	const sessionUser = useSelector(sessionAction.sessionUser);

	return (
		<>
			<div id="top_nav_bar_container">
					<div id="top_nav_bar">
						<div id="nav_logo_wrapper">
							<a href="/"><div className="nav_component" id="logo_wrapper">
								<LogoDisplay id="nav_logo" />
							</div></a>
						</div>
						<div className="nav_component" id="search_wrapper"> 
							<SearchBar id="search_bar_comp"/>
						</div>
						<div id="socials_and_nav_wrapper">
							<div id="socials_wrapper">
								<Socials />
							</div>
							<div className="nav_component" id="settings_options_wrapper">		
								<SettingsOptions user={sessionUser}/>
							</div>
						</div>
					</div>
			</div>
		</>
	)
}

export default Navigation;