class AirportLocator < ApplicationRecord
  belongs_to :destination
  belongs_to :airport
end
