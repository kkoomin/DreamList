class Destination < ApplicationRecord
    has_many :airports
    has_many :dreamlists
    has_many :users, through: :dreamlists
end
