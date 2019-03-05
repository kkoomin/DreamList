class User < ApplicationRecord
    has_many :vacations
    has_many :dreamlists
    has_many :destinations, through: :dreamlists

    def get_home_base_country #instance
        Destination.all.find_by(name: self.homebase)
    end

    def home_base_airports_code #airports instance arr
        self.get_home_base_country.airports.map{|a| a.iata_code}
    end


end
