# == Schema Information
#
# Table name: reviews
#
#  id            :bigint           not null, primary key
#  listing_id    :bigint           not null
#  user_id       :bigint           not null
#  description   :text             not null
#  cleanliness   :integer          not null
#  accuracy      :integer          not null
#  communication :integer          not null
#  location      :integer          not null
#  check_in      :integer          not null
#  value         :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  review_rating :float            default(5.0)
#
class Review < ApplicationRecord
	validates :listing_id, :user_id, :description, :cleanliness, :accuracy, :communication, :location, :check_in, :value, presence: true
	
	before_validation :calculate_review_average
	after_validation :update_listing_overall_rating, :update_listing_ratings 

	after_destroy :update_listing_overall_rating 
	after_save :update_listing_overall_rating 

	belongs_to :user, 
	primary_key: :id, 
	foreign_key: :user_id,
	class_name: :User

	belongs_to :listing, 
	primary_key: :id, 
	foreign_key: :listing_id,
	class_name: :Listing

	has_one :host,
	through: :listing, 
	source: :host

	private

	def calculate_review_average
		self.review_rating = ((cleanliness + accuracy + communication + location + check_in + value) / 6.0).round(2)
	end

	def update_listing_overall_rating
		listing.update(overall_rating: listing.calculate_overall_rating)
	end

	def update_listing_ratings 
		p "Calculating the Listings overall values"
		listing.update(overall_cleanliness: listing.calculate_overall_cleanliness_rating)
		listing.update(overall_communication: listing.calculate_overall_communication_rating )
		listing.update(overall_checkin: listing.calculate_overall_checkin_rating)
		listing.update(overall_accuracy: listing.calculate_overall_accuracy_rating)
		listing.update(overall_location: listing.calculate_overall_location_rating)
		listing.update(overall_value: listing.calculate_overall_value_rating)
	end

	def update_listing_overall_cleanliness
		p "Calculating Listing Overall Cleanliness and Saving it"
		listing.update(overall_cleanliness: listing.calculate_overall_cleanliness_rating)
	end
end
