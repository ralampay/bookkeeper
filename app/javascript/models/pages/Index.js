var $btnClick;

var _authenticityToken;

var init  = function(options) {
  _authenticityToken  = options.authenticityToken;
  _cacheDom();
  _bindEvents();
};

var _cacheDom = function() {
  $btnClick = $("#btn-click");
};

var _bindEvents = function() {
  $btnClick.on("click", function() {
    alert("Button clicked!");
  });
};

export default { init: init };
