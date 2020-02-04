module Reports
  class GenerateTrialBalance
    attr_accessor :as_of, :data, :result

    def initialize(as_of:)
      @as_of  = as_of

      @data = {
        as_of: @as_of,
        entries: [],
        total_debit: 0.00,
        total_credit: 0.00
      }
    end

    def execute!
      fetch_result!

      @data[:entries] = result.group_by{ |o| { id: o.fetch("id"), name: o.fetch("name") } }.map{ |accounting_code_hash, txs|
                          {
                            id: accounting_code_hash[:id],
                            name: accounting_code_hash[:name],
                            dr_amount: txs.select{ |t| t.fetch("post_type") == 'DR' }.inject(0){ |sum, h| sum + h.fetch("amount").to_f }.round(2),
                            cr_amount: txs.select{ |t| t.fetch("post_type") == 'CR' }.inject(0){ |sum, h| sum + h.fetch("amount").to_f }.round(2)
                          }
                        }

      @data[:total_debit]   = @data[:entries].inject(0){ |sum, hash| sum + hash[:dr_amount] }.round(2)
      @data[:total_credit]  = @data[:entries].inject(0){ |sum, hash| sum + hash[:cr_amount] }.round(2)

      @data
    end

    private

    def fetch_result!
      query = "
        SELECT
          accounting_codes.id,
          accounting_codes.code,
          accounting_codes.name,
          journal_entries.amount,
          journal_entries.post_type
        FROM
          accounting_codes
        INNER JOIN
          journal_entries AS journal_entries ON journal_entries.accounting_code_id = accounting_codes.id
        INNER JOIN
          accounting_entries 
            ON 
              accounting_entries.id = journal_entries.accounting_entry_id
            AND 
              accounting_entries.status = 'approved' AND accounting_entries.date_posted <= '#{as_of}'
      "

      @result = ActiveRecord::Base.connection.execute(query).to_a
    end
  end
end
