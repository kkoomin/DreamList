class AddColumnsToDestination < ActiveRecord::Migration[5.2]
  def change
    add_column :destinations, :country, :string
    add_column :destinations, :latitude, :string
    add_column :destinations, :longitude, :string
  end
end
