//search button

const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
  if (document.activeElement === searchInput) {
    searchInput.blur();
    searchInput.value = searchInput.value;
  } else {
    searchInput.focus();
  }
});


//shop 

const cravingPopup = document.getElementById("cravingPopup");
const cravingClose = document.getElementById("cravingClose");

const popupTriggers = document.querySelectorAll(
  '.hero-button, a[href="#shop"]'
);

let popupTimer;

// Open popup
function openCravingPopup() {
  cravingPopup.classList.add("active");
  cravingPopup.setAttribute("aria-hidden", "false");
}

// Close popup
function closeCravingPopup() {
  cravingPopup.classList.remove("active");
  cravingPopup.setAttribute("aria-hidden", "true");
}

// Open popup when either button is clicked
popupTriggers.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    openCravingPopup();
  });
});

// Close with the X button
cravingClose.addEventListener("click", closeCravingPopup);

// Close when clicking outside the popup card
cravingPopup.addEventListener("click", function (event) {
  if (event.target === cravingPopup) {
    closeCravingPopup();
  }
});

// Close with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeCravingPopup();
  }
});

// Automatically show popup every 60 seconds
popupTimer = setInterval(function () {
  if (!cravingPopup.classList.contains("active")) {
    openCravingPopup();
  }
}, 60000);



document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const aboutNav = document.getElementById("aboutNav");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    aboutNav.classList.toggle("active");
  });

  // CLOSE MOBILE MENU AFTER CLICK
  document.querySelectorAll(".about-nav a").forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      aboutNav.classList.remove("active");
    });
  });


  // INTERACTIVE FAQ ACCORDION
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const symbol = question.querySelector("b");

    question.addEventListener("click", () => {

      const isActive = item.classList.contains("active");

      faqItems.forEach(faq => {
        faq.classList.remove("active");
        faq.querySelector(".faq-question b").textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        symbol.textContent = "−";
      }

    });
  });


  // SCROLL REVEAL ANIMATION
  const revealElements = document.querySelectorAll(
    ".journey-card, .number-item, .craft-content, .intro-grid, .faq-heading, .faq-list"
  );

  const revealObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // ANIMATED STATISTICS
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);

      let current = 0;
      const duration = 1600;
      const startTime = performance.now();

      function updateCounter(time) {

        const progress = Math.min((time - startTime) / duration, 1);

        const easedProgress = 1 - Math.pow(1 - progress, 4);

        current = Math.floor(easedProgress * target);

        counter.textContent = current;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }

      }

      requestAnimationFrame(updateCounter);
      observer.unobserve(counter);

    });

  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });


  // ACTIVE NAVIGATION LINK
  const sections = document.querySelectorAll(
    "#story, #journey, #craft, #contact"
  );

  const navLinks = document.querySelectorAll(".about-nav a");

  const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        navLinks.forEach(link => {
          link.classList.remove("current");
        });

        const activeLink = document.querySelector(
          `.about-nav a[href="#${entry.target.id}"]`
        );

        if (activeLink) {
          activeLink.classList.add("current");
        }

      }

    });

  }, {
    rootMargin: "-30% 0px -60% 0px"
  });

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

});



/* =========================================
   FLOATING FEEDBACK WIDGET
========================================= */

const feedbackTrigger = document.getElementById("feedbackTrigger");
const feedbackPanel = document.getElementById("feedbackPanel");
const feedbackClose = document.getElementById("feedbackClose");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackStatus = document.getElementById("feedbackStatus");
const feedbackSubmit = document.getElementById("feedbackSubmit");

// Add your Formspree endpoint here
const FEEDBACK_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";


// OPEN PANEL

feedbackTrigger.addEventListener("click", () => {

  const opening = feedbackPanel.hidden;

  feedbackPanel.hidden = !opening;

  feedbackTrigger.setAttribute(
    "aria-expanded",
    String(opening)
  );

  if (opening) {
    document.getElementById("rating5").focus();
  }

});


// CLOSE PANEL

function closeFeedback() {

  feedbackPanel.hidden = true;

  feedbackTrigger.setAttribute(
    "aria-expanded",
    "false"
  );

  feedbackTrigger.focus();

}

feedbackClose.addEventListener("click", closeFeedback);


// CLOSE ON ESCAPE

document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    !feedbackPanel.hidden
  ) {
    closeFeedback();
  }

});


// SUBMIT FEEDBACK

feedbackForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  if (FEEDBACK_ENDPOINT.includes("YOUR_FORM_ID")) {

    feedbackStatus.textContent =
      "Please connect your feedback form first.";

    return;
  }

  feedbackSubmit.disabled = true;
  feedbackSubmit.innerHTML = "SENDING...";

  feedbackStatus.textContent = "";

  try {

    const formData = new FormData(feedbackForm);

    formData.append(
      "_subject",
      "New CASK & BEANS Customer Feedback"
    );

    const response = await fetch(FEEDBACK_ENDPOINT, {

      method: "POST",

      body: formData,

      headers: {
        "Accept": "application/json"
      }

    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    feedbackStatus.textContent =
      "Thank you! Your feedback has been received.";

    feedbackStatus.style.color = "#52734d";

    feedbackForm.reset();

    feedbackSubmit.innerHTML = "SENT SUCCESSFULLY ✓";

  } catch (error) {

    feedbackStatus.textContent =
      "Unable to send feedback. Please try again.";

    feedbackStatus.style.color = "#a33b32";

    feedbackSubmit.innerHTML = "TRY AGAIN ↗";

  } finally {

    feedbackSubmit.disabled = false;

  }

});


/* =========================================
   NEWSLETTER
========================================= */

const newsletterForm = document.getElementById("newsletterForm");

const newsletterStatus =
  document.getElementById("newsletterStatus");

newsletterForm.addEventListener("submit", (event) => {

  event.preventDefault();

  newsletterStatus.textContent =
    "Connect your newsletter service to activate subscriptions.";

});
