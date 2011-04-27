require 'carrierwave/orm/mongoid'

class Asset
  include Mongoid::Document
  mount_uploader :file, FileUploader
  field :name, :type => String
  field :file, :type => String
end
