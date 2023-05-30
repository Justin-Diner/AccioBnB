class AddOverallRatingToReviews < ActiveRecord::Migration[7.0]
  def change
    add_column :reviews, :review_rating, :float, default: 6.0
  end
end
