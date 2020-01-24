module AccountingEntries
  class ValidateApprove
    def initialize(args:)
      @args             = args
      @accounting_entry = @args[:accounting_entry]
      @journal_entries  = @accounting_entry.journal_entries

      @errors = []
    end

    def run
      if @accounting_entry.blank?
        @errors << "accounting_entry required"
      elsif @accounting_entry.not_pending?
        @errors << "accounting_entry is not pending"
      end

      if @accounting_entry.present?
        if @journal_entries.size < 2
          @errors << "Should have at least 2 journal_entries"
        else
          check_and_balance!
        end
      end

      @errors
    end

    def check_and_balance!
      debit_amount  = 0.00
      credit_amount = 0.00

      @journal_entries.each do |o|
        if o.is_debit?
          debit_amount  += o.amount
        elsif o.is_credit?
          credit_amount += o.amount
        end
      end

      if debit_amount != credit_amount
        @errors << "Unbalanced journal entries. Debit: #{debit_amount} Credit: #{credit_amount}"
      end
    end
  end
end
