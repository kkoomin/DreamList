class CreateDreamlists < ActiveRecord::Migration[5.2]
  def change
    create_table :dreamlists do |t|
      t.references :user, foreign_key: true
      t.references :destination, foreign_key: true

      t.timestamps
    end
  end
end
