json.reservations do 
	@reservations.each do |reservation|
		json.set! reservation.id do 
			json.extract! reservation, :id, :user_id, :listing_id, :check_in, :check_out, :num_guests, :total_price
		end
	end
end

json.listings do 
	@listings.each do |listing| 
		json.set! listing.id do 
			json.extract! listing, :id, :host_id, :title, :street_address, :zip_code, :city, :state, :country, :property_type, :max_guests, :nightly_price, :cleaning_fee, :description, :num_bathrooms, :num_bedrooms, :num_beds, :lat, :long, :created_at, :updated_at
			if listing.photos.attached? 
				json.photos_url listing.photos.map {|photo| photo.url}
			else 
				json.photos_url '/../../assets/images/hogwarts/hogwarts1.jpg'
			end
		end
	end
end

json.host do
	@hosts.each do |host|
		json.set! host.id do 
			json.extract! host, :id, :email, :first_name, :last_name, :created_at, :updated_at
		end
	end
end
