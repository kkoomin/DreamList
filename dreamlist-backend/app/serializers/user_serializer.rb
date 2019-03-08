class UserSerializer < ActiveModel::Serializer
  has_many :vacations
  has_many :dreamlists
  has_many :destinations, through: :dreamlists

  attributes :id, :name, :home_base_id
end
