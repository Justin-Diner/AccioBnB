import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListing, fetchListing } from "../../store/listings";
import { useParams } from "react-router-dom";

const ListingShow = () => {
 const dispatch = useDispatch();
 const { listingId } = useParams(); 

 const listing = useSelector(getListing(listingId));
 console.log(listing);
 useEffect(() => {
	dispatch(fetchListing(listingId));
 }, [listingId]);

 return (
	<>
		<p>hello</p>
	</>
 )
}

export default ListingShow;