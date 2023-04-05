class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
			t.references :host, foreign_key: {to_table: :users}, null: false
			t.string :street_address, null: false, unique: true
			t.string :zip_code, null: false 
			t.string :city, null: false 
			t.string :state, null: false 
			t.string :country, null: false 
			t.string :property_type, null: false 
			t.integer :max_guests, null: false 
			t.float :nightly_price, null: false 
			t.float :clearning_fee, null: false 
			t.text :description, null: false 
			t.float :num_bathrooms, null: false 
			t.integer :num_bedrooms, null: false 
			t.integer :num_beds, null: false 
			t.float :lat, null: false 
			t.float :long, null: false 
      t.timestamps
    end
  end
end
