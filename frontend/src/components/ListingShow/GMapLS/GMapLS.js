import './GMapLS.css';
import GMapShow from './GMapShow/GMapShow';
import { Wrapper } from "@googlemaps/react-wrapper"

const GMapLS = ({listing}) => {
	return (
		<div id="GMapLS_container">
			<div id="GMapLS_wrapper">
				<div id="GMapLS_title">Where you'll be</div>
				<div id="GMapLS_map_wrapper">
					<Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
						<GMapShow listing={listing}/>
					</Wrapper>
				</div>
				<div id="GMapLS_city_state">{`${listing.city}`}, {`${listing.country}`}</div>
			</div>
		</div>
	)

}

export default GMapLS;