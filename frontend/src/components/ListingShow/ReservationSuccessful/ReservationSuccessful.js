import './ReservationSuccessful.css'
import ContinueButton from '../../Buttons/ContinueButton/ContinueButton';
import * as sessionAction from '../../../store/session';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { retrieveReservationModalState } from '../../../store/ui';
import { receiveReservationSuccessModal } from '../../../store/ui';

const ReservationSuccessful = () => {
	const dispatch = useDispatch(); 
	const [showing, setShowing] = useState(false);
	const sessionUser = useSelector(sessionAction.sessionUser);
	const reservationSuccessState = useSelector(retrieveReservationModalState)

	useEffect(() => {
		if (reservationSuccessState || showing) {
			setShowing(true)
		}
	}, [reservationSuccessState])
 
	if (!showing) {
		return 
	}

	const closeWindow = () => {
		dispatch(receiveReservationSuccessModal(false));
		setShowing(false);
	}

	if (showing) {
		window.addEventListener("click", closeWindow)
	}

	const handleClick = (e) => {
		e.stopPropagation();
	}

	return (
		<div id="RSF_location_modal">
			<div id="RSF_container" onClick={(e) => handleClick(e)}>
				<div id="RSP_wrapper">
					<div id="RSP_congrats">Congratulations!</div>
					<div className="RSP_sentence" id="RSP_reservation_complete">Your reservation is complete. </div>
					{/*<div className="RSP_sentence" id="RSP_title_line">You're heading to...</div>*/}
					<div className="RSP_sentence" id="RSP_go_to_trips">Visit your trips page to view your reservations.</div>
					
						<div id="RSP_continue_wrapper">
						<Link to={`/users/${sessionUser?.id}/reservations`} onClick={closeWindow}>
							<ContinueButton textContent={"Accio Trips!"} />
							</Link>
						</div>
				</div>
			</div>
		</div>
	)
}

export default ReservationSuccessful;