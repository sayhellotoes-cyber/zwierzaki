/* Psijaciel — Konfigurator ras (prototyp)
   Model dopasowania: każda rasa ma wartości 0–5 na osiach; odpowiedzi ustawiają
   preferencje użytkownika; wynik = ważona bliskość odpowiedzi do profilu rasy. */

const BREEDS = [
  { id:'border',   name:'Border collie',                 img:'img/dog-hero-border-collie.jpg',
    a:{energy:5,apartment:1,alone:1,beginner:1,lowShed:2,quiet:2,lowCost:3,lowGroom:2,kids:4,size:3,guard:2,sport:5} },
  { id:'lab',      name:'Labrador retriever',            img:'img/art-dzieci.jpg',
    a:{energy:4,apartment:2,alone:2,beginner:5,lowShed:1,quiet:3,lowCost:2,lowGroom:4,kids:5,size:4,guard:2,sport:4} },
  { id:'golden',   name:'Golden retriever',              img:'img/art-hodowca.jpg',
    a:{energy:3,apartment:2,alone:2,beginner:5,lowShed:1,quiet:3,lowCost:2,lowGroom:2,kids:5,size:4,guard:1,sport:3} },
  { id:'cavalier', name:'Cavalier King Charles spaniel', img:'img/art-mieszkanie.jpg',
    a:{energy:2,apartment:5,alone:2,beginner:5,lowShed:2,quiet:3,lowCost:3,lowGroom:2,kids:5,size:1,guard:0,sport:1} },
  { id:'frenchie', name:'Buldog francuski',              img:'img/art-nuda.jpg',
    a:{energy:1,apartment:5,alone:2,beginner:4,lowShed:3,quiet:4,lowCost:2,lowGroom:4,kids:4,size:1,guard:1,sport:0} },
  { id:'jack',     name:'Jack Russell terrier',          img:'img/dog-hero-border-collie.jpg',
    a:{energy:5,apartment:3,alone:1,beginner:2,lowShed:3,quiet:1,lowCost:4,lowGroom:4,kids:3,size:1,guard:2,sport:5} },
];

const Q = [
  { id:'home', title:'Gdzie mieszkasz?', cols:3, options:[
    { id:'flat',   icon:'ic-building', label:'Blok / mieszkanie', eff:[{k:'apartment',v:5,w:3}] },
    { id:'house',  icon:'ic-home',     label:'Dom bez ogrodu',    eff:[{k:'apartment',v:3,w:2}] },
    { id:'garden', icon:'ic-leaf',     label:'Dom z ogrodem',     eff:[{k:'apartment',v:1,w:1}] },
  ]},
  { id:'activity', title:'Ile ruchu tygodniowo możesz dać psu?', cols:2, options:[
    { id:'act_low', icon:'ic-leaf',     label:'Spokojnie',      sub:'Krótkie spacery',        eff:[{k:'energy',v:1,w:3}] },
    { id:'act_med', icon:'ic-clock',    label:'Umiarkowanie',   sub:'Codzienne spacery',      eff:[{k:'energy',v:3,w:3}] },
    { id:'act_hi',  icon:'ic-mountain', label:'Dużo ruchu',     sub:'Długie wyjścia, bieganie',eff:[{k:'energy',v:4,w:3}] },
    { id:'act_sport',icon:'ic-bolt',    label:'Sport z psem',   sub:'Aktywność na wysokim poziomie', eff:[{k:'energy',v:5,w:3},{k:'sport',v:5,w:2}] },
  ]},
  { id:'alone', title:'Ile godzin dziennie pies będzie sam w domu?', cols:2, options:[
    { id:'alone_0', icon:'ic-heart',    label:'Prawie wcale', eff:[{k:'alone',v:2,w:1}] },
    { id:'alone_4', icon:'ic-clock',    label:'Do ok. 4h',    eff:[{k:'alone',v:3,w:2}] },
    { id:'alone_6', icon:'ic-building', label:'4–8h',         eff:[{k:'alone',v:4,w:2}] },
    { id:'alone_8', icon:'ic-bed',      label:'Ponad 8h',     eff:[{k:'alone',v:5,w:3}] },
  ]},
  { id:'exp', title:'Twoje doświadczenie z psami?', cols:3, options:[
    { id:'exp_first', icon:'ic-star',   label:'To mój pierwszy pies', eff:[{k:'beginner',v:5,w:3}] },
    { id:'exp_some',  icon:'ic-paw',    label:'Miałem/am już psy',    eff:[{k:'beginner',v:3,w:2}] },
    { id:'exp_pro',   icon:'ic-shield', label:'Doświadczony/a',       eff:[{k:'beginner',v:1,w:1}] },
  ]},
  { id:'household', title:'Kto jest w domu?', cols:2, options:[
    { id:'hh_small', icon:'ic-heart', label:'Małe dzieci',     eff:[{k:'kids',v:5,w:3}] },
    { id:'hh_big',   icon:'ic-heart', label:'Starsze dzieci',  eff:[{k:'kids',v:4,w:2}] },
    { id:'hh_pets',  icon:'ic-paw',   label:'Inne zwierzęta',  eff:[{k:'kids',v:4,w:2}] },
    { id:'hh_adult', icon:'ic-user',  label:'Tylko dorośli',   eff:[{k:'kids',v:2,w:1}] },
  ]},
  { id:'allergy', title:'Alergie i tolerancja linienia?', cols:3, options:[
    { id:'al_yes',  icon:'ic-vet',   label:'Alergia w domu',    eff:[{k:'lowShed',v:5,w:3}] },
    { id:'al_low',  icon:'ic-leaf',  label:'Wolę mało sierści', eff:[{k:'lowShed',v:4,w:2}] },
    { id:'al_no',   icon:'ic-check', label:'Nie przeszkadza',   eff:[{k:'lowShed',v:2,w:1}] },
  ]},
  { id:'budget', title:'Miesięczny budżet na psa?', cols:3, options:[
    { id:'bu_low', icon:'ic-chart', label:'Do 200 zł',     eff:[{k:'lowCost',v:5,w:2}] },
    { id:'bu_med', icon:'ic-chart', label:'200–500 zł',    eff:[{k:'lowCost',v:3,w:1}] },
    { id:'bu_hi',  icon:'ic-chart', label:'Powyżej 500 zł',eff:[{k:'lowCost',v:1,w:1}] },
  ]},
  { id:'barking', title:'Tolerancja szczekania?', cols:3, options:[
    { id:'ba_quiet', icon:'ic-lock',  label:'Cisza jest ważna', eff:[{k:'quiet',v:5,w:2}] },
    { id:'ba_some',  icon:'ic-clock', label:'Trochę OK',        eff:[{k:'quiet',v:3,w:1}] },
    { id:'ba_any',   icon:'ic-check', label:'Bez znaczenia',    eff:[{k:'quiet',v:2,w:1}] },
  ]},
  { id:'grooming', title:'Ile czasu na pielęgnację (czesanie, groomer)?', cols:3, options:[
    { id:'gr_min', icon:'ic-leaf',  label:'Minimalnie',    eff:[{k:'lowGroom',v:5,w:2}] },
    { id:'gr_med', icon:'ic-clock', label:'Umiarkowanie',  eff:[{k:'lowGroom',v:3,w:1}] },
    { id:'gr_hi',  icon:'ic-heart', label:'Chętnie zadbam',eff:[{k:'lowGroom',v:1,w:1}] },
  ]},
  { id:'size', title:'Preferowana wielkość psa?', cols:2, options:[
    { id:'sz_s',   icon:'ic-paw',   label:'Mały',         eff:[{k:'size',v:1,w:2}] },
    { id:'sz_m',   icon:'ic-paw',   label:'Średni',       eff:[{k:'size',v:3,w:2}] },
    { id:'sz_l',   icon:'ic-paw',   label:'Duży',         eff:[{k:'size',v:5,w:2}] },
    { id:'sz_any', icon:'ic-check', label:'Bez znaczenia',eff:[] },
  ]},
  { id:'goal', title:'Czego głównie oczekujesz od psa?', cols:3, options:[
    { id:'goal_family', icon:'ic-heart',  label:'Towarzysz rodzinny', eff:[{k:'kids',v:5,w:2},{k:'guard',v:0,w:1}] },
    { id:'goal_sport',  icon:'ic-bolt',   label:'Aktywny partner',    eff:[{k:'sport',v:5,w:2},{k:'energy',v:4,w:1}] },
    { id:'goal_guard',  icon:'ic-shield', label:'Pies stróżujący',    eff:[{k:'guard',v:4,w:2}] },
  ]},
];

const REASON = {
  energy:'Poziom energii pasuje do Twojego trybu życia',
  apartment:'Dobrze odnajdzie się w Twoim typie mieszkania',
  alone:'Znosi samotność w zakresie, który podałeś/aś',
  beginner:'Łatwość prowadzenia pasuje do Twojego doświadczenia',
  lowShed:'Poziom linienia jest dla Ciebie akceptowalny',
  quiet:'Poziom szczekania mieści się w Twojej tolerancji',
  lowCost:'Koszt utrzymania mieści się w Twoim budżecie',
  lowGroom:'Nakład na pielęgnację Ci odpowiada',
  kids:'Dobrze dogaduje się z domownikami',
  size:'Wielkość zgodna z Twoją preferencją',
  guard:'Sprawdzi się w roli, której szukasz',
  sport:'Ma potencjał do aktywności, których szukasz',
};
const WARN = {
  energy:'Zwróć uwagę: ta rasa potrzebuje więcej ruchu, niż deklarujesz',
  apartment:'Zwróć uwagę: w Twoim metrażu może potrzebować więcej przestrzeni',
  alone:'Zwróć uwagę: gorzej znosi długą samotność',
  beginner:'Zwróć uwagę: wymaga konsekwencji — bywa trudna dla początkujących',
  lowShed:'Zwróć uwagę: linienie może być wyższe, niż byś chciał/a',
  quiet:'Zwróć uwagę: potrafi być głośna',
  lowCost:'Zwróć uwagę: utrzymanie może przekroczyć budżet',
  lowGroom:'Zwróć uwagę: pielęgnacja bywa czasochłonna',
  kids:'Zwróć uwagę: relacja z małymi dziećmi wymaga uwagi',
  size:'Zwróć uwagę: rozmiar odbiega od Twojej preferencji',
  guard:'Zwróć uwagę: to nie jest typ psa stróżującego',
  sport:'Zwróć uwagę: to nie pies do intensywnego sportu',
};

const state = { i:0, answers:{}, force:false };
const el = () => document.getElementById('quiz');
const qById = id => Q.find(q => q.id === id);

function score(breed){
  let tot=0, max=0; const per={};
  for(const qid in state.answers){
    for(const e of state.answers[qid].eff){
      const bv=breed.a[e.k];
      const w=e.w||1, close=1-Math.abs(e.v-bv)/5;
      const gap = e.k==='energy' ? Math.max(0, bv-e.v)   // rasa bardziej energiczna, niż deklarujesz
                : e.k==='size'   ? Math.abs(bv-e.v)        // rozmiar odbiega w którąkolwiek stronę
                : Math.max(0, e.v-bv);                     // rasa nie spełnia oczekiwanej cechy
      tot+=close*w; max+=w;
      if(!per[e.k]) per[e.k]={s:0,w:0,g:0};
      per[e.k].s+=close*w; per[e.k].w+=w; per[e.k].g+=gap*w;
    }
  }
  return { pct: Math.round(60 + (max? tot/max:0)*39), per };
}
function reasonsFor(per){
  const axes=Object.keys(per);
  const avg=k=>per[k].s/per[k].w;
  const good=axes.slice().sort((a,b)=> avg(b)-avg(a) || per[b].w-per[a].w).slice(0,3);
  const gapped=axes.filter(k=>per[k].g>0).sort((a,b)=> per[b].g-per[a].g);
  return { good, warn: gapped[0] || null };
}

/* ---- flow ---- */
function pick(qid, optid){
  const q=qById(qid), o=q.options.find(x=>x.id===optid);
  state.answers[qid]={ id:optid, eff:o.eff };
  const idx=Q.indexOf(q);
  if(idx>=Q.length-1) finish();
  else { state.i=idx+1; renderQuestion(); }
}
function back(){ if(state.i>0){ state.i--; renderQuestion(); } else renderIntro(); }
function start(){ state.i=0; renderQuestion(); }
function finish(){ if(isRisk() && !state.force) renderSafeguard(); else renderGate(); }
function forceResults(){ state.force=true; renderGate(); }
function restart(){ state.i=0; state.answers={}; state.force=false; renderIntro(); }

function isRisk(){
  const a=state.answers;
  return a.alone && a.alone.id==='alone_8'
      && a.exp && a.exp.id==='exp_first'
      && ((a.activity && a.activity.id==='act_sport') || (a.goal && a.goal.id==='goal_sport'));
}

/* ---- render ---- */
function renderIntro(){
  el().innerHTML = `
  <div class="quiz-intro">
    <span class="eyebrow">Konfigurator ras</span>
    <h1>Jaki pies pasuje do Twojego życia?</h1>
    <p class="lead">Odpowiedz na ${Q.length} krótkich pytań o swojej codzienności, a pokażemy Ci rasy najlepiej dopasowane do Ciebie — z konkretnym uzasadnieniem.</p>
    <div class="intro-points">
      <div><svg class="ic"><use href="#ic-target"/></svg> Top 3 rasy z procentem dopasowania</div>
      <div><svg class="ic"><use href="#ic-compass"/></svg> 3 powody „pasuje, bo…” i 1 ostrzeżenie</div>
      <div><svg class="ic"><use href="#ic-bone"/></svg> Ścieżka dalej: opis rasy, hodowcy, koszty</div>
    </div>
    <button class="btn btn-primary btn-lg" onclick="start()">Zaczynam <svg class="ic"><use href="#ic-arrow"/></svg></button>
    <div class="intro-meta"><span><svg class="ic"><use href="#ic-clock"/></svg> ok. 3 minuty</span><span><svg class="ic"><use href="#ic-check"/></svg> bez rejestracji</span></div>
  </div>`;
}

function optTile(q, o){
  const sel = state.answers[q.id] && state.answers[q.id].id===o.id ? ' selected' : '';
  return `<button class="opt${sel}" onclick="pick('${q.id}','${o.id}')">
    <span class="oi"><svg class="ic ic-lg"><use href="#${o.icon}"/></svg></span>
    <b>${o.label}</b>${o.sub?`<span class="os">${o.sub}</span>`:''}
  </button>`;
}
function renderQuestion(){
  const q=Q[state.i], pct=Math.round(state.i/Q.length*100);
  el().innerHTML = `
  <div class="q-screen">
    <div class="progress"><div class="progress-bar" style="width:${pct}%"></div></div>
    <div class="q-meta">
      <button class="q-back" onclick="back()"${state.i===0?' style="visibility:hidden"':''}><svg class="ic"><use href="#ic-arrow"/></svg> Wstecz</button>
      <span class="q-count">Pytanie ${state.i+1} z ${Q.length}</span>
    </div>
    <h2 class="q-title">${q.title}</h2>
    ${q.sub?`<p class="q-sub">${q.sub}</p>`:''}
    <div class="options ${q.cols===3?'c3':''}">${q.options.map(o=>optTile(q,o)).join('')}</div>
  </div>`;
  window.scrollTo({top:0,behavior:'smooth'});
}

function breedCard(r, rank){
  const {good, warn} = reasonsFor(r.per);
  const reasons = good.map(k=>`<li><svg class="ic"><use href="#ic-check"/></svg> ${REASON[k]}</li>`).join('');
  const warnText = warn ? WARN[warn] : 'Zwróć uwagę: temperament bywa indywidualny — poznaj psa u hodowcy przed decyzją.';
  return `
  <div class="breed-result${rank===0?' top':''}">
    <div class="breed-photo"><img src="${r.b.img}" alt="${r.b.name}"></div>
    <div class="breed-body">
      <div class="breed-rank">${rank===0?'Najlepsze dopasowanie':'Dopasowanie #'+(rank+1)}</div>
      <div class="breed-top"><h3>${r.b.name}</h3><div class="match">${r.pct}%<small> dopasowania</small></div></div>
      <ul class="reasons">${reasons}</ul>
      <div class="warn"><svg class="ic"><use href="#ic-bulb"/></svg> ${warnText}</div>
      <div class="breed-ctas">
        <a class="btn btn-primary btn-sm" href="artykul.html">Przeczytaj pełny opis</a>
        <a class="btn btn-soft btn-sm" href="hodowcy.html">Zobacz hodowców</a>
        <a class="btn btn-outline btn-sm" href="#">Sprawdź koszty</a>
      </div>
    </div>
  </div>`;
}
function renderGate(){
  el().innerHTML = `
  <div class="auth" style="min-height:auto;padding:16px 0">
    <div class="auth-card">
      <div class="auth-mark"><svg viewBox="0 0 24 24"><use href="#ic-paw"/></svg></div>
      <span class="eyebrow" style="color:var(--pine-deep)">Twoje dopasowanie jest gotowe</span>
      <h1 style="margin-top:8px">Załóż konto, aby poznać wyniki</h1>
      <p class="sub">Bez hasła — zaloguj się linkiem e-mail lub kontem Google. Zapiszemy Twój wynik i dobierzemy treści pod Twoją rasę.</p>
      <form class="auth-form" onsubmit="return false">
        <button class="google-btn" type="button" onclick="renderResult()">
          <svg class="gicon" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.28-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Kontynuuj z Google
        </button>
        <div class="auth-divider">lub e-mailem</div>
        <div class="form-row"><label>Adres e-mail</label><input class="input" type="email" placeholder="ty@przyklad.pl" autocomplete="email"></div>
        <button class="btn btn-primary btn-block btn-lg" type="button" onclick="renderResult()">Pokaż moje wyniki</button>
      </form>
      <div class="auth-note"><svg class="ic"><use href="#ic-lock"/></svg> Bez hasła i bez spamu. Konto pozwala wrócić do wyniku i zapisać ulubione rasy, miejsca i noclegi.</div>
    </div>
  </div>`;
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderResult(){
  const ranked = BREEDS.map(b=>({ b, ...score(b) })).sort((x,y)=>y.pct-x.pct).slice(0,3);
  el().innerHTML = `
  <div class="result-head">
    <span class="eyebrow">Twój wynik</span>
    <h1>Twoje najlepiej dopasowane rasy</h1>
    <p class="sub">Na podstawie Twoich odpowiedzi. To punkt wyjścia — każdą rasę warto poznać bliżej.</p>
  </div>
  ${ranked.map((r,i)=>breedCard(r,i)).join('')}
  <div class="gate">
    <span class="eyebrow">Zapisz swój wynik</span>
    <h3>Wyślemy Ci pełny raport PDF</h3>
    <p>Wynik widzisz już teraz. Zostaw e-mail, a dostaniesz raport z pełnym uzasadnieniem dopasowania i listą zweryfikowanych hodowców.</p>
    <form class="nl-form" onsubmit="return false">
      <input class="input" type="email" placeholder="Twój adres e-mail" aria-label="Adres e-mail">
      <button class="btn btn-primary" type="submit"><svg class="ic"><use href="#ic-download"/></svg> Wyślij raport</button>
    </form>
  </div>
  <div style="text-align:center;margin-top:22px">
    <button class="q-back" onclick="restart()" style="margin:0 auto"><svg class="ic"><use href="#ic-refresh"/></svg> Rozpocznij od nowa</button>
  </div>`;
  window.scrollTo({top:0,behavior:'smooth'});
}
function renderSafeguard(){
  el().innerHTML = `
  <div class="safeguard">
    <div class="warnmark"><svg class="ic ic-lg"><use href="#ic-shield"/></svg></div>
    <h1>Zatrzymajmy się na chwilę</h1>
    <p>Z Twoich odpowiedzi wynika, że pies bywałby sam ponad 8 godzin, byłby to Twój pierwszy pies, a interesuje Cię rasa o dużych potrzebach ruchu i pracy.</p>
    <p>To połączenie najczęściej kończy się frustracją — psa i człowieka — a w skrajnych przypadkach oddaniem zwierzęcia. Nie chcemy tego ani dla Ciebie, ani dla niego.</p>
    <p>Proponujemy inną kolejność: zacznij od przygotowania, a wybór rasy będzie dużo pewniejszy.</p>
    <div class="sg-actions">
      <a class="btn btn-primary" href="kursy.html"><svg class="ic"><use href="#ic-cap"/></svg> Kurs „Zanim kupisz psa”</a>
      <button class="btn btn-outline" onclick="forceResults()">Rozumiem — pokaż mimo to rasy</button>
    </div>
  </div>`;
  window.scrollTo({top:0,behavior:'smooth'});
}

renderIntro();
