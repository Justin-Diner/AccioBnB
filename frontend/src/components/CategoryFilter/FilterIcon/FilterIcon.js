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