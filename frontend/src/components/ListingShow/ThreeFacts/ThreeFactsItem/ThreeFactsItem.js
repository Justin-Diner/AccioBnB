import "./ThreeFactsItem.css";
import badge from '../../../../assets/icons/badge.png';
import door from '../../../../assets/icons/door_open.png';
import calendar from '../../../../assets/icons/calendar.png';
import { useEffect, useState } from "react";

const ThreeFactsItem = ({type, host}) => {
	const [image, setImage] = useState("");
	const [description, setDescription] = useState(""); 
	const [title, setTitle] = useState("");
	const [hostName, setHostName] = useState(""); 
	const titleId = (type === "cancellation") ? "tfi_cancel_title" : "tfi_title"

	useEffect(() => {
		setHostName(host);
	}, [host]);

	useEffect(() => {
		if (type === "superhost") {
			setTitle(`${hostName} is a Superhost`)
		}
	}, [hostName])

	useEffect(() => {
		if (type === "check in") {
			setImage(door);
			setTitle("Self Check In")
			setDescription("Check Yourself in with the keypad.")
		} else if (type === "superhost") {
			setImage(badge);
			setTitle(`${host} is a Superhost`);
			setDescription("Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.")
		} else if (type === "cancellation") {
			setImage(calendar);
			setTitle("Free cancellation for 48 hours");
		}
	}, [])

 return (
	<div id="tfi_container"> 
		<div id="tfi_wrapper">
			<div id="tfi_icon_wrapper">
				<img id="tfi_image" src={image}></img>
			</div>
			<div id="tfi_title_desc_wrapper">
				<div id="tfi_title_wrapper">
					<div id={titleId}> {title}</div>
				</div>
				<div id="tfi_description_wrapper">
					<div id="tfi_description">{description}</div>
				</div>
			</div>
		</div>
	</div> 
 )
}

export default ThreeFactsItem; 