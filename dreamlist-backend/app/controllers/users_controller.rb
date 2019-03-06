class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.create(user_params)
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def edit 
  end

  def update
    @user = User.find(params[:id])
    @user.update
  end
  
  def homeAirportCodes
    @user = User.find(params[:id])
    @home_airport_codes = @user.get_home_base_country.airports.map{|a| a.iata_code}
    render json: @home_airport_codes
  end
  
  def listDestinations
    @user = User.find(params[:id])
    @destinations = @user.dreamlists.map{|list| Destination.find(list.destination_id)}
    render json: @destinations
  end

  private

  def user_params
    params.require(:user).permit(:name, :home_base)
  end
  
end
