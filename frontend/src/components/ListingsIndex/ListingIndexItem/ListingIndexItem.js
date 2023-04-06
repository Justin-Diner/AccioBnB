import './ListingIndexItem.css';

const ListingIndexItem = ({listing}) => {
	return ( 
		<div id="listing_index_item_container">
								<div id="listing_index_item_image_wrapper"> 
					<img id="listing_index_item_image" src={require("../../../assets/places/hogwarts/hogwarts.jpg")}></img>
				</div>
			<div id="listing_index_item_wrapper">
				<div className="listing_index_item_textcontent" id="listing_index_item_state_and_ratings_wrapper">
					<div className="listing_index_item_textcontent" id="listing_index_item_title_and_state">{`${listing.city}, ${listing.state}`}</div>
					<div className="listing_index_item_textcontent" id="listing_index_item_rating">&#9733; 4.95</div>
				</div>
				<div className="listing_index_item_textcontent" id="listing_index_item_milesaway">74 miles away</div>
				<div className="listing_index_item_textcontent" id="listing_index_item_daterange">Dec 10 - 15</div>
				<div className="listing_index_item_textcontent" id="listing_index_item_nightlyprice"><b>{`${listing.nightlyPrice}`}</b> ` night</div>
			</div>
		</div>
	)
}

export default ListingIndexItem;