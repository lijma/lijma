// Inject giscus comment widget after page content loads (blog.codinghorror.com style)
function loadGiscus() {
  var existing = document.getElementById("giscus-container");
  if (existing) existing.remove();

  var article = document.querySelector(".md-content__inner");
  if (!article) return;

  var container = document.createElement("div");
  container.id = "giscus-container";
  container.style.cssText =
    "margin-top:3rem;border-top:2px solid #000;padding-top:2rem;";

  var label = document.createElement("p");
  label.textContent = "评论";
  label.style.cssText =
    "color:#888;font-size:0.82rem;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:1.5rem;";
  container.appendChild(label);

  var script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", "lijma/lijma");
  script.setAttribute("data-repo-id", "R_kgDOOoDwjw");
  script.setAttribute("data-category", "General");
  script.setAttribute("data-category-id", "DIC_kwDOOoDwj84C3ZXZ");
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "0");
  script.setAttribute("data-input-position", "bottom");
  script.setAttribute("data-theme", "preferred_color_scheme");
  script.setAttribute("data-lang", "zh-CN");
  script.setAttribute("data-loading", "lazy");
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;

  container.appendChild(script);
  article.appendChild(container);
}

document.addEventListener("DOMContentLoaded", loadGiscus);
document$.subscribe(loadGiscus);
