class Flat < ApplicationRecord
  # address is the column in the model
  geocoded_by :address

  after_validation :geocode, if: :will_save_change_to_address?
end
