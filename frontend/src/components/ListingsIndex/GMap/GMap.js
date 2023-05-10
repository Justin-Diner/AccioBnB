import './GMap.css';
import { useEffect, useState, useRef } from 'react';

const GMap = () => {
	const [gMap, setGMap] = useState();
	const ref = useRef();

	const initialCenterCoords = { lat: 40.73630, lng: -73.99379 };
  const zoomAmount = 16;

	const createTheMap = (latitude, longitude) => {
		const initialMap = new window.google.maps.Map(ref.current, {
			center: { lat: latitude, lng: longitude},
			zoom: zoomAmount,
		})
		return initialMap;
	}
	
	useEffect(() => {
		const initialMap = createTheMap(initialCenterCoords.lat, initialCenterCoords.lng); 
		setGMap(initialMap);
	}, []);

	return (
		<div id="GMap_main_container">
			<div id="map_wrapper">
				<div ref={ref} id="map" />
			</div>
		</div>
	)
}

export default GMap;