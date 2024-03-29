class LitterSize < ActiveRecord::Base
  include Annotation
  
  before_create :set_created_by
  after_create :add_annotation_point
  
  belongs_to :species
  
  validates_presence_of :species_id
  validates_presence_of :value
  
  HUMANIZED_ATTRIBUTES = {
    :value => "Litter Size"
  }
  def self.human_attribute_name(attr)
    HUMANIZED_ATTRIBUTES[attr.to_sym] || super
  end

  def validate
    should_be_greater_than_zero
  end
  
  def should_be_greater_than_zero
    unless value.nil?
      if value == 0
        errors.add(:value, "needs to be greater than zero")
      elsif !(value > 0)
        errors.add(:value, "should be a positive number")
      end
    end
  end
  
  def to_s
    value.to_s
  end
end



# == Schema Information
#
# Table name: litter_sizes
#
#  id              :integer         not null, primary key
#  species_id      :integer         not null
#  value           :decimal(, )     not null
#  created_at      :datetime
#  updated_at      :datetime
#  created_by      :integer
#  created_by_name :string(255)
#  citation        :text
#  context         :text
#

