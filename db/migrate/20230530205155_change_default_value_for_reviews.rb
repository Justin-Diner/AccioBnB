class ChangeDefaultValueForReviews < ActiveRecord::Migration[7.0]
  def change
		change_column_default :reviews, :review_rating, from: 6.0, to: 5.0
  end
end
