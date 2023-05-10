import './GMap.css';
import { useEffect, useState, useRef } from 'react';

const GMap = () => {
	const [gMap, setGMap] = useState();
	const ref = useRef();

	const initialCenterCoords = { lat: 51.5072, lng: 0.1276 };
  const zoomAmount = 8;

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