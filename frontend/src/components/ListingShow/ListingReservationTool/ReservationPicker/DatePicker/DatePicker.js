import { DayPicker, DateRange, ModifiersStyles} from 'react-day-picker';
import { addDays, format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useState, useEffect } from 'react';
import './DatePicker.css'
import { useDispatch, useSelector } from 'react-redux';
import {receiveClearSelectedDates} from '../../../../../store/ui';


const DatePicker = ({chooseCheckInDate, chooseCheckOutDate}) => {
	const dispatch = useDispatch(); 
	const [selected, setSelected] = useState([]); 

	let checkInDate = "";
	let checkOutDate = "";
	let datePrompt = <div id="DP_reservation_dates"> Please select your check-in date.</div>
	
	useEffect(() => {
		if (selected?.from){
			checkInDate = format(selected?.from, 'MM/dd/yyyy').toString();
			chooseCheckInDate(checkInDate);
		}

		if (selected?.to) {
			checkOutDate = format(selected?.to, 'MM/dd/yyyy').toString();
			chooseCheckOutDate(checkOutDate);
		}
	}, [datePrompt])

	useEffect(() => {
		if (checkInDate === "" && checkOutDate === "") {
			chooseCheckInDate("")
			chooseCheckOutDate("");
		}
	}, [selected])

	const css = `
	.my-selected {
		background-color: black;
		color: white;
	}`

	const modifiers = {
		start:selected?.from,
		end: selected?.to
	}

	const disabledDays = [
		{from: new Date(1980, 0, 1), to: new Date()}
	]

	if (selected?.from) {
		if (!selected.to) {
			datePrompt = <p id="DP_reservation_dates" >{format(selected?.from, 'PPP')}</p>
		} else if (selected?.to) {
			datePrompt = <p id="DP_reservation_dates">
				{format(selected?.from, 'PPP')} - {format(selected?.to, 'PPP')}
				</p>
		}
	} 

	const clearDates = () => {
		dispatch(receiveClearSelectedDates(true));
		setSelected(["", ""])
	}

	return (
		<>
			<div>
				{datePrompt}
			</div>
			<style>{css}</style>
			<DayPicker
				mode="range"
				selected={selected}
				onSelect={setSelected}
				disabled={disabledDays}
				numberOfMonths={2}
				modifiersClassNames={{
					selected: 'my-selected'
				}}
				modifiers={modifiers}
			/>
			<div id="DP_clear_dates_wrapper">
				<div id="DP_clear_dates_text" onClick={() => clearDates()}>Clear Dates</div>
			</div>
		</>
	)
}

export default DatePicker;