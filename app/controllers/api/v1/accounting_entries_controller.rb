module Api
  module V1
    class AccountingEntriesController < ApplicationController
      def delete
        accounting_entry  = AccountingEntry.where(id: params[:id]).first

        args  = {
          accounting_entry: accounting_entry
        }

        errors  = ::AccountingEntries::ValidateDelete.new(
                    args: args
                  ).run

        if errors.size > 0
          render json: { errors: errors }, status: 400
        else
          ::AccountingEntries::Delete.new(
            args: args
          ).run

          render json: { message: "ok" }
        end
      end

      def approve
        accounting_entry  = AccountingEntry.where(id: params[:id]).first

        args  = {
          accounting_entry: accounting_entry
        }

        errors  = ::AccountingEntries::ValidateApprove.new(
                    args: args
                  ).run

        if errors.size > 0
          render json: { errors: errors }, status: 400
        else
          ::AccountingEntries::Approve.new(
            args: args
          ).run

          render json: { message: "ok", id: accounting_entry.id }
        end
      end

      def create
        date_prepared = params[:date_prepared]
        book          = params[:book]
        particular    = params[:particular]

        args  = {
          date_prepared: date_prepared,
          book: book,
          particular: particular
        }

        errors  = ::AccountingEntries::ValidateCreate.new(
                    args: args
                  ).run

        if errors.size > 0
          render json: { errors: errors }, status: 400
        else
          accounting_entry  = ::AccountingEntries::Create.new(
                                args: args
                              ).run

          render json: { message: "ok", id: accounting_entry.id }
        end
      end
    end
  end
end
