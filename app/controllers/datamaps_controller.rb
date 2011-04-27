class DatamapsController < ApplicationController
  expose(:datamaps) { Datamap.all }
  expose(:datamap)

  def index
  end

  def show
  end

  def new
  end

  def edit
  end

  def create
    flash[:notice] = 'Mapa creado.' if datamap.save
    redirect_to datamap
  end

  def update
    flash[:notice] = 'Mapa actualizado.' if datamap.update_attributes(params[:datamap])
    redirect_to datamap
  end

end
