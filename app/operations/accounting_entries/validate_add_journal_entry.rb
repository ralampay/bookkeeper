module AccountingEntries
  class ValidateAddJournalEntry
    def initialize(args:)
      @args             = args
      @accounting_entry = @args[:accounting_entry]
      @accounting_code  = @args[:accounting_code]
      @post_type        = @args[:post_type]
      @amount           = @args[:amount]

      @errors = []
    end

    def run
      if @accounting_entry.blank?
        @errors << "accounting_entry required"
      elsif @accounting_entry.not_pending?
        @errors << "accounting_entry is not pending"
      end

      if @accounting_code.blank?
        @errors << "accounting_code required"
      end

      if @post_type.blank?
        @errors << "post_type required"
      end

      if @amount.blank?
        @errors << "amount required"
      elsif @amount.present? and @amount <= 0.00
        @errors << "invalid amount"
      end

      if @accounting_entry.present? and @accounting_code.present? and @post_type.present?
        journal_entries = @accounting_entry.journal_entries

        if journal_entries.select{ |o| o.accounting_code_id == @accounting_code.id and @post_type == o.post_type }.size > 0
          @errors << "duplicate journal entry for accounting code #{@accounting_code.name} and post type #{@post_type}"
        end
      end

      @errors
    end
  end
end
