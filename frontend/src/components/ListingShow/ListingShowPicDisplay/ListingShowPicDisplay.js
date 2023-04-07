import './ListingShowPicDisplay.css'

const ListingShowPicDisplay = () => {
	return (
		<div id="LSPD_wrapper">
			<div className="LSPD_picture_item" id="LSPD_item_1" >
				<img id="listing_index_item_image" src={require("../../../assets/places/hogwarts/hogwarts.jpg")}></img>
			</div>
			<div className="LSPD_picture_item" id="LSPD_item_2" >
			<img id="listing_index_item_image" src={require("../../../assets/places/hogwarts/hogwarts.jpg")}></img>
			</div>
			<div className="LSPD_picture_item" id="LSPD_item_3" >
			<img id="listing_index_item_image" src={require("../../../assets/places/hogwarts/hogwarts.jpg")}></img>
			</div>
			<div className="LSPD_picture_item" id="LSPD_item_4" >
			<img id="listing_index_item_image" src={require("../../../assets/places/hogwarts/hogwarts.jpg")}></img>
			</div>
			<div className="LSPD_picture_item" id="LSPD_item_5" >
			<img id="listing_index_item_image" src={require("../../../assets/places/hogwarts/hogwarts.jpg")}></img>
			</div>
		</div> 
	)
}

export default ListingShowPicDisplay;