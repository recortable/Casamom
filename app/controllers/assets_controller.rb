class AssetsController < ApplicationController
  respond_to :html
  expose(:assets) { Asset.all }
  expose(:asset)

  def index
  end

  def show
  end

  def new
  end

  def edit

  end

  def create
    flash[:notice] = 'Fichero subido.' if asset.save
    respond_with asset, :location => assets_path
  end

  def update
    flash[:notice] = 'Fichero modificado.' if asset.update_attributes(params[:asset])
    respond_with asset, :location => assets_path
  end

  def destroy
    flash[:notice] = 'Fichero borrado.' if asset.destroy
    respond_with asset
  end
end
