# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Buzzword.destroy_all
AirportLocator.destroy_all
Airport.destroy_all
Destination.destroy_all
#
#
csv = File.read('public/airports.csv')
airports = []
CSV.parse(csv, headers:true).each do |row|
  if row.fields[2] == "large_airport" && row.fields[13] != nil
    airport = {
      name: row.fields[3],
      latitude: row.fields[4],
      longitude: row.fields[5],
      iso_country: row.fields[8].downcase,
      iso_region: row.fields[9],
      municipality: row.fields[10],
      iata_code: row.fields[13]
    }
    airports.push(airport)
  end
end
Airport.create(airports)


csv_2 = File.read('public/worldcities.csv')
cities = []
CSV.parse(csv_2, headers:true).each do |row|
  if row.fields[9].to_f>=60000 && row.fields[5]!="CN" || row.fields[9].to_f>=1000000 && row.fields[5]=="CN"
    city = {
      name: row.fields[1],
      country: row.fields[4],
      iso_country: row.fields[5].downcase,
      latitude: row.fields[2],
      longitude: row.fields[3]
    }
    cities.push(city)
  end
end
Destination.create(cities)


def calculate_distance(lat1, lon1, lat2, lon2)
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

Destination.all.each do |destination|
  airports_in_country = Airport.all.select{|airport| airport.iso_country == destination.iso_country}

  lat1 = destination.latitude.to_f
  lon1 = destination.longitude.to_f
  airports_near_by = airports_in_country.select do |airport|
    lat2 = airport.latitude.to_f
    lon2 = airport.longitude.to_f
    calculate_distance(lat1,lon1,lat2,lon2) <= 100
  end

  if airports_near_by.length>=5
    airports_nearest = airports_near_by[0..4]
  else
    airports_nearest = airports_near_by
  end

  airports_nearest.each do |airport|
    airport_locator = {airport_id: airport.id, destination_id: destination.id}
    AirportLocator.create(airport_locator)
  end
end

Destination.update_accuracy_of_names
Destination.assign_price
Destination.assign_weather
Destination.assign_buzzword
