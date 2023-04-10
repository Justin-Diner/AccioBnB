

hogwarts = Listing.new({
	host_id: 1,
	street_address: "1234 Hogwarts Ave",
	title: "Hogwarts",
	zip_code: 11111,
	city: "New York",
	state: "New York",
	country: "United States",
	property_type: "castle",
	max_guests: 300, 
	nightly_price: 100000, 
	clearning_fee: 1000, 
	description: "Have a stay at Hogwarts Castle. It is one of the oldest magical castles in the world. Relive your school years with a nightly stay.",
	num_bathrooms: 40, 
	num_bedrooms: 38,
	num_beds: 300, 
	lat: 0, 
	long: 0
})

hagrids_hut = {
	id: 5,
	host_id: 1,
	street_address: "1234 Hagrid Ave",
	title: "Hagrid's Hut",
	zip_code: 11231,
	city: "New York",
	state: "New York",
	country: "United States",
	property_type: "Bedroom",
	max_guests: 5, 
	nightly_price: 100, 
	clearning_fee: 100, 
	description: "See all the magical creatures you can in this cozy one bedroom. Located in the prime location of Hogwarts, it is a steal.",
	num_bathrooms: 1, 
	num_bedrooms: 1,
	num_beds: 1, 
	lat: 0, 
	long: 0
}

# to Kill server: 
# lsof -wni tcp:5000
# kill -9 <PID>

#bundle lock --add-platform x86_64-linux