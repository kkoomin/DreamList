class CreateAirports < ActiveRecord::Migration[5.2]
  def change
    create_table :airports do |t|
      t.string :name
      t.string :iata_code
      t.string :iso_country
      t.string :iso_region
      t.string :municipality
      t.string :latitude
      t.string :longitude
      t.references :destination, foreign_key: true

      t.timestamps
    end
  end
end
