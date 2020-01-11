module AccountingEntries
  class Create
    def initialize(args:)
      @args           = args
      @date_prepared  = @args[:date_prepared]
      @book           = @args[:book]
      @particular     = @args[:particular]
    end

    def run
      @accounting_entry = AccountingEntry.new(
                            date_prepared: @date_prepared,
                            book: @book,
                            particular: @particular
                          )

      @accounting_entry.save!

      @accounting_entry
    end
  end
end
