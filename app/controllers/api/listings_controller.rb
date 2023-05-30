class Api::ListingsController < ApplicationController
	wrap_parameters include: Listing.attribute_names + [:photo]
	
	def index
		@listings = Listing.all
		render 'api/listings/index'
	end

	def create
		@listing = Listing.new(listing_params)

		if @listing.save 
			render 'api/listings/show'
		else 
			render json: @listing.errors.full_messages, status: unprocessable_entity
		end
	end
	
	def show 
		@listing = Listing.find(params[:id])

		if (@listing)
			render 'api/listings/show'
		else 
			render json: {errors: ['Listing does not exist.']}
		end
	end

	def update
		p listing_params
		@listing = Listing.find(params[:id])

		if @listing.update(listing_params)
			render 'api/listings/show'
		else 
			render json: @listing.errors.full_messages, status: 422
		end
	end

	def destroy
		listing = Listing.find(params[:id])

		if listing 
			Listing.destroy(params[:id])
			render json: { message: 'success' }
		end
	end

	def search
		@listings = Listing.where("lower(description) LIKE ?", "%#{params[:q]}%").or(Listing.where("lower(title) LIKE ?", "%#{params[:q]}%"))
		render :search 
	end
	
	private 
	def listing_params 
		params.require(:listing).permit(:id, :host_id, :title, :street_address, :zip_code, :city, :state, :country, :property_type, :max_guests, :nightly_price, :clearning_fee, :description, :num_bathrooms, :num_bedrooms, :num_beds, :lat, :long, photos:[])
	end
end
