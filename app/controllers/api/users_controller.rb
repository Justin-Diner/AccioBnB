class Api::UsersController < ApplicationController
	#before_action: :require_logged_out, only: [:create]
	
	# Overrides what keys we want Rails to automatically nest. 
	wrap_parameters include: User.attribute_names + ['password']

	def show 
		@user = User.find(params[:id])

		if (@user)
			render 'api/users/show'
		else 
			render json: {errors: ['Account does not exist.']}
		end
	end

	def create 
		@user = User.new(user_params)
		if @user.save
			login!(@user)
			render 'api/users/show'
		else 
			render json: @user.errors.full_messages, status: :unprocessable_entity
		end
	end

	def update 
		@user = User.find(params[:id])

		if @user.update(user_params)
			render 'api/users/show'
		else 
			render json: @user.errors.full_messages, status: 422
		end
	end

	def destroy 
		@user = User.find(params[:id])

		if @user 
			User.destroy(params[:id])
			render json: { message: 'success' }
		end
	end 

	private 
	def user_params
		params.require(:user).permit(:email, :first_name, :last_name, :password, :photo)
	end 

end

#	Test User 
#signupRequestOptions = {
#	method: 'POST',
#	headers: { 'Content-Type': 'application/json' },
#	body: JSON.stringify({ 
#		email: 'ron@hotmail.net', 
#		first_name: 'Ronald',
#		last_name: 'Weasley',
#		password: 'password',
#	})
#}