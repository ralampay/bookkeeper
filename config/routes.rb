Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "pages#index"

  resources :accounting_codes
  resources :accounting_entries, only: [:index, :show]

  get "/reports/trial_balance", to: "reports#trial_balance", as: :reports_trial_balance

  namespace :api do
    namespace :v1 do
      post "/accounting_entries", to: "accounting_entries#create"
      post "/accounting_entries/approve", to: "accounting_entries#approve"
      post "/accounting_entries/delete", to: "accounting_entries#delete"
      post "/accounting_entries/add_journal_entry", to: "accounting_entries#add_journal_entry"
      post "/accounting_entries/delete_journal_entry", to: "accounting_entries#delete_journal_entry"
      post "/accounting_entries/update", to: "accounting_entries#update"

      get "/reports/trial_balance", to: "reports#trial_balance"
    end
  end
end
