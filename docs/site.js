(function () {
  const body = document.body;
  const shell = document.querySelector(".knowledge-shell");
  const toggle = document.querySelector(".sidebar-toggle");

  if (!shell || !toggle) {
    return;
  }

  const saved = window.localStorage.getItem("pmKnowledgeSidebar");
  const shouldCollapse = saved === "collapsed";

  function setCollapsed(collapsed) {
    body.classList.toggle("nav-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    window.localStorage.setItem("pmKnowledgeSidebar", collapsed ? "collapsed" : "expanded");
  }

  setCollapsed(shouldCollapse);

  toggle.addEventListener("click", function () {
    setCollapsed(!body.classList.contains("nav-collapsed"));
  });
})();
