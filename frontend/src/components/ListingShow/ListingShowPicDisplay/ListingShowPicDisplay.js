import './ListingShowPicDisplay.css'
import { useEffect } from 'react';

const ListingShowPicDisplay = ({listing}) => {
	const listingUrls = listing.photosUrl;

	const listingImages = () => {
		for (let i = 0; i < 5; i++) {
			
			<div className="LSPD_picture_item" id="LSPD_item_1" >
				<img id="listing_index_item_image" src={listingUrls[i]}></img>
			</div>
		}
	}

	return (
		<div id="LSPD_wrapper">
			<div className="LSPD_picture_item" id="LSPD_item_1" >
				<img className="listing_index_item_image" alt="image_1" src={listingUrls[0]}></img>
			</div>
			<div className="LSPD_picture_item" id="LSPD_item_2" >
				<img className="listing_index_item_image" alt="image_2" src={listingUrls[1]}></img>
			</div>
			<div className="LSPD_picture_item" id="LSPD_item_3" >
				<img className="listing_index_item_image" alt="image_3" src={listingUrls[2]}></img>
			</div>
			<div className="LSPD_picture_item" id="LSPD_item_4" >
				<img className="listing_index_item_image" alt="image_4" src={listingUrls[3]}></img>
			</div>
			<div className="LSPD_picture_item" id="LSPD_item_5" >
				<img className="listing_index_item_image" alt="image_5" src={listingUrls[4]}></img>
			</div>
		</div> 
	)
}

export default ListingShowPicDisplay;