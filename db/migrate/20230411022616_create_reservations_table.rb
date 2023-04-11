class CreateReservationsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
			t.references :user, null: false, foreign_key: true
			t.references :listing, null: false, foreign_key: true 
			t.integer :num_guests, null: false 
			t.date :check_in, null: false 
			t.date :check_out, null: false 
			t.float :total_price, null: false 

      t.timestamps
    end
  end
end
