(function () {
  const body = document.body;
  const shell = document.querySelector(".knowledge-shell");
  const toggle = document.querySelector(".sidebar-toggle");
  const toc = document.querySelector(".page-toc");

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

  if (!toc) {
    return;
  }

  const tocLinks = Array.from(toc.querySelectorAll("a[href^='#']"));
  const sections = tocLinks
    .map(function (link) {
      const id = decodeURIComponent(link.getAttribute("href").slice(1));
      const section = document.getElementById(id);
      return section ? { id, link, section } : null;
    })
    .filter(Boolean);

  if (!sections.length) {
    return;
  }

  const progress = document.createElement("div");
  progress.className = "reading-progress";
  progress.setAttribute("aria-live", "polite");
  progress.setAttribute("aria-label", "当前阅读进度 0%");
  progress.innerHTML = '<span class="reading-progress-value">0%</span>';
  body.appendChild(progress);

  const progressValue = progress.querySelector(".reading-progress-value");
  const article = document.querySelector(".article");
  let ticking = false;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function setActiveSection(active) {
    sections.forEach(function (item) {
      const isActive = item === active;
      item.link.classList.toggle("active", isActive);
      if (isActive) {
        item.link.setAttribute("aria-current", "true");
        item.link.scrollIntoView({ block: "nearest", inline: "nearest" });
      } else {
        item.link.removeAttribute("aria-current");
      }
    });
  }

  function getReadingPercent() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (article) {
      const articleTop = article.getBoundingClientRect().top + scrollTop;
      const articleHeight = article.offsetHeight;
      const readableDistance = Math.max(articleHeight - viewportHeight, 1);
      return clamp((scrollTop - articleTop) / readableDistance, 0, 1);
    }

    const doc = document.documentElement;
    const readableDistance = Math.max(doc.scrollHeight - viewportHeight, 1);
    return clamp(scrollTop / readableDistance, 0, 1);
  }

  function updateReadingState() {
    ticking = false;

    const activationLine = window.scrollY + Math.min(window.innerHeight * 0.34, 220);
    let active = sections[0];

    sections.forEach(function (item) {
      const top = item.section.getBoundingClientRect().top + window.scrollY;
      if (top <= activationLine) {
        active = item;
      }
    });

    const pageBottom = window.scrollY + window.innerHeight;
    const docBottom = document.documentElement.scrollHeight - 8;
    if (pageBottom >= docBottom) {
      active = sections[sections.length - 1];
    }

    setActiveSection(active);

    const percent = Math.round(getReadingPercent() * 100);
    progress.style.setProperty("--progress", String(percent));
    progressValue.textContent = percent + "%";
    progress.setAttribute("aria-label", "当前阅读进度 " + percent + "%");
  }

  function requestReadingStateUpdate() {
    if (ticking) {
      return;
    }
    ticking = true;
    window.requestAnimationFrame(updateReadingState);
  }

  tocLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const match = sections.find(function (item) {
        return item.link === link;
      });
      if (match) {
        setActiveSection(match);
      }
    });
  });

  window.addEventListener("scroll", requestReadingStateUpdate, { passive: true });
  window.addEventListener("resize", requestReadingStateUpdate);
  updateReadingState();
})();
