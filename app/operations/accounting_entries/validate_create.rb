module AccountingEntries
  class ValidateCreate
    def initialize(args:)
      @args           = args
      @date_prepared  = @args[:date_prepared]
      @book           = @args[:book]
      @particular     = @args[:particular]

      @errors = []
    end

    def run
      if @date_prepared.blank?
        @errors << "date_prepared required"
      end

      if @book.blank?
        @errors << "book required"
      end

      if @particular.blank?
        @errors << "particular required"
      end

      @errors
    end
  end
end
