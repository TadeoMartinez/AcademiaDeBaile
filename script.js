(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  document.querySelectorAll("[data-plan]").forEach(link => {
    link.addEventListener("click", () => {
      const planSelect = document.querySelector("#plan");
      if (planSelect) planSelect.value = link.dataset.plan;
    });
  });

  const form = document.querySelector("#signup-form");
  const status = document.querySelector("#form-status");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const interest = String(data.get("interest") || "").trim();
      const plan = String(data.get("plan") || "").trim();

      if (!name || !phone || !interest) {
        if (status) status.textContent = "Completa los campos obligatorios para continuar.";
        return;
      }

      const message = [
        "¡Hola, DileQueNoOficial! Quiero información sobre sus clases.",
        `Nombre: ${name}`,
        `Mi WhatsApp: ${phone}`,
        `Clase de interés: ${interest}`,
        `Plan de interés: ${plan || "Todavía no lo sé"}`,
        "¿Me pueden compartir más información?"
      ].join("\n");

      // Número de México con lada internacional; cambia este dato si la academia usa otro WhatsApp.
      const academyNumber = "525554345308";
      const url = `https://wa.me/${academyNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      if (status) status.textContent = "Se preparó tu mensaje en WhatsApp. Revísalo y envíalo desde allí.";
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();