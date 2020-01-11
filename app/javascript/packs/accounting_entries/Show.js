import 'bootstrap'

var Show = (function() {
  var $btnApprove;
  var $btnConfirmApprove;
  var $btnDelete;
  var $btnConfirmDelete;
  var $modalApprove;
  var $modalDelete;
  var $message;

  var _authenticityToken;
  var _id;

  var _urlApprove = "/api/v1/accounting_entries/approve";
  var _urlDelete  = "/api/v1/accounting_entries/delete";

  var init  = function(options) {
    _authenticityToken  = options.authenticityToken;
    _id                 = options.id; 
    _cacheDom();
    _bindEvents();
  };

  var _cacheDom = function() {
    $btnApprove         = $("#btn-approve");
    $btnConfirmApprove  = $("#btn-confirm-approve");
    $btnDelete          = $("#btn-delete");
    $btnConfirmDelete   = $("#btn-confirm-delete");
    $modalApprove       = $("#modal-approve");
    $modalDelete        = $("#modal-delete");
    $message            = $(".message");
  };

  var _bindEvents = function() {
    $btnDelete.on("click", function() {
      $modalDelete.modal("show");
    });

    $btnConfirmDelete.on("click", function() {
      var data = {
        id: _id,
        authenticity_token: authenticityToken
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
        authenticity_token: authenticityToken
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

  return {
    init: init
  };
})();

window.Show  = Show;
