import './GMap.css';
import { useEffect, useState, useRef, Children } from 'react';
import { useSelector } from 'react-redux';
import { getListings } from '../../store/listings';
import { NavLink } from 'react-router-dom';

const GMap = () => {
	const [gMap, setGMap] = useState();
	const ref = useRef();
	const markers = useRef([]);
	const listings = useSelector(getListings);
	const oval = './whiteoval.png'

	const initialCenterCoords = { lat: 54.11389, lng: -4.59445 };
  const zoomAmount = 6;

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
		markers.current = [];
		listings.forEach(listing => {
			const listingLat = Number(listing.lat);
			const listingLng = Number(listing.long);
			const position = {lat: listingLat, lng: listingLng};
			const place = listing.city
			const currentMarker = new window.google.maps.Marker({
				position: position, 
				map: gMap, 
				title: place,
				label: {
					text: '$' + listing.nightlyPrice.toLocaleString(),
					color: 'black',
					fontSize: '15px',
					fontWeight: 'bold'
				},
				icon: {
					url: oval,
					scaledSize: new window.google.maps.Size(80, 38)
				},
				optimized: false,
				url: `/listings/${listing.id}`
			})
			
			window.google.maps.event.addListener(currentMarker, 'click', function() {
				window.location.href = currentMarker.url;
			});
		})
	}, [gMap])

	return (
		<div id="GMap_main_container">
			<div id="map_wrapper">
				<div ref={ref} id="map" />
			</div>
		</div>
	)
}

export default GMap;