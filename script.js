const { fromEvent, of } = rxjs;
const { switchMap, map, startWith } = rxjs.operators;

const button = document.getElementById('getFactBtn');
const output = document.getElementById('catFact');

const fetchCatFact = () =>
  fetch('https://catfact.ninja/fact').then(res => res.json());

fromEvent(button, 'click')
  .pipe(
    startWith(null), 
    switchMap(() => fetchCatFact()),
    map(data => data.fact)
  )
  .subscribe({
    next: fact => (output.textContent = fact),
    error: err => {
      output.textContent = 'Error fetching cat fact.';
      console.error(err);
    }
  });
