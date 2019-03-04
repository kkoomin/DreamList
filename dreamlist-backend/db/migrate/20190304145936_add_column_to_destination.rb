class AddColumnToDestination < ActiveRecord::Migration[5.2]
  def change
    add_column :destinations, :iso_country, :string 
  end
end
