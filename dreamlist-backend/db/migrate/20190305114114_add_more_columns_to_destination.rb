class AddMoreColumnsToDestination < ActiveRecord::Migration[5.2]
  def change
    add_column :destinations, :price_range, :integer
    add_column :destinations, :weather, :string
    add_column :destinations, :trending, :string 
  end
end
