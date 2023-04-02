import './StandardFormButton.css';

const StandardFormButton = ({clickFunction, text}) => {
	return (
		<div
			class="form_button"
			onClick={clickFunction}
		>
			{text}
		</div>
	)
}

export default StandardFormButton;