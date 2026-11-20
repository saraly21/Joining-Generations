// ------------------------------------------------------------
// Joining Generations – site behaviour
// ------------------------------------------------------------

const modal = document.getElementById("newsletter-modal");
const formView = document.getElementById("newsletter-form-view");
const thanksView = document.getElementById("newsletter-thanks-view");
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

// ----- Newsletter pop-up ----------------------------------------------------
// Set to false if you don't want the pop-up on first load.
const SHOW_NEWSLETTER_ON_LOAD = true;

function openNewsletter() {
  formView.hidden = false;
  thanksView.hidden = true;
  modal.hidden = false;
  document.getElementById("newsletter-email").focus();
}

function closeNewsletter() {
  modal.hidden = true;
}

document.querySelectorAll("[data-open-newsletter]").forEach((btn) =>
  btn.addEventListener("click", openNewsletter)
);
document.getElementById("newsletter-close").addEventListener("click", closeNewsletter);
document.getElementById("newsletter-done").addEventListener("click", closeNewsletter);

// Click on the dark backdrop closes it
modal.addEventListener("mousedown", (event) => {
  if (event.target === modal) closeNewsletter();
});

// Escape key closes it
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeNewsletter();
});

// Sign-up: show the thank-you message.
// (To really collect emails, send the value to your email service here.)
document.getElementById("newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  formView.hidden = true;
  thanksView.hidden = false;
});

if (SHOW_NEWSLETTER_ON_LOAD && !sessionStorage.getItem("jg_newsletter_shown")) {
  sessionStorage.setItem("jg_newsletter_shown", "1");
  openNewsletter();
}

// ----- Mobile menu ----------------------------------------------------------
function setMenu(open) {
  if (!mobileNav || !menuToggle) return;
  mobileNav.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.classList.toggle("is-open", open);
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => setMenu(mobileNav.hidden));
}

// ----- Smooth scrolling for nav links --------------------------------------
document.querySelectorAll("[data-scroll]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.getElementById(link.dataset.scroll);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      setMenu(false);
    }
  });
});

// ----- Contact form ---------------------------------------------------------
// Currently does nothing on submit (same as the original design).
// Hook it up to your form service / email here.
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const btn = contactForm.querySelector("button[type='submit']");
    if (btn) btn.textContent = "Enquiry sent — thank you!";
    contactForm.reset();
  });
}
