class ChangeListingsTitleColumn < ActiveRecord::Migration[7.0]
  def change
		change_column_null :listings, :title, false
  end
end
