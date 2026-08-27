(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5541991970817";
  var DEFAULT_WA_MESSAGE =
    "Olá! Vim do site e gostaria de agendar minha consulta com o Dr. Roger Shiomi.";

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

  // ---------- WhatsApp CTAs ----------
  function buildWhatsappUrl(message) {
    var text = encodeURIComponent(message);
    return "https://api.whatsapp.com/send/?phone=" + WHATSAPP_NUMBER +
      "&text=" + text + "&type=phone_number&app_absent=0";
  }

  document.querySelectorAll(".js-whatsapp-cta").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var message = link.getAttribute("data-wa-message") || DEFAULT_WA_MESSAGE;
      window.open(buildWhatsappUrl(message), "_blank", "noopener");
    });
  });
})();
