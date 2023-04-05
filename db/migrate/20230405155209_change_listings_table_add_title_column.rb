class ChangeListingsTableAddTitleColumn < ActiveRecord::Migration[7.0]
  def change
		add_column :listings, :title, :string
		change_column_null :listings, :title, null: false 

  end
end
