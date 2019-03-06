class DestinationsController < ApplicationController
  def index
    @destinations = Destination.all
    render json: @destinations
  end

  def show
    @destination = Destination.find(params[:id])
    render json: @destination
  end

  def searchresult
    buzzword = params[:buzzword]
    pricelow = params[:pricelow]
    pricehigh = params[:pricehigh]
    weather = params[:weather]
    @latlng_arrays = Destination.findDestinations(buzzword,pricelow,pricehigh,weather)
    render json: @latlng_arrays
  end

end
