import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'
import * as uiActions from '../../store/ui'

const ProfileButton = ({ user }) => {
	const dispatch = useDispatch(); 
	const [showMenu, setShowMenu] = useState(false);

	useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

	const openMenu = () => {
		if (showMenu) return; {
			setShowMenu(true);
		}
	}

	const logout = (e) => {
    e.preventDefault();
		dispatch(uiActions.receiveLogInModal(false));
		dispatch(uiActions.receiveSignUpModal(false));
    dispatch(sessionActions.logout());
  };

 return (
	<>
		<button onClick={openMenu} id="bolt_icon_parent">
			<i class="fa-solid fa-bolt"></i>
		</button>
		{showMenu && (
			<ul className="profile_dropdown">
				<li>{`${user.firstName} ${user.lastName}`}</li>
				<li>{user.email}</li>
				<li>
					<button onClick={logout}>Log Out</button>
				</li>
			</ul>
		)}
	</>
 )
}

export default ProfileButton;