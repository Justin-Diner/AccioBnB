import './SearchBar.css'
import SearchButton from './SearchButton/SearchButton';


const SearchBar = () => {
 return (
	<div id="search_bar_wrapper">
		<div id="search_bar">
			<div></div>
			Search
			<SearchButton />
		</div> 
	</div>
 )
}

export default SearchBar;