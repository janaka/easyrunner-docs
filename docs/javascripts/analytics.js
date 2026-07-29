// GA4 custom event tracking for CTA clicks.
//
// Material's analytics integration creates window.dataLayer but keeps its
// gtag helper private, so we shim our own — pushes land in the same GA4
// property (see extra.analytics in mkdocs.yml).
//
// Usage: add data attributes to any link, in HTML or via attr_list:
//   <a href="/download/" data-ga-event="download_cta_click" data-ga-source="hero">
//   [Label](download.md){ .md-button data-ga-event="download_cta_click" data-ga-source="pricing" }
(function () {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  // Delegated so it binds once and covers tagged links on every page.
  document.addEventListener("click", function (event) {
    var link = event.target && event.target.closest && event.target.closest("a[data-ga-event]");
    if (!link) return;
    gtag("event", link.dataset.gaEvent, {
      cta_source: link.dataset.gaSource || "untagged",
    });
  });

  // Theme-generated nav links can't carry data attributes in markdown/config,
  // so tag the Download tab and sidebar links at runtime; the delegated
  // listener above then treats them like any other tagged link.
  // Match on the resolved URL, not the href attribute — Material writes the
  // attribute relative to the current page ("download/", "../download/", …).
  function tagNavLinks() {
    document
      .querySelectorAll(".md-tabs__link, .md-nav__link")
      .forEach(function (link) {
        if (!link.href || new URL(link.href, location.href).pathname !== "/download/") return;
        if (!link.dataset.gaEvent) {
          link.dataset.gaEvent = "download_cta_click";
          link.dataset.gaSource = "nav";
        }
      });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(tagNavLinks);
  } else {
    document.addEventListener("DOMContentLoaded", tagNavLinks);
  }
})();
