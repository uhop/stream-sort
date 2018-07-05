'use strict';

const unit = require('heya-unit');

const Heap = require('../lib/Heap');

unit.add(module, [
  function test_heap(t) {
    const h = new Heap((a, b) => a < b),
      input = [1, 3, 5, 4, 2];
    h.pushValues(input);
    const result = [...h];
    input.sort((a, b) => a - b);
    eval(t.TEST('t.unify(input, result)'));
  }
]);
