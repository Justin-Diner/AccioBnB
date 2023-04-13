import './Socials.css'

const Socials = () => {
	return (
		<div id="socials_container">
			<div id="socials_wrapper">
				<a href="https://www.linkedin.com/in/justin-diner/">
				<div className="socials_both_wrapper" id="socials_linkedIn_wrapper">
					<i className="fa-brands fa-linkedin"></i>
				</div>
				</a>
				<a href="https://github.com/Justin-Diner">
					<div className="socials_both_wrapper" id="socials_github_wrapper">
						<i className="fa-brands fa-github"></i>
					</div>
				</a>
			</div>
		</div>
	)
}

export default Socials; 