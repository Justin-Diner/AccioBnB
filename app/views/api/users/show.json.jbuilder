json.extract! @user, :id, :email, :first_name, :last_name, :created_at, :updated_at

if @user.photo.attached? 
	json.photos_url @user.photo.url
else 
	json.photos_url '/../../assets/images/hogwarts/hogwarts1.jpg'
end