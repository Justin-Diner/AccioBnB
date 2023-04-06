import './ListingIndexItem.css';

const ListingIndexItem = ({listing}) => {
	return ( 
		<div id="listing_index_item_container">
			<div id="listing_index_item_wrapper">
				<div id="listing_index_item_state_and_ratings_wrapper">
				<div id="listing_index_item_title_and_state">{`${listing.city}, ${listing.state}`}</div>
				<div id="listing_index_item_rating">* 4.95</div>
				</div>
				<div id="listing_index_item_milesaway">74 miles away</div>
				<div id="listing_index_item_daterange">Dec 10 - 15</div>
				<div id="listing_index_item_nightlyprice">{`$${listing.nightlyPrice} night`}</div>
			</div>
		</div>
	)
}

export default ListingIndexItem;