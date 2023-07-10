import './FilterIcon.css';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../../store/search';

const FilterIcon = ({image, text, searchInput}) => {
	const dispatch = useDispatch(); 

	const handleClick = () => {
		let lowerSearchInput = searchInput.toLowerCase();

		if (lowerSearchInput === "tents") {
			lowerSearchInput = "tent";
		}

		if (lowerSearchInput === "beachfront") {
			lowerSearchInput = "hogwarts";
		}

        if (lowerSearchInput === "lovegood") {
            lowerSearchInput = "lovegood";
        }

        if (lowerSearchInput === "bed and breakfast") {
            lowerSearchInput = "breakfast"
        }

        if (lowerSearchInput === "quidditch") {
            lowerSearchInput = "tent"
        }


		dispatch(fetchSearchResults(lowerSearchInput))
	}

	return (
		<>
			<div id="filterIcon_wrapper" onClick={handleClick}>
				<img id="filterIcon_image" src={image}></img>
				<div id="filterIcon_text">{text}</div>
			</div>
		</>
	)
}

export default FilterIcon;