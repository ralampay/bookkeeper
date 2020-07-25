import 'bootstrap'

var $btnApprove;
var $btnConfirmApprove;
var $btnDelete;
var $btnConfirmDelete;
var $btnAddJournalEntry;
var $btnDeleteJournalEntry;
var $btnConfirmDeleteJournalEntry;
var $btnEditParticular;
var $btnConfirmParticular;
var $btnEditDatePrepared;
var $btnConfirmDatePrepared;
var $modalApprove;
var $modalDelete;
var $modalDeleteJournalEntry;
var $modalEditParticular;
var $modalEditDatePrepared;
var $inputParticular;
var $inputDatePrepared;
var $displayAccountingCode;
var $displayAmount;
var $selectAccountingCode;
var $selectPostType;
var $inputAmount;
var $message;

var _authenticityToken;
var _id;
var _journalEntryId;

var _urlApprove             = "/api/v1/accounting_entries/approve";
var _urlDelete              = "/api/v1/accounting_entries/delete";
var _urlAddJournalEntry     = "/api/v1/accounting_entries/add_journal_entry";
var _urlDeleteJournalEntry  = "/api/v1/accounting_entries/delete_journal_entry";
var _urlUpdate              = "/api/v1/accounting_entries/update";

var init  = function(options) {
  _authenticityToken  = options.authenticityToken;
  _id                 = options.id; 
  _cacheDom();
  _bindEvents();
};

var _cacheDom = function() {
  $btnApprove                   = $("#btn-approve");
  $btnConfirmApprove            = $("#btn-confirm-approve");
  $btnDelete                    = $("#btn-delete");
  $btnConfirmDelete             = $("#btn-confirm-delete");
  $btnAddJournalEntry           = $("#btn-add-journal-entry");
  $btnDeleteJournalEntry        = $(".btn-delete-journal-entry");
  $btnConfirmDeleteJournalEntry = $("#btn-confirm-delete-journal-entry");
  $btnEditParticular            = $("#btn-edit-particular");
  $btnConfirmParticular         = $("#btn-confirm-particular");
  $btnEditDatePrepared          = $("#btn-edit-date-prepared");
  $btnConfirmDatePrepared       = $("#btn-confirm-date-prepared");
  $displayAccountingCode        = $("#display-accounting-code");
  $displayAmount                = $("#display-amount");
  $modalApprove                 = $("#modal-approve");
  $modalDelete                  = $("#modal-delete");
  $modalDeleteJournalEntry      = $("#modal-delete-journal-entry");
  $modalEditParticular          = $("#modal-edit-particular");
  $modalEditDatePrepared        = $("#modal-edit-date-prepared");
  $selectAccountingCode         = $("#select-accounting-code");
  $selectPostType               = $("#select-post-type");
  $inputAmount                  = $("#input-amount");
  $inputParticular              = $("#input-particular");
  $inputDatePrepared            = $("#input-date-prepared");
  $message                      = $(".message");
};

var _bindEvents = function() {
  $btnEditDatePrepared.on("click", function() {
    $message.html("");
    $modalEditDatePrepared.modal("show");
  });

  $btnConfirmDatePrepared.on("click", function() {
    var datePrepared  = $inputDatePrepared.val();

    $btnConfirmDatePrepared.prop("disabled", true);
    $inputDatePrepared.prop("disabled", true);

    $message.html("Loading...");

    var data  = {
      id: _id,
      authenticity_token: _authenticityToken,
      accounting_entry: {
        date_prepared: datePrepared
      }
    };

    $.ajax({
      url: _urlUpdate,
      method: 'POST',
      data: data,
      success: function(response) {
        $message.html("Success! Redirecting...");
        window.location.reload();
      },
      error: function(response) {
        alert("error");
        $message.html("");

        $btnConfirmDatePrepared.prop("disabled", false);
        $inputDatePrepared.prop("disabled", false);
      }
    });
  });

  $btnEditParticular.on("click", function() {
    $message.html("");
    $modalEditParticular.modal("show");
  });

  $btnConfirmParticular.on("click", function() {
    var particular  = $inputParticular.val();

    $btnConfirmParticular.prop("disabled", true);
    $inputParticular.prop("disabled", true);

    $message.html("Loading...");

    var data  = {
      id: _id,
      authenticity_token: _authenticityToken,
      accounting_entry: {
        particular: particular
      }
    };

    $.ajax({
      url: _urlUpdate,
      method: 'POST',
      data: data,
      success: function(response) {
        $message.html("Success! Redirecting...");
        window.location.reload();
      },
      error: function(response) {
        alert("error");
        $message.html("");

        $btnConfirmParticular.prop("disabled", false);
        $inputParticular.prop("disabled", false);
      }
    });
  });

  $btnDeleteJournalEntry.on("click", function() {
    _journalEntryId     = $(this).data("journal-entry-id");
    var accountingCode  = $(this).data("accounting-code");
    var amount          = $(this).data("amount");

    $displayAccountingCode.html(accountingCode);
    $displayAmount.html(amount);

    $modalDeleteJournalEntry.modal("show");
  });

  $btnConfirmDeleteJournalEntry.on("click", function() {
    var data = {
      id: _id,
      journal_entry_id: _journalEntryId,
      authenticity_token: _authenticityToken
    }
    
    $btnConfirmDeleteJournalEntry.prop("disabled", true);

    $message.html("<h5>Loading...</h5>");

    // On click save, create an accounting entry via API
    $.ajax({
      url: _urlDeleteJournalEntry,
      method: 'POST',
      data: data,
      success: function(response) {
        // Redirect to show page
        window.location.href = "/accounting_entries/" + _id;
      },
      error: function(response) {
        var errors  = JSON.parse(response.responseText).errors;

        var errorString = "<ul>";

        for(var i = 0; i < errors.length; i++) {
          errorString += "<li>" + errors[i] + "</li>";
        }

        errorString     += "</ul>";

        $message.html(errorString);

        // Reactivate ui
        $btnConfirmDeleteJournalEntry.prop("disabled", false);
      }
    });
  });

  $btnAddJournalEntry.on("click", function() {
    var accountingCodeId  = $selectAccountingCode.val();
    var postType          = $selectPostType.val();
    var amount            = $inputAmount.val();

    var data  = {
      id: _id,
      authenticity_token: _authenticityToken,
      accounting_code_id: accountingCodeId,
      post_type: postType,
      amount: amount
    }

    $selectAccountingCode.prop("disabled", true);
    $selectPostType.prop("disabled", true);
    $inputAmount.prop("disabled", true);
    $btnAddJournalEntry.prop("disabled", true);

    $.ajax({
      url: _urlAddJournalEntry,
      method: 'POST',
      data: data,
      success: function(response) {
        // Redirect to show page
        window.location.href = "/accounting_entries/" + _id;
      },
      error: function(response) {
        var errors  = JSON.parse(response.responseText).errors;

        var errorString = "<ul>";

        for(var i = 0; i < errors.length; i++) {
          errorString += "<li>" + errors[i] + "</li>";
        }

        errorString     += "</ul>";

        $message.html(errorString);

        $selectAccountingCode.prop("disabled", false);
        $selectPostType.prop("disabled", false);
        $inputAmount.prop("disabled", false);
        $btnAddJournalEntry.prop("disabled", false);
      }
    });
  });

  $btnDelete.on("click", function() {
    $modalDelete.modal("show");
  });

  $btnConfirmDelete.on("click", function() {
    var data = {
      id: _id,
      authenticity_token: _authenticityToken
    }
    
    $btnConfirmDelete.prop("disabled", true);

    $message.html("<h5>Loading...</h5>");

    // On click save, create an accounting entry via API
    $.ajax({
      url: _urlDelete,
      method: 'POST',
      data: data,
      success: function(response) {
        // Redirect to show page
        window.location.href = "/accounting_entries";
      },
      error: function(response) {
        var errors  = JSON.parse(response.responseText).errors;

        var errorString = "<ul>";

        for(var i = 0; i < errors.length; i++) {
          errorString += "<li>" + errors[i] + "</li>";
        }

        errorString     += "</ul>";

        $message.html(errorString);

        // Reactivate ui
        $btnConfirmDelete.prop("disabled", false);
      }
    });
  });

  $btnApprove.on("click", function() {
    // Display modal to input information
    $modalApprove.modal("show");
  });

  $btnConfirmApprove.on("click", function() {
    var data = {
      id: _id,
      authenticity_token: _authenticityToken
    }
    
    $btnConfirmApprove.prop("disabled", true);

    $message.html("<h5>Loading...</h5>");

    // On click save, create an accounting entry via API
    $.ajax({
      url: _urlApprove,
      method: 'POST',
      data: data,
      success: function(response) {
        // Redirect to show page
        window.location.href = "/accounting_entries/" + response.id;
      },
      error: function(response) {
        var errors  = JSON.parse(response.responseText).errors;

        var errorString = "<ul>";

        for(var i = 0; i < errors.length; i++) {
          errorString += "<li>" + errors[i] + "</li>";
        }

        errorString     += "</ul>";

        $message.html(errorString);

        // Reactivate ui
        $btnConfirmApprove.prop("disabled", false);
      }
    });
  });
};

export default { init: init };
