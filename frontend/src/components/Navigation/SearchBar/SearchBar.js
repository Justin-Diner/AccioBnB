import './SearchBar.css'
import SearchButton from './SearchButton/SearchButton';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { fetchSearchResults, getSearchResults } from '../../../store/search';

const SearchBar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [searchText, setSearchText] = useState("");
	const searchResults = useSelector(getSearchResults);

	async function handleSearch(e) {
		e.preventDefault(); 
		const query = e.target.value;
		await setSearchText(query);
	}

	async function handleSearchSubmit(e) {
		e.preventDefault();
		const searchQuery = searchText.toLowerCase();
		dispatch(fetchSearchResults(searchQuery));
	}

 return (
	<div id="search_bar_wrapper">
		<div id="search_bar">
			<input id="SB_input" onChange={handleSearch} type="text" placeholder="Start Your Search"></input>
			<div></div>
			<SearchButton clickEvent={handleSearchSubmit} />
		</div> 
	</div>
 )
}

export default SearchBar;