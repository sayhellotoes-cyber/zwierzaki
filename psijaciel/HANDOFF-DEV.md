# Psijaciel — dokumentacja dla zespołu front-end (handoff)

Ten katalog to **klikalny prototyp + specyfikacja + źródło prawdy dla designu** portalu Psijaciel. Zbudowany jako statyczny HTML/CSS/JS (bez build-systemu), otwierany lokalnie w przeglądarce.

> **Czym to JEST:** referencja wizualna, tokeny, komponenty, treść (polskie copy), struktura, SEO i dostępność — do przeniesienia do docelowego stacku.
> **Czym NIE jest:** produkcyjna baza kodu. UI odtwarzacie jako komponenty; z prototypu bierzecie **tokeny, design, copy, SEO, a11y i ikony**, a nie literalny DOM.

---

## 1. Rekomendowany stack

| Warstwa | Rekomendacja | Dlaczego |
|---|---|---|
| Framework | **Next.js (App Router)** | Cały lejek (konfigurator → raport → katalogi → baza wiedzy) jest **publiczny i SEO-zależny**. Potrzebny SSR/SSG dla ras, artykułów, miejsc, noclegów. Prototyp ma już `canonical`/OG/JSON-LD — Next to zachowa; SPA by to wyrzuciło. |
| Style | **Tailwind v4**, konsumujący nasze zmienne CSS przez `@theme` | Tokeny (`--clay`, `--sp-*`, `--r-lg`) stają się `bg-clay`, `rounded-lg`. Zero konfliktu z DS. *Alternatywa dla małego zespołu:* CSS Modules na naszych zmiennych. |
| Prymitywy UI | **shadcn/ui** (selektywnie) | Kopiowane do repo, nieostylowane, dostępne (Radix pod spodem: dropdowny, modale, focus-trap). Ubieracie w NASZE tokeny. Do „appowych" części: menu konta, modale, kalendarz, combobox. **Nie** bierzcie ciężkich kitów (MUI/AntD) — mają własny charakter i będą walczyć z brandem. |
| Mapy | **Leaflet + OpenStreetMap** (jest w prototypie) lub MapLibre/Mapbox | W prototypie OSM to placeholder. Produkcyjnie rozważcie tile provider z SLA. |
| Ikony | nasz set (patrz §4) przez **SVGR** | `import { Paw } from "@/icons"` |

Największa decyzja: **Next.js vs SPA** — wybierzcie Next ze względu na SEO.

---

## 2. Design tokeny (źródło prawdy: `styles.css` → `:root`)

Wszystkie kolory/promienie/cienie/fonty żyją jako CSS custom properties. **To jest źródło prawdy.**

**Kolory**
```
--cream #FBF5EC   --cream-deep #F3EADB   --surface #FFFFFF
--ink #38291C     --ink-soft #77685A     --ink-faint #AC9C8B
--clay #CE6B47    --clay-deep #B4562F    --clay-tint #F6E5DB     (akcent: akcja/CTA)
--pine #2E645A    --pine-deep #234C44    --pine-tint #E4EDEA     (akcent: zaufanie/weryfikacja)
--sand #E2B482
--line rgba(56,41,28,.12)   --line-soft rgba(56,41,28,.07)
```
Reguła: maks. **dwa akcenty na widok** (glina = akcja, sosna = zaufanie).

**Promienie:** `--r-xl 32` · `--r-lg 24` · `--r-md 16` · `--r-sm 10` · `--r-pill 100`
**Cienie:** `--shadow-sm` · `--shadow` · `--shadow-lg` (w kolorze atramentu, nie czerni)
**Odstępy:** skala 4px (4/8/12/16/24/32/48/64/88) — w prototypie wartości px inline (do wyniesienia do skali w Tailwind)
**Kontener:** `--wrap 1160px`

**Konsumpcja w Tailwind v4:**
```css
@theme {
  --color-clay: #CE6B47;  --color-pine: #2E645A;  --color-ink: #38291C;
  --radius-lg: 24px;      /* … */
}
```
Docelowo warto zamknąć pętlę: **Tokens Studio → DTCG JSON → Style Dictionary** generujący i CSS, i konfig Tailwinda, i zmienne Figma. Dla ~40 tokenów na start wystarczy ręcznie.

Pełny, żywy przegląd tokenów i komponentów: **`design-system.html`**.

---

## 3. Typografia

- **Baloo 2** (`--font-display`) — nagłówki, etykiety, przyciski. Wagi 500/600/700/800.
- **Nunito** (`--font-body`) — tekst. Bazowa waga 500–600.
- Ładowane z Google Fonts (w Next: `next/font/google` z `display: swap`, self-host dla wydajności/RODO).

Skala: Display 56 · H2 40 · H3 25 · H4 17 · eyebrow 13 (CAPS, letter-spacing) · body 15–19.

---

## 4. Ikony

- Sprite: `icons.js` (SVG `<symbol>`, wstrzykiwany do `<body>`), używany przez `<svg class="ic"><use href="#ic-pin"/></svg>`.
- Standalone SVG: katalog **`icons/`** (29 plików) + `icons/README.md`.
- Wszystkie na **`currentColor`** — kolor dziedziczy z `color` rodzica. Łapka (`ic-paw`) wypełniona (klasa `solid`), reszta konturowa (stroke 2, round).
- React: **SVGR** — `import Paw from "@/icons/paw.svg?react"`; propsy (`className`, `width`, `color`) działają.
- Rozmiar skaluje się z `font-size` (`.ic` = 1.15em).

---

## 5. Logo i marka

- Wordmark **Psijaciel** = żywy tekst w Baloo 2 (klasa `.wm`): „**Psi**"(glina) + „**jaciel**"(atrament), dwie lustrzane 3-palczaste łapki nad „i"/„j" (litery bezkropkowe `ı`/`ȷ`, łapka jako `<use href="#paw">`).
- Snippet HTML+CSS: `psijaciel-brand/README.md`. Pełna specyfikacja (warianty, pole ochronne, min-size): `psijaciel-brand/logo-final.html`.
- **Favicon / app-ikona:** `favicon.svg` (łapka na kaflu gliny) — ścieżkowy, skaluje się do 16 px.

---

## 6. Mapa komponentów (prototyp → produkcja)

Klasy CSS z prototypu → sugerowane komponenty React. Wszystkie widoczne żywo w `design-system.html`.

| Prototyp (klasa) | Komponent React | Uwagi |
|---|---|---|
| `.btn` + `.btn-primary/pine/soft/outline/ghost` + `.btn-sm/lg/block` | `<Button variant size>` | warianty jako propsy |
| `.wm` | `<Logo>` | wordmark + favicon |
| `.verified` / `.litter` / `.badge24` / `.method` / `.cert` / `.tag` / `.chip` | `<Badge variant>` | statusy/zaufanie |
| `.filter-pill` | `<FilterPill active>` | |
| `.input` / `textarea.input` / `select.input` / `.form-row` | `<Field>` / `<Input>` | |
| `.place-search` (combobox) | `<PlaceSearch>` | autocomplete miast — logika w `listing.js` `initPlaceSearch` |
| `.cal-dd` (kalendarz zakresu) | `<DateRangePicker>` | logika w `listing.js` `initDatePicker`; produkcyjnie shadcn/Radix |
| `.nav-search` + `.ns-result` | `<GlobalSearch>` | panel w headerze; indeks w `script.js` `SEARCH_INDEX` |
| `.article-card` | `<ArticleCard>` | |
| `.course-card` | `<CourseCard>` | |
| `.place` (+ `.breeder` / `.spec` / `.stay`) | `<ListingCard type>` | **jeden model „Listing"** — patrz §7 |
| `.trust`/`.kpi` · `.quickfacts` · `.cta-inline` · `.faq-item` · `.review` · `.byline` · `.info-list` · `.checklist` · `.gallery` | odpowiednie komponenty treści | |
| `.opt` · `.progress` · `.gate` · `.safeguard` | komponenty konfiguratora | |
| `.dogp` · `.seg` · `.auth-card` · `.mycourse` | komponenty konta | |
| `nav.site` · `footer.site` | `<Header>` / `<Footer>` | Header ma mega-menu (dropdown „Specjaliści") + globalny search + hamburger |

---

## 7. Architektura: wspólny model „Listing"

Kluczowa decyzja z dokumentacji funkcjonalnej: **miejsca, noclegi, hodowcy, behawioryści** stoją na jednym modelu. W prototypie realizuje to silnik **`listing.js`** (`initListing(config)`): split lista + mapa, piny, synchronizacja karta↔pin, filtry, przełącznik lista/mapa (mobile), `renderCard` na typ encji.

Produkcyjnie: jeden typ `Listing { id, type, name, lat, lng, city, verified, rating, ...typeSpecific }` + jeden `<ListingView>` z konfiguracją per moduł (filtry, `renderCard`). To samo dotyczy stron szczegółów (profil hodowcy / obiekt noclegu / profil specjalisty).

---

## 8. Strony i routing (SEO)

Każda strona ma komplet `<title>`/`description`/`canonical`/OG + JSON-LD. Zachowajcie to w Next (metadata API).

| Plik | Route | Schema.org | Render |
|---|---|---|---|
| `index.html` | `/` | WebSite + SearchAction | SSG |
| `konfigurator.html` | `/konfigurator` | — (app, interaktywny) | CSR/SSR |
| `artykuly.html` | `/artykuly` | CollectionPage/ItemList | SSG |
| `artykul.html` | `/artykuly/[slug]` | Article + FAQPage + BreadcrumbList | SSG |
| `miejsca.html` | `/miejsca/[miasto]` | (+ LocalBusiness na obiekt) | SSG + landingi miasto×kategoria |
| `noclegi.html` | `/noclegi` | LodgingBusiness | SSG/ISR |
| `hodowcy.html` / `hodowca.html` | `/hodowcy`, `/hodowcy/[slug]` | — / Breadcrumb | SSG/ISR |
| `behawiorysci.html` / `behawiorysta.html` | `/behawiorysci`, `/behawiorysci/[slug]` | — | SSG/ISR |
| `kursy.html` / `kurs.html` | `/kursy`, `/kursy/[slug]` | Course + Offer | SSG |
| `konto.html` / `panel.html` | `/konto`, `/panel` | noindex | CSR (za auth) |

Linkowanie wewnętrzne (flywheel): artykuł rasy → hodowcy tej rasy → konfigurator; konfigurator → opis rasy/hodowcy/kurs; obiekt noclegu → moduł Miejsca (okolica). Zachowajcie te CTA kontekstowe.

---

## 9. Dostępność (a11y)

W prototypie zaczęte, do dokończenia: semantyczny HTML, `aria-label` na przyciskach ikonowych, `aria-current` na aktywnej nawigacji, focus states, `prefers-reduced-motion` (aura hero). Dokończcie: focus-trap w modalach/menu (shadcn/Radix daje za darmo), obsługa klawiatury w combobox/kalendarzu/searchu, kontrast (glina na bieli OK dla dużego tekstu — sprawdźcie małe).

---

## 10. Integracje do wpięcia (poza prototypem)

- **Auth:** logowanie linkiem e-mail (magic link) + Google OAuth (np. Auth.js/NextAuth). Prototyp: `konto.html` → `panel.html`.
- **Płatności (kursy):** BLIK/karta/przelew — Stripe lub Przelewy24/tpay; faktury; dostęp bezterminowy.
- **Kursy — wideo:** hosting (Mux/Cloudflare Stream), paywall preview (1 lekcja free), postęp lekcji, certyfikat PDF.
- **Noclegi:** afiliacja Booking + kontakt bezpośredni (bez własnego silnika rezerwacji na start).
- **Leady:** formularze hodowca/behawiorysta idą przez portal (mierzalne).
- **Newsletter / lead magnet:** „Checklista przed kupnem szczeniaka" (PDF za e-mail).
- **Weryfikacja:** ankieta e-mail do obiektów/hodowców → odznaka „Zweryfikowany" (główny wyróżnik jakościowy — rozróżniajcie w UI Zweryfikowany vs Niezweryfikowany).

---

## 11. Co reużywacie, a co budujecie od nowa

**Reużywacie (wartość):** design tokeny, wygląd i hierarchia, polskie copy, SEO (meta/canonical/OG/JSON-LD), dostępność, ikony, model „Listing", logika konfiguratora (`konfigurator.js` — profile ras na 12 osiach + ważona bliskość).
**Budujecie od nowa:** DOM jako komponenty React, `onclick`→handlery/hooki, stan (routing, dane), integracje z §10. Inline `style=""` w prototypie to skróty — nie kopiujcie ich, przenoście do klas/utility.

---

## 12. Struktura prototypu

```
psijaciel/
  index.html, konfigurator.html, artykuly.html, artykul.html,
  miejsca.html, noclegi.html, hodowcy.html, hodowca.html,
  behawiorysci.html, behawiorysta.html, nocleg.html,
  kursy.html, kurs.html, konto.html, panel.html
  design-system.html         ← żywy katalog tokenów + komponentów
  styles.css                 ← design system (źródło prawdy tokenów)
  script.js                  ← nawigacja mobilna, globalny search
  listing.js                 ← silnik Listing (lista+mapa, combobox, kalendarz)
  konfigurator.js            ← quiz: dane ras + scoring
  icons.js                   ← sprite ikon
  icons/                     ← standalone SVG + README
  img/                       ← zdjęcia (placeholdery + hero-osoba-z-psem.jpg)
  favicon.svg
../psijaciel-brand/          ← logo (spec, favicon, README)
```

Zdjęcia w `img/` to placeholdery (część z Unsplash, wolna licencja — bez atrybucji, ale warto zachować listę źródeł). Hero: `hero-osoba-z-psem.jpg` (Unsplash).

---

*Pytania do designu/DS: zacznijcie od `design-system.html` i `styles.css`. Powodzenia! 🐾*
