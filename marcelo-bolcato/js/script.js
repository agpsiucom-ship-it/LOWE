(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Conversion tracking ----------
  // Cada clique em um CTA de WhatsApp envia "whatsapp_click" ao dataLayer,
  // com a posição do botão em cta_location (header, hero, steps, final...).
  window.dataLayer = window.dataLayer || [];

  document.querySelectorAll("[data-cta]").forEach(function (link) {
    link.addEventListener("click", function () {
      window.dataLayer.push({
        event: "whatsapp_click",
        cta_location: link.getAttribute("data-cta")
      });
    });
  });

  // ---------- Sticky mobile CTA ----------
  // Aparece depois que o CTA do hero sai da tela e some sobre a chamada final,
  // para não duplicar botões visíveis.
  var sticky = document.getElementById("stickyCta");
  var heroCta = document.querySelector(".hero-cta");
  var finalCta = document.getElementById("agendar");

  if (sticky && heroCta && finalCta && "IntersectionObserver" in window) {
    var heroVisible = true;
    var finalVisible = false;

    var update = function () {
      sticky.classList.toggle("is-visible", !heroVisible && !finalVisible);
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === heroCta) heroVisible = entry.isIntersecting;
        if (entry.target === finalCta) finalVisible = entry.isIntersecting;
      });
      update();
    });
    observer.observe(heroCta);
    observer.observe(finalCta);
  } else if (sticky) {
    sticky.classList.add("is-visible");
  }
})();
