class Destination < ApplicationRecord
    has_many :airport_locators
    has_many :airports, through: :airport_locators
    has_many :dreamlists
    has_many :users, through: :dreamlists
end
