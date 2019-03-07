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
    @home_airport_codes = Destination.find(@user.home_base_id).airports.map{|a| a.iata_code}
    render json: @home_airport_codes
  end

  def listDestinations
    @user = User.find(params[:id])
    render json: @user.destinations
  end

  def add_destination
    if Dreamlist.find_by(user_id: User.first.id, destination_id: params[:destination_id]) === nil
      @dreamlist = Dreamlist.create(user_id: User.first.id, destination_id: params[:destination_id])
      ### TO BE CHANGED ONCE WE SET UP THE LOG IN !!!!!!
    else
      @dreamlist = {error:'Already in your dreamlist'}
    end
    render json: @dreamlist
  end

  private

  def user_params
    params.require(:user).permit(:name, :home_base_id)
  end

end
