module AccountingEntries
  class ValidateApprove
    def initialize(args:)
      @args             = args
      @accounting_entry = @args[:accounting_entry]

      @errors = []
    end

    def run
      if @accounting_entry.blank?
        @errors << "accounting_entry required"
      elsif @accounting_entry.not_pending?
        @errors << "accounting_entry is not pending"
      end

      if @accounting_entry.present?
        journal_entries = @accounting_entry.journal_entries

        if journal_entries.size < 2
          @errors << "Should have at least 2 journal_entries"
        end
      end

      @errors
    end
  end
end
