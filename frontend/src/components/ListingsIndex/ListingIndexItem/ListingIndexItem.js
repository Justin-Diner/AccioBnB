import './ListingIndexItem.css';
import { Link } from 'react-router-dom';
import { calculateRating } from '../../utils/Utils';
import ImageSlider from '../ImageSlider/ImageSlider';

const ListingIndexItem = ({listing}) => {
	let titlePhoto = listing?.photosUrl;

	return ( 
		<Link id="listing_index_item_link" to={`/listings/${listing.id}`}>
		    <div id="listing_index_item_container">
                <div id="listing_index_item_image_wrapper">
                    <ImageSlider photoUrls={titlePhoto} /> 
                </div>
                <div className="listing_index_item_textcontent" id="listing_index_item_state_and_ratings_wrapper">
                    <div className="listing_index_item_textcontent" id="listing_index_item_title_and_state">{`${listing.city}, ${listing.state}`}</div>
                    <div className="listing_index_item_textcontent" id="listing_index_item_rating">&#9733; {calculateRating(listing.overallRating)}</div>
                </div>
                <div className="listing_index_item_textcontent" id="listing_index_item_milesaway">{(Math.floor(Math.random() * 130) + 1).toString()} miles away</div>
                <div className="listing_index_item_textcontent" id="listing_index_item_daterange">Dec 10 - 15</div>
                <div className="listing_index_item_textcontent" id="listing_index_item_nightlyprice">
                    <div id="listing_index_item_price_only">
                        ${`${listing.nightlyPrice.toLocaleString()}`}
                    </div>
                <div>
                    night
                </div>
            </div>
		</div>
		</Link>
	)
}

export default ListingIndexItem;