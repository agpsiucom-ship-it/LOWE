(function () {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  var ctas = document.querySelectorAll('a[href^="https://wa.me/"]');

  // ---------- Atribuição: anexa a origem do clique (utm_source/campaign) ----------
  // Os hrefs já funcionam sem JS; aqui só enriquecemos a mensagem para a
  // recepção saber de qual campanha veio o lead.
  var params = new URLSearchParams(window.location.search);
  var source = params.get("utm_source");
  var campaign = params.get("utm_campaign");
  if (source || campaign || params.get("gclid") || params.get("fbclid")) {
    var tag = " [origem: " + [source || (params.get("gclid") ? "google" : "meta"), campaign]
      .filter(Boolean).join(" / ") + "]";
    ctas.forEach(function (a) {
      // Monta à mão: URLSearchParams codifica espaço como "+", que o WhatsApp
      // nem sempre converte de volta.
      var url = new URL(a.href);
      var text = (url.searchParams.get("text") || "") + tag;
      a.href = url.origin + url.pathname + "?text=" + encodeURIComponent(text);
    });
  }

  // ---------- Tracking: um evento por CTA, com a posição na página ----------
  ctas.forEach(function (a) {
    a.addEventListener("click", function () {
      window.dataLayer.push({
        event: "whatsapp_click",
        cta_position: a.getAttribute("data-cta") || "desconhecido"
      });
    });
  });

  // ---------- CTA fixa no mobile: aparece depois que o CTA do hero sai da tela ----------
  var sticky = document.getElementById("stickyCta");
  var heroCta = document.querySelector('[data-cta="hero"]');
  var finalSection = document.getElementById("agendar");

  if (sticky && heroCta && "IntersectionObserver" in window) {
    var heroVisible = true;
    var finalVisible = false;

    var update = function () {
      var show = !heroVisible && !finalVisible;
      sticky.classList.toggle("is-visible", show);
      sticky.setAttribute("aria-hidden", show ? "false" : "true");
      sticky.querySelector("a").tabIndex = show ? 0 : -1;
    };

    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      update();
    }).observe(heroCta);

    if (finalSection) {
      new IntersectionObserver(function (entries) {
        finalVisible = entries[0].isIntersecting;
        update();
      }, { threshold: 0.25 }).observe(finalSection);
    }
  }

  // ---------- FAQ: abre uma pergunta por vez e registra interesse ----------
  var faqItems = document.querySelectorAll(".faq details");
  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
      window.dataLayer.push({
        event: "faq_open",
        faq_question: item.querySelector("summary").textContent.trim()
      });
    });
  });
})();
