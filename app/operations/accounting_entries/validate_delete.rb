module AccountingEntries
  class ValidateDelete
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

      @errors
    end
  end
end
