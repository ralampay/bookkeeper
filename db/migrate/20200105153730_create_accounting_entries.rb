class CreateAccountingEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :accounting_entries, id: :uuid do |t|
      t.date :date_prepared
      t.date :date_posted
      t.text :particular
      t.string :status
      t.string :book

      t.timestamps
    end
  end
end
