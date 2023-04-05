class ChangeListings < ActiveRecord::Migration[7.0]
  def change
		add_index :listings, :street_address, unique: true
  end
end
