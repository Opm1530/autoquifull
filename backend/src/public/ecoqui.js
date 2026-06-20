/* EcoQui storefront loader — injetado na loja NuvemShop (vitrine + checkout).
 * Vanilla JS, sem dependências e sem depender do tema da loja.
 * Tudo encapsulado e protegido por try/catch para nunca quebrar a página. */
(function () {
  'use strict';
  if (window.__ecoquiLoaded) return;
  window.__ecoquiLoaded = true;

  // ── Descobre a base do backend (origem do próprio script) e o storeId ──
  function selfScript() {
    if (document.currentScript) return document.currentScript;
    var s = document.getElementsByTagName('script');
    for (var i = s.length - 1; i >= 0; i--) {
      if ((s[i].src || '').indexOf('/storefront/ecoqui.js') !== -1) return s[i];
    }
    return null;
  }
  var script = selfScript();
  var src = (script && script.src) || '';
  // Backend do EcoQui — FIXO, porque em produção a NuvemShop hospeda este arquivo no CDN dela
  // (e aí não daria pra descobrir o backend pela origem do próprio script).
  var BASE = 'https://autoqui.vps.pequi.digital';

  function getStoreId() {
    try {
      var u = new URL(src);
      var q = u.searchParams.get('store') || u.searchParams.get('store_id');
      if (q) return q;
    } catch (e) {}
    if (window.LS && window.LS.store && window.LS.store.id) return String(window.LS.store.id);
    if (window.LS && window.LS.storeId) return String(window.LS.storeId);
    return null;
  }

  var STORE_ID = getStoreId();
  if (!STORE_ID || !BASE) return;

  var isCheckout = !!window.SDKCheckout || /\/checkout(\/|$)/.test(location.pathname);

  // ── Helpers ──
  function el(tag, css, html) {
    var n = document.createElement(tag);
    if (css) n.style.cssText = css;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function api(path, opts) {
    return fetch(BASE + path, opts).then(function (r) { return r.json(); });
  }

  // ── Carrega config e dispara as features ──
  api('/storefront/config/' + STORE_ID).then(function (cfg) {
    try {
      if (isCheckout) {
        if (cfg.checkout && cfg.checkout.enabled) initCheckout(cfg.checkout);
      } else {
        if (cfg.videos && cfg.videos.enabled) initVideos(cfg.videos);
        if (cfg.shoppable && cfg.shoppable.enabled && cfg.shoppable.items && cfg.shoppable.items.length) initShoppable(cfg.shoppable);
        if (cfg.reward && cfg.reward.enabled && Number(cfg.reward.threshold) > 0) initReward(cfg.reward);
        if (cfg.roulette && cfg.roulette.enabled && cfg.roulette.slices && cfg.roulette.slices.length) {
          initRoulette(cfg.roulette);
        }
      }
    } catch (e) { /* nunca quebra a loja */ }
  }).catch(function () {});

  // ═══════════════════════════════════════════════════════════
  // ROLETA DE DESCONTO (vitrine)
  // ═══════════════════════════════════════════════════════════
  function ensureRouletteStyle() {
    if (document.getElementById('ecq-rl-style')) return;
    var st = document.createElement('style'); st.id = 'ecq-rl-style';
    st.textContent =
      '.ecq-ov{position:fixed;inset:0;z-index:2147483000;background:rgba(15,15,25,.6);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:none;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;}'
      + '.ecq-card{position:relative;width:100%;max-width:360px;background:#fff;border-radius:22px;padding:26px 22px 24px;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.4);animation:ecqPop .35s cubic-bezier(.2,.9,.3,1.3);}'
      + '@keyframes ecqPop{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}'
      + '.ecq-x{position:absolute;top:12px;right:14px;width:30px;height:30px;border-radius:50%;background:#f1f1f4;color:#888;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;border:0;line-height:1;}'
      + '.ecq-x:hover{background:#e5e5ea;}'
      + '.ecq-title{margin:0 0 4px;font-size:21px;font-weight:800;color:#16161a;}'
      + '.ecq-sub{margin:0 0 16px;font-size:13px;color:#6b6b76;}'
      + '.ecq-rim{position:relative;margin:0 auto 18px;border-radius:50%;background:var(--ecq);padding:9px;box-shadow:0 10px 30px rgba(0,0,0,.22);}'
      + '.ecq-rim:before{content:"";position:absolute;inset:5px;border-radius:50%;border:3px dashed rgba(255,255,255,.6);pointer-events:none;z-index:3;}'
      + '.ecq-disc{width:100%;height:100%;border-radius:50%;position:relative;transition:transform 4.6s cubic-bezier(.13,.7,.2,1);}'
      + '.ecq-hub{position:absolute;top:50%;left:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#fff;box-shadow:0 3px 12px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;font-size:20px;z-index:4;}'
      + '.ecq-ptr{position:absolute;top:-6px;left:50%;transform:translateX(-50%);z-index:5;width:0;height:0;border-left:13px solid transparent;border-right:13px solid transparent;border-top:22px solid #16161a;filter:drop-shadow(0 2px 2px rgba(0,0,0,.3));}'
      + '.ecq-lab{position:absolute;left:50%;top:50%;color:#fff;font-weight:800;pointer-events:none;text-shadow:0 1px 2px rgba(0,0,0,.4);white-space:nowrap;}'
      + '.ecq-inp{width:100%;box-sizing:border-box;padding:12px 14px;margin:6px 0;border:1.5px solid #e3e3ea;border-radius:12px;font-size:14px;outline:none;transition:border-color .2s;}'
      + '.ecq-inp:focus{border-color:var(--ecq);}'
      + '.ecq-btn{width:100%;padding:14px;border:0;border-radius:14px;background:var(--ecq);color:#fff;font-size:16px;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,.18);transition:transform .15s,opacity .2s;margin-top:6px;letter-spacing:.3px;}'
      + '.ecq-btn:hover{transform:translateY(-1px);}.ecq-btn:disabled{opacity:.6;transform:none;cursor:default;}'
      + '.ecq-err{min-height:16px;font-size:12.5px;color:#e23b3b;margin:6px 0 0;font-weight:600;}'
      + '.ecq-code{font-size:26px;font-weight:900;letter-spacing:3px;color:var(--ecq);background:#f6f6fb;border:2px dashed var(--ecq);border-radius:12px;padding:12px;margin:10px 0 14px;}'
      + '.ecq-launch{position:fixed;left:18px;bottom:18px;z-index:2147482000;background:var(--ecq);color:#fff;border-radius:50px;padding:12px 18px 12px 15px;font-family:system-ui,Arial;font-weight:800;font-size:14px;cursor:pointer;box-shadow:0 10px 26px rgba(0,0,0,.3);display:flex;align-items:center;gap:8px;animation:ecqPulse 2.2s infinite;}'
      + '.ecq-launch:hover{filter:brightness(1.05);}'
      + '@keyframes ecqPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}'
      + '@keyframes ecqFall{to{transform:translateY(110vh) rotate(720deg);opacity:.9}}';
    document.head.appendChild(st);
  }

  function ecqConfetti(theme) {
    var colors = ['#FFD166', '#06D6A0', '#EF476F', '#118AB2', '#FF8FAB', theme];
    for (var i = 0; i < 70; i++) {
      var c = document.createElement('div');
      var sz = 6 + Math.random() * 9;
      c.style.cssText = 'position:fixed;top:-24px;left:' + (Math.random() * 100) + 'vw;width:' + sz + 'px;height:' + (sz * 0.55) + 'px;background:' + colors[Math.floor(Math.random() * colors.length)] + ';z-index:2147483600;border-radius:2px;opacity:.95;pointer-events:none;animation:ecqFall ' + (2.6 + Math.random() * 2.2) + 's linear ' + (Math.random() * 0.5) + 's forwards;';
      document.body.appendChild(c);
      (function (node) { setTimeout(function () { node.remove(); }, 6200); })(c);
    }
  }

  function initRoulette(r) {
    ensureRouletteStyle();
    var SEEN = 'ecoqui_roleta_' + STORE_ID;
    var theme = r.theme || '#6366f1';
    document.documentElement.style.setProperty('--ecq', theme);
    var slices = r.slices.map(function (s) { return s.label || '—'; });
    var n = slices.length;
    var seg = 360 / n;
    var size = Math.round(Math.min(290, (window.innerWidth || 360) * 0.78));
    var radius = size * 0.30;
    var fs = Math.max(10, Math.round(size * 0.046));

    var overlay = el('div'); overlay.className = 'ecq-ov';
    var card = el('div'); card.className = 'ecq-card';
    overlay.appendChild(card);

    var close = el('button', '', '&times;'); close.className = 'ecq-x';
    close.onclick = function () { overlay.style.display = 'none'; };

    var title = el('h3', '', escapeHtml(r.title || 'Gire e ganhe!')); title.className = 'ecq-title';
    var sub = el('p', '', 'Preencha e gire para ganhar seu prêmio.'); sub.className = 'ecq-sub';

    // Roda
    var colors = [];
    for (var i = 0; i < n; i++) colors.push(i % 2 ? shade(theme, 22) : theme);
    var grad = [];
    for (var j = 0; j < n; j++) grad.push(colors[j] + ' ' + (seg * j) + 'deg ' + (seg * (j + 1)) + 'deg');

    var rim = el('div'); rim.className = 'ecq-rim'; rim.style.width = size + 'px'; rim.style.height = size + 'px';
    var disc = el('div'); disc.className = 'ecq-disc'; disc.style.background = 'conic-gradient(' + grad.join(',') + ')';
    for (var k = 0; k < n; k++) {
      var mid = seg * k + seg / 2;
      var lab = el('div', '', escapeHtml(slices[k])); lab.className = 'ecq-lab';
      lab.style.fontSize = fs + 'px';
      lab.style.transform = 'translate(-50%,-50%) rotate(' + mid + 'deg) translateY(-' + radius + 'px)';
      disc.appendChild(lab);
    }
    var hub = el('div', '', '🎁'); hub.className = 'ecq-hub';
    var ptr = el('div'); ptr.className = 'ecq-ptr';
    rim.appendChild(disc); rim.appendChild(hub); rim.appendChild(ptr);

    // Form
    var form = el('div');
    var inputs = {};
    var fields = (r.capture && r.capture.length) ? r.capture : ['email'];
    if (fields.indexOf('email') !== -1) inputs.email = addInput(form, 'email', 'Seu melhor e-mail');
    if (fields.indexOf('phone') !== -1) inputs.phone = addInput(form, 'tel', 'Seu WhatsApp (DDD + número)');

    var msg = el('div'); msg.className = 'ecq-err';
    var btn = el('button', '', 'GIRAR 🎉'); btn.className = 'ecq-btn';

    card.appendChild(close); card.appendChild(title); card.appendChild(sub);
    card.appendChild(rim); card.appendChild(form); card.appendChild(msg); card.appendChild(btn);

    var spinning = false;
    btn.onclick = function () {
      if (spinning) return;
      var email = inputs.email ? inputs.email.value.trim() : '';
      var phone = inputs.phone ? inputs.phone.value.trim() : '';
      if (inputs.email && !/.+@.+\..+/.test(email)) { msg.textContent = 'Informe um e-mail válido.'; return; }
      if (inputs.phone && phone.replace(/\D/g, '').length < 10) { msg.textContent = 'Informe um WhatsApp válido.'; return; }
      msg.textContent = ''; spinning = true; btn.disabled = true; btn.textContent = 'Girando...';

      api('/storefront/roulette/claim', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId: STORE_ID, email: email, phone: phone })
      }).then(function (res) {
        if (res.error) { msg.textContent = res.error; spinning = false; btn.disabled = false; btn.textContent = 'GIRAR 🎉'; return; }
        var idx = Math.max(0, slices.indexOf(res.prizeLabel));
        var target = 360 * 5 + (360 - (seg * idx + seg / 2)); // ponteiro no topo
        disc.style.transform = 'rotate(' + target + 'deg)';
        try { localStorage.setItem(SEEN, '1'); } catch (e) {}
        setTimeout(function () {
          if (res.won) {
            ecqConfetti(theme);
            card.innerHTML = '<button class="ecq-x">&times;</button>'
              + '<div style="font-size:42px;line-height:1;margin:6px 0 2px;">🎉</div>'
              + '<h3 class="ecq-title">Você ganhou!</h3>'
              + '<p class="ecq-sub" style="margin-bottom:8px;">' + escapeHtml(res.prizeLabel) + '</p>'
              + '<div style="font-size:12.5px;color:#6b6b76;">Use o cupom no checkout:</div>'
              + '<div class="ecq-code">' + escapeHtml(res.code) + '</div>'
              + '<button class="ecq-btn" id="ecq-copy">Copiar cupom</button>';
            card.querySelector('.ecq-x').onclick = function () { overlay.style.display = 'none'; };
            var cp = card.querySelector('#ecq-copy');
            cp.onclick = function () { try { navigator.clipboard.writeText(res.code); cp.textContent = 'Copiado! ✓'; } catch (e) {} };
          } else {
            card.innerHTML = '<button class="ecq-x">&times;</button>'
              + '<div style="font-size:40px;line-height:1;margin:6px 0 2px;">😕</div>'
              + '<h3 class="ecq-title">' + escapeHtml(res.prizeLabel || 'Não foi dessa vez') + '</h3>'
              + '<p class="ecq-sub">Fique de olho nas próximas promoções! 💜</p>';
            card.querySelector('.ecq-x').onclick = function () { overlay.style.display = 'none'; };
          }
        }, 4800);
      }).catch(function () { msg.textContent = 'Erro de conexão. Tente novamente.'; spinning = false; btn.disabled = false; btn.textContent = 'GIRAR 🎉'; });
    };

    document.body.appendChild(overlay);

    // Launcher flutuante + auto-abre 1x por sessão
    var launcher = el('div'); launcher.className = 'ecq-launch';
    launcher.innerHTML = '🎁 <span>Ganhe desconto</span>';
    launcher.onclick = function () { overlay.style.display = 'flex'; };
    document.body.appendChild(launcher);

    var alreadyWon = false;
    try { alreadyWon = !!localStorage.getItem(SEEN); } catch (e) {}
    if (!alreadyWon) setTimeout(function () { overlay.style.display = 'flex'; }, 2500);
  }

  function addInput(parent, type, ph) {
    var i = el('input');
    i.type = type; i.placeholder = ph; i.className = 'ecq-inp';
    parent.appendChild(i);
    return i;
  }

  // ═══════════════════════════════════════════════════════════
  // VÍDEOS (vitrine)
  // ═══════════════════════════════════════════════════════════
  function initVideos(v) {
    (v.items || []).forEach(function (item) {
      if (!item || !item.url) return;
      var pos = item.position || item.posição || 'flutuante';
      var node = videoNode(item.url, item.title);
      if (!node) return;
      if (pos === 'flutuante') {
        var box = el('div', 'position:fixed;right:18px;bottom:18px;z-index:2147481000;width:260px;background:#000;border-radius:12px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.3);');
        var x = el('div', 'position:absolute;top:4px;right:8px;color:#fff;cursor:pointer;z-index:2;font-family:Arial;', '&times;');
        x.onclick = function () { box.remove(); };
        box.appendChild(node); box.appendChild(x);
        document.body.appendChild(box);
      } else {
        // produto/home: insere um card no fluxo da página (best-effort)
        var host = document.querySelector('main') || document.body;
        var card = el('div', 'max-width:720px;margin:18px auto;border-radius:12px;overflow:hidden;');
        if (item.title) card.appendChild(el('h3', 'font-family:system-ui,Arial;font-size:16px;margin:0 0 8px;', escapeHtml(item.title)));
        card.appendChild(node);
        host.insertBefore(card, host.firstChild);
      }
    });
  }

  function videoNode(url, title) {
    var yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    if (yt) {
      var f = el('iframe');
      f.src = 'https://www.youtube.com/embed/' + yt[1];
      f.width = '100%'; f.height = '180'; f.frameBorder = '0';
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true; f.style.cssText = 'display:block;width:100%;border:0;aspect-ratio:16/9;height:auto;';
      f.title = title || 'Vídeo';
      return f;
    }
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
      var vd = el('video');
      vd.src = url; vd.controls = true; vd.style.cssText = 'display:block;width:100%;';
      return vd;
    }
    return null;
  }

  // ═══════════════════════════════════════════════════════════
  // VÍDEOS SHOPPABLE (carrossel com produto + bolha flutuante)
  // ═══════════════════════════════════════════════════════════
  function initShoppable(sh) {
    var items = sh.items || [];
    var carousel = items.filter(function (i) { return i && i.url && (i.mode || 'carousel') === 'carousel'; });
    var floating = items.filter(function (i) { return i && i.url && i.mode === 'floating'; });

    if (carousel.length) renderCarousel(carousel);
    floating.forEach(function (item) { if (matchesProduct(item)) renderFloating(item); });
  }

  // Vídeo "mini" (mp4 autoplay mudo em loop, ou iframe do YouTube)
  function miniVideo(url) {
    var yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    if (yt) {
      var f = el('iframe');
      f.src = 'https://www.youtube.com/embed/' + yt[1] + '?rel=0&playsinline=1';
      f.allow = 'autoplay; encrypted-media; picture-in-picture';
      f.allowFullscreen = true;
      f.style.cssText = 'width:100%;height:100%;border:0;display:block;';
      return f;
    }
    var v = el('video');
    v.src = url; v.muted = true; v.autoplay = true; v.loop = true;
    v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', 'true');
    v.setAttribute('disablepictureinpicture', '');
    v.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;background:#000;';
    return v;
  }

  // A página atual é a do produto deste item?
  function matchesProduct(item) {
    try {
      if (window.LS && window.LS.product && String(window.LS.product.id) === String(item.productId)) return true;
    } catch (e) {}
    if (item.productUrl) {
      try {
        var path = new URL(item.productUrl).pathname.replace(/\/+$/, '');
        if (path && location.pathname.replace(/\/+$/, '').indexOf(path) !== -1) return true;
      } catch (e) {}
    }
    return false;
  }

  function productCard(item) {
    if (!item.productId && !item.productUrl) return el('div');
    var a = el('a');
    a.href = item.productUrl || '#';
    a.target = '_blank';
    a.style.cssText = 'display:flex;align-items:center;gap:8px;text-decoration:none;color:#222;border:1px solid #e3e3e3;border-radius:8px;padding:7px;margin-top:8px;background:#fff;';
    a.innerHTML =
      (item.productImage ? '<img src="' + item.productImage + '" style="width:32px;height:32px;border-radius:6px;object-fit:cover;flex-shrink:0;">' : '') +
      '<div style="min-width:0;flex:1;">' +
        '<div style="font-size:12px;font-weight:600;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(item.productName || 'Ver produto') + '</div>' +
        (item.productPrice ? '<div style="font-size:12px;font-weight:700;color:#333;margin-top:2px;">R$ ' + escapeHtml(item.productPrice) + '</div>' : '') +
      '</div>';
    return a;
  }

  function ensureShopStyle() {
    if (document.getElementById('ecq-shop-style')) return;
    var st = document.createElement('style'); st.id = 'ecq-shop-style';
    st.textContent =
      '@keyframes ecqPulseBall{0%,100%{box-shadow:0 12px 30px rgba(0,0,0,.2)}50%{box-shadow:0 14px 44px rgba(0,0,0,.42)}}'
      + '.ecq-cf-vbox{width:172px;height:300px;border-radius:14px;overflow:hidden;background:#000;box-shadow:0 12px 30px rgba(0,0,0,.2);}'
      + '.ecq-st-ov{position:fixed;inset:0;z-index:2147483200;background:rgba(0,0,0,.86);display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,Arial;}'
      + '.ecq-st-frame{position:relative;width:min(420px,94vw);height:min(86vh,760px);background:#000;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5);}'
      + '.ecq-st-btn{position:absolute;top:12px;width:38px;height:38px;border-radius:50%;background:rgba(0,0,0,.45);color:#fff;border:0;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:6;font-size:15px;}'
      + '.ecq-st-nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.16);color:#fff;border:0;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:2147483210;font-size:24px;line-height:1;}'
      + '.ecq-st-prod{position:absolute;left:12px;right:12px;bottom:12px;display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.92);border-radius:12px;padding:10px;text-decoration:none;color:#111;z-index:6;}';
    document.head.appendChild(st);
  }

  // Coverflow: item central maior, auto-rotaciona, autoplay mudo no centro
  function renderCarousel(list) {
    ensureShopStyle();
    var wrap = el('div', 'width:100%;box-sizing:border-box;padding:26px 0;display:flex;justify-content:center;overflow:hidden;');
    var stage = el('div', 'position:relative;width:100%;max-width:1000px;height:440px;');
    wrap.appendChild(stage);

    var nlen = list.length, GAP = 208, cards = [];
    list.forEach(function (item, i) {
      var card = el('div', 'position:absolute;top:8px;left:50%;width:172px;cursor:pointer;will-change:transform,opacity;');
      var vbox = el('div'); vbox.className = 'ecq-cf-vbox';
      var vid = miniVideo(item.url);
      vbox.appendChild(vid);
      card.appendChild(vbox);
      card.appendChild(productCard(item));
      card.onclick = function () { openStory(list, i); };
      stage.appendChild(card);
      cards.push({ el: card, vid: vid, vbox: vbox, off: null });
    });

    var center = 0;
    function layout() {
      for (var i = 0; i < cards.length; i++) {
        var off = i - center;
        if (off > nlen / 2) off -= nlen;
        if (off < -nlen / 2) off += nlen;
        var c = cards[i];
        var abs = Math.abs(off);
        var jumped = c.off != null && Math.abs(off - c.off) > 2;
        c.el.style.transition = jumped ? 'none' : 'transform .55s cubic-bezier(.2,.7,.2,1),opacity .55s';
        c.off = off;
        var scale = off === 0 ? 1.18 : (abs === 1 ? 0.9 : 0.76);
        c.el.style.transform = 'translateX(calc(-50% + ' + (off * GAP) + 'px)) scale(' + scale + ')';
        c.el.style.opacity = abs > 2 ? '0' : '1';
        c.el.style.zIndex = String(100 - abs);
        c.el.style.pointerEvents = abs > 2 ? 'none' : 'auto';
        c.vbox.style.animation = off === 0 ? 'ecqPulseBall 1.9s infinite' : 'none';
        try { if (c.vid.tagName === 'VIDEO') { if (off === 0) { c.vid.muted = true; c.vid.play(); } else { c.vid.pause(); } } } catch (e) {}
      }
    }
    layout();

    var timer = setInterval(function () { center = (center + 1) % nlen; layout(); }, 3600);
    stage.addEventListener('mouseenter', function () { clearInterval(timer); });
    stage.addEventListener('mouseleave', function () { timer = setInterval(function () { center = (center + 1) % nlen; layout(); }, 3600); });

    var host = document.querySelector('main') || document.body;
    host.insertBefore(wrap, host.firstChild);
  }

  // Player vertical em tela cheia (stories) com som, setas e card do produto
  function openStory(list, idx) {
    ensureShopStyle();
    var i = idx;
    var ov = el('div'); ov.className = 'ecq-st-ov';
    var frame = el('div'); frame.className = 'ecq-st-frame';
    ov.appendChild(frame);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });

    function close() { ov.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') show(i + 1); else if (e.key === 'ArrowLeft') show(i - 1); }
    document.addEventListener('keydown', onKey);

    function show(n) {
      i = (n % list.length + list.length) % list.length;
      var item = list[i];
      frame.innerHTML = '';

      var isYt = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/.test(item.url);
      var media, soundBtn;
      if (isYt) {
        media = miniVideo(item.url); // iframe
        media.src = media.src + (media.src.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
      } else {
        media = document.createElement('video');
        media.src = item.url; media.autoplay = true; media.loop = true; media.controls = false;
        media.setAttribute('playsinline', ''); media.muted = false;
        media.style.cssText = 'width:100%;height:100%;object-fit:cover;background:#000;display:block;';
      }
      frame.appendChild(media);
      if (!isYt) { media.play().catch(function () { media.muted = true; media.play(); if (soundBtn) soundBtn.innerHTML = '🔇'; }); }

      // botão de som (só vídeo mp4)
      if (!isYt) {
        soundBtn = el('button', '', '🔊'); soundBtn.className = 'ecq-st-btn'; soundBtn.style.left = '12px';
        soundBtn.onclick = function (e) { e.stopPropagation(); media.muted = !media.muted; soundBtn.innerHTML = media.muted ? '🔇' : '🔊'; };
        frame.appendChild(soundBtn);
      }
      // fechar
      var x = el('button', '', '&times;'); x.className = 'ecq-st-btn'; x.style.right = '12px'; x.style.fontSize = '20px';
      x.onclick = function (e) { e.stopPropagation(); close(); };
      frame.appendChild(x);

      // card do produto
      if (item.productUrl || item.productId) {
        var a = el('a'); a.className = 'ecq-st-prod'; a.href = item.productUrl || '#'; a.target = '_blank';
        a.innerHTML = (item.productImage ? '<img src="' + item.productImage + '" style="width:46px;height:46px;border-radius:8px;object-fit:cover;flex-shrink:0;">' : '')
          + '<div style="min-width:0;flex:1;"><div style="font-size:14px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escapeHtml(item.productName || 'Ver produto') + '</div>'
          + (item.productPrice ? '<div style="font-size:13px;font-weight:700;color:#333;margin-top:2px;">R$ ' + escapeHtml(item.productPrice) + '</div>' : '') + '</div>'
          + '<span style="font-size:18px;color:#111;">›</span>';
        frame.appendChild(a);
      }
    }

    // setas (se houver mais de 1)
    if (list.length > 1) {
      var prev = el('button', '', '‹'); prev.className = 'ecq-st-nav'; prev.style.left = '8px';
      prev.onclick = function (e) { e.stopPropagation(); show(i - 1); };
      var next = el('button', '', '›'); next.className = 'ecq-st-nav'; next.style.right = '8px';
      next.onclick = function (e) { e.stopPropagation(); show(i + 1); };
      ov.appendChild(prev); ov.appendChild(next);
    }

    document.body.appendChild(ov);
    show(idx);
  }

  function renderFloating(item) {
    var box = el('div', 'position:fixed;right:18px;bottom:18px;z-index:2147481500;width:128px;font-family:system-ui,Arial;');
    var bubble = el('div', 'position:relative;width:128px;height:128px;border-radius:50%;overflow:hidden;background:#000;box-shadow:0 8px 24px rgba(0,0,0,.3);cursor:pointer;');
    var vid = miniVideo(item.url);
    bubble.appendChild(vid);

    // Clique alterna o som (se for <video>)
    bubble.onclick = function () {
      try { if (vid.tagName === 'VIDEO') { vid.muted = !vid.muted; if (!vid.muted) vid.play(); } } catch (e) {}
    };

    if (item.productName) {
      var label = el('div', 'position:absolute;left:50%;bottom:8px;transform:translateX(-50%);background:rgba(0,0,0,.7);color:#fff;font-size:10px;font-weight:700;padding:3px 8px;border-radius:20px;white-space:nowrap;max-width:120px;overflow:hidden;text-overflow:ellipsis;', escapeHtml(item.productName));
      bubble.appendChild(label);
    }

    var close = el('div', 'position:absolute;top:-4px;right:-4px;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;z-index:2;', '&times;');
    close.onclick = function (e) { e.stopPropagation(); box.remove(); };

    box.appendChild(bubble);
    box.appendChild(close);
    document.body.appendChild(box);
  }

  // ═══════════════════════════════════════════════════════════
  // BRINDE / BARRA DE RECOMPENSA NO CARRINHO
  // ═══════════════════════════════════════════════════════════
  function brl(n) { return 'R$ ' + (Number(n) || 0).toFixed(2).replace('.', ','); }

  function readCartSubtotal() {
    try { if (window.LS && window.LS.cart && window.LS.cart.subtotal != null) return Number(window.LS.cart.subtotal) / 100; } catch (e) {}
    var node = document.querySelector('.js-cart-subtotal, [data-cart-subtotal]');
    if (node) {
      var dp = node.getAttribute('data-price');
      if (dp != null && dp !== '') { var c = Number(dp); if (!isNaN(c)) return c / 100; }
      var t = (node.textContent || '').replace(/[^\d.,]/g, '').replace(/\./g, '').replace(',', '.');
      var n = parseFloat(t); if (!isNaN(n)) return n;
    }
    return null;
  }

  function initReward(r) {
    var threshold = Number(r.threshold) || 0;
    var color = r.color || '#10b981';
    var atBottom = r.position === 'bottom';

    var bar = el('div', 'position:fixed;left:0;right:0;' + (atBottom ? 'bottom:0;' : 'top:0;') +
      'z-index:2147481800;background:' + color + ';color:#fff;font-family:system-ui,Arial;font-size:13px;' +
      'padding:8px 14px;text-align:center;box-shadow:0 2px 10px rgba(0,0,0,.15);display:none;');
    var msg = el('div', 'font-weight:700;margin-bottom:5px;');
    var track = el('div', 'height:6px;border-radius:6px;background:rgba(255,255,255,.35);max-width:420px;margin:0 auto;overflow:hidden;');
    var fill = el('div', 'height:100%;width:0%;background:#fff;border-radius:6px;transition:width .4s;');
    track.appendChild(fill);
    bar.appendChild(msg); bar.appendChild(track);
    document.body.appendChild(bar);

    function render() {
      var subtotal = readCartSubtotal();
      if (subtotal == null || subtotal <= 0) { bar.style.display = 'none'; return; }
      bar.style.display = 'block';
      if (subtotal >= threshold) {
        var reached = (r.msgReached || '🎉 Você desbloqueou {{recompensa}}!').replace(/\{\{recompensa\}\}/g, escapeHtml(r.rewardLabel || ''));
        msg.innerHTML = reached + (r.couponCode ? ' <strong style="text-decoration:underline;cursor:pointer;" title="Copiar">' + escapeHtml(r.couponCode) + '</strong>' : '');
        fill.style.width = '100%';
        if (r.couponCode) {
          var strong = msg.querySelector('strong');
          if (strong) strong.onclick = function () { try { navigator.clipboard.writeText(r.couponCode); strong.textContent = 'Copiado!'; } catch (e) {} };
        }
      } else {
        var falta = threshold - subtotal;
        msg.innerHTML = (r.msgBefore || 'Faltam {{falta}} para ganhar {{recompensa}}! 🎁')
          .replace(/\{\{falta\}\}/g, '<strong>' + brl(falta) + '</strong>')
          .replace(/\{\{recompensa\}\}/g, '<strong>' + escapeHtml(r.rewardLabel || '') + '</strong>');
        fill.style.width = Math.max(4, Math.min(100, (subtotal / threshold) * 100)) + '%';
      }
    }

    render();
    // Reage a mudanças no carrinho: observa o subtotal do tema + poll de segurança
    try {
      var node = document.querySelector('.js-cart-subtotal, [data-cart-subtotal]');
      if (node && window.MutationObserver) {
        new MutationObserver(render).observe(node, { childList: true, characterData: true, subtree: true, attributes: true });
      }
    } catch (e) {}
    setInterval(render, 2500);
  }

  // ═══════════════════════════════════════════════════════════
  // CHECKOUT (timer, banner, esconder pagamentos)
  // ═══════════════════════════════════════════════════════════
  function initCheckout(c) {
    // Banner de texto (DOM, garantido)
    if (c.banner) {
      var b = el('div', 'position:fixed;top:0;left:0;right:0;z-index:2147480000;background:#111;color:#fff;text-align:center;padding:10px;font-family:system-ui,Arial;font-size:14px;', escapeHtml(c.banner));
      document.body.appendChild(b);
      document.body.style.paddingTop = '40px';
    }
    // Timer de urgência (DOM, garantido)
    if (Number(c.timerMinutes) > 0) {
      var end = Date.now() + Number(c.timerMinutes) * 60000;
      var t = el('div', 'position:fixed;bottom:0;left:0;right:0;z-index:2147480000;background:#c0392b;color:#fff;text-align:center;padding:10px;font-family:system-ui,Arial;font-weight:800;');
      document.body.appendChild(t);
      (function tick() {
        var left = Math.max(0, end - Date.now());
        var m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
        t.textContent = '⏰ Oferta reservada por ' + m + ':' + (s < 10 ? '0' : '') + s;
        if (left > 0) setTimeout(tick, 1000);
      })();
    }
    // Esconder formas de pagamento via Checkout SDK (best-effort, com guardas)
    try {
      if (window.SDKCheckout && (c.hidePayments || []).length) {
        var sdk = window.SDKCheckout;
        if (typeof sdk.getMethods === 'function') {
          var methods = sdk.getMethods();
          if (methods && typeof methods.hidePaymentMethod === 'function') {
            c.hidePayments.forEach(function (id) { try { methods.hidePaymentMethod(id); } catch (e) {} });
          }
        }
      }
    } catch (e) {}
  }

  // ── utils ──
  function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, function (m) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m];
    });
  }
  function shade(hex, pct) {
    try {
      var c = hex.replace('#', '');
      if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
      var num = parseInt(c, 16), r = (num >> 16) + pct, g = ((num >> 8) & 255) + pct, b = (num & 255) + pct;
      r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
      return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    } catch (e) { return hex; }
  }
})();
