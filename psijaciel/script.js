// Zwierzaki — wspólne zachowania interaktywne (współdzielone przez wszystkie podstrony)

// Ankieta: zaznaczanie wybranej odpowiedzi (ankieta.html)
function selectOpt(el){
  el.parentElement.querySelectorAll('.option').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}

// Raport: odblokowanie widoku po „wysłaniu" formularza kontaktowego (raport.html)
// W produkcji ten stan wynika z faktycznego zapisania danych kontaktowych w bazie —
// tutaj to wizualna symulacja przejścia dla celów prezentacji.
function unlockReport(){
  const el = document.getElementById('raport');
  if (el) el.classList.remove('locked');
}

// Nawigacja mobilna: przełączanie rozwijanego menu (hamburger)
function toggleNav(btn){
  const nav = btn.closest('nav');
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

/* ======================================================================
   Globalna wyszukiwarka w headerze (panel rozwijany + dynamiczne wyniki)
   ====================================================================== */
var SEARCH_INDEX = [
  { label:'Konfigurator ras', cat:'Moduł', url:'konfigurator.html', icon:'ic-target', popular:true },
  { label:'Miejsca przyjazne psom', cat:'Moduł', url:'miejsca.html', icon:'ic-pin', popular:true },
  { label:'Noclegi z psem', cat:'Moduł', url:'noclegi.html', icon:'ic-bed', popular:true },
  { label:'Kursy online', cat:'Moduł', url:'kursy.html', icon:'ic-cap', popular:true },
  { label:'Hodowcy', cat:'Moduł', url:'hodowcy.html', icon:'ic-bone' },
  { label:'Behawioryści i trenerzy', cat:'Moduł', url:'behawiorysci.html', icon:'ic-bulb' },
  { label:'Baza wiedzy', cat:'Moduł', url:'artykuly.html', icon:'ic-compass' },
  { label:'Border collie', cat:'Rasa', url:'artykul.html', icon:'ic-paw' },
  { label:'Labrador retriever', cat:'Rasa', url:'artykul.html', icon:'ic-paw' },
  { label:'Golden retriever', cat:'Rasa', url:'artykul.html', icon:'ic-paw' },
  { label:'Cavalier King Charles spaniel', cat:'Rasa', url:'artykul.html', icon:'ic-paw' },
  { label:'Jak wybrać rasę do mieszkania bez ogrodu', cat:'Artykuł', url:'artykul.html', icon:'ic-compass' },
  { label:'5 sygnałów, że pies się nudzi', cat:'Artykuł', url:'artykul.html', icon:'ic-compass' },
  { label:'Jak rozpoznać dobrego hodowcę', cat:'Artykuł', url:'artykul.html', icon:'ic-compass' },
  { label:'Wybieg Pole Mokotowskie', cat:'Miejsce', url:'miejsca.html', icon:'ic-pin' },
  { label:'Kawiarnia Psia Kość', cat:'Miejsce', url:'miejsca.html', icon:'ic-pin' },
  { label:'Pierwsze 30 dni ze szczeniakiem', cat:'Kurs', url:'kurs.html', icon:'ic-cap' },
  { label:'Zanim kupisz psa', cat:'Kurs', url:'kurs.html', icon:'ic-cap' },
  { label:'Warszawa', cat:'Miasto', url:'miejsca.html', icon:'ic-pin' },
  { label:'Kraków', cat:'Miasto', url:'hodowcy.html', icon:'ic-pin' }
];

function navEl(){ return document.querySelector('nav.site'); }

function openSearch(){
  var nav = navEl(); if(!nav) return;
  nav.classList.remove('open');
  nav.classList.add('search-open');
  drawSearch('');
  var dd = nav.querySelector('.ns-dd'); if(dd) dd.hidden = false;
  var input = nav.querySelector('.ns-input');
  if(input){ input.value=''; input.focus(); }
}
function closeSearch(){
  var nav = navEl(); if(!nav) return;
  nav.classList.remove('search-open');
  var dd = nav.querySelector('.ns-dd'); if(dd) dd.hidden = true;
}
function drawSearch(q){
  var dd = document.querySelector('.ns-dd'); if(!dd) return;
  var query = (q||'').trim().toLowerCase();
  var items = query
    ? SEARCH_INDEX.filter(function(x){ return x.label.toLowerCase().indexOf(query)>-1 || x.cat.toLowerCase().indexOf(query)>-1; })
    : SEARCH_INDEX.filter(function(x){ return x.popular; });
  var head = '<div class="ns-h">' + (query ? 'Wyniki' : 'Popularne') + '</div>';
  var body = items.length
    ? items.map(function(x){
        return '<a class="ns-result" href="'+x.url+'"><span class="ns-ic"><svg class="ic"><use href="#'+x.icon+'"/></svg></span><span class="ns-txt"><b>'+x.label+'</b><span>'+x.cat+'</span></span></a>';
      }).join('')
    : '<div class="ns-empty">Brak wyników dla „'+q+'". Spróbuj innej frazy.</div>';
  dd.innerHTML = '<div class="ns-inner">' + head + body + '</div>';
}

(function initSearch(){
  var nav = navEl(); if(!nav) return;
  var input = nav.querySelector('.ns-input');
  if(input){
    input.addEventListener('input', function(){ drawSearch(input.value); var dd=nav.querySelector('.ns-dd'); if(dd) dd.hidden=false; });
  }
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeSearch(); });
  document.addEventListener('click', function(e){
    if(nav.classList.contains('search-open') && !nav.contains(e.target)) closeSearch();
  });
})();
