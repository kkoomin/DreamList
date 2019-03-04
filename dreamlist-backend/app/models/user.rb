class User < ApplicationRecord
    has_many :vacations
    has_many :dreamlists
    has_many :destinations, through: :dreamlists

end
