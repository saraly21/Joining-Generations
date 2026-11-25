// ------------------------------------------------------------
// Joining Generations – site behaviour
// ------------------------------------------------------------

const modal = document.getElementById("newsletter-modal");
const formView = document.getElementById("newsletter-form-view");
const thanksView = document.getElementById("newsletter-thanks-view");
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

// ----- Newsletter pop-up & persistent banner --------------------------------
// Set to false if you don't want the pop-up on first load.
const SHOW_NEWSLETTER_ON_LOAD = true;

let banner = document.getElementById("newsletter-banner");
if (!banner) {
  banner = document.createElement("aside");
  banner.className = "newsletter-banner";
  banner.id = "newsletter-banner";
  banner.setAttribute("aria-label", "Newsletter sign-up");
  banner.hidden = true;
  banner.innerHTML = `
    <div class="newsletter-banner__inner container-wide">
      <p class="newsletter-banner__text">
        <span class="newsletter-banner__badge">Monthly note</span>
        <span>Stories, upcoming events &amp; open resources — straight to your inbox.</span>
      </p>
      <div class="newsletter-banner__actions">
        <button class="newsletter-banner__cta" type="button" data-open-newsletter>
          Subscribe <svg class="icon" width="14" height="14"><use href="#i-arrow-right"/></svg>
        </button>
        <button class="newsletter-banner__close" id="newsletter-banner-close" type="button" aria-label="Dismiss newsletter banner">
          <svg class="icon" width="16" height="16"><use href="#i-x"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);
}

function updateBannerVisibility() {
  if (!banner) return;
  const subscribed = sessionStorage.getItem("jg_newsletter_subscribed") === "1";
  const dismissed = sessionStorage.getItem("jg_newsletter_banner_dismissed") === "1";
  const modalOpen = modal && !modal.hidden;
  banner.hidden = subscribed || dismissed || modalOpen;
}

function openNewsletter() {
  formView.hidden = false;
  thanksView.hidden = true;
  modal.hidden = false;
  updateBannerVisibility();
  document.getElementById("newsletter-email").focus();
}

function closeNewsletter() {
  modal.hidden = true;
  updateBannerVisibility();
}

document.querySelectorAll("[data-open-newsletter]").forEach((btn) =>
  btn.addEventListener("click", openNewsletter)
);
document.getElementById("newsletter-close").addEventListener("click", closeNewsletter);
document.getElementById("newsletter-done").addEventListener("click", closeNewsletter);

const bannerCloseBtn = document.getElementById("newsletter-banner-close");
if (bannerCloseBtn) {
  bannerCloseBtn.addEventListener("click", () => {
    sessionStorage.setItem("jg_newsletter_banner_dismissed", "1");
    updateBannerVisibility();
  });
}

// Click on the dark backdrop closes it
modal.addEventListener("mousedown", (event) => {
  if (event.target === modal) closeNewsletter();
});

// Escape key closes it
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeNewsletter();
});

// Sign-up: show the thank-you + optional survey view.
// (To really collect emails, send the value to your email service here.)
document.getElementById("newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  sessionStorage.setItem("jg_newsletter_subscribed", "1");
  formView.hidden = true;
  thanksView.hidden = false;
  updateBannerVisibility();
});

// Single-select behavior for Question 2 checkboxes + "Other" text input
const singleCheckGroup = document.querySelector("[data-single-check]");
const otherInput = document.getElementById("newsletter-hear-other");
if (singleCheckGroup) {
  const checkboxes = singleCheckGroup.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((box) => {
    box.addEventListener("change", () => {
      if (box.checked) {
        checkboxes.forEach((other) => {
          if (other !== box) other.checked = false;
        });
      }
      if (otherInput) {
        const otherToggle = singleCheckGroup.querySelector("[data-other-toggle]");
        const showOther = Boolean(otherToggle && otherToggle.checked);
        otherInput.hidden = !showOther;
        if (showOther) otherInput.focus();
      }
    });
  });
}

const surveyForm = document.getElementById("newsletter-survey-form");
if (surveyForm) {
  surveyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Optional: send selected interests & referral source to your email service here
    closeNewsletter();
  });
}

if (SHOW_NEWSLETTER_ON_LOAD && !sessionStorage.getItem("jg_newsletter_shown")) {
  sessionStorage.setItem("jg_newsletter_shown", "1");
  openNewsletter();
} else {
  updateBannerVisibility();
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
