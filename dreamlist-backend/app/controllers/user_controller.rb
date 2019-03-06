class UserController < ApplicationController
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


  private

  def user_params
    params.require(:user).permit(:name, :home_base)
  end

end
