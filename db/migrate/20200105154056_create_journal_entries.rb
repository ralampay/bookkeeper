class CreateJournalEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :journal_entries, id: :uuid do |t|
      t.string :post_type
      t.decimal :amount
      t.references :accounting_code, null: false, foreign_key: true, type: :uuid
      t.references :accounting_entry, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
