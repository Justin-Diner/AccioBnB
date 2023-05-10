require "open-uri"
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#ApplicationRecord.transaction do 
  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  Listing.destroy_all
	User.destroy_all
	

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
		property_types = ["House", "Apartment", "Castle", "Condo", "Room"]

		puts "Creating Users..."

		User.create!(
			first_name: "Harry",
			last_name: "Potter",
			email: "boywholived@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Squib",
			last_name: "Guest",
			email: "squib@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Hermione",
			last_name: "Grander",
			email: "hermione@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Ronald",
			last_name: "Weasley",
			email: "ronald@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Thomas",
			last_name: "Riddle",
			email: "thomas@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Lord",
			last_name: "Voldemort",
			email: "lordvoldemort@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Sirius",
			last_name: "Black",
			email: "sirius@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Albus",
			last_name: "Dumbledore",
			email: "albus@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Draco",
			last_name: "Malfoy",
			email: "draco@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Neville",
			last_name: "Longbottom",
			email: "neville@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Rubeus",
			last_name: "Hagrid",
			email: "rubeus@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Stan",
			last_name: "Shunpike",
			email: "stan@accio.com",
			password: "dumbledore"
		)

		User.create!(
			first_name: "Luna",
			last_name: "Lovegood",
			email: "luna@accio.com",
			password: "dumbledore"
		)

		puts "Attaching User Photos"

		User.find(1).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/harry_potter.jpg"),
			filename: "harry_potter.jpg"
		)

		User.find(2).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/capybara.jpg"),
			filename: "capybara.jpg"
		)

		User.find(3).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/hermione.jpg"),
			filename: "hermione.jpg"
		)

		User.find(4).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/ron_weasley.jpg"),
			filename: "ron_weasley.jpg"
		)

		User.find(5).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/thomas_riddle.jpg"),
			filename: "thomas_riddle.jpg"
		)

		User.find(6).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/voldemort.jpg"),
			filename: "voldemort.jpg"
		)
		User.find(7).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/sirius.jpg"),
			filename: "sirius.jpg"
		)
		User.find(8).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/dumbledore.jpg"),
			filename: "dumbledore.jpg"
		)
		User.find(9).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/draco_malfoy.jpg"),
			filename: "draco_malfoy.jpg"
		)
		User.find(10).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/neville.jpg"),
			filename: "neville.jpg"
		)
		User.find(11).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/hagrid.jpg"),
			filename: "hagrid.jpg"
		)
		User.find(12).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/stanshunpike.jpg"),
			filename: "stanshunpike.jpg"
		)

		User.find(13).photo.attach(
			io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/profilepics/lunalovegood.jpg"),
			filename: "lunalovegood.jpg"
		)

		#puts "Generating first and last names..."
		## Generating Names
		#names = [];
		#10.times do 
		#	name = Faker::Movies::HarryPotter.character
		#	while name.split(" ").length != 2 || name[0] === "Mrs."
		#		name = Faker::Movies::HarryPotter.character
		#	end
		#	names << name
		#end

		## Putting first and last names into an array
		#full_names = []
		#names.each do |name|
		#	splitName = name.split(" ")
		#	full_names << splitName
		#end

		## Creating Each User
		#full_names.each do |name|
		#	User.create!({
		#		first_name: name[0],
		#		last_name: name[1],
		#		email: Faker::Internet.email(name: name[0]),
		#		password: "password"
		#	})
		#end

		# Listings 
		ApplicationRecord.connection.reset_pk_sequence!('listings')
		puts 'Generating Hogwarts...'
		Listing.create!({
				host_id: 8,
				title: "Hogwarts - School of Witchcraft and Wizardry",
				street_address: "1 Hogwarts Ave",
				zip_code: 11111,
				city: "Hogwarts",
				state: "England",
				country: "Great Britain",
				property_type: "Castle",
				max_guests: 300, 
				nightly_price: 100000, 
				cleaning_fee: 1000, 
				description: "Welcome to Hogwarts, my dear guest. I am Albus Dumbledore, the Headmaster of this esteemed school of witchcraft and wizardry. Hogwarts is a magical place that has been standing tall for over a thousand years. Our castle boasts over 142 staircases, numerous secret passages, and a rich history that spans back to the founders, Godric Gryffindor, Salazar Slytherin, Rowena Ravenclaw, and Helga Hufflepuff.

				Upon your arrival, you will be sorted into one of our four esteemed houses, where you will make lifelong friendships and engage in a myriad of magical adventures. Our castle is equipped with everything you could possibly need, from cozy dormitories to spacious common rooms, to grand halls that host feasts and celebrations. As a guest of Hogwarts, you will have access to our vast library, which contains a wealth of knowledge on spells, magical creatures, and the history of the wizarding world. We look forward to welcoming you to Hogwarts, where you will experience magic like never before.",
				num_bathrooms: 40, 
				num_bedrooms: 38,
				num_beds: 300, 
				lat: Faker::Address.latitude, 
				long: Faker::Address.longitude
		})

		puts 'Generating Knightbus...'
		Listing.create!({
			host_id: 12,
			title: "Remodeled Quaint 1970s Double-Decker Bus",
			street_address: "3478 Smith Ave",
			zip_code: 10075,
			city: "Knight Bus",
			state: "TBD",
			country: "Great Britain",
			property_type: "Automobile",
			max_guests: 20, 
			nightly_price: 99, 
			cleaning_fee: 10, 
			description: "The Knight Bus is a magical triple-decker bus that offers a unique and exciting mode of transportation in the wizarding world. It operates mainly at night, catering to stranded witches and wizards who need to travel quickly and discreetly. The bus is able to navigate through London's narrow streets and magically pass through obstacles such as other vehicles or buildings, making for a thrilling and efficient ride.

			Inside, the Knight Bus is adorned with purple velvet curtains, and its seats are arranged in a dormitory-style setup. Passengers can also enjoy snacks and refreshments from the bus's conductor, who doubles as a helpful guide to the wizarding world. For those seeking a truly magical and unforgettable experience, a stay on the Knight Bus is a must-try on any wizarding traveler's itinerary.",
			num_bathrooms: 1, 
			num_bedrooms: 2,
			num_beds: 10, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating The Burrow...'
		Listing.create!({
			host_id: 4,
			title: "Magical Multi-Level Family Home",
			street_address: "3478 Weasley Lane",
			zip_code: Faker::Address.zip_code,
			city: "The Burrow",
			state: "Devon",
			country: "Great Britain",
			property_type: "Home",
			max_guests: 15, 
			nightly_price: 249, 
			cleaning_fee: 100, 
			description: "Welcome to The Burrow, the enchanting and cozy home of the Weasley family! Tucked away in the rolling hills of the English countryside, this unique home is a true hidden gem in the wizarding world. As you approach, you'll be greeted by the sight of a crooked and leaning house that seems to have been cobbled together over the years. Don't be fooled by its humble exterior, as inside, you'll discover a warm and welcoming space that has been magically expanded to fit the bustling family within.

			The Burrow is perfect for those seeking a one-of-a-kind experience in the wizarding world. You'll have access to the entire home, which includes several charming bedrooms, a cozy living room with a fireplace, a quirky kitchen that is always filled with the delightful aromas of homemade cooking, and a delightful garden where you can relax and take in the fresh air. You'll also have the opportunity to explore the surrounding countryside, which is filled with rolling hills, hidden forests, and charming villages.",
			num_bathrooms: 2.5, 
			num_bedrooms: 5,
			num_beds: 8, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating Cupboard Under the Stairs..'
		Listing.create!({
			host_id: 1,
			title: "Cupboard Under the Stairs",
			street_address: "4 Privet Drive",
			zip_code: Faker::Address.zip_code,
			city: "Watford",
			state: "England",
			country: "Great Britain",
			property_type: "Room",
			max_guests: 2, 
			nightly_price: 100, 
			cleaning_fee: 20, 
			description: "Welcome to the Cupboard Under the Stairs, a truly unique accommodation! As the childhood bedroom of the famous wizard, Harry Potter, this tiny room is full of character and charm. Tucked away under the stairs, this cozy space has been lovingly decorated to recreate the feeling of being in the wizarding world.

			While small in size, the Cupboard Under the Stairs is big on personality. You'll find a comfy cot, a tiny desk, lots of spiders, and even some wizarding books and trinkets to immerse yourself in the magical world. Though the space is compact, the location is ideal for exploring the charming neighborhood with its quaint shops and cafes, and for visiting nearby attractions like the Harry Potter Studio Tour in London. Come and stay in the Cupboard Under the Stairs for a one-of-a-kind Harry Potter experience that you'll never forget! You may even get your letter from Hogwarts!",
			num_bathrooms: 0, 
			num_bedrooms: 1,
			num_beds: 1, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating Chamber of Secrets..'
		Listing.create!({
			host_id: 5,
			title: "Cavernous Chamber of Secrets Under the Bathroom of Hogwarts",
			street_address: "12 Hogwarts Ave",
			zip_code: 10075,
			city: "Chamber of Secrets",
			state: "Hogwarts",
			country: "Great Britain",
			property_type: "Basement",
			max_guests: 20, 
			nightly_price: 200, 
			cleaning_fee: 50, 
			description: "Welcome to the Chamber of Secrets, a hidden gem nestled deep beneath the hallowed halls of Hogwarts School of Witchcraft and Wizardry. As a former student of Hogwarts and the heir to the Slytherin line, I have spent much of my life exploring the many mysteries and secrets of this ancient chamber. While it may be known for its dark past, I assure you that the Chamber of Secrets is a place of great wonder and beauty.

			As you step into the chamber, you'll be greeted by a breathtaking underground lake, where the gentle flicker of magical candles illuminates the water and casts an ethereal glow throughout the room. The walls are adorned with beautiful carvings and mosaics that tell the story of the wizarding world, and the air is thick with the hum of ancient magic. Whether you're a student of Hogwarts looking for a quiet place to study, or a curious traveler seeking adventure, the Chamber of Secrets is the perfect place for you.",
			num_bathrooms: 5, 
			num_bedrooms: 3,
			num_beds: 10, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating Gryffindor Common Room'
		Listing.create!({
			host_id: 8,
			title: "Gryffindor Common Room",
			street_address: "123 Hogwarts Ave",
			zip_code: 10075,
			city: "Gryffindor Common Room",
			state: "Hogwarts",
			country: "Great Britain",
			property_type: "Room",
			max_guests: 20, 
			nightly_price: 600, 
			cleaning_fee: 100, 
			description: "Welcome to the Gryffindor Common Room, a cozy and inviting space located within the historic walls of Hogwarts School of Witchcraft and Wizardry. As the home of some of the bravest and most daring students at Hogwarts, this common room exudes warmth, courage, and a sense of adventure.

			Upon entering the common room, you'll be greeted by a roaring fire, plush armchairs, and a lively atmosphere. The walls are adorned with the colors of Gryffindor and the house's proud crest, creating a welcoming and comforting environment. Whether you're seeking a space to relax and unwind after a long day of studying, or a place to gather with friends for a game of wizard's chess, the Gryffindor Common Room is the perfect spot for you. With easy access to the Hogwarts library and the Great Hall, this cozy space is the ideal hub for all your magical adventures at Hogwarts. So come and experience the magic of Gryffindor for yourself.",
			num_bathrooms: 5, 
			num_bedrooms: 3,
			num_beds: 10, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating Hagrids Hut'
		Listing.create!({
			host_id: 11,
			title: "Hut on Hogwarts Grounds. Wonderful forest view",
			street_address: "1234 Hogwarts Ave",
			zip_code: 10075,
			city: "Hagrids Hut",
			state: "Hogwarts",
			country: "Great Britain",
			property_type: "Home",
			max_guests: 5, 
			nightly_price: 250, 
			cleaning_fee: 80, 
			description: "Welcome to Hagrid's hut, a charming and rustic abode nestled within the magical grounds of Hogwarts School of Witchcraft and Wizardry. As the home of the beloved Hogwarts gamekeeper and Care of Magical Creatures professor, this cozy hut exudes warmth, friendliness, and a deep love of all things wild and wonderful.

			Step inside and you'll immediately feel at home in this cozy and inviting space. The hut is decorated with an eclectic mix of magical curiosities and rustic furnishings, creating a charming and unique atmosphere. Cozy up by the fire with a mug of hot cocoa, or explore the surrounding Forbidden Forest with Hagrid himself. Whether you're a fan of magical creatures, nature, or simply seeking a peaceful escape from the bustle of daily life, Hagrid's hut is the perfect spot for you. So come and experience the magic of this enchanting space for yourself.",
			num_bathrooms: 1, 
			num_bedrooms: 2,
			num_beds: 1, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating 12 Grimmauld Place'
		Listing.create!({
			host_id: 7,
			title: "Magical Townhouse Located at Grimmauld Place",
			street_address: "12 Grimmauld Place",
			zip_code: Faker::Address.zip_code,
			city: "12 Grummauld Place",
			state: "Islington",
			country: "Great Britain",
			property_type: "Townhouse",
			max_guests: 12, 
			nightly_price: 400, 
			cleaning_fee: 100, 
			description: "Welcome to 12 Grimmauld Place, a historic and grand townhouse located in the heart of London. As the former headquarters of the Order of the Phoenix, this impressive home has played a crucial role in the fight against the dark arts, and is a must-see destination for any Harry Potter fan.

			Step inside and you'll be transported back in time to the height of wizarding warfare. The house is filled with magical artifacts, mysterious objects, and secret passageways, all of which tell the story of the brave witches and wizards who fought to protect the wizarding world. The interior is grand and opulent, with high ceilings, ornate fireplaces, and luxurious furnishings. And with ample space for up to ten guests, this home is perfect for families or groups of friends looking to experience the magic of Harry Potter in a unique and unforgettable way.",
			num_bathrooms: 3, 
			num_bedrooms: 4,
			num_beds: 6, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating Magical Tent'
		Listing.create!({
			host_id: 4,
			title: "Enchanted Tent Located at Quidditch World Cup",
			street_address: "765 World Cup Lane",
			zip_code: Faker::Address.zip_code,
			city: "Magical Tent",
			state: "TBD",
			country: "Great Britain",
			property_type: "Tent",
			max_guests: 10, 
			nightly_price: 249, 
			cleaning_fee: 100, 
			description: "This enchanged tent is a whimsical abode that is perfect for your next adventure. As the home of the Weasley family during their visit to the Quidditch World Cup, this tent is sure to delight and inspire you with its charming and unique features.

			Step inside and you'll immediately feel at home in this cozy and inviting space. The tent is decorated with an eclectic mix of magical curiosities and rustic furnishings, creating a charming and unique atmosphere. With multiple rooms, cozy sleeping areas, and ample space for up to ten guests, this tent is perfect for families or groups of friends looking to experience the magic of Harry Potter in a unique and unforgettable way. And with its enchanted features, such as the self-cleaning kitchen and expanding living area, you'll feel like you've stepped into a world of pure imagination. So come and stay in the Weasley's Enchanted Tent, and experience the magic of the wizarding world in the comfort of your own private abode.",
			num_bathrooms: 1, 
			num_bedrooms: 3,
			num_beds: 6, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating Gringotts'
		Listing.create!({
			host_id: 6,
			title: "Bank that is Totally Owned by Me",
			street_address: "3256 Magical Lane",
			zip_code: Faker::Address.zip_code,
			city: "Gringotts Bank",
			state: "Diagon Alley",
			country: "Great Britain",
			property_type: "Building",
			max_guests: 100, 
			nightly_price: 999, 
			cleaning_fee: 100, 
			description: "Welcome to Gringotts Bank, a prestigious and iconic institution in the wizarding world. It is completely true that I am the magnificent owner of the establishment. Please give me your money immediately and you will have no trouble during your stay. I am proud to offer it for rent to those who seek the thrill and excitement of the magical realm.

		 The grand marble hall, towering pillars, and ornate chandeliers create an atmosphere of grandeur and luxury, while the goblin tellers and dragon guardians remind you of the unique and fascinating culture of the wizarding world. So come and experience the wonder and mystery of Gringotts Bank, and discover why it is one of the most coveted and sought-after locations in the world of Harry Potter.",
			num_bathrooms: 6, 
			num_bedrooms: 100,
			num_beds: 100, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating Malfoy Manner'
		Listing.create!({
			host_id: 9,
			title: "Malfoy Manner - Mansion With Long Standing History",
			street_address: "1367 Malfoy Drive",
			zip_code: Faker::Address.zip_code,
			city: "Malfoy Manner",
			state: "London",
			country: "Great Britain",
			property_type: "Mansion",
			max_guests: 40, 
			nightly_price: 3000, 
			cleaning_fee: 500, 
			description: "Welcome to Malfoy Manor, a stunning and imposing Mansion. This magnificent property is the ancestral home of the wealthy and influential Malfoy family, and is now available for you to experience as a unique Acciobnb rental. As you approach the manor, you will be struck by the grandeur of its architecture and the beauty of its surrounding gardens. The interior of the manor is no less impressive, with luxurious furnishings, ornate tapestries, and opulent decor that reflect the Malfoy family's taste for the finer things in life.

			Step inside and explore the many rooms of this historic home, including the elegant drawing room, the cozy library, and the spacious dining room where you can enjoy a delicious meal prepared by your own private chef. The bedrooms are equally impressive, with comfortable beds, plush linens, and exquisite antique furnishings that will transport you back in time.",
			num_bathrooms: 12, 
			num_bedrooms: 16,
			num_beds: 14, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts 'Generating Lovegood House'
		Listing.create!({
			host_id: 13,
			title: "Lovegood House - Home of the Quibbler",
			street_address: "4521 Lovegood Lane",
			zip_code: Faker::Address.zip_code,
			city: "Lovegood Home",
			state: "Devon",
			country: "Great Britain",
			property_type: "Home",
			max_guests: 10, 
			nightly_price: 499, 
			cleaning_fee: 130, 
			description: "Welcome to the whimsical and enchanting home of Luna Lovegood, located in the heart of the stunning Ottery St. Catchpole countryside. This unique Airbnb rental is the perfect retreat for those seeking a magical escape from the stresses of everyday life. As you step inside, you'll be transported to a world of wonder and imagination, with whimsical decor, colorful furnishings, and mystical touches throughout the home.

			Luna's home is also the headquarters of the beloved wizarding publication, the Quibbler magazine. As you explore the many rooms of the house, you'll discover stacks of past issues, as well as evidence of Luna's latest fantastical research and discoveries. Relax in the cozy living room, take a stroll through the magical gardens, or curl up with a book in one of the comfortable bedrooms.",
			num_bathrooms: 2.5, 
			num_bedrooms: 3,
			num_beds: 6, 
			lat: Faker::Address.latitude, 
			long: Faker::Address.longitude
		})

		puts "Attempting to seed photos"
		
		Listing.all.each_with_index do |listing, index|
			if (listing.id == 1) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/hogwarts/hogwarts#{num}.jpg"),
						filename: "hogwarts#{num}.jpg"
					)
				end
			elsif (listing.id == 2) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/knightbus/kb#{num}.jpg"),
						filename: "kb#{num}.jpg"
					)
				end
			elsif (listing.id == 3) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/burrow/burrow#{num}.jpg"),
						filename: "burrow#{num}.jpg"
					)
				end
			elsif (listing.id == 4) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/cupboard/cupboard#{num}.jpg"),
						filename: "cupboard#{num}.jpg"
					)
				end
			elsif (listing.id == 5) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/cos/cos#{num}.jpg"),
						filename: "cos#{num}.jpg"
					)
				end
			elsif (listing.id == 6) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/gcroom/gcroom#{num}.jpg"),
						filename: "gcroom#{num}.jpg"
					)
				end
			elsif (listing.id == 7) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/hagridshut/hh#{num}.jpg"),
						filename: "hh#{num}.jpg"
					)
				end
			elsif (listing.id == 8) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/grimmauld/grim#{num}.jpg"),
						filename: "grim#{num}.jpg"
					)
				end
			elsif (listing.id == 9) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/qtent/qtent#{num}.jpg"),
						filename: "qtent#{num}.jpg"
					)
				end
			elsif (listing.id == 10) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/gringotts/gringotts#{num}.jpg"),
						filename: "gringotts#{num}.jpg"
					)
				end
			elsif (listing.id == 11) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/malfoyman/malfoym#{num}.jpg"),
						filename: "malfoym#{num}.jpg"
					)
				end
			elsif (listing.id == 12) 
				(1..5).each do |num|
					listing.photos.attach(
						io: URI.open("https://acciobnb-seeds.s3.amazonaws.com/lovegood/lovegood#{num}.jpg"),
						filename: "lovegood#{num}.jpg"
					)
				end
			end
		end
				
		puts "Seeding Reviews"

		Review.create!({
			listing_id: 2,
			user_id: 1,
			description:"Who would have thought spending a night on the Knight Bus would be so much fun! Sure, it's not the most comfortable ride, but the driver, Stan, kept us entertained with his stories all night. It's a refreshing change from my usual accommodations at Hogwarts. I can definitely say that staying on a magical bus is now checked off my bucket list!",
			cleanliness: 3,
			accuracy: 4, 
			communication: 4, 
			location: 5, 
			check_in: 3,
			value: 3
		})

		Review.create!({
			listing_id: 2,
			user_id: 6,
			description: "I must say, the Knight Bus is surprisingly comfortable, despite my initial skepticism. While I did not find what I was looking for - Harry Potter - the accommodations were more than adequate for my needs. The driver, Stan, was a bit too chatty for my liking, but overall, it was a pleasant stay.",
			cleanliness: 2,
			accuracy: 4, 
			communication: 5, 
			location: 5, 
			check_in: 4,
			value: 4
		})

		Review.create!({
			listing_id: 1,
			user_id: 1,
			description: "Hogwarts is a truly magical place. The castle itself is breathtaking, with its winding staircases and hidden rooms. The professors are knowledgeable and passionate about their subjects, and there's always something new to learn. All in all, it's the perfect place for any aspiring wizard or witch.",
			cleanliness: 5,
			accuracy: 5, 
			communication: 5, 
			location: 5, 
			check_in: 5,
			value: 5
		})

		Review.create!({
			listing_id: 1,
			user_id: 3,
			description: "Staying at Hogwarts is an experience that every witch and wizard should have. The castle is full of history and magic. The library is a treasure trove of books, and the grounds are perfect for exploring. Overall, it's a truly enchanting place.",
			cleanliness: 5,
			accuracy: 5, 
			communication: 5, 
			location: 5, 
			check_in: 5,
			value: 5
		})

		Review.create!({
			listing_id: 1,
			user_id: 4,
			description: "The food in the Great Hall is fantastic, and the Quidditch matches are always a blast. If you're looking for a magical experience, there's no place quite like Hogwarts.",
			cleanliness: 5,
			accuracy: 5, 
			communication: 5, 
			location: 5, 
			check_in: 5,
			value: 5
		})

		Review.create!({
			listing_id: 3,
			user_id: 1,
			description: "The Burrow is the warmest, most welcoming home I've ever had the pleasure of staying in. Mrs. Weasley's cooking is second to none, and the cozy bedrooms make you feel right at home. The garden is full of surprises, and there's always something new to discover. All in all, it's the perfect place to stay for anyone looking for a true taste of wizarding hospitality.",
			cleanliness: 4,
			accuracy: 5, 
			communication: 4, 
			location: 4, 
			check_in: 5,
			value: 5
		})

		Review.create!({
			listing_id: 3,
			user_id: 9,
			description: "Place is a dump.",
			cleanliness: 2,
			accuracy: 3, 
			communication: 3, 
			location: 3, 
			check_in: 3,
			value: 3
		})

		Review.create!({
			listing_id: 5,
			user_id: 6,
			description: "This place is incredibly welcoming. It is absolutely not scary. You should definitley make a reservation and check it out. Especially you, Harry Potter. You have nothing to worry about.",
			cleanliness: 5,
			accuracy: 5, 
			communication: 5, 
			location: 5, 
			check_in: 5,
			value: 5
		})

		Review.create!({
			listing_id: 5,
			user_id: 1,
			description: "Do NOT listen to Voldemort. This place was incredibly smelly and did not advertise the giant BASILISK. Stay away. There are better places in Hogwarts to visit.",
			cleanliness: 2,
			accuracy: 1, 
			communication: 2, 
			location: 5, 
			check_in: 3,
			value: 1
		})

		Review.create!({
			listing_id: 4,
			user_id: 8,
			description: "Great place to stay in the summers.",
			cleanliness: 5,
			accuracy: 5, 
			communication: 5, 
			location: 5, 
			check_in: 5,
			value: 5
		})

		Review.create!({
			listing_id: 6,
			user_id: 13,
			description: "So whimsickle and magical. The narguls stay away. It's truly a great place to read and study. I can't wait for each year to camp there by the fire.",
			cleanliness: 5,
			accuracy: 5, 
			communication: 5, 
			location: 5, 
			check_in: 5,
			value: 5
		})
		
		Review.create!({
			listing_id: 6,
			user_id: 10,
			description: "The Gryffindor Common Room is a home away from home. The cozy fireplace and comfortable armchairs are perfect for relaxing after a long day of classes. And there's always a sense of camaraderie and support among the Gryffindors - it's a true community.",
			cleanliness: 5,
			accuracy: 5, 
			communication: 5, 
			location: 5, 
			check_in: 5,
			value: 5
		})



		#puts 'Generating 5 Listings'
		#5.times do 
		#	Listing.create({
		#		host_id: rand(1..10),
		#		title: Faker::Movies::HarryPotter.location, 
		#		street_address: Faker::Address.street_address,
		#		zip_code: Faker::Address.zip_code,
		#		city: Faker::Address.city,
		#		state: Faker::Address.state,
		#		country: "United States",
		#		property_type: property_types.sample,
		#		max_guests: rand(1..20),
		#		nightly_price: rand(200..2000), 
		#		cleaning_fee: rand(300..1000), 
		#		description: Faker::Movies::HarryPotter.quote, 
		#		num_bathrooms: rand(1..5),
		#		num_bedrooms: rand(1..10),
		#		num_beds: rand(1..20),
		#		lat: Faker::Address.latitude,
		#		long: Faker::Address.longitude
		#	})
		#	if Listing.last.errors.any?
		#		Listing.last.errors.full_messages.each do |message|
		#			puts message
		#		end
		#	end
		#	puts 'Listing Created'
		#end
		puts "Done!"
#end
