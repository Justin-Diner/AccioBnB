@listings.each do |listing|
	json.set! listing.id do 
		json.extract! listing, :id, :host_id, :title, :street_address, :zip_code, :city, :state, :country, :property_type, :max_guests, :nightly_price, :cleaning_fee, :description, :num_bathrooms, :num_bedrooms, :num_beds, :lat, :long, :created_at, :updated_at
	end
end