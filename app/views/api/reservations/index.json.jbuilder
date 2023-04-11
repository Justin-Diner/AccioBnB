@reservations.each do |reservation|
	json.set! reservation.id do 
		json.extract! reservation, :id, :user_id, :listing_id, :check_in, :check_out, :num_guests, :total_price
	end
end
