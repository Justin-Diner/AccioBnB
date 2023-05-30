class AddOverallRatingToListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :overall_rating, :float, default: 5.0
  end
end
