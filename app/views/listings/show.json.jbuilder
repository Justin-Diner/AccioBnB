json.listing do 
	json.extract! @listing, :id, :host_id, :street_address, :zip_code, :city, :state, :country, :property_type, :max_guests, :nightly_price, :cleaning_fee, :description, :num_bathrooms, :num_bedrooms, :num_beds, :lat, :long, :created_at, :updated_at
end