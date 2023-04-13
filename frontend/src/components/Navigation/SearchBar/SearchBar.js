import './SearchBar.css'
import SearchButton from './SearchButton/SearchButton';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { fetchSearchResults } from '../../../store/search';

const SearchBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [searchText, setSearchText] = useState("");

	async function handleSearch(e) {
		e.preventDefault(); 
		const query = e.target.value;
		await setSearchText(query);
		dispatch(fetchSearchResults(query));
	}

	function handleSearchSubmit(e) {
		e.preventDefault();
		if (searchText.length > 0) {
			history.push(`/search?listings=${searchText}`)
		}
	}

 return (
	<div id="search_bar_wrapper">
		<div id="search_bar">
			<input onChange={handleSearch} type="text" placeholder="Search"></input>
			<div></div>
			<button onClick={handleSearchSubmit}>Search</button>
			<SearchButton />
		</div> 
	</div>
 )
}

export default SearchBar;