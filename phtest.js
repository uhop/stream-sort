const Heap = require('./lib/Heap');

const h = new Heap((a, b) => a < b);
h.pushValues([1, 3, 5, 4, 2]);
console.log([...h]);
