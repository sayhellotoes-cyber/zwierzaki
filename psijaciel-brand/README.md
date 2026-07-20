# Psijaciel — logo i marka

Kierunek **C** (zatwierdzony). Pełna specyfikacja wizualna: otwórz **`logo-final.html`** w przeglądarce.

## Idea
**Psi** (glina) + **jaciel** (atrament) = *pies + przyjaciel*. Dwie lustrzane, 3-palczaste łapki zastępują kropki nad „i" (glina) i „j" (atrament). Sam znak (łapka) służy jako favicon / app-ikona.

## Pliki
| Plik | Do czego |
|---|---|
| `logo-final.html` | Specyfikacja: warianty, pole ochronne, min. rozmiar, czego nie robić |
| `favicon.svg` | Favicon / app-ikona (łapka na kaflu gliny) — ścieżkowy, skaluje się do 16 px |
| `paw-mark.svg` | Sam znak (łapka 3-palce), `currentColor` — do dowolnego użycia |
| `logo.html` | Wcześniejsze 3 kierunki (A/B/C) — archiwum eksploracji |

## Wordmark w kodzie
Wordmark to **żywy tekst w Baloo 2** (strona i tak ładuje ten font) — skalowalny, dostępny, SEO-friendly. Litery bezkropkowe: `ı` (U+0131) i `ȷ` (U+0237). Łapki to jeden symbol SVG użyty przez `<use>`.

```html
<!-- raz w dokumencie: symbol łapki -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="paw" viewBox="0 0 24 24">
    <circle cx="6.6" cy="9" r="2.5"/><circle cx="12" cy="6.7" r="2.7"/><circle cx="17.4" cy="9" r="2.5"/>
    <path d="M12 10.9c-3.7 0-6.6 2.6-6.6 5.7 0 2.7 3 4.4 6.6 4.4s6.6-1.7 6.6-4.4c0-3.1-2.9-5.7-6.6-5.7z"/>
  </symbol>
</svg>

<!-- logo -->
<a class="wm" href="/" aria-label="Psijaciel — strona główna">
  <span class="psi">Ps<span class="ti">ı<svg class="tp l"><use href="#paw"/></svg></span></span><span class="rest"><span class="ti">ȷ<svg class="tp r"><use href="#paw"/></svg></span>aciel</span>
</a>
```

```css
.wm{font-family:'Baloo 2',sans-serif;font-weight:800;letter-spacing:-.02em;line-height:1;
    display:inline-flex;align-items:baseline;white-space:nowrap;text-decoration:none}
.wm .psi{color:#CE6B47}          /* glina */
.wm .rest{color:#38291C}         /* atrament */
.ti{position:relative;display:inline-block}
.tp{position:absolute;bottom:.72em;width:.46em;height:.46em;left:50%}
.tp.l{fill:#CE6B47;transform:translateX(-54%) rotate(-7deg)}              /* łapka nad „i" */
.tp.r{fill:#38291C;transform:translateX(-46%) scaleX(-1) rotate(-7deg)}  /* łapka nad „j" — lustro */
/* na ciemnym tle: .psi→#E2B482, .rest→#FBF5EC, .tp.l→#E2B482, .tp.r→#FBF5EC */
```

## Favicon w `<head>`
```html
<link rel="icon" href="favicon.svg">
<!-- lub inline data-URI: -->
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='9' fill='%23CE6B47'/%3E%3Cg transform='translate(6,6) scale(0.8333)' fill='%23FBF5EC'%3E%3Ccircle cx='6.6' cy='9' r='2.5'/%3E%3Ccircle cx='12' cy='6.7' r='2.7'/%3E%3Ccircle cx='17.4' cy='9' r='2.5'/%3E%3Cpath d='M12 10.9c-3.7 0-6.6 2.6-6.6 5.7 0 2.7 3 4.4 6.6 4.4s6.6-1.7 6.6-4.4c0-3.1-2.9-5.7-6.6-5.7z'/%3E%3C/g%3E%3C/svg%3E">
```

## Kolory
`clay #CE6B47` · `ink #38291C` · `sand #E2B482` · `cream #FBF5EC` · `pine #2E645A`

## Zasady
- Nie rozciągaj, nie zmieniaj kolorów, nie kładź na krzykliwym tle.
- Pole ochronne = wysokość łapki. Min. szerokość wordmarku 96 px / 24 mm — poniżej używaj samego znaku.
