import './ThreeFacts.css'
import ThreeFactsItem from './ThreeFactsItem/ThreeFactsItem';

const ThreeFacts = ({host}) => {
	return (
		<div id="tf_container">
			<div className="tf_item" id="tf_ci_wrapper">
				<ThreeFactsItem type="check in"/> 
			</div>
			<div className="tf_item" id="tf_superhost_wrapper">
				<ThreeFactsItem host={host} type="superhost"/> 
			</div> 
			<div className="tf_item" id="tf_cancel_wrapper">
				<ThreeFactsItem type="cancellation"/> 
			</div>
		</div>

	)
}

export default ThreeFacts; 