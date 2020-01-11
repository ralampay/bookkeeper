class AccountingEntry < ApplicationRecord
  STATUSES  = [
    "pending",
    "approved"
  ]

  BOOKS = [
    "General Journal",
    "Cash Receipts"
  ]

  validates :date_prepared, presence: true
  validates :particular, presence: true
  validates :status, presence: true, inclusion: { in: STATUSES }

  validates :book, presence: true, inclusion: { in: BOOKS }

  has_many :journal_entries

  before_validation :load_defaults

  def load_defaults
    if self.status.blank?
      self.status = "pending"
    end

    if self.date_prepared.blank?
      self.prepared = Date.today
    end
  end

  def pending?
    self.status == "pending"
  end

  def not_pending?
    self.status != "pending"
  end
end
