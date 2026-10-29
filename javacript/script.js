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
