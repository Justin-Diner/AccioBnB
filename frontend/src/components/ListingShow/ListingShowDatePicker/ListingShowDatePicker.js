import './ListingShowDatePicker.css';
import DatePicker from '../ListingReservationTool/ReservationPicker/DatePicker/DatePicker';
import { useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';

const ListingShowDatePicker = ({LSSetCheckInDate, LSSetCheckOutDate, listing}) => {
	const [LSDPCheckInDate, setLSDPCheckInDate] = useState(""); 
	const [LSDPCheckOutDate, setLSDPCheckOutDate] = useState(""); 
	const [LSDPDateTitle, setLSDPDateTitle] = useState("Minimum 1 Night Stay");

	useEffect(() => {
		if (LSDPCheckInDate && LSDPCheckOutDate) {
			setLSDPDateTitle(amountOfNights())
		}
		if (LSDPCheckInDate) {
			LSSetCheckInDate(LSDPCheckInDate)
		}
		if (LSDPCheckInDate === "" && LSDPCheckOutDate === "") {
			setLSDPDateTitle("Minimum 1 Night Stay")
		}

	}, [LSDPCheckInDate])

	useEffect(() => {
		if (LSDPCheckInDate && LSDPCheckOutDate) {
			amountOfNights();
		}

		if (LSDPCheckOutDate) {
			LSSetCheckOutDate(LSDPCheckOutDate)
		}
		if (LSDPCheckInDate === "" && LSDPCheckOutDate === "") {
			setLSDPDateTitle("Minimum 1 Night Stay")
		}

	}, [LSDPCheckOutDate])

	const amountOfNights = () => {
		if (LSDPCheckInDate && LSDPCheckOutDate) {
		const days = (differenceInCalendarDays(new Date(LSDPCheckInDate), new Date(LSDPCheckOutDate)) * -1).toString()
		setLSDPDateTitle(`${days} nights total`);
		} else {
			setLSDPDateTitle("Select check-in date") ;
		}
 }

	return (
		<div id="LSDP_container">
			<div id="LSDP_wrapper">
				<div id="LSDP_title">{LSDPDateTitle}</div>
					<DatePicker chooseCheckInDate={setLSDPCheckInDate} chooseCheckOutDate={setLSDPCheckOutDate}/>
				</div> 
		</div> 
	)

}

export default ListingShowDatePicker;