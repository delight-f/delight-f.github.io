// =============================================================
// main.js — amnestic.org 2026 multi-page redesign
// Vanilla JS: nav hamburger, contact form UX
// =============================================================

(function () {
	"use strict";

	document.addEventListener("DOMContentLoaded", function () {
		// ----- 1. Hamburger toggle (mobile nav) -----
		var toggle = document.querySelector(".nav__toggle");
		var navList = document.querySelector(".nav__list");

		if (toggle && navList) {
			toggle.addEventListener("click", function () {
				var isOpen = navList.classList.toggle("nav__list--open");
				toggle.setAttribute("aria-expanded", isOpen);
			});

			navList.addEventListener("click", function (e) {
				if (e.target.closest(".nav__link")) {
					navList.classList.remove("nav__list--open");
					toggle.setAttribute("aria-expanded", "false");
				}
			});
		}

		// ----- 2. Contact form: enhanced UX -----
		var form = document.getElementById("contact-form");
		var success = document.getElementById("form-success");
		var errorBanner = document.getElementById("form-error-banner");

		if (form && success) {
			form.addEventListener("submit", function (e) {
				e.preventDefault();

				clearErrors(form);

				var honeypot = form.querySelector('[name="_gotcha"]');
				if (honeypot && honeypot.value) {
					success.classList.add("form-success--visible");
					form.style.display = "none";
					return;
				}

				var valid = true;
				var fields = form.querySelectorAll("[required]");
				fields.forEach(function (f) {
					var group = f.closest(".form__group");
					var errorEl = group ? group.querySelector(".form__error") : null;
					if (!f.value.trim()) {
						if (group) group.classList.add("form__group--error");
						if (errorEl) errorEl.textContent = "This field is required.";
						valid = false;
					} else {
						if (group) group.classList.remove("form__group--error");
						if (errorEl) errorEl.textContent = "";
					}
				});

				var email = form.querySelector('[name="email"]');
				if (email && email.value) {
					if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
						var emailGroup = email.closest(".form__group");
						var emailError = emailGroup
							? emailGroup.querySelector(".form__error")
							: null;
						if (emailGroup) emailGroup.classList.add("form__group--error");
						if (emailError)
							emailError.textContent = "Please enter a valid email address.";
						valid = false;
					}
				}

				if (!valid) return;

				var btn = form.querySelector('[type="submit"]');
				if (btn) {
					btn.classList.add("btn--loading");
					btn.disabled = true;
				}

				if (errorBanner) {
					errorBanner.classList.remove("form-error-banner--visible");
				}

				fetch(form.action, {
					method: "POST",
					body: new FormData(form),
					headers: { Accept: "application/json" },
				})
					.then(function (r) {
						if (btn) {
							btn.classList.remove("btn--loading");
							btn.disabled = false;
						}
						if (r.ok) {
							success.classList.add("form-success--visible");
							form.style.display = "none";
						} else {
							if (errorBanner) {
								errorBanner.classList.add("form-error-banner--visible");
							}
							if (errorBanner)
								errorBanner.scrollIntoView({
									behavior: "smooth",
									block: "center",
								});
						}
					})
					.catch(function () {
						if (btn) {
							btn.classList.remove("btn--loading");
							btn.disabled = false;
						}
						if (errorBanner) {
							errorBanner.classList.add("form-error-banner--visible");
							errorBanner.scrollIntoView({
								behavior: "smooth",
								block: "center",
							});
						}
					});
			});

			form.querySelectorAll("input, textarea").forEach(function (el) {
				el.addEventListener("input", function () {
					var group = this.closest(".form__group");
					if (group) group.classList.remove("form__group--error");
					var errorEl = group ? group.querySelector(".form__error") : null;
					if (errorEl) errorEl.textContent = "";
					if (errorBanner) {
						errorBanner.classList.remove("form-error-banner--visible");
					}
				});
			});
		}

		function clearErrors(form) {
			form.querySelectorAll(".form__group--error").forEach(function (g) {
				g.classList.remove("form__group--error");
			});
			form.querySelectorAll(".form__error").forEach(function (e) {
				e.textContent = "";
			});
			if (errorBanner) {
				errorBanner.classList.remove("form-error-banner--visible");
			}
		}
	});
})();
