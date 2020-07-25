import 'bootstrap'

var $btnNew;
var $btnSave;
var $modalNew;
var $message;

var $inputDatePrepared;
var $inputParticular;
var $inputBook;

var _authenticityToken;

var _urlCreate  = "/api/v1/accounting_entries";

var init  = function(options) {
  _authenticityToken = options.authenticityToken;
  _cacheDom();
  _bindEvents();
};

var _cacheDom = function() {
  $btnNew   = $("#btn-new");
  $btnSave  = $("#btn-save");
  $modalNew = $("#modal-new");
  $message  = $(".message");

  $inputDatePrepared  = $("#input-date-prepared");
  $inputParticular    = $("#input-particular");
  $inputBook          = $("#input-book");
};

var _bindEvents = function() {
  $btnNew.on("click", function() {
    // Display modal to input information
    $modalNew.modal("show");
  });

  $btnSave.on("click", function() {
    var datePrepared  = $inputDatePrepared.val();
    var particular    = $inputParticular.val();
    var book          = $inputBook.val();

    var data = {
      date_prepared: datePrepared,
      particular: particular,
      book: book,
      authenticity_token: _authenticityToken
    }

    $btnSave.prop("disabled", true);
    $inputDatePrepared.prop("disabled", true);
    $inputParticular.prop("disabled", true);
    $inputBook.prop("disabled", true);

    $message.html("<h5>Loading...</h5>");

    // On click save, create an accounting entry via API
    $.ajax({
      url: _urlCreate,
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
        $btnSave.prop("disabled", false);
        $inputDatePrepared.prop("disabled", false);
        $inputParticular.prop("disabled", false);
        $inputBook.prop("disabled", false);
      }
    });
  });
};

export default { init: init };
