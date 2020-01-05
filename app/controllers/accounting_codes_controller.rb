class AccountingCodesController < ApplicationController
  def index
    @accounting_codes = AccountingCode.select("*").order("code ASC")
  end

  def edit
    @accounting_code  = AccountingCode.find(params[:id])
  end

  def update
    @accounting_code  = AccountingCode.find(params[:id])

    if @accounting_code.update(accounting_code_params)
      redirect_to accounting_code_path(@accounting_code.id)
    else
      render :edit
    end
  end

  def destroy
    @accounting_code  = AccountingCode.find(params[:id])
    @accounting_code.destroy!

    redirect_to accounting_codes_path
  end

  def new
    @accounting_code  = AccountingCode.new
  end

  def create
    @accounting_code  = AccountingCode.new(accounting_code_params)

    if @accounting_code.save
      redirect_to accounting_code_path(@accounting_code.id)
    else
      render :new
    end
  end

  def show
    @accounting_code  = AccountingCode.find(params[:id])
  end

  def accounting_code_params
    params.require(:accounting_code).permit!
  end
end
