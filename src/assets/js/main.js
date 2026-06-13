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
})();
