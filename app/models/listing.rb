# == Schema Information
#
# Table name: listings
#
#  id             :bigint           not null, primary key
#  host_id        :bigint           not null
#  street_address :string           not null
#  zip_code       :string           not null
#  city           :string           not null
#  state          :string           not null
#  country        :string           not null
#  property_type  :string           not null
#  max_guests     :integer          not null
#  nightly_price  :float            not null
#  cleaning_fee   :float            not null
#  description    :text             not null
#  num_bathrooms  :float            not null
#  num_bedrooms   :integer          not null
#  num_beds       :integer          not null
#  lat            :float            not null
#  long           :float            not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  title          :string           not null
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
end
