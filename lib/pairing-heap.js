class PairingHeap {
  constructor(less){
    this.less = less;
    this.heap = null;
  }

  get empty() {
    return !this.heap;
  }

  get min() {
    return this.heap.value;
  }

  insert(value) {
    if (this.heap) {
      if (this.less(value, this.heap.value)) {
        this.heap = {value, children: [this.heap]};
      } else {
        this.heap = {value: this.heap.value, children: [{value, children: []}, ...this.heap.children]};
      }
    } else {
      this.heap = {value, children: []};
    }
    return this;
  }

  deleteMin() {
    if (!this.heap.children.length) {
      this.heap = null;
    } else if (this.heap.length == 1) {
      this.heap = this.heap.children[0];
    } else {
      let input = this.heap.children;
      while(input.length > 1) {
        const output = [], n = input.length - (input.length % 2);
        for (let i = 0; i < n; i += 2) {
          const h1 = input[i], h2 = input[i + 1];
          if (this.less(h1.value, h2.value)) {
            output.push({value: h1.value, children: [h2, ...h1.children]});
          } else {
            output.push({value: h2.value, children: [h1, ...h2.children]});
          }
        }
        if (n < input.length) output.push(input[n]);
        input = output;
      }
      this.heap = input[0];
    }
    return this;
  }
};

module.exports = PairingHeap;
