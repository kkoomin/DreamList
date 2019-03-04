# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Airport.destroy_all

csv = File.read('public/airports.csv')

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
    Airport.create(airport)
  end
end



Destination.destroy_all

csv_2 = File.read('public/worldcities.csv')

CSV.parse(csv_2, headers:true).each do |row|
  city = {
    name: row.fields[1],
    country: row.fields[4],
    iso_country: row.fields[5].downcase,
    latitude: row.fields[2],
    longitude: row.fields[3]
  }
  Destination.create(city)
end

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



AirportLocator.destroy_all

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
