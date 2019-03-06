class ChangeColumnInUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :home_base, :string
    add_column :users, :home_base_id, :integer
  end
end
