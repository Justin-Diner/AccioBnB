import { fetchListings, getListings } from '../../store/listings';
import './ListingsIndex.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ListingIndexItem from './ListingIndexItem/ListingIndexItem';

const ListingsIndex = () => {
	const dispatch = useDispatch(); 
	const listings = useSelector(getListings);
	
	useEffect(() => {
		dispatch(fetchListings());
	}, [])

	return (
		<main id="listings_index_container">
			<div id="listings_index_wrapper">
				{listings.map(listing => {
					return <ListingIndexItem className="gridItem" key={listing.id} listing={listing}/>
				})}
			</div>
		</main>
	)
}

export default ListingsIndex;