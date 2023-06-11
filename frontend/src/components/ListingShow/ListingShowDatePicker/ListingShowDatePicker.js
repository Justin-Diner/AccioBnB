import './ListingShowDatePicker.css';
import DatePicker from '../ListingReservationTool/ReservationPicker/DatePicker/DatePicker';
import { useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { receiveCheckInDate, receiveCheckOutDate, retrieveCheckInDate, retrieveCheckOutDate } from '../../../store/ui';
import { useDispatch, useSelector } from 'react-redux';

const ListingShowDatePicker = ({LSSetCheckInDate, LSSetCheckOutDate, listing}) => {
	const dispatch = useDispatch();
	const [LSDPCheckInDate, setLSDPCheckInDate] = useState(""); 
	const [LSDPCheckOutDate, setLSDPCheckOutDate] = useState(""); 
	const [LSDPDateTitle, setLSDPDateTitle] = useState("Minimum 1 Night Stay");
	const selectedCheckInDate = useSelector(retrieveCheckInDate)
	const selectedCheckOutDate = useSelector(retrieveCheckOutDate)

	useEffect(() => {
		if (LSDPCheckInDate && LSDPCheckOutDate) {
			setLSDPDateTitle(amountOfNights())
		}
		if (LSDPCheckInDate) {
			LSSetCheckInDate(LSDPCheckInDate)
			dispatch(receiveCheckInDate(LSDPCheckInDate))
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
			dispatch(receiveCheckOutDate(LSDPCheckOutDate))
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
					<DatePicker chooseCheckInDate={setLSDPCheckInDate} chooseCheckOutDate={setLSDPCheckOutDate} guestCheckInDate={LSDPCheckInDate} guestCheckOutDate={LSDPCheckOutDate}/>
				</div> 
		</div> 
	)

}

export default ListingShowDatePicker;