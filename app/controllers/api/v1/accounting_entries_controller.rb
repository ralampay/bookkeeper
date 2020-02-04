module Api
  module V1
    class AccountingEntriesController < ApplicationController
      def update
        accounting_entry  = AccountingEntry.where(id: params[:id]).first

        accounting_entry.update(accounting_entry_update_params)

        render json: { message: "ok" }
      end

      def delete_journal_entry
        accounting_entry  = AccountingEntry.where(id: params[:id]).first
        journal_entry     = JournalEntry.where(id: params[:journal_entry_id]).first

        args  = {
          accounting_entry: accounting_entry,
          journal_entry: journal_entry
        }

        errors  = ::AccountingEntries::ValidateDeleteJournalEntry.new(
                    args: args
                  ).run

        if errors.size > 0
          render json: { errors: errors }, status: 400
        else
          journal_entry.destroy!

          render json: { message: "ok" }
        end
      end

      def add_journal_entry
        accounting_entry  = AccountingEntry.where(id: params[:id]).first
        accounting_code   = AccountingCode.where(id: params[:accounting_code_id]).first
        post_type         = params[:post_type]
        amount            = params[:amount].try(:to_f).try(:round, 2)

        args  = {
          accounting_entry: accounting_entry,
          accounting_code: accounting_code,
          post_type: post_type,
          amount: amount
        }

        errors  = ::AccountingEntries::ValidateAddJournalEntry.new(
                    args: args
                  ).run

        if errors.size > 0
          render json: { errors: errors }, status: 400
        else
          ::AccountingEntries::AddJournalEntry.new(
            args: args
          ).run

          render json: { message: "ok" }
        end
      end

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

      private

      # for strong parameters
      def accounting_entry_update_params
        params.require(:accounting_entry).permit(:particular, :date_prepared)
      end
    end
  end
end
