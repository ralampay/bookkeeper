module AccountingEntries
  class Delete
    def initialize(args:)
      @args             = args
      @accounting_entry = @args[:accounting_entry]
    end

    def run
      @accounting_entry.destroy!
    end
  end
end
