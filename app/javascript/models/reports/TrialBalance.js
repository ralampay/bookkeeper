import Mustache from 'mustache'

var _authenticityToken;

var $inputAsOf;
var $btnGenerate;
var $reportContent;

var templateTrialBalance;

var _urlGenerate  = "/api/v1/reports/trial_balance";

var _cacheDom = function() {
  $inputAsOf      = $("#input-as-of");
  $btnGenerate    = $("#btn-generate");
  $reportContent  = $("#report-content");

  templateTrialBalance  = $("#template-trial-balance").html();
};

var _bindEvents = function() {
  $btnGenerate.on("click", function() {
    var asOf  = $inputAsOf.val();

    $inputAsOf.prop("disabled", true);
    $btnGenerate.prop("disabled", true);

    $reportContent.html("Loading...");

    $.ajax({
      url: _urlGenerate,
      data: {
        as_of: asOf
      },
      method: 'GET',
      success: function(response) {
        console.log(response);

        $reportContent.html(
          Mustache.render(
            templateTrialBalance,
            response
          )
        );

        $inputAsOf.prop("disabled", false);
        $btnGenerate.prop("disabled", false);
      },
      error: function(response) {
        alert("Error in fetching trial balance data");

        $inputAsOf.prop("disabled", false);
        $btnGenerate.prop("disabled", false);

        $reportContent.html("Error!");
      }
    });
  });
};

var init  = function(options) {
  _authenticityToken  = options.authenticityToken;

  _cacheDom();
  _bindEvents();
};

export default { init: init };
