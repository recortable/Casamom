class PagesController < ApplicationController
  layout 'public'

  expose(:datamap) { Datamap.last}

  def map

  end
end
