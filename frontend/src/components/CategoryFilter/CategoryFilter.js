import './CategoryFilter.css'
import FilterIcon from './FilterIcon/FilterIcon';
import beachFront from '../../assets/icons/Beachfront.png'
import bolt from '../../assets/icons/bolt.png'
import castle from '../../assets/icons/castle.png'
import countrySide from '../../assets/icons/country_side.png'
import tent from '../../assets/icons/tent.png'

const CategoryFilter = () => {
	let iconImages = [[beachFront, "Beachfront"], [bolt, "Harry"], [castle, "Hogwarts"], [countrySide, "Countryside"], [tent, "Tents"]];

	let displayedIcons = iconImages.map((tile, index) => {
		return <FilterIcon className="filter_icon_list_items" id={`icon_${tile[1]}`}key={index} image={tile[0]} text={tile[1]} />
	})

	console.log(displayedIcons);


	//let imageUrl = '../../../assets/icons/Beachfront.png';
	return ( 
		<>
				<div id="category_filter_wrapper">
						{displayedIcons}
				</div> 
		</>
	)
}

export default CategoryFilter;