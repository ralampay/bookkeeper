class AddCategoryToAccountingCodes < ActiveRecord::Migration[6.0]
  def change
    add_column :accounting_codes, :category, :string
  end
end
