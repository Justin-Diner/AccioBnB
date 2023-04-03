import './StandardFormButton.css';

const StandardFormButton = ({clickFunction, text}) => {
	return (
		<div
			className="form_button"
			onClick={clickFunction}
		>
			{text}
		</div>
	)
}

export default StandardFormButton;