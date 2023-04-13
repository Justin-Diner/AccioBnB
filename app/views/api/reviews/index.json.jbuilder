json.reviews do 
	@reviews.each do |review|
		json.set! review.id do 
			json.extract! review, :id, :user_id, :listing_id, :description, :cleanliness, :accuracy, :communication, :location, :check_in, :value, :created_at
		end
	end
end

json.users do 
	@reviewers.each do |user|
		json.set! user.id do 
			json.extract! user, :id, :email, :first_name, :last_name, :created_at, :updated_at
			if user.photo.attached? 
				json.photo_url user.photo.url
			else 
				json.photo_url '/../../assets/images/hogwarts/hogwarts1.jpg'
			end
		end

	end
end
