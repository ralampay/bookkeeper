class JournalEntry < ApplicationRecord
  POST_TYPES  = ["DR", "CR"]

  belongs_to :accounting_code
  belongs_to :accounting_entry

  validates :amount, presence: true, numericality: true
  validates :post_type, presence: true, inclusion: { in: POST_TYPES }

  def is_debit?
    self.post_type == "DR"
  end

  def is_credit?
    self.post_type == "CR"
  end
end
