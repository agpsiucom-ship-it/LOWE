(function () {
  "use strict";

  // TODO: confirme o número de Sinop — foi informado com 8 dígitos locais
  // (9981-3103); celulares no Brasil têm 9 dígitos (ex.: 99981-3103).
  var WHATSAPP_NUMBERS = {
    sinop: "556699813103",
    sorriso: "5566999106353"
  };
  var DEFAULT_UNIT = "sinop";

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
  function buildWhatsappUrl(number, message) {
    var text = encodeURIComponent(message);
    return "https://wa.me/" + number + "?text=" + text;
  }

  var DEFAULT_WA_MESSAGE =
    "Olá! Gostaria de agendar uma consulta com o Dr. Bruno Finkler.";

  document.querySelectorAll(".js-whatsapp-cta").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var unit = link.getAttribute("data-wa-unit") || DEFAULT_UNIT;
      var number = WHATSAPP_NUMBERS[unit] || WHATSAPP_NUMBERS[DEFAULT_UNIT];
      var message = link.getAttribute("data-wa-message") || DEFAULT_WA_MESSAGE;
      window.open(buildWhatsappUrl(number, message), "_blank", "noopener");
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
    var unidade = form.unidade.value;
    var unidadeLabel = unidade === "sorriso" ? "Sorriso - MT" : "Sinop - MT";
    var mensagem = form.mensagem.value.trim();

    var lines = [
      DEFAULT_WA_MESSAGE,
      "Nome: " + nome,
      "WhatsApp: " + whatsapp,
      "Unidade de preferência: " + unidadeLabel
    ];
    if (mensagem) {
      lines.push("Mensagem: " + mensagem);
    }

    var number = WHATSAPP_NUMBERS[unidade] || WHATSAPP_NUMBERS[DEFAULT_UNIT];
    window.open(buildWhatsappUrl(number, lines.join("\n")), "_blank", "noopener");

    successMsg.hidden = false;
    form.reset();
  });
})();
