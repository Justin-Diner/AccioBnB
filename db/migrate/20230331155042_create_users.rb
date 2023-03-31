class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
			t.references :user, null: false 
			t.string :first_name, null: false
			t.string :last_name, null: false
			t.string :email, null: false, index: true 
			t.string :password_digest, null: false 
			t.string :session_token, null: false, index: true 
      t.timestamps
    end
  end
end
