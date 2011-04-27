#encoding: utf-8

class ArticlesController < ApplicationController
  expose(:articles) { Article.all }
  expose(:article)

  def index
  end


  def create
    flash[:notice] = 'Artículo añadido.' if article.save
    redirect_to article
  end

  def update
    flash[:notice] = 'Artículo actualizado.' if article.update_attributes(params[:article])
    redirect_to article
  end


end
