import { fetchListings, getListings } from '../../store/listings';
import './ListingsIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ListingIndexItem from './ListingIndexItem/ListingIndexItem';
import GMapsIndexButton from './GMapsIndexButton/GMapsIndexButton';
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import GMap from './GMap/GMap';
import Loading from './GMap/Loading/Loading';

const ListingsIndex = () => {
	const dispatch = useDispatch(); 
	const [showGMap, setShowGMap] = useState(false); 
	const [gMapDisplayStyle, setGMapDisplayStyle] = useState({
		display: 'none',
		position: 'none'
	});
	const listings = useSelector(getListings);
	
	useEffect(() => {
		dispatch(fetchListings());
	}, [])

	const handleMapClick = () => {
			setShowGMap(!showGMap);
	}

	useEffect(() => {		
		if (showGMap) {
			setGMapDisplayStyle({
				display: 'inline',
				position: 'fixed'
			})
		} else {
			setGMapDisplayStyle({
				display: 'none',
				position: 'none'
			});
		}
	}, [showGMap])

	const render = (status) => {
		switch (status) {
				case Status.LOADING:
						return <Loading />; 
				case Status.SUCCESS: 
						return <GMap />;
				default:
						return null;
		}
}

	return (
		<main id="listings_index_container">
			<div id="listings_index_wrapper">
				{listings.map(listing => {
					return <ListingIndexItem className="gridItem" key={listing.id} listing={listing}/>
				})}
			</div>
			<div onClick={() => handleMapClick()}> 
				<GMapsIndexButton />
			</div> 
			{showGMap &&
			<div style={gMapDisplayStyle} id="listings_index_map_wrapper">
				<Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} render={render}>
				</Wrapper>
			</div>}
		</main>
	)
}

export default ListingsIndex;