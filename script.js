
/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {

    menuToggle.addEventListener("click", function () {

        siteNav.classList.toggle("active");

        const isOpen = siteNav.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });


    // Close menu after clicking a link

    siteNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            siteNav.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        });

    });


    // Close menu with Escape key

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            siteNav.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    });

}


/* =========================
   PROJECT FILTERS
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedFilter = button.dataset.filter;

        // Update the active button
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Find the project cards when the button is clicked
        const projectCards = document.querySelectorAll(".project-card");

        projectCards.forEach(function(card) {

            const projectCategory = card.dataset.category;

            const shouldShow =
                selectedFilter === "all" ||
                selectedFilter === projectCategory;

            // Hide or show the card
            card.hidden = !shouldShow;

        });

    });

});

/* SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
    ".hero-content, .hero-image, .hero-backdrop, " +
    ".about-intro, .about-bio, .creative-section, " +
    ".skills-section, .work-intro, .project-card, " +
    ".contact-intro, .contact-details, .contact-bottom"
);

// Add the reveal class to each selected element
revealElements.forEach(function(element) {
    element.classList.add("reveal");
});

// Watch elements as they enter the screen
if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(function(entries, observer) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(function(element) {
        revealObserver.observe(element);
    });

} else {

    // Fallback for older browsers
    revealElements.forEach(function(element) {
        element.classList.add("is-visible");
    });

}

/* NAVIGATION: HIGHLIGHT CURRENT PAGE */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll(".site-nav a").forEach(function(link) {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});


/* CONTACT: INTERACTIVE QUOTE */

const quoteButton = document.querySelector(".quote-sparkle");
const quoteBanner = document.querySelector(".contact-bottom");
const quoteMain = document.querySelector(".quote-main");
const quoteSub = document.querySelector(".quote-sub");

const quoteMessages = [
    {
        main: "GOOD THINGS START WITH A CONVERSATION.",
        sub: "Have an idea? Let's make something meaningful."
    },
    {
        main: "CREATIVITY BEGINS WITH CURIOSITY.",
        sub: "Explore new ideas. Discover new possibilities."
    },
    {
        main: "MAKE SOMETHING THAT MEANS SOMETHING.",
        sub: "Every creative journey starts somewhere."
    }
];

let quoteIndex = 0;

if (quoteButton && quoteBanner && quoteMain && quoteSub) {

    quoteButton.addEventListener("click", function() {

        quoteIndex = (quoteIndex + 1) % quoteMessages.length;

        quoteBanner.classList.remove("message-changing");

        quoteMain.textContent = quoteMessages[quoteIndex].main;
        quoteSub.textContent = quoteMessages[quoteIndex].sub;

        // Restart the animation
        void quoteBanner.offsetWidth;

        quoteBanner.classList.add("message-changing");
    });

}

/* BACK TO TOP BUTTON */

const backToTopButtons = document.querySelectorAll(".back-to-top");

backToTopButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

