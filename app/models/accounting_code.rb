class AccountingCode < ApplicationRecord
  CATEGORIES  = [
    "ASSETS",
    "LIABILITIES",
    "EQUITY",
    "REVENUE",
    "EXPENSES"
  ]

  validates :name, presence: true, uniqueness: true
  validates :code, presence: true, uniqueness: true
  validates :category, presence: true, inclusion: { in: CATEGORIES }

  has_many :journal_entries

  def to_s
    "#{code} - #{name}"
  end
end
