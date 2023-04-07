import './ListingReservationTool.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react';

const ListingReservationTool = ({listing}) => {
	const dispatch = useDispatch();

	const checkInDate = useState("04/05/2023")

	const getTodaysDate = () => {
		let todaysDate = new Date;
		let day = todaysDate.getDate(); 
		let month = todaysDate.getMonth() + 1;
		let year = todaysDate.getFullYear();

		return `${day}/${month}/${year}` 
	}

 return(
	<div id="reversation_tool_container">
		<div id="reveration_tool_wrapper">
			<div>Testing</div>
			<form id="reservation form">

			</form>

		</div>
	</div>
 )
}

export default ListingReservationTool;