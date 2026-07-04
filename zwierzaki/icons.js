// Zwierzaki — autorski set ikon (SVG sprite)
// Styl: konturowy, 24px grid, gruby zaokrąglony stroke — nawiązanie do łapki z logo.
// Wstrzykiwany raz do <body>; ikony używa się przez: <svg class="ic"><use href="#ic-nazwa"/></svg>
// Łapka (ic-paw) jest wypełniona — klasa "solid" (znak marki). Reszta konturowa.

(function () {
  var sprite = '' +
  '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute" aria-hidden="true">' +

  // — łapka (znak marki, wypełniona przez .ic.solid) —
  '<symbol id="ic-paw" viewBox="0 0 24 24"><path d="M4.5 10.2c1 0 1.9-1 1.9-2.3S5.5 5.6 4.5 5.6s-1.9 1-1.9 2.3 .9 2.3 1.9 2.3zm5.6-1.4c1 0 1.9-1.1 1.9-2.4S11.1 4 10.1 4 8.2 5.1 8.2 6.4s.9 2.4 1.9 2.4zm7.9-2.4c0-1.3-.9-2.4-1.9-2.4s-1.9 1.1-1.9 2.4 .9 2.4 1.9 2.4 1.9-1.1 1.9-2.4zm2.6 5.2c0-1.3-.9-2.3-1.9-2.3s-1.9 1-1.9 2.3 .9 2.3 1.9 2.3 1.9-1 1.9-2.3zM12 12.4c-2.6 0-6.4 2.7-6.4 5.4 0 1.3 1 2.2 2.3 2.2.9 0 1.5-.4 2.4-.4.7 0 1.3.4 1.7.4s1-.4 1.7-.4c.9 0 1.5.4 2.4.4 1.3 0 2.3-.9 2.3-2.2 0-2.7-3.8-5.4-6.4-5.4z"/></symbol>' +

  // — aktywność / energia (bolt) —
  '<symbol id="ic-bolt" viewBox="0 0 24 24"><path d="M13 2.5 5.5 13H10l-1 8.5L18.5 10H14l1.5-7.5z"/></symbol>' +
  // — dom / ogród —
  '<symbol id="ic-home" viewBox="0 0 24 24"><path d="M4 11 12 4l8 7"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-4.5h4V20"/></symbol>' +
  // — mieszkanie w bloku (budynek) —
  '<symbol id="ic-building" viewBox="0 0 24 24"><rect x="6" y="3.5" width="12" height="17" rx="1.5"/><path d="M9.5 7h1M13.5 7h1M9.5 10.5h1M13.5 10.5h1M9.5 14h1M13.5 14h1"/><path d="M10.5 20.5v-3h3v3"/></symbol>' +
  // — doświadczenie / tresura (biret) —
  '<symbol id="ic-cap" viewBox="0 0 24 24"><path d="M12 5 2 9l10 4 10-4-10-4z"/><path d="M6 10.8V15c0 1.7 2.7 2.7 6 2.7s6-1 6-2.7v-4.2"/></symbol>' +
  // — cel / dokładne dopasowanie —
  '<symbol id="ic-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.1"/></symbol>' +
  // — kompas / uzasadnienie —
  '<symbol id="ic-compass" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5z"/></symbol>' +
  // — statystyki (słupki) —
  '<symbol id="ic-chart" viewBox="0 0 24 24"><path d="M4 20h16"/><path d="M7 20v-6"/><path d="M12 20V8"/><path d="M17 20v-4"/></symbol>' +
  // — alternatywy / powtórz —
  '<symbol id="ic-refresh" viewBox="0 0 24 24"><path d="M19.4 15A7.5 7.5 0 1 1 20 9.2"/><path d="M20 4.5V9.5H15"/></symbol>' +
  // — zdrowie / szczepienia (tarcza) —
  '<symbol id="ic-shield" viewBox="0 0 24 24"><path d="M12 3 19 6v5.5c0 4.5-3.1 7.3-7 9-3.9-1.7-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></symbol>' +
  // — behawiorysta / porada (żarówka) —
  '<symbol id="ic-bulb" viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 1 4 10.4c-.6.6-1 1.2-1 2H9c0-.8-.4-1.4-1-2A6 6 0 0 1 12 3z"/><path d="M9.5 19h5"/><path d="M10.5 21.5h3"/></symbol>' +
  // — pet sitter / wyjazd (walizka) —
  '<symbol id="ic-suitcase" viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="12" rx="2.5"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M9 8v12M15 8v12"/></symbol>' +
  // — weterynarz (serce + plus) —
  '<symbol id="ic-vet" viewBox="0 0 24 24"><path d="M12 20C6 16 3 12.5 3 8.8A4.8 4.8 0 0 1 12 6.5 4.8 4.8 0 0 1 21 8.8C21 12.5 18 16 12 20z"/><path d="M12 9v4M10 11h4"/></symbol>' +
  // — lokalizacja —
  '<symbol id="ic-pin" viewBox="0 0 24 24"><path d="M12 21c4.5-5.5 6.5-8.6 6.5-11.5a6.5 6.5 0 1 0-13 0C5.5 12.4 7.5 15.5 12 21z"/><circle cx="12" cy="9.4" r="2.4"/></symbol>' +
  // — rasa (kość) —
  '<symbol id="ic-bone" viewBox="0 0 24 24"><path d="M8.5 9.2a2.1 2.1 0 1 0-2 2.8 2.1 2.1 0 1 0 2 2.8h7a2.1 2.1 0 1 0 2-2.8 2.1 2.1 0 1 0-2-2.8z"/></symbol>' +
  // — zweryfikowane (check w okręgu) —
  '<symbol id="ic-verified" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8 12.3 10.8 15 16 9.3"/></symbol>' +
  // — check —
  '<symbol id="ic-check" viewBox="0 0 24 24"><path d="M5 12.5 9.5 17 19 7"/></symbol>' +
  // — prywatność (kłódka) —
  '<symbol id="ic-lock" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><circle cx="12" cy="15" r="1.1"/></symbol>' +
  // — gwiazdka —
  '<symbol id="ic-star" viewBox="0 0 24 24"><path d="M12 3.5 14.6 8.8 20.5 9.7 16.2 13.8 17.2 19.6 12 16.9 6.8 19.6 7.8 13.8 3.5 9.7 9.4 8.8z"/></symbol>' +
  // — serce / rodzina —
  '<symbol id="ic-heart" viewBox="0 0 24 24"><path d="M12 20C6 16 3 12.5 3 8.8A4.8 4.8 0 0 1 12 6.5 4.8 4.8 0 0 1 21 8.8C21 12.5 18 16 12 20z"/></symbol>' +
  // — zegar / czas —
  '<symbol id="ic-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>' +
  // — zapisz / pobierz —
  '<symbol id="ic-download" viewBox="0 0 24 24"><path d="M12 4v11"/><path d="M7.5 11 12 15.5 16.5 11"/><path d="M5 19h14"/></symbol>' +
  // — udostępnij —
  '<symbol id="ic-share" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2.4"/><circle cx="17" cy="6" r="2.4"/><circle cx="17" cy="18" r="2.4"/><path d="M8.2 10.9 14.8 7.1M8.2 13.1 14.8 16.9"/></symbol>' +
  // — liść / niski poziom energii —
  '<symbol id="ic-leaf" viewBox="0 0 24 24"><path d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14z"/><path d="M5 19c4-4 8-7 12-9"/></symbol>' +
  // — góra / wysoki poziom aktywności —
  '<symbol id="ic-mountain" viewBox="0 0 24 24"><path d="M3 19 9.5 8l4.5 7 2-3 5 7z"/></symbol>' +
  // — strzałka w prawo (CTA) —
  '<symbol id="ic-arrow" viewBox="0 0 24 24"><path d="M4 12h15"/><path d="M13 6l6 6-6 6"/></symbol>' +

  '</svg>';

  function inject() {
    if (document.getElementById('zw-icons')) return;
    var wrap = document.createElement('div');
    wrap.id = 'zw-icons';
    wrap.style.display = 'none';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = sprite;
    document.body.insertBefore(wrap, document.body.firstChild);
  }

  if (document.body) inject();
  else document.addEventListener('DOMContentLoaded', inject);
})();
