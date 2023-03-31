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
  User.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')

		puts "Creating Users..."
		User.create!(
			first_name: "Harry",
			last_name: "Potter",
			email: "boywholived@potter.com",
			password: "password"
		)

		puts "Generating first and last names..."
		names = [];
		10.times do 
			names << Faker::Movies::HarryPotter.character
		end

		full_names = []
		names.each do |name|
			splitName = name.split(" ")
			full_names << splitName
		end

		fullnames.each do |name|
			10.times do 
				User.create!({
				first_name: name[0],
				last_name: name[1],
				email: Faker::Internet.unique.email
			})
			end
		end
end