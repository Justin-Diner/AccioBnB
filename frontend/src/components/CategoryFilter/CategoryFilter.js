import './CategoryFilter.css'
import FilterIcon from './FilterIcon/FilterIcon';
import beachFront from '../../assets/icons/Beachfront.png'
import bolt from '../../assets/icons/bolt.png'
import castle from '../../assets/icons/castle.png'
import countrySide from '../../assets/icons/country_side.png'
import tent from '../../assets/icons/tent.png'
import bandb from '../../assets/icons/bandb.png'
import lovegood from '../../assets/icons/lovegood.png'
import lux from '../../assets/icons/lux.png'
import quidditch from '../../assets/icons/quidditch.png'

const CategoryFilter = () => {
	let iconImages = [[beachFront, "Beachfront"], [bolt, "Harry"], [lovegood, "Lovegood"], [quidditch, "Quidditch"], [castle, "Hogwarts"],  [lux, "Lux"], [bandb, "Bed and Breakfast"], [countrySide, "Countryside"], [tent, "Tents"], ];

	let displayedIcons = iconImages.map((tile, index) => {
		return <FilterIcon className="filter_icon_list_items" id={`icon_${tile[1]}`} key={index} image={tile[0]} text={tile[1]} searchInput={tile[1]} />
	})

	return ( 
		<>
			<div id="category_filter_container">
				<div id="category_filter_wrapper">
						{ displayedIcons }
				</div> 
			</div>
		</>
	)
}

export default CategoryFilter;