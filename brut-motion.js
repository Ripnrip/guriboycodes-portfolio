// BRUT-MOTION — vanilla animation orchestrator.
// Runs on top of the React render: tags elements, reveals on scroll,
// scrambles eyebrows, glitches the hero name, drives the progress bar.
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll progress bar ---------- */
  function progressBar() {
    var bar = document.createElement("div");
    bar.className = "bm-progress";
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      ticking = false;
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? h.scrollTop / max : 0) + ")";
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  if (reduced) { return; } // no motion at all — bar included, keep it calm

  /* ---------- intersection observer ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("bm-in");
        if (e.target.__bmScramble) scramble(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  /* ---------- text scramble (single-text-node elements only) ---------- */
  var GLYPHS = "\u2588\u2593\u2592\u2591#@%&/\\<>*";
  function scramble(el) {
    var orig = el.__bmOriginal;
    if (!orig) return;
    var frames = 18, f = 0;
    var iv = setInterval(function () {
      f++;
      var settled = Math.floor((f / frames) * orig.length);
      var out = "";
      for (var i = 0; i < orig.length; i++) {
        if (i < settled || orig[i] === " ") out += orig[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      el.textContent = out;
      if (f >= frames) { clearInterval(iv); el.textContent = orig; }
    }, 34);
  }

  /* ---------- tagging helpers ---------- */
  function tag(el, effect, delay) {
    if (el.hasAttribute("data-bm")) return;
    el.setAttribute("data-bm", effect);
    if (delay) el.style.setProperty("--bm-d", delay + "ms");
    io.observe(el);
  }
  function tagGroup(selector, effect, step, root) {
    var els = (root || document).querySelectorAll(selector);
    var counts = new Map();
    els.forEach(function (el) {
      if (el.hasAttribute("data-bm")) return;
      var p = el.parentNode;
      var n = counts.get(p) || 0;
      counts.set(p, n + 1);
      tag(el, effect, (n % 8) * (step || 70));
    });
  }

  /* ---------- hero entrance (runs once) ---------- */
  var heroDone = false;
  function heroEntrance() {
    var name = document.querySelector(".hero-name");
    if (!name || heroDone) return;
    heroDone = true;

    var seq = [
      [".hero .eyebrow", "bm-hero-rise", 0],
      [".hero-name", "bm-hero-slam", 120],
      [".hero-pitch", "bm-hero-rise", 380],
      [".hero-pitch-alt", "bm-hero-rise", 480],
      [".hero-meta", "bm-hero-rise", 580],
      [".hero-portrait", "bm-hero-side", 300],
    ];
    seq.forEach(function (s) {
      var el = document.querySelector(s[0]);
      if (el) { el.style.setProperty("--bm-d", s[2] + "ms"); el.classList.add(s[1]); }
    });
    var nav = document.querySelector(".nav");
    if (nav) nav.classList.add("bm-nav-drop");

    // periodic RGB-split glitch
    setInterval(function () {
      if (document.hidden) return;
      name.classList.add("bm-glitching");
      setTimeout(function () { name.classList.remove("bm-glitching"); }, 520);
    }, 5600 + Math.random() * 2400);
  }

  /* ---------- decorate everything currently in the DOM ---------- */
  function decorate() {
    heroEntrance();

    // eyebrows outside the hero: scramble-decode on scroll-in
    document.querySelectorAll(".eyebrow").forEach(function (el) {
      if (el.hasAttribute("data-bm") || el.closest(".hero")) return;
      if (el.childNodes.length === 1 && el.firstChild.nodeType === 3) {
        el.__bmOriginal = el.textContent;
        el.__bmScramble = true;
        el.classList.add("bm-scramble");
      }
      tag(el, "slide-left", 0);
    });

    // section titles: clip wipe + accent sweep
    document.querySelectorAll(".section-title").forEach(function (el) {
      tag(el, "title", 0);
    });

    // grids & cards
    tagGroup(".stat", "pop", 80);
    tagGroup(".flagship", "stamp", 0);
    tagGroup(".shipped-card", "pop", 70);
    tagGroup(".hack", "pop", 70);
    tagGroup(".flagship-metrics > *", "fade-up", 60);
    tagGroup(".exp-item, .experience-item, .exp", "slide-left", 90);
    tagGroup(".sp-card, .gallery-card, .project-card", "pop", 60);
    tagGroup(".phil-card, .principle", "fade-up", 100);
    tagGroup(".footer-grid > *", "fade-up", 110);
    tagGroup(".flagship-midyear", "slide-right", 0);
    tagGroup(".sk-marquee", "fade-up", 0);
    tagGroup(".brain-shell, .brain-wrap", "fade-up", 0);
    tagGroup(".globe-inner", "pop", 0);
  }

  /* ---------- boot: wait for React, keep watching for re-renders ---------- */
  var debounce;
  function schedule() {
    clearTimeout(debounce);
    debounce = setTimeout(decorate, 120);
  }
  function boot() {
    progressBar();
    var root = document.getElementById("root");
    if (!root) return;
    new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
    schedule();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
