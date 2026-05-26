(function () {
  const renderMermaid = () => {
    if (!window.mermaid) {
      return;
    }

    const darkMode = document.body.getAttribute("data-md-color-scheme") === "slate";

    window.mermaid.initialize({
      startOnLoad: false,
      theme: darkMode ? "dark" : "default",
    });

    window.mermaid.run({
      nodes: document.querySelectorAll(".mermaid"),
    });
  };

  if (typeof document$ !== "undefined") {
    document$.subscribe(renderMermaid);
  } else {
    document.addEventListener("DOMContentLoaded", renderMermaid);
  }
})();