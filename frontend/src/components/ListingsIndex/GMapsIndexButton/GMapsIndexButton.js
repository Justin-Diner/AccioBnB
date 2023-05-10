import './GMapsIndexButton.css'
import { useState, useEffect } from 'react';

const GMapsIndexButton = () => {
	const [showMap, setShowMap] = useState(false)
	const [mapText, setMapText] = useState("Show map")
	const [buttonIcon, setButtonIcon] = useState(<i className="fa-solid fa-map"></i>);

	const handleButtonClicked = () => {
		if (showMap) {
			setShowMap(!showMap);
			setMapText("Show map");
			setButtonIcon(<i className="fa-solid fa-map"></i>);
		} else {
			setShowMap(!showMap);
			setMapText("Show list");
			setButtonIcon(<i className="fa-solid fa-list"></i>);
		}
	};

	return (
		<div id="GMaps_Index_Button_Wrapper">
			<button id="GMaps_Index_Button" onClick={() => handleButtonClicked()}>
				<div id="GMaps_Index_Button_Text" >{mapText}</div>
				<div id="GMaps_Index_Button_Icon_Wrapper">
					{buttonIcon}
				</div>
			</button>
		</div>
	)
}

export default GMapsIndexButton;