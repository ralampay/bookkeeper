var Index = (function() {
  var $btnClick;

  var init  = function(options) {
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

  return {
    init: init
  };
})();

window.Index  = Index;
