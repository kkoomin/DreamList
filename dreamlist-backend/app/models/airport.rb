class Airport < ApplicationRecord
  has_many :airport_locators
  has_many :destinations, through: :airport_locators

end
