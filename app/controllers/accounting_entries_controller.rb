class AccountingEntriesController < ApplicationController
  def index
    @accounting_entries = AccountingEntry.all
  end

  def show
    @accounting_entry = AccountingEntry.find(params[:id])
    @accounting_codes = AccountingCode.all

    @payload = {
      id: @accounting_entry.id
    }
  end
end
