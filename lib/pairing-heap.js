class PairingHeap {
  constructor(less) {
    this.less = less;
    this.heap = null;
    this.size = 0;
  }

  get empty() {
    return !this.heap;
  }

  get front() {
    return this.heap.value;
  }

  push(value) {
    if (this.heap) {
      if (this.less(value, this.heap.value)) {
        this.heap = {value, children: this.heap, next: null};
      } else {
        this.heap = {value: this.heap.value, children: {value, children: null, next: this.heap.children}, next: null};
      }
    } else {
      this.heap = {value, children: null, next: null};
    }
    ++this.size;
    return this;
  }

  pop() {
    const value = this.heap.value;
    if (!this.heap.children) {
      this.heap = null;
    } else if (!this.heap.children.next) {
      this.heap = this.heap.children;
    } else {
      let input = this.heap.children;
      while (input.next) {
        let first = null, last = null, p = input;
        while (p && p.next) {
          const p1 = p, p2 = p.next;
          p = p2.next;
          p1.next = p2.next = null;
          let item;
          if (this.less(p1.value, p2.value)) {
            p2.next = p1.children;
            item = {value: p1.value, children: p2, next: null};
          } else {
            p1.next = p2.children;
            item = {value: p2.value, children: p1, next: null};
          }
          if (!first) first = item;
          if (last) last.next = item;
          last = item;
        }
        if (p) {
          if (!first) first = p;
          if (last) last.next = p;
          last = p;
        }
        input = first;
      }
      this.heap = input;
    }
    --this.size;
    return value;
  }
}

module.exports = PairingHeap;
