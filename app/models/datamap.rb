class Datamap
  include Mongoid::Document
  field :name, :type => String
  field :data, :type => String

  validates :name, :presence => true
end