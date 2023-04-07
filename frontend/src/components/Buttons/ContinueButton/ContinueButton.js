import React, { useState } from "react"
import './ContinueButton.css'

const ContinueButton = ({clickFunction}) => {
	const [hoverStylePos, setHoverStylePos] = useState({x: 0, y: 0});
	const [isHovering, setIsHovering] = useState(false)
	const [styles, setStyles] = useState({});

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
		<div 
			onClick={clickFunction}
			id={isHovering ? "login_button_hover" : "login_button"} 
			onMouseMove={(e) => submitHover(e)}
			onMouseLeave={() => setIsHovering(false)}
			style={styles}
		> Continue
		</div>
	)
}

export default ContinueButton;