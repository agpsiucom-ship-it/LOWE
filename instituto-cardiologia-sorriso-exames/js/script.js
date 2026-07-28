(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5566999106353";
  var DEFAULT_WA_MESSAGE = "Olá! Gostaria de agendar um exame cardiológico no Instituto de Cardiologia de Sorriso (ICS).";

  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- FAQ accordion ----------
  document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var answer = btn.nextElementSibling;

      document.querySelectorAll(".faq-question").forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          otherBtn.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      answer.style.maxHeight = expanded ? null : answer.scrollHeight + "px";
    });
  });

  // ---------- WhatsApp helpers ----------
  function buildWhatsappUrl(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  document.querySelectorAll(".js-whatsapp-cta").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var message = link.getAttribute("data-wa-message") || DEFAULT_WA_MESSAGE;
      window.open(buildWhatsappUrl(message), "_blank", "noopener");
    });
  });
})();
