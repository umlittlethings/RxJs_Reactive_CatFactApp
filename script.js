const { fromEvent } = rxjs;
const { switchMap, map } = rxjs.operators;


const button = document.getElementById('getFactBtn');
const output = document.getElementById('catFact');

fromEvent(button, 'click')
  .pipe(
    switchMap(() => 
      fetch('https://catfact.ninja/fact')
        .then(response => response.json())
    ),
    map(data => data.fact)
  )
  .subscribe({
    next: (fact) => {
      output.textContent = fact;
    },
    error: (err) => {
      output.textContent = 'Error fetching fact.';
      console.error(err);
    }
});
