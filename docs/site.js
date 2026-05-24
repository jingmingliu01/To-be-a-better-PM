(function () {
  const body = document.body;
  const shell = document.querySelector(".knowledge-shell");
  const toggle = document.querySelector(".sidebar-toggle");

  if (!shell || !toggle) {
    return;
  }

  const saved = window.localStorage.getItem("pmKnowledgeSidebar");
  const articlePage = shell.dataset.page === "article";
  const shouldCollapse = saved ? saved === "collapsed" : articlePage;

  function setCollapsed(collapsed) {
    body.classList.toggle("nav-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    window.localStorage.setItem("pmKnowledgeSidebar", collapsed ? "collapsed" : "expanded");
  }

  setCollapsed(shouldCollapse);

  toggle.addEventListener("click", function () {
    setCollapsed(!body.classList.contains("nav-collapsed"));
  });

  document.querySelectorAll(".article-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      window.localStorage.setItem("pmKnowledgeSidebar", "collapsed");
    });
  });
})();
