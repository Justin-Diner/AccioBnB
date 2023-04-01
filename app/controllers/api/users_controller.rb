class Api::UsersController < ApplicationController
	#before_action: :require_logged_out, only: [:create]
	
	# Overrides what keys we want Rails to automatically nest. 
	wrap_parameters include: User.attribute_names + ['password']

	def create 
		@user = User.new(user_params)
		if @user.save
			login!(@user)
			render 'api/users/show'
		else 
			render json: @user.errors.full_messages, status: :unprocessable_entity
		end
	end

	private 
	def user_params
		params.require(:user).permit(:email, :first_name, :last_name, :password)
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