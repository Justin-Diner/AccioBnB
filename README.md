# Welcome to the Magical World of AccioBnB.  

[Click here to visit the live site. Accio AccioBnB!](https://acciobnb.onrender.com/)

# Introduction
AccioBnB is a clone of AirBnB at the time of creation. AirBnB is a home rental service that allows hosts the ability the rent out their proprierties at certain prices and the user can make reservations to stay at their homes. Users are able to make a reservation and leave reviews of their stay. The technologies implemented in this project include:

* Languages: JavaScript, Ruby, HTML, CSS 
* Frontend and State Management: React, React-Redux, Google Maps JavaScript API
* Database: PostgreSQL
* Hosting: Render 
* Asset Storage: AWS Simple Cloud Stoage (S3) with IAM user permissions.  

# Account Creation
Users are able to explore the site without being signed up. However, they are prompted to sign in when required to do so. Once prompted, users are able to create an account, log into their own account, or login as a demo user. As a demo user, you are able to experience the site's full functionality. Error handling and password protection is included in the sign in. The user receives errors if they do not pass database and validation checks (handled by the Ruby on Rails backend) and displayed on the login page. 

The login and account creation forms are modals. The modals are available in all portions of the site and use the application's front-end state to determine whether or not they should be displayed. The "ui" slice of state has its own reducer and keeps track of whether a modal should or should not be shown. The modal component itself also utilizes the React useState hook to keep track of whether it should be shown. 

![Introduction Gif](./acciointro.gif)

```js 
const uiReducer = (state = {}, action) => {
	const nextState = {...state};

	switch(action.type) {
		case RECEIVE_SIGNUP_MODAL:
			nextState.signUpModal = action.modalState;
			return nextState
		case RECEIVE_LOGIN_MODAL: 
		nextState.logInModal = action.modalState;
			return nextState;
		case RECEIVE_RESERVATION_MODAL:
			nextState.reservationModal = action.modalState
			return nextState
		case RECEIVE_CREATE_REVIEW_MODAL:
			nextState.createReviewModal = action.modalState
			return nextState;
		default: 
			return state; 
	}
}
```

# Listings 
The main landing page of AccioBnB displays the site's listings, including a search bar and details about each listing. Clicking on a listing redirects the user to the individual listing's show page. The listing show page includes pictures of the listing, a description, the host, comments, ratings, Google Maps, and more. It also includes the ability to the make a reservation. 

![Listing Show](listingshow.jpg)

Notably, the ListingShow page houses information from mutliple database sources in order to display the listing, host, and review information. It utilizes useSelector and useParams hooks to grab infomration. 

```js
const ListingShow = () => {
 const dispatch = useDispatch();
 const sessionUser = useSelector(sessionAction.sessionUser);
 const { listingId } = useParams(); 
 const listing = useSelector(getListing(listingId));
 const hostId = listing ? listing.hostId : null;
 const host = useSelector(state => state.users ? state.users[hostId] : null);
 const users = useSelector(retrieveUsers);
 const reviews = useSelector(getReviews)

```

# Reservations 
Each listing's show page includes the reservation tool. It is one of the more intricate tools in the application, utilized in multiple places, and consists of multiple interconnected React componenets. You are only able to make a reservation if you are logged in. The user inputs the dates in which they would like to stay and the amount of guests that they are bringing. Each host sets the maximum number of guests and the reservation tool does not allow the user to bring more guests than the max amount allowed (as described when creating a listing). Additionally, users are unable to input dates prior to current date. Once the user makes a successful reservation, they are able to see their listing in their own reservations show page. If not logged in, this page will be empty and direct the user to the index. The reservation show page lists details about each reservation and the user is able to click on their reservation which redirects the user back to that listing.

![Reservation Tool](reservationtool.jpg)

Of note, the ReservationPicker component has to receive data from its child DatePicker component (the calendar component). The DatePicker component receives the setter functions of the ReservationPicker's state and utilzes those setter functions to set the state of the check in and check out dates that the user selected. This allows three componenets to pass data and interact dynamically. This includes the ReservationPicker (the parent reservation component), the first-child date selected component, and second-child DatePicker component. As a result, the dates chosen by the user for their stay are displayed in multiple places, dynamically. 
```js 
const ReservationPicker = ({chooseCheckInDate, chooseCheckOutDate, chooseShowReservationPicker}) => {
	const [checkInDateText, setCheckInDateText] = useState("") 
	const [checkOutDateText, setCheckOutDateText] = useState("") 

	useEffect(() => {
		if (checkInDateText) {
			updateCheckInDateText(checkInDateText);
			chooseCheckInDate(checkInDateText);
		}

		if (checkOutDateText) {
			updateCheckOutDateText(checkOutDateText);
			chooseCheckOutDate(checkOutDateText);
		}
	}, [checkInDateText, checkOutDateText])

	const updateCheckInDateText = (date) => {
		setCheckInDateText(date);
	}

	const updateCheckOutDateText = (date) => {
		setCheckOutDateText(date);
	}

	const closeReservationPicker = () => {
		chooseShowReservationPicker(false);
	}

	return (
		<div id="dp_container">
			<div id="dp_top_options">
				<div id="dp_top_selectdates">
					Select Dates
				</div>
				<div id="dp_top_checkin_checkout">
					<CheckInCheckOut checkInDate={checkInDateText} checkOutDate={checkOutDateText}/>
				</div>
			</div>
			<div id="dp_top_datepicker_wrapper">
				<DatePicker chooseCheckInDate={updateCheckInDateText} chooseCheckOutDate={updateCheckOutDateText} />
			</div>
			<div id="dp_bottom_row_wrapper">
				<div id="dp_close_button" onClick={closeReservationPicker}>Close</div>
			</div>
			<div id="dp_margin_bottom"> </div>
		</div>
	)
}
```

```js 
const DatePicker = ({chooseCheckInDate, chooseCheckOutDate}) => {
	const [selected, setSelected] = useState({}); 
	let checkInDate = "";
	let checkOutDate = "";
	let datePrompt = <div>Please select your check-in date.</div>

```

# Google Maps 
The application utlizes Google Maps in two areas: (1) on the initial listings/index page and on each individual listing show page. On the listings/index page, Google Maps is available through the push of a button that is centered on the bottom. When a user clicks the button, it changes to the map on a fixed view. The map displays the price of each listing on the map and links to that individual listing's show page. This is exactly what Airbnb does as well.  On the listing show page, there is an area with a Google Map that shows approximately where the location will be. A custom Google Maps InfoWindow is used to display the text "Exact Portkey location procided after booking." 

# Reviews 
Users who are not logged in are able to view reviews on each listing's show page, but are unable to make their own comments. Once logged in, users are able to write reviews of the properties they have "stayed" at. The user can rate the property, and leave a description of their stay. The user can post their review which is displayed on the listing's show page. If the user is the author, they are able to delete and edit the review. If they are not the author they are unable to delete or edit the review. They are also unable to delete any reviews if they are not logged in. 

![reviews](reviews.jpg)

```js
const Reviews = ({users}) => {
	const {listingId} = useParams();
	const dispatch = useDispatch();
	const reviews = useSelector(getReviews);
	let content;

	useEffect(() => {
		dispatch(fetchListingReviews(listingId));
	}, [dispatch, listingId])

	if (reviews.length) {
		let pertinentReviews = [];

		reviews.forEach((review) => {
			let reviewAuthor = users.find((user) => user.id === review.userId)
			if (review.listingId === parseInt(listingId)) {
				pertinentReviews.push(<IndividualReview key={review.id} review={review} user={reviewAuthor} />)
			}
		})
		content = pertinentReviews;
	}

	return ( 
		<div id="reviews_container">
			{content}
		</div>
	)
}
```

# Search Bar 

To Do 

# User Profiles 

To Do 

# Additional Features:
# Continue Button
The continue button is one of the most reusable components in the application. The component renders its color dynamically based on mouse hover location. It takes two items as props: (1) a ```clickFunction``` that is invoked when the component is clicked and (2) ```textContent``` that displays the text on the button. This reusable component adds a consistent style throughout the website. 

```js
import React, { useState } from "react"
import './ContinueButton.css'

const ContinueButton = ({clickFunction, textContent}) => {
	const [hoverStylePos, setHoverStylePos] = useState({x: 0, y: 0});
	const [isHovering, setIsHovering] = useState(false)
	const [styles, setStyles] = useState({});

	const submitHover = (e) => {
		setIsHovering(true);
		let location = {
			x: e.clientX,
			y: e.clientY
		}
		setHoverStylePos(location);
		setStyles({ 
			backgroundPosition: hoverStylePos.x.toString() + "px , " + hoverStylePos.y.toString() + "px"}
		);
	};

	return (
		<div 
			onClick={clickFunction}
			id={isHovering ? "login_button_hover" : "login_button"} 
			onMouseMove={(e) => submitHover(e)}
			onMouseLeave={() => setIsHovering(false)}
			style={styles}
			> {textContent}
		</div>
	)
}

export default ContinueButton;

