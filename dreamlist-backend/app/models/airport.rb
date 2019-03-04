class Airport < ApplicationRecord
  has_many :airport_locators
  has_many :destinations, through: :airport_locators

  # def self.check_accuracy_of_municipality
  #   counter = 0
  #   cities_not_found = []
  #   Airport.all.each do |airport|
  #     iso_country = airport.iso_country
  #     if Destination.find_by(iso_country: iso_country) == nil
  #       cities_not_found.push(airport.name)
  #     end
  #   end
  #   return cities_not_found
  # end


end
