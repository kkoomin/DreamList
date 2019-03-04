class DreamlistController < ApplicationController
  def index
    @dreamlists = Dreamlist.all
    render json: @dreamlists
  end

  def create
    @dreamlist = Dreamlist.create(dreamlist_params)
  end

  def show
    @dreamlist = Dreamlist.find(params[:id])
    render json: @dreamlist
  end

  def destroy
    @dreamlist = Dreamlist.find(params[:id])
    unless @dreamlist.nil?
      @dreamlist.destroy
      render json: @dreamlist
    else
      render json: { error: "Dreamlist not Found!" }, status: 404
    end
  end

  private
  
  def dreamlist_params
    params.require(:dreamlist).permit(:user_id, :destination_id)
  end

end
