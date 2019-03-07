class DestinationsController < ApplicationController
  def index
    @destinations = Destination.all
    render json: @destinations
  end

  def show
    @destination = Destination.find(params[:id])
    render json: @destination
  end

  def getAirports
    @destination = Destination.find(params[:id])
    @airports = @destination.destination_airports_code
    render json: @airports
  end

  def searchresult
    buzzword = params[:buzzword]
    pricelow = params[:pricelow]
    pricehigh = params[:pricehigh]
    weather = params[:weather]
    @latlng_arrays = Destination.findDestinations(buzzword,pricelow,pricehigh,weather)
    render json: @latlng_arrays
  end

  def searchresult_one
    @latlng_element = Destination.findSingleDestination(params[:id])
    render json: @latlng_element
  end

  def worldcities
    @destinations = Destination.all
    @worldcities = []
    Destination.all.each do |d|
      worldcity = {}
      worldcity['id'] = d.id
      worldcity['name'] = d.name
      worldcity['country'] = d.country
      @worldcities.push(worldcity)
    end
    render json: @worldcities
  end

end
