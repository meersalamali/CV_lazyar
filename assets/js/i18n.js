/* =========================================================
   Lazyar Azad — Civil Engineer
   Languages: English (the HTML itself), Kurdish Sorani, Arabic
   ========================================================= */
(function () {
  'use strict';

  var STORE_KEY = 'la-lang';
  var BASE_URL = 'https://meersalamali.github.io/CV_lazyar/';
  var LANGS = {
    en:  { dir: 'ltr', code: 'EN', locale: 'en_US' },
    ckb: { dir: 'rtl', code: 'KU', locale: 'ckb_IQ' },
    ar:  { dir: 'rtl', code: 'AR', locale: 'ar_IQ' }
  };

  var root = document.documentElement;
  var dict = window.LA_DICT || {};

  /* Strings only the scripts use — no element carries them in the HTML. */
  var en = dict.en = {
    'theme.toLight': 'Switch to light theme',
    'theme.toDark':  'Switch to dark theme',
    'menu.open':     'Open menu',
    'menu.close':    'Close menu'
  };

  function toArray(list) { return Array.prototype.slice.call(list); }

  var textNodes = toArray(document.querySelectorAll('[data-i18n]'));
  var attrNodes = toArray(document.querySelectorAll('[data-i18n-attr]'));

  /* data-i18n-attr="aria-label:key;title:key2" */
  function attrPairs(el) {
    return el.getAttribute('data-i18n-attr').split(';').map(function (pair) {
      var i = pair.indexOf(':');
      return { attr: pair.slice(0, i).trim(), key: pair.slice(i + 1).trim() };
    });
  }

  /* English is read from the markup, so the HTML stays its single source. */
  textNodes.forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (!(key in en)) en[key] = el.innerHTML;
  });
  attrNodes.forEach(function (el) {
    attrPairs(el).forEach(function (p) {
      if (!(p.key in en)) en[p.key] = el.getAttribute(p.attr) || '';
    });
  });

  var current = 'en';

  /* Falls back to English for any key a translation is missing. */
  function t(key) {
    var table = dict[current];
    if (table && table[key] != null) return table[key];
    return en[key] != null ? en[key] : '';
  }

  var switcher = document.getElementById('langSwitch');
  var toggle = document.getElementById('langToggle');
  var menu = document.getElementById('langMenu');
  var code = document.getElementById('langCode');
  var options = menu ? toArray(menu.querySelectorAll('[data-lang]')) : [];

  function setAttr(selector, attr, value) {
    var el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  }

  function apply(lang) {
    if (!LANGS[lang]) lang = 'en';
    current = lang;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', LANGS[lang].dir);

    textNodes.forEach(function (el) {
      var value = t(el.getAttribute('data-i18n'));
      if (el.innerHTML !== value) el.innerHTML = value;
    });
    attrNodes.forEach(function (el) {
      attrPairs(el).forEach(function (p) { el.setAttribute(p.attr, t(p.key)); });
    });

    if (code) code.textContent = LANGS[lang].code;
    options.forEach(function (a) {
      if (a.getAttribute('data-lang') === lang) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });

    var url = lang === 'en' ? BASE_URL : BASE_URL + '?lang=' + lang;
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:url"]', 'content', url);
    setAttr('meta[property="og:locale"]', 'content', LANGS[lang].locale);

    root.classList.remove('i18n-pending');
    document.dispatchEvent(new CustomEvent('la:langchange', { detail: { lang: lang } }));
  }

  /* ---------- Switcher (disclosure: button + list of links) ------------- */
  function setOpen(open) {
    if (!toggle || !menu) return;
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle) {
    toggle.addEventListener('click', function () { setOpen(menu.hidden); });
  }

  options.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var lang = a.getAttribute('data-lang');
      try { localStorage.setItem(STORE_KEY, lang); } catch (err) { /* storage blocked */ }
      var query = lang === 'en' ? '' : '?lang=' + lang;
      history.replaceState(null, '', location.pathname + query + location.hash);
      apply(lang);
      setOpen(false);
      toggle.focus();
    });
  });

  document.addEventListener('click', function (e) {
    if (menu && !menu.hidden && switcher && !switcher.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.LA_I18N = { t: t, lang: function () { return current; } };

  /* The head script already resolved the language (URL, then saved choice). */
  apply(window.__LA_LANG || 'en');
})();
