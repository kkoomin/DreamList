class CreateAirportLocators < ActiveRecord::Migration[5.2]
  def change
    create_table :airport_locators do |t|
      t.references :destination, foreign_key: true
      t.references :airport, foreign_key: true
      t.boolean :inDestination

      t.timestamps
    end
  end
end
