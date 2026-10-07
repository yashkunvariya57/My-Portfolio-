/* =========================================================
   YASH KUNVARIYA — PERSONAL PORTFOLIO
   Simple vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", isOpen);
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });
        });

        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("active")
            ) {
                navMenu.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            }
        });
    }

    const sections = document.querySelectorAll("main section[id]");

    if (sections.length && navLinks.length) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId = entry.target.id;

                    navLinks.forEach((link) => {
                        const linkTarget = link.getAttribute("href");
                        const isCurrent = linkTarget === `#${currentId}`;

                        if (isCurrent) {
                            link.setAttribute("aria-current", "page");
                            link.style.color = "var(--color-accent)";
                            link.style.background =
                                "rgba(124, 58, 237, 0.07)";
                        } else {
                            link.removeAttribute("aria-current");
                            link.style.color = "";
                            link.style.background = "";
                        }
                    });
                });
            },
            {
                root: null,
                threshold: 0.25,
                rootMargin: "-15% 0px -55% 0px"
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".about-intro, " +
        ".about-highlight, " +
        ".education-card, " +
        ".interest-card, " +
        ".strength-item, " +
        ".goal-card, " +
        ".contact-intro, " +
        ".contact-card"
    );

    if ("IntersectionObserver" in window) {
        revealElements.forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(18px)";
            element.style.transition =
                "opacity 0.6s ease, transform 0.6s ease";
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";

                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    const desktopBreakpoint = window.matchMedia("(min-width: 900px)");

    const handleScreenChange = (event) => {
        if (event.matches && navMenu && menuToggle) {
            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        }
    };

    if (desktopBreakpoint.addEventListener) {
        desktopBreakpoint.addEventListener("change", handleScreenChange);
    } else {
        desktopBreakpoint.addListener(handleScreenChange);
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                navMenu.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.focus();
            }
        });
    }
});
