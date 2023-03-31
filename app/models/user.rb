# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  last_name       :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
	before_validation :ensure_session_token
	has_secure_password

	validates :first_name, :last_name, presence: true 
	validates :first_name, :last_name, length: {in: 3..30}
	validates :first_name, :last_name, format: { without: URI::MailTo::EMAIL_REGEXP, message: "Can't be an email" }
	validates :email, length: {in: 3..40}, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Must be an email" }, uniqueness: true
	validates :session_token, presence: true, uniqueness: true 
	validates :password, length: {in: 6..255}, allow_nil: true 

	def	self.find_by_credentials(email, password)
		if email =~ URI::MailTo::EMAIL_REGEXP
			user = User.find_by(email: email)
		end

		if user && user.authenticate(password)
			return user 
		else 
			return nil
		end
	end

	def reset_session_token!
		self.session_token = generate_session_token
		self.save!
		self.session_token
	end

	private
	def ensure_session_token 
		self.session_token ||= generate_session_token
	end

	def generate_session_token 
		token = SecureRandom::urlsafe_base64
		while User.exists?(session_token: token)
			token = SecureRandom::urlsafe_base64
		end
		token
	end

end
