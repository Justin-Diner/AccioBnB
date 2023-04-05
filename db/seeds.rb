# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
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
			email: "boywholived@potter.com",
			password: "password"
		)

		User.create!(
			first_name: "Squib",
			last_name: "Guest",
			email: "squib@demouser.com",
			password: "password"
		)

		puts "Generating first and last names..."
		# Generating Names
		names = [];
		10.times do 
			name = Faker::Movies::HarryPotter.character
			while name.split(" ").length != 2 || name[0] === "Mrs."
				name = Faker::Movies::HarryPotter.character
			end
			names << name
		end

		# Putting first and last names into an array
		full_names = []
		names.each do |name|
			splitName = name.split(" ")
			full_names << splitName
		end

		# Creating Each User
		full_names.each do |name|
			User.create!({
				first_name: name[0],
				last_name: name[1],
				email: Faker::Internet.email(name: name[0]),
				password: "password"
			})
		end

		# Listings 
		ApplicationRecord.connection.reset_pk_sequence!('listings')
		puts 'Generating Hogwarts...'
		Listing.create!({
				host_id: 1,
				title: "Hogwarts",
				street_address: "1234 Hogwarts Ave",
				zip_code: 11111,
				city: "New York",
				state: "New York",
				country: "United States",
				property_type: "castle",
				max_guests: 300, 
				nightly_price: 100000, 
				cleaning_fee: 1000, 
				description: "Have a stay at Hogwarts Castle. It is one of the oldest magical castles in the world. Relive your school years with a nightly stay.",
				num_bathrooms: 40, 
				num_bedrooms: 38,
				num_beds: 300, 
				lat: Faker::Address.latitude, 
				long: Faker::Address.longitude
		})

		puts 'Generating 5 Listings'
		5.times do 
			Listing.create({
				host_id: rand(1..10),
				title: Faker::Movies::HarryPotter.location, 
				street_address: Faker::Address.street_address,
				zip_code: Faker::Address.zip_code,
				city: Faker::Address.city,
				state: Faker::Address.state,
				country: "United States",
				property_type: property_types.sample,
				max_guests: rand(1..20),
				nightly_price: rand(200..2000), 
				cleaning_fee: rand(300..1000), 
				description: Faker::Movies::HarryPotter.quote, 
				num_bathrooms: rand(1..5),
				num_bedrooms: rand(1..10),
				num_beds: rand(1..20),
				lat: Faker::Address.latitude,
				long: Faker::Address.longitude
			})
			if Listing.last.errors.any?
				Listing.last.errors.full_messages.each do |message|
					puts message
				end
			end
			puts 'Listing Created'
		end

		puts "Done!"
end
