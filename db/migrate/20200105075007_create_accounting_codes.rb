class CreateAccountingCodes < ActiveRecord::Migration[6.0]
  def change
    create_table :accounting_codes, id: :uuid do |t|
      t.string :name
      t.string :code

      t.timestamps
    end
  end
end
