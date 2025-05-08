// Use UMD RxJS from global object
const { fromEvent, of } = rxjs;
const { switchMap, map, startWith } = rxjs.operators;

// Get DOM elements
const button = document.getElementById('getFactBtn');
const output = document.getElementById('catFact');

// Function to fetch cat fact
const fetchCatFact = () =>
  fetch('https://catfact.ninja/fact').then(res => res.json());

// Reactive event handling
fromEvent(button, 'click')
  .pipe(
    startWith(null), // Trigger on page load
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
