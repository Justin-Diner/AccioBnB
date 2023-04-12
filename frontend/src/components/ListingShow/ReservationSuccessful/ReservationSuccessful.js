import './ReservationSuccessful.css'
import ContinueButton from '../../Buttons/ContinueButton/ContinueButton';
import * as sessionAction from '../../../store/session';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ReservationSuccessful = () => {
	const sessionUser = useSelector(sessionAction.sessionUser);

	return (
		<div id="RSF_container">
			<div id="RSP_wrapper">
				<div id="RSP_congrats">Congratulations!</div>
				<div className="RSP_sentence" id="RSP_reservation_complete">Your reservation is complete. </div>
				<div className="RSP_sentence" id="RSP_title_line">You're heading to...</div>
				<div className="RSP_sentence" id="RSP_go_to_trips">Visit your trips page to view your reservations.</div>
				<Link to={`/users/${sessionUser?.id}/reservations`}>
					<div id="RSP_continue_wrapper">
						<ContinueButton textContent={"Continue"} />
					</div>
			</Link>
			</div>


		</div>
	)
}

export default ReservationSuccessful;