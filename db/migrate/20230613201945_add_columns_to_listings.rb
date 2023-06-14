class AddColumnsToListings < ActiveRecord::Migration[7.0]
  def change
		add_column :listings, :overall_communication, :float, default: 5.0
		add_column :listings, :overall_checkin, :float, default: 5.0
		add_column :listings, :overall_accuracy, :float, default: 5.0
		add_column :listings, :overall_location, :float, default: 5.0
		add_column :listings, :overall_value, :float, default: 5.0
  end
end
