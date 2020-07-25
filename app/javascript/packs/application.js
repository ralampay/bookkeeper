// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")

import 'bootstrap'
import '../stylesheets/application.scss'

window.jQuery = $;
window.$      = $;

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import PagesIndex from "../models/pages/Index.js";
import ReportsTrialBalance from "../models/reports/TrialBalance.js";
import AccountingEntriesIndex from "../models/accounting_entries/Index.js";
import AccountingEntriesShow from "../models/accounting_entries/Show.js";

const hooks = {
  "pages/index":              [PagesIndex],
  "reports/trial_balance":    [ReportsTrialBalance],
  "accounting_entries/index": [AccountingEntriesIndex],
  "accounting_entries/show":  [AccountingEntriesShow]
};

document.addEventListener("DOMContentLoaded", () => {
  var $btnToggleNav   = $("#btn-toggle-nav");
  var $sidebar        = $("#sidebar");

  $btnToggleNav.on("click", function() {
    $sidebar.toggleClass("active");
  });

  const { route, payload }  = JSON.parse($("meta[name='parameters']").attr('content'));
  const authenticityToken   = $("meta[name='csrf-token']").attr('content');
  const options             = { authenticityToken, ...payload };
  const components          = hooks[route];

  console.log("Route: " + route);
  console.log("Payload:");
  console.log(payload);

  if(components) {
    components.forEach((component) => {
      component.init(options);
    });
  }
});
