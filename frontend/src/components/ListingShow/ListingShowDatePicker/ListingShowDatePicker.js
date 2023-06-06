import './ListingShowDatePicker.css';
import DatePicker from '../ListingReservationTool/ReservationPicker/DatePicker/DatePicker';
import { useEffect, useState } from 'react';

const ListingShowDatePicker = ({LSSetCheckInDate, LSSetCheckOutDate}) => {
	const [LSDPCheckInDate, setLSDPCheckInDate] = useState(); 
	const [LSDPCheckOutDate, setLSDPCheckOutDate] = useState(); 

	useEffect(() => {
		if (LSDPCheckInDate) {
			LSSetCheckInDate(LSDPCheckInDate)
		}
	}, [LSDPCheckInDate])

	useEffect(() => {
		if (LSDPCheckOutDate) {
			LSSetCheckOutDate(LSDPCheckOutDate)
		}
	}, [LSDPCheckOutDate])

	

	return (
		<div id="LSDP_container">
			<div id="LSDP_wrapper">
					<DatePicker chooseCheckInDate={setLSDPCheckInDate} chooseCheckOutDate={setLSDPCheckOutDate}/>
				</div> 
		</div> 
	)

}

export default ListingShowDatePicker;