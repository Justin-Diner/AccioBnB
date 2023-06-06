import './ListingShowDatePicker.css';
import DatePicker from '../ListingReservationTool/ReservationPicker/DatePicker/DatePicker';
import { useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';

const ListingShowDatePicker = ({LSSetCheckInDate, LSSetCheckOutDate, listing}) => {
	const [LSDPCheckInDate, setLSDPCheckInDate] = useState(""); 
	const [LSDPCheckOutDate, setLSDPCheckOutDate] = useState(""); 
	const [LSDPDateTitle, setLSDPDateTitle] = useState("Minimum 1 Night Stay");
	const [LSDPDateSubTitle, setLSDPDateSubTitle] = useState("Add your travel dates for exact pricing")

	useEffect(() => {
		if (LSDPCheckInDate && LSDPCheckOutDate) {
			setLSDPDateTitle(amountOfNights())
			setLSDPDateSubTitle(`${LSDPCheckInDate} - ${LSDPCheckOutDate}`)
		}
		if (LSDPCheckInDate) {
			LSSetCheckInDate(LSDPCheckInDate)
		}

		if (LSDPCheckInDate && LSDPCheckOutDate === "") {
			setLSDPDateSubTitle("Select checkout date.")
		}

	}, [LSDPCheckInDate])

	useEffect(() => {
		if (LSDPCheckInDate && LSDPCheckOutDate) {
			amountOfNights();
			setLSDPDateSubTitle(`${LSDPCheckInDate} - ${LSDPCheckOutDate}`)
		}

		if (LSDPCheckOutDate) {
			LSSetCheckOutDate(LSDPCheckOutDate)
		}

		if (LSDPCheckOutDate && LSDPCheckInDate === "") {
			setLSDPDateSubTitle("Select check-in date.")
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
				<div id="LSDP_subtitle">{LSDPDateSubTitle}</div>
					<DatePicker chooseCheckInDate={setLSDPCheckInDate} chooseCheckOutDate={setLSDPCheckOutDate}/>
				</div> 
		</div> 
	)

}

export default ListingShowDatePicker;