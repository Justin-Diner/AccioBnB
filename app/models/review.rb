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
#
class Review < ApplicationRecord
	validates :listing_id, :user_id, :description, :cleanliness, :accuracy, :communication, :location, :check_in, :value, presence: true

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
end
