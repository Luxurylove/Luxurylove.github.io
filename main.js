/* ============================================================
   LuxuryLove · 个人作品网站 — 交互逻辑
   内容全部来自 data.js，本文件一般不需要改动。
   ============================================================ */
(function () {
  "use strict";

  var doc = document;
  var html = doc.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (sel, root) { return (root || doc).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); };

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* ==========================================================
     1. 主题（跟随上次选择，默认深色）
     ========================================================== */
  var THEME_KEY = "luxurylove-theme";
  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") html.setAttribute("data-theme", saved);
  } catch (e) {}

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f3ede2" : "#0c0b09");
  }

  var themeToggle = $("#themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(html.getAttribute("data-theme") === "light" ? "dark" : "light");
    });
  }

  /* ==========================================================
     2. 文本内容注入
     ========================================================== */
  var site = (typeof SITE !== "undefined" && SITE) || (window.SITE || {});
  var works = Array.isArray(site.works) ? site.works.filter(Boolean) : [];

  doc.title = site.siteTitle || ("LuxuryLove · 作品集");
  setText("#heroName", site.name);
  setText("#heroCn", site.heroCn);
  setText("#eyebrowText", site.eyebrow);
  setText("#heroTagline", site.tagline);
  setText("#scrollHintText", site.scrollHint);
  setText("#year", new Date().getFullYear());
  if (site.name) {
    var bn = $(".brand-name");
    if (bn) bn.textContent = site.name;
  }

  function setText(sel, value) {
    var el = $(sel);
    if (el && value != null && value !== "") el.textContent = value;
  }

  /* 首屏作品数量 */
  var countEl = $("#workCount");
  if (countEl) {
    var target = works.length;
    var padded = target < 10 ? "0" + target : String(target);
    var skipCountAnimation = reduceMotion || html.classList.contains("no-motion");
    if (!skipCountAnimation && target > 0) {
      var start = null;
      var from = 0;
      var tick = function (ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / 850);
        var eased = 1 - Math.pow(1 - p, 3);
        var n = Math.round(from + (target - from) * eased);
        countEl.textContent = n < 10 ? "0" + n : String(n);
        if (p < 1) requestAnimationFrame(tick);
        else countEl.textContent = padded;
      };
      requestAnimationFrame(tick);
    } else {
      countEl.textContent = padded;
    }
  }

  /* 首屏年份区间：自动取作品年份的最小—最大值 */
  var yearEl = $("#yearRange");
  if (yearEl && works.length) {
    var years = works.map(function (w) { return parseInt(String(w.year || "").replace(/[^0-9]/g, ""), 10); })
      .filter(function (n) { return !isNaN(n); });
    if (years.length) {
      var minY = Math.min.apply(null, years);
      var maxY = Math.max.apply(null, years);
      yearEl.textContent = minY === maxY ? String(minY) : (minY + "—" + String(maxY).slice(-2));
    }
  }

  /* ==========================================================
     AI 工作流
     ========================================================== */
  var ai = site.ai || {};
  var aiIntroEl = $("#aiIntro");
  if (aiIntroEl && ai.intro) aiIntroEl.textContent = ai.intro;

  var aiGrid = $("#aiToolGrid");
  var aiSection = $("#ai");
  if (aiGrid && Array.isArray(ai.tools) && ai.tools.length) {
    aiGrid.innerHTML = ai.tools.map(function (t, i) {
      var idx = i + 1 < 10 ? "0" + (i + 1) : String(i + 1);
      var uses = (t.uses || []).map(function (u) {
        return "<li>" + esc(u) + "</li>";
      }).join("");
      return (
        '<article class="ai-card reveal' + (t.isConcept ? " is-concept" : "") + '">' +
          '<div class="ai-card-top">' +
            '<span class="ai-idx">' + idx + "</span>" +
            '<span class="ai-cat">' + esc(t.category || "") + "</span>" +
          "</div>" +
          '<h3 class="ai-name">' + esc(t.name) + "</h3>" +
          (t.role ? '<p class="ai-role">' + esc(t.role) + "</p>" : "") +
          '<p class="ai-desc">' + esc(t.desc || "") + "</p>" +
          '<ul class="ai-uses">' + uses + "</ul>" +
        "</article>"
      );
    }).join("");
  } else if (aiSection) {
    aiSection.hidden = true;
  }

  var aiFlow = $("#aiFlow");
  if (aiFlow && Array.isArray(ai.workflow)) {
    aiFlow.innerHTML = ai.workflow.map(function (step, i) {
      var idx = i + 1 < 10 ? "0" + (i + 1) : String(i + 1);
      return (
        '<li class="ai-step">' +
          '<span class="ai-step-num">' + idx + "</span>" +
          '<span class="ai-step-title">' + esc(step.title) + "</span>" +
          '<span class="ai-step-desc">' + esc(step.desc) + "</span>" +
        "</li>"
      );
    }).join("");
  }

  /* 关于我 */
  var about = site.about || {};
  var aboutText = $("#aboutText");
  if (aboutText && Array.isArray(about.paragraphs) && about.paragraphs.length) {
    aboutText.innerHTML = about.paragraphs.map(function (p) {
      return "<p>" + esc(p) + "</p>";
    }).join("");
  }
  if (about.avatar) {
    var avatarWrap = $("#aboutAvatar");
    var avatarImg = $("#avatarImg");
    if (avatarWrap && avatarImg) {
      avatarImg.src = about.avatar;
      avatarImg.onerror = function () { avatarWrap.hidden = true; };
      avatarWrap.hidden = false;
    }
  }

  /* 能力 */
  var skillList = $("#skillList");
  if (skillList && Array.isArray(about.skills)) {
    skillList.innerHTML = about.skills.map(function (group, i) {
      var idx = i + 1 < 10 ? "0" + (i + 1) : String(i + 1);
      var items = (group.items || []).map(function (it) {
        return "<li>" + esc(it) + "</li>";
      }).join("");
      return (
        '<div class="skill-row reveal">' +
          '<h3 class="skill-name" data-index="' + idx + '">' + esc(group.title) + "</h3>" +
          '<ul class="skill-items">' + items + "</ul>" +
          '<span class="skill-mark">0' + idx + "</span>" +
        "</div>"
      );
    }).join("");
  }

  /* 联系方式 */
  var contacts = site.contact || {};
  var contactActions = $("#contactActions");
  if (contactActions) {
    var parts = [];
    if (contacts.email) {
      parts.push(
        '<a class="contact-btn is-solid" href="mailto:' + esc(contacts.email) + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>' +
          "<span>" + esc(contacts.email) + "</span>" +
        "</a>"
      );
    }
    if (contacts.wechat) {
      parts.push(
        '<button class="contact-btn" type="button" id="copyWechat" data-wechat="' + esc(contacts.wechat) + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4.5c-3.6 0-6.5 2.4-6.5 5.4 0 1.7 1 3.3 2.6 4.3L4.3 16l2.6-1.3c.7.2 1.4.3 2.1.3"/><path d="M15.5 9.5c3.6 0 6.5 2.4 6.5 5.4 0 1.7-1 3.3-2.6 4.3l.8 1.8-2.6-1.3c-.7.2-1.4.3-2.1.3-3.6 0-6.5-2.4-6.5-5.1s2.9-5.4 6.5-5.4Z"/></svg>' +
          "<span>微信：" + esc(contacts.wechat) + "</span>" +
          '<span class="copied">已复制</span>' +
        "</button>"
      );
    }
    (contacts.links || []).forEach(function (link) {
      if (!link || !link.url) return;
      parts.push(
        '<a class="contact-btn" href="' + esc(link.url) + '" target="_blank" rel="noopener noreferrer">' +
          "<span>" + esc(link.label || link.url) + "</span>" +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>' +
        "</a>"
      );
    });
    if (!parts.length) {
      parts.push('<p class="contact-sub">还没填写联系方式，可在 data.js 的 contact 里补上邮箱或微信。</p>');
    }
    contactActions.innerHTML = parts.join("");

    var copyBtn = $("#copyWechat");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var text = copyBtn.getAttribute("data-wechat") || "";
        var done = function () {
          copyBtn.classList.add("copied-state");
          window.setTimeout(function () { copyBtn.classList.remove("copied-state"); }, 1800);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(done).catch(fallback);
        } else {
          fallback();
        }
        function fallback() {
          var ta = doc.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          doc.body.appendChild(ta);
          ta.select();
          try { doc.execCommand("copy"); done(); } catch (e) {}
          doc.body.removeChild(ta);
        }
      });
    }
  }

  /* ==========================================================
     3. 作品卡片
     ========================================================== */
  var grid = $("#worksGrid");
  var PLAY_ICON =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8.2 5.4v13.2L19 12 8.2 5.4Z"/></svg>';
  var ARROW_ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function hasVideo(w) {
    return !!(w.video && (w.video.src || w.video.embed));
  }

  function pad2(n) { return n < 10 ? "0" + n : String(n); }

  if (grid) {
    if (!works.length) {
      grid.innerHTML = '<p class="works-empty">还没有作品。打开 data.js，把作品信息加进 works 数组即可。</p>';
    } else {
      grid.innerHTML = works.map(function (w, i) {
        var cat = [w.category, w.year].filter(Boolean).join("");
        var catHtml = (w.category || w.year)
          ? "<span>" + esc(w.category || "") + "</span>" +
            (w.category && w.year ? '<span class="sep" aria-hidden="true"></span>' : "") +
            (w.year ? "<span>" + esc(w.year) + "</span>" : "")
          : "";
        var aiCount = Array.isArray(w.aiTools) ? w.aiTools.length : 0;
        var aiBadge = aiCount
          ? '<span class="ai-badge" title="AI 协作：' + esc(w.aiTools.join(" / ")) + '">AI 协作</span>'
          : "";
        return (
          '<button class="work-card" type="button" data-work="' + esc(w.id) + '" aria-label="查看作品：' + esc(w.title) + '">' +
            '<div class="work-cover">' +
              '<img src="' + esc(w.cover) + '" alt="' + esc(w.title) + ' 封面" loading="lazy" ' + (w.coverFocus ? 'style="object-position:' + esc(w.coverFocus) + '"' : '') + ' onerror="this.style.opacity=0" />' +
              '<span class="work-index">' + pad2(i + 1) + "</span>" +
              (hasVideo(w) ? '<span class="work-play" aria-hidden="true">' + PLAY_ICON + "</span>" : "") +
            "</div>" +
            '<div class="work-caption">' +
              "<div>" +
                '<div class="work-cat">' + catHtml + aiBadge + "</div>" +
                '<h3 class="work-title">' + esc(w.title) + "</h3>" +
                (w.en ? '<p class="work-en">' + esc(w.en) + "</p>" : "") +
                (w.subtitle ? '<p class="work-sub">' + esc(w.subtitle) + "</p>" : "") +
              "</div>" +
              '<span class="work-arrow" aria-hidden="true">' + ARROW_ICON + "</span>" +
            "</div>" +
          "</button>"
        );
      }).join("");
    }
  }

  /* ==========================================================
     4. 进场动画
     ========================================================== */
  $$(".reveal").forEach(function (el) {
    var d = el.getAttribute("data-reveal-delay");
    if (d) el.style.setProperty("--reveal-delay", d + "ms");
  });

  var animateEls = $$(".reveal, .work-card, .ai-card");
  var forcedMotion = html.classList.contains("no-motion");

  if ("IntersectionObserver" in window && !reduceMotion && !forcedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var idx = animateEls.indexOf(el);
        var delay = el.classList.contains("work-card") ? (idx % 2) * 110 : 0;
        el.style.transitionDelay = delay + "ms";
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    animateEls.forEach(function (el) { io.observe(el); });
  } else {
    animateEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ==========================================================
     5. 顶部导航状态
     ========================================================== */
  var header = $("#siteHeader");
  var navLinks = $$(".site-nav a[data-nav]");
  var sections = navLinks.map(function (a) {
    return doc.getElementById(a.getAttribute("data-nav"));
  }).filter(Boolean);

  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("data-nav") === entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ==========================================================
     6. 作品详情弹窗
     ========================================================== */
  var modal = $("#modal");
  var modalPanel = modal ? $(".modal-panel", modal) : null;
  var lastFocus = null;
  var activeWork = null;
  var videoStarted = false;

  function findWork(id) {
    for (var i = 0; i < works.length; i++) {
      if (String(works[i].id) === String(id)) return works[i];
    }
    return null;
  }

  /* 视频地址可以是字符串，也可以是数组：浏览器会按顺序自动换线（第一个失败就试下一个） */
  function videoSources(w) {
    var src = w.video && w.video.src;
    if (!src) return [];
    return Array.isArray(src) ? src.filter(Boolean) : [src];
  }

  function mediaHtml(w) {
    var html = "";
    if (hasVideo(w)) {
      html += '<button class="media-poster" type="button" data-start-video aria-label="播放《' + esc(w.title) + '》视频">';
      html += '<img src="' + esc(w.cover) + '" alt="' + esc(w.title) + ' 视频封面" />';
      html += '<span class="poster-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.2 5.4v13.2L19 12 8.2 5.4Z"/></svg></span>';
      if (w.duration) html += '<span class="media-note">成片 ' + esc(w.duration) + "</span>";
      html += "</button>";
      html += '<div class="media-fallback" data-media-fallback>' +
                "<strong>视频还没有放进来</strong>" +
                "<span>把成片放到 <code>" + esc(videoSources(w)[0] || "assets/videos/") + "</code> 就能直接播放</span>" +
              "</div>";
    } else {
      html += '<img src="' + esc(w.cover) + '" alt="' + esc(w.title) + ' 封面" />';
      if (w.duration) html += '<span class="media-note">成片 ' + esc(w.duration) + "</span>";
    }
    return html;
  }

  function buildGallery(w) {
    if (!Array.isArray(w.gallery) || !w.gallery.length) return "";
    return '<div class="modal-gallery">' + w.gallery.map(function (src) {
      return '<img src="' + esc(src) + '" alt="' + esc(w.title) + ' 剧照" loading="lazy" />';
    }).join("") + "</div>";
  }

  function openModal(w) {
    if (!modal || !w) return;
    activeWork = w;
    videoStarted = false;
    lastFocus = doc.activeElement;

    $("#modalMedia").innerHTML = mediaHtml(w);
    $("#modalEyebrow").textContent = [w.category, w.year].filter(Boolean).join(" · ");
    $("#modalTitle").textContent = w.title || "";
    $("#modalEn").textContent = w.en || "";

    var meta = [];
    if (w.model) meta.push(["制作", w.model]);
    if (w.duration) meta.push(["时长", w.duration]);
    if (w.credits) meta.push(["团队", w.credits]);
    if (w.link) meta.push(["状态", "在线可访问"]);
    if (Array.isArray(w.aiTools) && w.aiTools.length) meta.push(["AI 工具", w.aiTools.join(" · ")]);
    $("#modalMeta").innerHTML = meta.map(function (m) {
      return '<div class="m"><span class="k">' + esc(m[0]) + "</span><span class=\"v\">" + esc(m[1]) + "</span></div>";
    }).join("");

    /* AI 协作：工具 + 具体用途 */
    var aiWrap = $("#modalAi");
    if (aiWrap) {
      var tools = Array.isArray(w.aiTools) ? w.aiTools : [];
      var hasAiInfo = tools.length || w.aiNote;
      if (hasAiInfo) {
        $("#modalAiTools").innerHTML = tools.map(function (t) {
          return "<span>" + esc(t) + "</span>";
        }).join("");
        $("#modalAiNote").textContent = w.aiNote || "";
        $("#modalAiNote").hidden = !w.aiNote;
        aiWrap.hidden = false;
      } else {
        aiWrap.hidden = true;
      }
    }

    /* 在线体验 / 仓库链接 */
    var linkRow = $("#modalLinkRow");
    var linkEl = $("#modalLink");
    if (linkRow && linkEl) {
      if (w.link) {
        linkEl.href = w.link;
        linkEl.querySelector("span").textContent = w.linkLabel || "在线体验";
        linkRow.hidden = false;
      } else {
        linkEl.removeAttribute("href");
        linkRow.hidden = true;
      }
    }

    $("#modalCopy").innerHTML = (Array.isArray(w.summary) ? w.summary : [w.summary]).filter(Boolean)
      .map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

    var creditsEl = $("#modalCredits");
    if (creditsEl) {
      if (w.credits) {
        creditsEl.textContent = "联合创作 · " + w.credits;
        creditsEl.hidden = false;
      } else {
        creditsEl.textContent = "";
        creditsEl.hidden = true;
      }
    }

    var hl = Array.isArray(w.highlights) ? w.highlights : [];
    var hlWrap = $("#modalHighlightsWrap");
    if (hl.length) {
      $("#modalHighlights").innerHTML = hl.map(function (h) { return "<li>" + esc(h) + "</li>"; }).join("");
      hlWrap.hidden = false;
    } else {
      $("#modalHighlights").innerHTML = "";
      hlWrap.hidden = true;
    }

    $("#modalTags").innerHTML = (w.tags || []).map(function (t) {
      return "<span>" + esc(t) + "</span>";
    }).join("");

    var oldGallery = $(".modal-gallery", modal);
    if (oldGallery) oldGallery.remove();
    var galleryHtml = buildGallery(w);
    if (galleryHtml) {
      var modalBody = $(".modal-body", modal);
      if (modalBody) modalBody.insertAdjacentHTML("beforebegin", galleryHtml);
    }

    modal.hidden = false;
    doc.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      modal.classList.add("is-open");
      if (modalPanel) modalPanel.focus({ preventScroll: true });
    });

    history.replaceState(null, "", "#work=" + encodeURIComponent(w.id));
  }

  function startVideo() {
    if (!activeWork || !activeWork.video || videoStarted) return;
    videoStarted = true;
    var media = $("#modalMedia");
    var fb = $("[data-media-fallback]", media);
    var v = activeWork.video;

    if (v.embed) {
      media.innerHTML = '<iframe src="' + esc(v.embed) + '" title="' + esc(activeWork.title) +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
      return;
    }

    var poster = activeWork.cover;
    var sources = videoSources(activeWork);
    var srcTags = sources.map(function (s) {
      return '<source src="' + esc(s) + '" type="video/mp4" />';
    }).join("");

    media.innerHTML =
      '<video controls autoplay playsinline preload="auto" poster="' + esc(poster) + '">' + srcTags + "</video>" +
      '<div class="media-buffering" data-buffering>' +
        '<span class="media-spin" aria-hidden="true"></span>' +
        '<span class="media-buffering-text">正在缓冲…</span>' +
        '<a class="media-download" href="' + esc(sources[0] || "#") + '" download>网速慢？下载成片</a>' +
      "</div>";
    var video = $("video", media);
    var buffering = $("[data-buffering]", media);

    if (buffering) {
      var showBuf = function () { buffering.classList.add("is-visible"); };
      var hideBuf = function () { buffering.classList.remove("is-visible"); };
      video.addEventListener("waiting", showBuf);
      video.addEventListener("stalled", showBuf);
      video.addEventListener("seeking", showBuf);
      video.addEventListener("playing", hideBuf);
      video.addEventListener("canplay", hideBuf);
      video.addEventListener("error", showBuf);
      if (video.readyState < 3) showBuf();
    }

    if (fb) {
      media.appendChild(fb);
      fb.classList.remove("is-visible");
      video.addEventListener("error", function () {
        var src = $("source", video);
        if (!src || src === sources[sources.length - 1]) fb.classList.add("is-visible");
      });
    }
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove("is-open");
    var video = $("video", modal);
    if (video) { try { video.pause(); } catch (e) {} }
    var iframe = $("iframe", modal);
    if (iframe) iframe.src = "about:blank";
    doc.body.style.overflow = "";
    window.setTimeout(function () {
      modal.hidden = true;
      if ($("#modalMedia")) $("#modalMedia").innerHTML = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }, 320);
    history.replaceState(null, "", location.pathname + location.search);
  }

  if (grid) {
    grid.addEventListener("click", function (e) {
      var card = e.target.closest ? e.target.closest(".work-card") : null;
      if (!card) return;
      var w = findWork(card.getAttribute("data-work"));
      if (w) openModal(w);
    });
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest && t.closest("[data-close-modal]")) { closeModal(); return; }
      if (t.closest && t.closest("[data-start-video]")) { startVideo(); return; }
    });
  }

  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  /* 深链接：#work=xxx；开发辅助：?open=xxx */
  function openFromHash() {
    var m = /#work=([^&]+)/.exec(location.hash || "");
    if (m) {
      var w = findWork(decodeURIComponent(m[1]));
      if (w) openModal(w);
      return;
    }
    try {
      var q = new URLSearchParams(location.search);
      var id = q.get("open");
      if (id) {
        var target = findWork(id);
        if (target) openModal(target);
      }
    } catch (e) {}
  }
  openFromHash();
  window.addEventListener("hashchange", openFromHash);

  /* 开发辅助：?open=xxx&play=1 直接打开并播放视频 */
  try {
    var playQuery = new URLSearchParams(location.search);
    if (playQuery.get("play") === "1" && activeWork && hasVideo(activeWork)) {
      window.setTimeout(startVideo, 500);
    }
  } catch (e) {}

  /* ==========================================================
     7. 小细节
     ========================================================== */
  /* 鼠标光晕（仅桌面、非降级动画） */
  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    var glow = doc.createElement("div");
    glow.setAttribute("aria-hidden", "true");
    glow.style.cssText =
      "position:fixed;left:0;top:0;width:420px;height:420px;border-radius:50%;pointer-events:none;z-index:1;" +
      "opacity:0;transition:opacity .6s ease;will-change:transform;" +
      "background:radial-gradient(circle, rgba(217,178,124,.09), transparent 62%);";
    doc.body.appendChild(glow);
    var gx = 0, gy = 0, tx = 0, ty = 0, raf = 0;
    doc.addEventListener("mousemove", function (e) {
      tx = e.clientX - 210;
      ty = e.clientY - 210;
      glow.style.opacity = "1";
      if (!raf) raf = requestAnimationFrame(follow);
    });
    function follow() {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      glow.style.transform = "translate3d(" + gx + "px," + gy + "px,0)";
      if (Math.abs(tx - gx) > 0.5 || Math.abs(ty - gy) > 0.5) raf = requestAnimationFrame(follow);
      else raf = 0;
    }
  }
})();
