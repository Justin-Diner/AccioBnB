import './SettingsOptions.css'

const SettingsOptions = () => {
	return (
		<div id="settings_options_container">
			<div id="settings_options_background">
					<i class="fa-solid fa-bars"></i>
					<img id="profile_image" src={require("../../../assets/profile_icon.png")}></img>
				</div>
		</div>
	)
}

export default SettingsOptions;