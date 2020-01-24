module AccountingEntries
  class AddJournalEntry
    def initialize(args:)
      @args             = args
      @accounting_entry = @args[:accounting_entry]
      @accounting_code  = @args[:accounting_code]
      @post_type        = @args[:post_type]
      @amount           = @args[:amount]

      @journal_entry  = JournalEntry.new(
                          accounting_entry: @accounting_entry,
                          accounting_code: @accounting_code,
                          post_type: @post_type,
                          amount: @amount
                        )
    end

    def run
      @journal_entry.save!

      @journal_entry
    end
  end
end
