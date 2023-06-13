class AddOverallCleanlinessToListings < ActiveRecord::Migration[7.0]
  def change
		add_column :listings, :overall_cleanliness, :float, default: 5.0
  end
end
