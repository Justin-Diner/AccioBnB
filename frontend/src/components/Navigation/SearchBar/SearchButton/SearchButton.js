import './SearchButton.css'

const SearchButton = ({clickEvent}) => {
	return (
		<div id="search_button_wrapper" onClick={clickEvent}>
			<div id="search_button_background">
				<i className="fa-sharp fa-solid fa-magnifying-glass"></i>
			</div>
		</div>
	)
}

export default SearchButton;

