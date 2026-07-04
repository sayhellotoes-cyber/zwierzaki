# Zwierzaki — biblioteka ikon

Autorski set **26 ikon** w spójnym stylu: siatka 24×24, kontur `stroke-width="2"` z zaokrąglonymi końcami, nawiązanie do łapki z logo. Wyjątek: `paw` (znak marki) jest **wypełniona**.

## Zasada: `currentColor`

Wszystkie ikony dziedziczą kolor z CSS `color` (przez `currentColor`) — nie mają zaszytego koloru. Dzięki temu jedna ikona działa w każdym kontekście (glina, sosna, atrament, biel na ciemnym tle) bez duplikowania plików.

```css
/* kolor ikony = color rodzica */
.przycisk { color: var(--clay); }      /* ikona w środku będzie w kolorze gliny */
```

Rozmiar sterujesz przez `width`/`height` (domyślnie 24×24) albo ustawiając `width:1em; height:1em` i skalując `font-size`.

## Użycie

**HTML — inline (najlepsze, bo dziedziczy `color`):**
```html
<span style="color:var(--pine)">
  <!-- wklej zawartość home.svg -->
</span>
```

**HTML — jako `<img>` (uwaga: `<img>` NIE dziedziczy `currentColor`):**
```html
<img src="icons/pin.svg" width="20" height="20" alt="">
```
Do `<img>` kolor trzeba by wypalić w pliku lub użyć CSS `mask`. Do UI preferuj inline / komponent React.

**React (zalecane) — przez [SVGR](https://react-svgr.com/) lub `vite-plugin-svgr`:**
```jsx
import Paw from "./icons/paw.svg?react";   // vite-plugin-svgr
import Home from "./icons/home.svg?react";

<Paw width={20} height={20} className="text-clay" />
<Home style={{ color: "var(--pine)" }} />
```
SVGR zamienia każdy plik w komponent i przepuszcza propsy (`width`, `className`, `color`, `aria-*`). `currentColor` zadziała automatycznie.

**Dostępność:** ikony dekoracyjne → `aria-hidden="true"`; ikony niosące znaczenie → dodaj `<title>` lub `aria-label`.

## Spis ikon (nazwa → znaczenie w produkcie)

| Plik | Znaczenie |
|---|---|
| `paw.svg` | Znak marki (łapka, **wypełniona**) |
| `bolt.svg` | Aktywność / energia |
| `home.svg` | Dom / ogród |
| `building.svg` | Mieszkanie w bloku |
| `cap.svg` | Doświadczenie / tresura |
| `target.svg` | Cel / dokładne dopasowanie |
| `compass.svg` | Kompas / uzasadnienie |
| `chart.svg` | Statystyki |
| `refresh.svg` | Alternatywy / powtórz |
| `shield.svg` | Zdrowie / szczepienia |
| `bulb.svg` | Behawiorysta / porada |
| `suitcase.svg` | Pet sitter / wyjazd |
| `vet.svg` | Weterynarz |
| `pin.svg` | Lokalizacja |
| `bone.svg` | Rasa |
| `verified.svg` | Zweryfikowane |
| `check.svg` | Potwierdzenie |
| `lock.svg` | Prywatność |
| `star.svg` | Ocena / gwiazdka |
| `heart.svg` | Serce / rodzina |
| `clock.svg` | Czas |
| `download.svg` | Zapisz / pobierz |
| `share.svg` | Udostępnij |
| `leaf.svg` | Niski poziom energii |
| `mountain.svg` | Wysoki poziom aktywności |
| `arrow.svg` | Strzałka / CTA |

## Źródło

Te pliki są eksportem sprite'u z `../icons.js` (wersja produkcyjna używana na statycznych stronach). Odpowiadają komponentom `Icon/*` w bibliotece Figma. Przy zmianie ikony aktualizuj **oba** źródła (albo docelowo generuj oba z jednego źródła prawdy).
