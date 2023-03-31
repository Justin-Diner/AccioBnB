class Api::SessionsController < ApplicationController
	#before_action :require_logged_out, only: [:create]
	#before_action :require_logged_in, only: [:destroy]
	
	def show 
		@user = current_user
		if @user 
			render 'api/users/show'
		else 
			render json: { users: nil }
		end
	end

	def create 
			email = params[:email]
			password = params[:password]

			@user = User.find_by_credentials(email, password)

			if @user 
				login!(@user)
				render 'api/users/show'
			else 
				render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
			end
	end

	def destroy
		logout! 
		render json: { message: 'success' }
	end

	private
	def session_params 
		params.require(:session).permit(:email, :password)
	end
end
