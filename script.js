const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        navLinks.classList.remove("is-open");
        navLinks.setAttribute("aria-hidden", "true");
    };

    const openMenu = () => {
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Cerrar menú");
        navLinks.classList.add("is-open");
        navLinks.setAttribute("aria-hidden", "false");
    };

    closeMenu();

    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();

        const expanded = menuToggle.getAttribute("aria-expanded") === "true";

        if (expanded) {
            closeMenu();
            return;
        }

        openMenu();
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    navLinks.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
        if (window.innerWidth > 760) {
            return;
        }

        if (
            menuToggle.getAttribute("aria-expanded") === "true" &&
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            closeMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760) {
            navLinks.classList.remove("is-open");
            navLinks.removeAttribute("aria-hidden");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Abrir menú");
            return;
        }

        if (!navLinks.classList.contains("is-open")) {
            navLinks.setAttribute("aria-hidden", "true");
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Gracias por tu mensaje. Te responderemos pronto.");
        contactForm.reset();
    });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

