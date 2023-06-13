json.extract! @listing, :id, :host_id, :title, :street_address, :zip_code, :city, :state, :country, :property_type, :max_guests, :nightly_price, :cleaning_fee, :description, :num_bathrooms, :num_bedrooms, :num_beds, :lat, :long, :overall_rating, :overall_cleanliness, :overall_communication, :overall_checkin, :overall_accuracy, :overall_location, :overall_value, :created_at, :updated_at
if @listing.photos.attached? 
	json.photos_url @listing.photos.map {|photo| photo.url}
else 
	json.photos_url '/../../assets/images/hogwarts/hogwarts1.jpg'
end
