module AccountingEntries
  class ValidateDeleteJournalEntry
    def initialize(args:)
      @args             = args
      @accounting_entry = @args[:accounting_entry]
      @journal_entry    = @args[:journal_entry]

      @errors = []
    end

    def run
      if @accounting_entry.blank?
        @errors << "accounting_entry required"
      elsif @accounting_entry.not_pending?
        @errors << "accounting_entry is not pending"
      end

      if @journal_entry.blank?
        @errors << "journal_entry required"
      elsif @journal_entry.present? and @accounting_entry.present? and @journal_entry.accounting_entry_id != @accounting_entry.id
        @errors << "invalid accounting_entry for journal_entry #{@journal_entry.id}" 
      end

      @errors
    end
  end
end
