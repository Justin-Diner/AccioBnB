import './GMapShow.css';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

const GMapShow = ({ listing }) => {
	const [gMap, setGMap] = useState();
	const ref = useRef();
	const marker = useRef([]);

	const initialCenterCoords = { lat: Number(listing.lat), lng: Number(listing.long) };
	const iconImage = '../homeicon.png'
  const zoomAmount = 15;

	const createTheMap = (latitude, longitude) => {
		const initialMap = new window.google.maps.Map(ref.current, {
			center: { lat: latitude, lng: longitude},
			zoom: zoomAmount,
			gestureHandling:'greedy'
		})
		return initialMap;
	}
	
	useEffect(() => {
		const initialMap = createTheMap(initialCenterCoords.lat, initialCenterCoords.lng); 
		setGMap(initialMap);
	}, []);

	useEffect(() => {
			marker.current = 
				new window.google.maps.Marker({
					position: initialCenterCoords, 
					map: gMap, 
					icon: {
						url: iconImage,
						scaledSize: new window.google.maps.Size(84, 64),
						anchor: new window.google.maps.Point(42, 32)
					},
				});
			
			const circle = new window.google.maps.Circle({
				map: gMap, 
				radius: 400,
				strokeColor: "#FF385C",
				strokeOpacity: .01,
				fillColor: '#FF385C',
				center: marker.current.position
			})

			const infoWindow = new window.google.maps.InfoWindow({
				content: "Exact portkey location provided after booking.",
				position: initialCenterCoords
			})

			marker.current.addListener("mouseover", () => {
				infoWindow.open({
					anchor: marker.current,
					map: gMap
				})
			})
	}, [gMap]);

	return (
		<div id="GMap_main_container">
			<div id="map_wrapper">
				<div ref={ref} id="map" />
			</div>
		</div>
	)
}

export default GMapShow;