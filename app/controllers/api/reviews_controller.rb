class Api::ReviewsController < ApplicationController
	def index 
		@reviews = Review.where("listing_id = #{params[:listing_id]}")
		@reviewers = [];

		@reviews.each do |review|
			@reviewers << review.user
		end
		render 'api/reviews/index'
	end

	def show 
		@review = Review.find(params[:id])
		@listing = Listing.find(@review.listing_id)

		if (@review)
			render 'api/reviews/show'
		else 
			render json: {errors: ['Review does not exist.']}
		end

	end

	def create 
		@review = Review.new(review_params)

		if @review.save 
			@listing = Listing.find(@review.listing_id)
			render 'api/reviews/show'
		else
			render json: @review.errors.full_messages, status: :unprocessable_entity
		end
	end

	def update 
		@review = Review.find(params[:id])

		if @review.update(review_params)
			@listing = Listing.find(@review.listing_id)
			render 'api/reviews/show'
		else 
			render json: @review.errors.full_messages, status: 422
		end
	end

	def destroy 
		@review = Review.find(params[:id])

		if @review
			Review.destroy(params[:id])
			@listing = Listing.find(@review.listing_id)
			render 'api/listings/show'
		end
	end

	private 
	def review_params 
		params.require(:review).permit(:user_id, :listing_id, :description, :cleanliness, :accuracy, :communication, :location, :check_in, :value)
	end
end
