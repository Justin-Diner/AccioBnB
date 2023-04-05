class ChangelistingsClearningColumn < ActiveRecord::Migration[7.0]
  def change
		rename_column :listings, :clearning_fee, :cleaning_fee
  end
end
