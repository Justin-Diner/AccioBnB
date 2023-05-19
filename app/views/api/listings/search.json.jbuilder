json.search do 
	@listings.each do |listing|
		json.set! listing.id do 
			json.extract! listing, :id, :title
		end
	end
end