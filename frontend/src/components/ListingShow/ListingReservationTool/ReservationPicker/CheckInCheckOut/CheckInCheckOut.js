import './CheckInCheckOut.css'

const CheckInCheckOut = ({checkInDate, checkOutDate}) => {

	return (
		<div id="CICO_container">
			<div id="CICO_wrapper">
				<div id="check_in_wrapper">
				<div class="CICO_title" id="check_in_text">
						CHECK-IN
					</div>
					<input class="CICO_input_text" id="check_in_textbox" type="text" placeholder="Select Date" value={checkInDate}/>
				</div>
				<div id="check_out_wrapper">
					<div class="CICO_title" id="check_out_text">
						CHECKOUT
					</div>
					<input class="CICO_input_text" id="check_out_textbox" type="text" placeholder="Select Date" value={checkOutDate}/>
				</div>
			</div>
		</div>
	)
}

export default CheckInCheckOut;