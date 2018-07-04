const Heap = require('./lib/pairing-heap');

const h = new Heap((a, b) => a < b);

[1, 3, 5, 4, 2].forEach(value => h.push(value));

const output = [];
while (!h.empty) {
  output.push(h.pop());
}
console.log(output);
