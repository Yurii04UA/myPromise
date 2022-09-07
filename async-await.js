const async = (generator) => {
  const g = generator();

  (function next(value) {
    console.log(value);
    const n = g.next(value);
    console.log(n.value);
    console.log(n);
    if (n.done) return;
    n.value.then(next);
  })();
};

async(function* () {
  const response = yield fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = yield response.json();
  console.log(data);
});

/*
  we need our async “polyfill” to instantiate the generator, recursively nesting next for each yield statement inside its Promise’s then callback until done is true. In other words, when each Promise resolves, its value will be passed as an argument to next, whereby g.next will replace its corresponding yield statement with that value.
 */
