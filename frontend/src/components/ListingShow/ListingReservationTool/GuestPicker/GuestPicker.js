import GuestPickerOption from "./GuestPickerOption/GuestPickerOption";
import './GuestPicker.css'
import { useEffect, useState } from "react";

const GuestPicker = ({maxGuests, guestsChosenUpdater}) => {
	const [guestsChosen, setGuestsChosen] = useState(0);

	useEffect(() => {
		guestsChosenUpdater(guestsChosen);
	}, [guestsChosen])

	const updateGuestsChosen = (amount) => {
		setGuestsChosen(amount);
	}

	return (
		<div id="gp_container">
			<div id="gp_wrapper">
				<GuestPickerOption 
					title={"Adults"} 
					category={"Age 13+"} 
					guestsChosen={guestsChosen} 
					setterOfGuestsChosen={updateGuestsChosen}
					maxGuests={maxGuests}
				/>
				<GuestPickerOption 
					title={"Children"} 
					category={"Ages 2-12"} 
					guestsChosen={guestsChosen}
					setterOfGuestsChosen={updateGuestsChosen}
					maxGuests={maxGuests}
				/>
				<GuestPickerOption 
					title={"Infants"} 
					category={"Under 2"} 
					guestsChosen={guestsChosen} 
					setterOfGuestsChosen={updateGuestsChosen}
					maxGuests={maxGuests}
				/>
				{/*<GuestPickerOption 
					title={"Pets"} 
					category={"Bringing a service animal?"} 
					/>*/}

				<div id="gp_guest_warning">This place has a maximum of <span id="gp_max_guest_warning">{maxGuests}</span> guests, not including owls or cats.
				</div>
			</div>
		</div>
	)
}

export default GuestPicker