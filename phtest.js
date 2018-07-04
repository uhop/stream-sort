const Heap = require('./lib/pairing-heap');

const h = new Heap((a, b) => a < b);

[1, 3, 5, 4, 2].forEach(value => h.insert(value));

const output = [];
while (!h.empty) {
  output.push(h.min);
  h.deleteMin();
}
console.log(output);
