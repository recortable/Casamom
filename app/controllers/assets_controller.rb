class AssetsController < ApplicationController
  expose(:assets) { Asset.all }
  expose(:asset)

  def index
  end

  def show
  end

  def new
  end

  def create
    flash[:notice] = 'Fichero subidoi.' if asset.save
    redirect_to assets_path
  end
end
