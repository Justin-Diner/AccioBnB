# == Schema Information
#
# Table name: reservations
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  listing_id  :bigint           not null
#  num_guests  :integer          not null
#  check_in    :date             not null
#  check_out   :date             not null
#  total_price :float            not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Reservation < ApplicationRecord
	validates :user_id, :listing_id, :num_guests, :check_in, :check_out, :total_price, presence: true

	belongs_to :user,
	primary_key: :id, 
	foreign_key: :user_id,
	class_name: :User

	belongs_to :listing, 
	primary_key: :id, 
	foreign_key: :listing_id,
	class_name: :Listing
end
