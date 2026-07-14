(function () {
  "use strict";

  // TODO: substituir pelo número real de WhatsApp da clínica (formato: 55 + DDD + número, só dígitos)
  var WHATSAPP_NUMBER = "5541900000000";

  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Mobile nav ----------
  var header = document.getElementById("topo");
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  navToggle.addEventListener("click", function () {
    var isOpen = header.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

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
    var text = encodeURIComponent(message);
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  }

  document.querySelectorAll(".js-whatsapp-cta").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var defaultMessage =
        "Olá! Gostaria de agendar uma consulta com a Dra. Mariana Zahdi.";
      window.open(buildWhatsappUrl(defaultMessage), "_blank", "noopener");
    });
  });

  // ---------- Lead form -> WhatsApp ----------
  var form = document.getElementById("leadForm");
  var successMsg = document.getElementById("formSuccess");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var nome = form.nome.value.trim();
    var whatsapp = form.whatsapp.value.trim();
    var interesse = form.interesse.value;
    var mensagem = form.mensagem.value.trim();

    var lines = [
      "Olá! Gostaria de agendar uma consulta com a Dra. Mariana Zahdi.",
      "Nome: " + nome,
      "WhatsApp: " + whatsapp,
      "Interesse: " + interesse
    ];
    if (mensagem) {
      lines.push("Mensagem: " + mensagem);
    }

    window.open(buildWhatsappUrl(lines.join("\n")), "_blank", "noopener");

    successMsg.hidden = false;
    form.reset();
  });
})();
