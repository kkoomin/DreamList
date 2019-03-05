class Destination < ApplicationRecord
  has_many :airport_locators
  has_many :airports, through: :airport_locators
  has_many :dreamlists
  has_many :users, through: :dreamlists
  has_many :buzzwords


  def destination_airports_code #airports instance arr
    self.airports.map{|a| a.iata_code}
  end

  def self.update_accuracy_of_names
    cities_not_found = []
    Airport.all.each do |airport|
      destination_cities = []
      airport.destinations.each {|destination| destination_cities.push(destination.name)}

      if !destination_cities.include?(airport.municipality) && destination_cities.length !=0 && airport.municipality!=nil
        nearest_city = airport.destinations.min_by{|destination| destination.calculate_distance(airport)}
        if self.check_similarity(nearest_city.name,airport.municipality) >= 0.7
          nearest_city.update(name:airport.municipality)
        end
      end

    end
  end

  def calculate_distance(destination)
    lat1 = destination.latitude.to_f
    lon1 = destination.longitude.to_f
    lat2 = self.latitude.to_f
    lon2 = self.longitude.to_f
    earth_radius = 6371
    d_lat = (lat2-lat1) * Math::PI/180
    d_lon = (lon2-lon1) * Math::PI/180
    lat1_r = lat1 * Math::PI/180
    lat2_r = lat2 * Math::PI/180
    a = (Math.sin(d_lat/2))**2+(Math.cos(lat1_r))*(Math.cos(lat2_r))*((Math.sin(d_lon/2))**2)
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    d = earth_radius*c
    return d
  end

  def self.check_similarity(w1, w2)
    counter = 0.0
    w1.split('').each do |c|
      counter +=1 if w2.include?(c)
    end
    return (counter/w1.length)
  end

  def self.assign_weather
    Destination.all.each do |destination|
      latitude = (destination.latitude.to_f).abs
      if latitude < 15
        weather = 'very warm'
      elsif latitude < 25
        weather = 'warm'
      elsif latitude < 30
        weather = 'mild'
      elsif latitude < 40
        weather = 'chilly'
      elsif latitude < 55
        weather = 'cold'
      else
        weather = 'frigid'
      end
      destination.update(weather:weather)
    end
  end

  def self.assign_price
    Destination.all.each do |destination|
      price = [1,2,3,4,5].sample
      destination.update(price_range:price)
    end
  end

  def self.assign_buzzword
    buzzword = ['nightlife','nature','chill','history','culture','unique','beach','young','fun','family','single','couple','gustro','romantic','happening','modern','outdoor'].sample
    Destination.all.each do |destination|
      if destination.airports.length != 0
        newword = Buzzword.create(word:buzzword)
        destination.buzzwords.push(newword)
      end
    end
  end

end
