class Api::ReservationsController < ApplicationController
	def show 
		@reservation = Reservation.find(params[:id])

		if (@reservation)
			render 'api/reservations/show'
		else 
			render json: {errors: ['Reservation does not exist.']}
		end
	end

	def create 
		@reservation = Reservation.new(reservation_params)
		if @reservation.save
			render 'api/reservations/show'
		else 
			render json: @user.errors.full_messages, status: :unprocessable_entity
		end
	end

	def update 
		@reservation = Reservation.find(params[:id])

		if @reservation.update(reservation_params)
			render 'api/reservations/show'
		else 
			render json: @user.errors.full_messages, status: 422
		end
	end

	def destroy 
		@reservation = Reservation.find(params[:id])

		if @reservation 
			Reservation.destroy(params[:id])
			render json: { message: 'success' }
		end
	end 

	private 
	def reservation_params
		params.require(:reservation).permit(:user_id, :listing_id, :check_in, :check_out, :total_price)
	end 
end
