/* ============================================================
   码文说 — 一键分享：微信朋友圈 / Twitter / Bluesky
   ============================================================ */
(function () {
  "use strict";

  function init() {
    // Only inject on blog post pages (has .md-content article)
    var article = document.querySelector(".md-content__inner");
    if (!article) return;

    // Avoid duplicate injection
    if (document.querySelector(".share-bar")) return;

    var title = document.title.replace(/ - .*$/, "").trim();
    var url = window.location.href;
    var encodedTitle = encodeURIComponent(title);
    var encodedUrl = encodeURIComponent(url);

    // Build share bar
    var bar = document.createElement("div");
    bar.className = "share-bar";
    bar.innerHTML =
      '<span class="share-bar__label">分享到</span>' +
      '<div class="share-bar__buttons">' +
        // WeChat
        '<button class="share-btn share-btn--wechat" title="微信朋友圈" aria-label="分享到微信朋友圈">' +
          '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05a6.42 6.42 0 0 1-.248-1.747c0-3.634 3.247-6.584 7.245-6.584.282 0 .557.023.83.05C16.48 4.672 12.98 2.188 8.691 2.188zm-2.6 4.408c.56 0 1.016.455 1.016 1.016s-.455 1.016-1.016 1.016S5.075 8.172 5.075 7.612s.455-1.016 1.016-1.016zm5.6 0c.56 0 1.015.455 1.015 1.016s-.455 1.016-1.015 1.016c-.56 0-1.016-.455-1.016-1.016s.455-1.016 1.016-1.016zm3.632 4.31c-3.465 0-6.276 2.556-6.276 5.708 0 3.152 2.811 5.708 6.276 5.708.685 0 1.347-.1 1.968-.283a.582.582 0 0 1 .49.064l1.302.762a.222.222 0 0 0 .113.037c.11 0 .199-.09.199-.202 0-.049-.02-.098-.033-.146l-.267-1.012a.405.405 0 0 1 .145-.455C20.454 20.143 21.4 18.464 21.4 16.614c0-3.152-2.811-5.708-6.276-5.708h.199zm-2.367 3.36c.387 0 .7.314.7.7 0 .387-.313.7-.7.7a.7.7 0 0 1-.7-.7c0-.386.313-.7.7-.7zm4.1 0c.387 0 .7.314.7.7 0 .387-.313.7-.7.7a.7.7 0 0 1-.7-.7c0-.386.313-.7.7-.7z"/></svg>' +
        '</button>' +
        // Twitter / X
        '<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=' + encodedTitle + '&url=' + encodedUrl + '" target="_blank" rel="noopener" title="Twitter / X" aria-label="分享到 Twitter">' +
          '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
        '</a>' +
        // Bluesky
        '<a class="share-btn share-btn--bluesky" href="https://bsky.app/intent/compose?text=' + encodedTitle + '%20' + encodedUrl + '" target="_blank" rel="noopener" title="Bluesky" aria-label="分享到 Bluesky">' +
          '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.643 3.593 3.519 6.173 3.175-4.413.611-6.127 2.638-3.482 5.89C6.942 23.683 12 19.705 12 15.467c0 4.238 5.058 8.216 8.685 3.845 2.645-3.252.931-5.279-3.482-5.89 2.58.344 5.388-.532 6.173-3.175C23.622 9.418 24 4.458 24 3.768c0-.69-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg>' +
        '</a>' +
      '</div>';

    // QR code overlay for WeChat
    var overlay = document.createElement("div");
    overlay.className = "share-qr-overlay";
    overlay.innerHTML =
      '<div class="share-qr-card">' +
        '<p class="share-qr-card__title">微信扫码分享到朋友圈</p>' +
        '<img class="share-qr-card__img" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodedUrl + '" alt="QR Code" width="200" height="200" />' +
        '<p class="share-qr-card__url">' + url + '</p>' +
        '<button class="share-qr-card__close" aria-label="关闭">✕</button>' +
      '</div>';
    overlay.style.display = "none";
    document.body.appendChild(overlay);

    // WeChat button → show QR overlay
    bar.querySelector(".share-btn--wechat").addEventListener("click", function () {
      overlay.style.display = "flex";
    });

    // Close overlay
    overlay.querySelector(".share-qr-card__close").addEventListener("click", function () {
      overlay.style.display = "none";
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) overlay.style.display = "none";
    });

    // Insert after article heading or at top of content
    var heading = article.querySelector("h1");
    if (heading) {
      heading.parentNode.insertBefore(bar, heading.nextSibling);
    } else {
      article.prepend(bar);
    }
  }

  // Run on DOMContentLoaded and also on instant navigation (MkDocs Material)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Support MkDocs Material instant loading
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () { init(); });
  }
})();
