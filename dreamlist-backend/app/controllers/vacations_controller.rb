class VacationsController < ApplicationController
    def index
      @vacations = Vacation.all
      render json: @vacations
    end
    
    def create
      @vacation = Vacation.create(name: params[:name], start_date: params[:start_date], end_date: params[:end_date], user_id: params[:user_id])
      render json: @vacation
    end
    
    def destroy 
      @vacation = Vacation.find(params[:id])
      @vacation.destroy
    end
  end
  