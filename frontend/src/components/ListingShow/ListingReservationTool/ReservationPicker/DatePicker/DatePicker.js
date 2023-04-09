import { DayPicker, DateRange, ModifiersStyles} from 'react-day-picker';
import { addDays, format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useState, useEffect } from 'react';
import './DatePicker.css'


const DatePicker = ({chooseCheckInDate, chooseCheckOutDate}) => {
	const [selected, setSelected] = useState({}); 
	let datePrompt = <div>Please select your check-in date.</div>
	let checkInDate = "";
	let checkOutDate = "";
	
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
	

	//useEffect(() => {
	//	if (selected) {
	//		let checkInDate = format(selected?.to, 'yyyy-MM-dd')
	//		console.log(checkInDate);
	//	}
	//}, [selected])

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
			datePrompt = <p>{format(selected?.from, 'PPP')}</p>
		} else if (selected?.to) {
			datePrompt = <p>
				You're reserving: {format(selected?.from, 'PPP')} - {format(selected?.to, 'PPP')}
				</p>
		}
	} 

	return (
		<>
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
		<div id="bottom_prompt"> 
			<div>{datePrompt}</div>
		</div>
		</>
	)

}

export default DatePicker;