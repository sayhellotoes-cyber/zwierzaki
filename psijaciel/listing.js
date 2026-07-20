/* Psijaciel — silnik Listing (współdzielony: miejsca, noclegi, hodowcy, specjaliści)
   Split lista + mapa (Leaflet + OpenStreetMap), synchronizacja karta<->pin, filtry.
   Użycie: initListing({ center, zoom, cats, catIcon, items, renderCard? }) */

function initListing(cfg){
  const listEl = document.getElementById('list');
  const countEl = document.getElementById('count');
  const state = { cat:'all' };
  const markers = {};
  let activeId = null;

  const catLabel = c => (cfg.cats && cfg.cats[c]) || c;
  const catIcon  = c => (cfg.catIcon && cfg.catIcon[c]) || 'ic-pin';

  // ---- mapa ----
  const map = L.map('map', { scrollWheelZoom:true, zoomControl:true }).setView(cfg.center, cfg.zoom || 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:19, attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  function pinIcon(i, active){
    return L.divIcon({
      className:'pin'+(active?' active':''),
      html:`<i><svg class="ic" viewBox="0 0 24 24"><use href="#${catIcon(i.cat)}"/></svg></i>`,
      iconSize:[28,28], iconAnchor:[14,28], popupAnchor:[0,-26]
    });
  }

  function defaultCard(i){
    return `<div class="place" data-id="${i.id}">
      <div class="place-thumb"><svg class="ic ic-lg"><use href="#${catIcon(i.cat)}"/></svg></div>
      <div class="place-body">
        <div class="place-head">
          <div><div class="cat">${catLabel(i.cat)}</div><h3>${i.name}</h3></div>
          ${i.verified ? '<span class="verified"><svg class="ic"><use href="#ic-verified"/></svg> Zweryfikowane</span>' : ''}
        </div>
        <div class="meta">
          <span class="rating"><svg class="ic solid"><use href="#ic-star"/></svg> ${i.rating}</span>
          <span><svg class="ic"><use href="#ic-pin"/></svg> ${i.district}</span>
          <span><svg class="ic"><use href="#ic-clock"/></svg> ${i.hours}</span>
          ${i.h24 ? '<span class="badge24">24h</span>' : ''}
        </div>
        ${i.note ? `<div class="note">${i.note}</div>` : ''}
      </div>
    </div>`;
  }
  const card = cfg.renderCard || defaultCard;

  function filtered(){ return cfg.items.filter(i => state.cat==='all' || (cfg.match ? cfg.match(i, state.cat) : i.cat===state.cat)); }

  function select(id, fromMap){
    activeId = id;
    listEl.querySelectorAll('.place').forEach(el => el.classList.toggle('active', el.dataset.id == id));
    for(const k in markers){ markers[k].setIcon(pinIcon(cfg.items.find(x=>x.id==k), k==id)); }
    const i = cfg.items.find(x => x.id == id);
    if(!i) return;
    map.setView([i.lat, i.lng], Math.max(map.getZoom(), 14), { animate:true });
    markers[id] && markers[id].openPopup();
    if(!fromMap){
      const c = listEl.querySelector('.place[data-id="'+id+'"]');
      c && c.scrollIntoView({ behavior:'smooth', block:'nearest' });
    }
  }

  function render(){
    const items = filtered();
    listEl.innerHTML = items.map(card).join('') || '<p class="empty">Brak wyników w tej kategorii.</p>';
    listEl.querySelectorAll('.place').forEach(el => el.addEventListener('click', () => select(el.dataset.id, false)));

    for(const k in markers){ map.removeLayer(markers[k]); delete markers[k]; }
    const pts = [];
    items.forEach(i => {
      const m = L.marker([i.lat, i.lng], { icon:pinIcon(i, false) }).addTo(map);
      m.bindPopup(`<b>${i.name}</b><br>${catLabel(i.cat)}${i.rating ? ' · ⭐ '+i.rating : ''}`);
      m.on('click', () => select(i.id, true));
      markers[i.id] = m;
      pts.push([i.lat, i.lng]);
    });
    if(pts.length) map.fitBounds(pts, { padding:[40,40], maxZoom:14 });
    if(countEl) countEl.textContent = items.length + ' ' + (cfg.plural || plural)(items.length);
  }

  function plural(n){ if(n===1) return 'miejsce'; const d=n%10, s=n%100; return (d>=2&&d<=4&&!(s>=12&&s<=14)) ? 'miejsca' : 'miejsc'; }

  // ---- filtry ----
  document.querySelectorAll('.listing-filters .filter-pill').forEach(p => {
    p.addEventListener('click', () => {
      document.querySelectorAll('.listing-filters .filter-pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      state.cat = p.dataset.cat || 'all';
      render();
    });
  });

  // ---- przełącznik lista/mapa (mobile) ----
  document.querySelectorAll('.map-toggle button').forEach(b => {
    b.addEventListener('click', () => {
      const v = b.dataset.v, box = document.querySelector('.listing');
      box.classList.toggle('show-map', v==='map');
      box.classList.toggle('show-list', v==='list');
      document.querySelectorAll('.map-toggle button').forEach(x => x.classList.toggle('active', x===b));
      if(v==='map') setTimeout(() => map.invalidateSize(), 150);
    });
  });

  // ---- „w pobliżu" ----
  const near = document.getElementById('near');
  if(near) near.addEventListener('click', () => {
    if(!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => { map.setView([pos.coords.latitude, pos.coords.longitude], 14); L.circleMarker([pos.coords.latitude,pos.coords.longitude],{radius:8,color:'#2E645A',fillColor:'#2E645A',fillOpacity:.6}).addTo(map); },
      () => alert('Nie udało się pobrać lokalizacji.')
    );
  });

  render();
}

/* Wyszukiwarka miejscowości (combobox z filtrowaną listą) — na stronach listingów */
function initPlaceSearch(){
  const POPULAR = ['Warszawa','Kraków','Wrocław','Poznań','Gdańsk','Łódź','Katowice','Lublin','Szczecin','Bydgoszcz','Zakopane','Białystok'];
  document.querySelectorAll('.place-search').forEach(box => {
    const input = box.querySelector('.ps-input'), dd = box.querySelector('.ps-dd');
    if(!input || !dd) return;
    function draw(q){
      const query = (q || '').trim().toLowerCase();
      const list = POPULAR.filter(c => c.toLowerCase().includes(query));
      dd.innerHTML = '<div class="ps-h">Popularne miasta</div>' + (list.length
        ? list.map(c => `<div class="ps-item" data-v="${c}"><svg class="ic"><use href="#ic-pin"/></svg> ${c}</div>`).join('')
        : '<div class="ps-item empty">Brak podpowiedzi — wpisz nazwę i szukaj</div>');
      dd.querySelectorAll('.ps-item[data-v]').forEach(it => it.addEventListener('mousedown', e => {
        e.preventDefault(); input.value = it.dataset.v; dd.hidden = true; input.blur();
      }));
    }
    input.addEventListener('focus', () => { draw(''); dd.hidden = false; input.select(); });
    input.addEventListener('input', () => { draw(input.value); dd.hidden = false; });
    document.addEventListener('click', e => { if(!box.contains(e.target)) dd.hidden = true; });
  });
}
initPlaceSearch();
