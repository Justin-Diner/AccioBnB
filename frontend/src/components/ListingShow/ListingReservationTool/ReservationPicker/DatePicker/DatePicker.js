import { DayPicker, DateRange, ModifiersStyles} from 'react-day-picker';
import { addDays, format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { useState } from 'react';


const DatePicker = () => {
	const [selected, setSelected] = useState({}); 
	let datePrompt = <div>Please select your check-in date.</div>

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
				{format(selected?.from, 'PPP')} - {format(selected?.to, 'PPP')}
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
		<div>{datePrompt}</div>
		</>
	)

}

export default DatePicker;