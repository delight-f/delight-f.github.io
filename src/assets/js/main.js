// =============================================================
// main.js — www.amnestic.org
// Vanilla JS replacement for jQuery 3.6.0 + jquery.scrolly.
// ~700 bytes minified vs ~87 KB for the previous dependency.
// =============================================================

(function () {
  "use strict";

  // ----- On DOM ready -----
  document.addEventListener("DOMContentLoaded", function () {
    // 1. Remove .is-preload to unlock CSS transitions/animations
    document.body.classList.remove("is-preload");

    // 2. Smooth-scroll for nav links and .scrolly links
    var links = document.querySelectorAll('#nav a[href^="#"], .scrolly');

    Array.prototype.forEach.call(links, function (link) {
      link.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId && targetId.charAt(0) === "#") {
          var target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            var navHeight = document.getElementById("nav").offsetHeight;
            var targetTop =
              target.getBoundingClientRect().top +
              window.pageYOffset -
              navHeight;

            window.scrollTo({
              top: targetTop,
              behavior: "smooth",
            });
          }
        }
      });
    });
  });

  // ----- Contact form: fetch-based submission -----
  var form = document.getElementById("contact-form");
  var success = document.getElementById("form-success");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot check — if filled, silently pretend it worked
      var honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        if (success) success.style.display = "block";
        form.style.display = "none";
        return;
      }

      // Validate required fields
      var valid = true;
      var fields = form.querySelectorAll("[required]");
      fields.forEach(function (f) {
        if (!f.value.trim()) {
          f.style.borderColor = "#e74c3c";
          valid = false;
        } else {
          f.style.borderColor = "";
        }
      });

      // Validate email format
      var email = form.querySelector('[name="email"]');
      if (
        email &&
        email.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
      ) {
        email.style.borderColor = "#e74c3c";
        valid = false;
      }

      if (!valid) return;

      // Disable submit button
      var btn = form.querySelector('[type="submit"]');
      if (btn) btn.disabled = true;

      // Send via fetch
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (r) {
          if (r.ok) {
            if (success) success.style.display = "block";
            form.style.display = "none";
          } else {
            alert(
              "Something went wrong. Please try again or email me directly.",
            );
            if (btn) btn.disabled = false;
          }
        })
        .catch(function () {
          alert("Something went wrong. Please try again or email me directly.");
          if (btn) btn.disabled = false;
        });
    });

    // Clear error styles on input
    form.querySelectorAll("input, textarea").forEach(function (el) {
      el.addEventListener("input", function () {
        this.style.borderColor = "";
      });
    });
  }
})();
