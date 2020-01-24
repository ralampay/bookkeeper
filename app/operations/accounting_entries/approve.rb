module AccountingEntries
  class Approve
    def initialize(args:)
      @args             = args
      @current_date     = @args[:current_date] || Date.today
      @accounting_entry = @args[:accounting_entry]
    end

    def run
      @accounting_entry.update!(
        status: "approved",
        date_posted: @current_date
      )
    end
  end
end
