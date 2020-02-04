module Api
  module V1
    class ReportsController < ApplicationController
      def trial_balance
        as_of = params[:as_of].try(:to_date)
        data  = ::Reports::GenerateTrialBalance.new(as_of: as_of).execute!

        render json: data
      end
    end
  end
end
