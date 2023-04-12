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
		end
	end
end
