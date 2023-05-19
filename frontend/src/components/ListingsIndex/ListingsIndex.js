import { fetchListings, getListings } from '../../store/listings';
import './ListingsIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ListingIndexItem from './ListingIndexItem/ListingIndexItem';
import GMapsIndexButton from './GMapsIndexButton/GMapsIndexButton';
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import GMap from '../GMap/GMap';
import Loading from '../GMap/Loading/Loading';
import { getSearchResults } from '../../store/search';

const ListingsIndex = () => {
	const dispatch = useDispatch(); 
	const [showGMap, setShowGMap] = useState(false); 
	const [gMapDisplayStyle, setGMapDisplayStyle] = useState({
		display: 'none',
		position: 'none'
	});
	const [displayedListings, setDisplayedListings] = useState([]);
	const listings = useSelector(getListings);
	const searchResults = useSelector(getSearchResults);
	
	useEffect(() => {
		dispatch(fetchListings());
	}, [])

	useEffect(() => {
		const initialListings = listings.map(listing => {
			return <ListingIndexItem className="gridItem" key={listing.id} listing={listing}/>
		})
		setDisplayedListings(initialListings);
	}, [listings])

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

	useEffect(() => {
			let listingResults = [];
		
			if (searchResults != null && searchResults.length) {
				let currentListing;
		
				searchResults.forEach(result => {
					currentListing = listings.find(listing => listing.id === result.id)
					listingResults.push(currentListing);
				})
				let listingResultsIndexItems = listingResults.map(listing => {
					return <ListingIndexItem className="gridItem" key={listing.id} listing={listing}/>
				})
				setDisplayedListings(listingResultsIndexItems);
			}
	}, [searchResults])

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
				{displayedListings}
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