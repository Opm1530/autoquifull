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
  var BASE = '';
  try { BASE = new URL(src).origin; } catch (e) { BASE = ''; }

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
        if (cfg.roulette && cfg.roulette.enabled && cfg.roulette.slices && cfg.roulette.slices.length) {
          initRoulette(cfg.roulette);
        }
      }
    } catch (e) { /* nunca quebra a loja */ }
  }).catch(function () {});

  // ═══════════════════════════════════════════════════════════
  // ROLETA DE DESCONTO (vitrine)
  // ═══════════════════════════════════════════════════════════
  function initRoulette(r) {
    var SEEN = 'ecoqui_roleta_' + STORE_ID;
    var theme = r.theme || '#6366f1';
    var slices = r.slices.map(function (s) { return s.label || '—'; });

    var overlay = el('div', 'position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;font-family:system-ui,Arial,sans-serif;');
    var card = el('div', 'background:#fff;border-radius:18px;max-width:360px;width:92%;padding:24px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.35);position:relative;');
    overlay.appendChild(card);

    var close = el('div', 'position:absolute;top:10px;right:14px;cursor:pointer;font-size:22px;color:#999;', '&times;');
    close.onclick = function () { overlay.style.display = 'none'; };
    card.appendChild(close);

    card.appendChild(el('h3', 'margin:0 0 4px;font-size:20px;color:#111;', r.title || 'Gire e ganhe!'));
    card.appendChild(el('p', 'margin:0 0 16px;font-size:13px;color:#666;', 'Preencha e gire a roleta para ganhar um desconto.'));

    // Roda (conic-gradient + ponteiro)
    var size = 240, n = slices.length;
    var colors = [];
    for (var i = 0; i < n; i++) colors.push(i % 2 ? shade(theme, 18) : theme);
    var seg = 360 / n, grad = [];
    for (var j = 0; j < n; j++) grad.push(colors[j] + ' ' + (seg * j) + 'deg ' + (seg * (j + 1)) + 'deg');
    var wheelWrap = el('div', 'position:relative;width:' + size + 'px;height:' + size + 'px;margin:0 auto 14px;');
    var wheel = el('div', 'width:100%;height:100%;border-radius:50%;border:6px solid ' + theme + ';background:conic-gradient(' + grad.join(',') + ');transition:transform 4s cubic-bezier(.17,.67,.32,1.34);');
    // Rótulos
    for (var k = 0; k < n; k++) {
      var ang = seg * k + seg / 2;
      var lab = el('div', 'position:absolute;left:50%;top:50%;transform-origin:0 0;transform:rotate(' + ang + 'deg) translate(' + (size / 2 - 64) + 'px,-8px);width:60px;font-size:10px;font-weight:700;color:#fff;text-align:right;pointer-events:none;', escapeHtml(slices[k]));
      wheel.appendChild(lab);
    }
    var pointer = el('div', 'position:absolute;top:-6px;left:50%;transform:translateX(-50%);border-left:11px solid transparent;border-right:11px solid transparent;border-top:18px solid #111;z-index:2;');
    wheelWrap.appendChild(wheel); wheelWrap.appendChild(pointer);
    card.appendChild(wheelWrap);

    // Form de captura
    var form = el('div', '');
    var inputs = {};
    var fields = (r.capture && r.capture.length) ? r.capture : ['email'];
    if (fields.indexOf('email') !== -1) inputs.email = addInput(form, 'email', 'Seu melhor e-mail');
    if (fields.indexOf('phone') !== -1) inputs.phone = addInput(form, 'tel', 'Seu WhatsApp (DDD + número)');
    card.appendChild(form);

    var msg = el('div', 'min-height:18px;font-size:12px;color:#c0392b;margin:6px 0;');
    card.appendChild(msg);

    var btn = el('button', 'width:100%;padding:13px;border:0;border-radius:10px;background:' + theme + ';color:#fff;font-size:15px;font-weight:800;cursor:pointer;', 'GIRAR 🎉');
    card.appendChild(btn);

    var spinning = false;
    btn.onclick = function () {
      if (spinning) return;
      var email = inputs.email ? inputs.email.value.trim() : '';
      var phone = inputs.phone ? inputs.phone.value.trim() : '';
      if (inputs.email && !/.+@.+\..+/.test(email)) { msg.textContent = 'Informe um e-mail válido.'; return; }
      if (inputs.phone && phone.replace(/\D/g, '').length < 10) { msg.textContent = 'Informe um WhatsApp válido.'; return; }
      msg.textContent = ''; spinning = true; btn.disabled = true; btn.style.opacity = '.6';

      api('/storefront/roulette/claim', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId: STORE_ID, email: email, phone: phone })
      }).then(function (res) {
        if (res.error) { msg.textContent = res.error; spinning = false; btn.disabled = false; btn.style.opacity = '1'; return; }
        var idx = Math.max(0, slices.indexOf(res.prizeLabel));
        var target = 360 * 5 + (360 - (seg * idx + seg / 2)); // ponteiro no topo
        wheel.style.transform = 'rotate(' + target + 'deg)';
        try { localStorage.setItem(SEEN, '1'); } catch (e) {}
        setTimeout(function () {
          if (res.won) {
            card.innerHTML = '<h3 style="margin:0 0 8px;color:#111;font-size:20px;">🎉 Você ganhou!</h3>'
              + '<p style="color:#666;font-size:14px;margin:0 0 12px;">' + escapeHtml(res.prizeLabel) + '</p>'
              + '<div style="font-size:13px;color:#666;">Use o cupom:</div>'
              + '<div style="font-size:26px;font-weight:800;letter-spacing:2px;color:' + theme + ';margin:6px 0 14px;">' + escapeHtml(res.code) + '</div>'
              + '<button id="ecq-copy" style="width:100%;padding:12px;border:0;border-radius:10px;background:' + theme + ';color:#fff;font-weight:800;cursor:pointer;">Copiar cupom</button>';
            var cp = card.querySelector('#ecq-copy');
            cp.onclick = function () { try { navigator.clipboard.writeText(res.code); cp.textContent = 'Copiado!'; } catch (e) {} };
          } else {
            card.innerHTML = '<h3 style="margin:0 0 8px;color:#111;">' + escapeHtml(res.prizeLabel || 'Não foi dessa vez') + '</h3>'
              + '<p style="color:#666;font-size:14px;">Fique de olho nas próximas promoções! 💜</p>';
          }
        }, 4200);
      }).catch(function () { msg.textContent = 'Erro de conexão. Tente novamente.'; spinning = false; btn.disabled = false; btn.style.opacity = '1'; });
    };

    document.body.appendChild(overlay);

    // Launcher flutuante + auto-abre 1x por sessão
    var launcher = el('div', 'position:fixed;left:18px;bottom:18px;z-index:2147482000;background:' + theme + ';color:#fff;border-radius:50px;padding:12px 18px;font-family:system-ui,Arial;font-weight:800;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.25);', '🎁 Ganhe desconto');
    launcher.onclick = function () { overlay.style.display = 'flex'; };
    document.body.appendChild(launcher);

    var alreadyWon = false;
    try { alreadyWon = !!localStorage.getItem(SEEN); } catch (e) {}
    if (!alreadyWon) setTimeout(function () { overlay.style.display = 'flex'; }, 2500);
  }

  function addInput(parent, type, ph) {
    var i = el('input');
    i.type = type; i.placeholder = ph;
    i.style.cssText = 'width:100%;box-sizing:border-box;padding:11px;margin:5px 0;border:1px solid #ddd;border-radius:9px;font-size:14px;';
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
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
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
