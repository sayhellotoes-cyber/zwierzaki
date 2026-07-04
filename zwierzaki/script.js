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
