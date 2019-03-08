class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def create
    @user = User.create(name: params[:user_name], home_base_id: params[:home_base_id])
    @vacation = Vacation.create(start_date: params[:start_date], end_date: params[:end_date], user_id: @user.id, name: params[:holiday_name])
    render json: @user
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
    @user = User.find(params[:user_id])
    if Dreamlist.find_by(user_id: @user.id, destination_id: params[:destination_id]) != nil
      @dreamlist = {error:'Already in your dreamlist'}
    elsif @user.home_base_id == params[:destination_id]
      @dreamlist = {error:'As much as you like your home, it cannot be your dream destination!'}
    else
      @dreamlist = Dreamlist.create(user_id: params[:user_id], destination_id: params[:destination_id])
    end
    render json: @dreamlist
  end

  private

  def user_params
    params.require(:user).permit(:name, :home_base_id)
  end

end
