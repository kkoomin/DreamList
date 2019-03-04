class RemoveColumnDestinationIdFromAirports < ActiveRecord::Migration[5.2]
  def change
    remove_columns :airports, :destination_id 
  end
end
