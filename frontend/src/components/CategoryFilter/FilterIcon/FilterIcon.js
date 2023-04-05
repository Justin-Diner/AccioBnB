import './FilterIcon.css';

const FilterIcon = ({image, text}) => {
	return (
		<>
			<div id="filterIcon_wrapper">
				<img id="filterIcon_image" src={image}></img>
				<div id="filterIcon_text">{text}</div>
			</div>
		</>
	)
}

export default FilterIcon;