# == Schema Information
#
# Table name: listings
#
#  id                    :bigint           not null, primary key
#  host_id               :bigint           not null
#  street_address        :string           not null
#  zip_code              :string           not null
#  city                  :string           not null
#  state                 :string           not null
#  country               :string           not null
#  property_type         :string           not null
#  max_guests            :integer          not null
#  nightly_price         :float            not null
#  cleaning_fee          :float            not null
#  description           :text             not null
#  num_bathrooms         :float            not null
#  num_bedrooms          :integer          not null
#  num_beds              :integer          not null
#  lat                   :float            not null
#  long                  :float            not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  title                 :string           not null
#  overall_rating        :float            default(5.0)
#  overall_cleanliness   :float            default(5.0)
#  overall_communication :float            default(5.0)
#  overall_checkin       :float            default(5.0)
#  overall_accuracy      :float            default(5.0)
#  overall_location      :float            default(5.0)
#  overall_value         :float            default(5.0)
#
class Listing < ApplicationRecord
	validates :host_id, :title, :street_address, :zip_code, :city, :state, :country, :property_type, :max_guests, :nightly_price, :cleaning_fee, :description, :num_bathrooms, :num_bedrooms, :num_beds, :lat, :long, presence: true 
	validates :zip_code, length: {in: 5..12}
	validates :street_address, uniqueness: true
	has_many_attached :photos

	belongs_to :host, 
	primary_key: :id, 
	foreign_key: :host_id, 
	class_name: :User 

	has_many :reservations,
		primary_key: :id, 
		foreign_key: :listing_id,
		class_name: :Reservation, 
		dependent: :destroy

	has_many :reviews, 
		primary_key: :id, 
		foreign_key: :listing_id,
		class_name: :Review,
		dependent: :destroy

	has_many :guests, 
		through: :reservations, 
		source: :user 

	def calculate_overall_rating
		total_reviews = reviews.count
		return 5.0 if total_reviews.zero? 

		sum_ratings = reviews.sum(:review_rating)
		(sum_ratings.to_f / total_reviews).round(2)
	end

	def calculate_overall_cleanliness_rating
		total_reviews = reviews.count
		return 5.0 if total_reviews.zero? 

		sum_overall_cleanliness = reviews.sum(:cleanliness)
		(sum_overall_cleanliness.to_f / total_reviews).round(1)
	end

	def calculate_overall_communication_rating
		total_reviews = reviews.count
		return 5.0 if total_reviews.zero? 

		sum_overall_communication = reviews.sum(:communication) 
		(sum_overall_communication.to_f / total_reviews).round(1)
	end

	def calculate_overall_checkin_rating
		total_reviews = reviews.count
		return 5.0 if total_reviews.zero? 

		sum_overall_checkin = reviews.sum(:check_in) 
		(sum_overall_checkin.to_f / total_reviews).round(1)
	end

	def calculate_overall_accuracy_rating
		total_reviews = reviews.count
		return 5.0 if total_reviews.zero? 

		sum_overall_accuracy = reviews.sum(:accuracy) 
		(sum_overall_accuracy.to_f / total_reviews).round(1)
	end

	def calculate_overall_location_rating
		total_reviews = reviews.count
		return 5.0 if total_reviews.zero? 

		sum_overall_location = reviews.sum(:location) 
		(sum_overall_location.to_f / total_reviews).round(1)
	end

	def calculate_overall_value_rating
		total_reviews = reviews.count
		return 5.0 if total_reviews.zero? 

		sum_overall_value = reviews.sum(:value) 
		(sum_overall_value.to_f / total_reviews).round(1)
	end

	def photosUrl 
		if photos.attached? 
			photos.map {|photo| photo.url}
		else 
			'/../../assets/images/hogwarts/hogwarts1.jpg'
		end
	end
end
