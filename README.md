# stream-sort

[![Build status][travis-image]][travis-url]
[![Dependencies][deps-image]][deps-url]
[![devDependencies][dev-deps-image]][dev-deps-url]
[![NPM version][npm-image]][npm-url]


`stream-sort` is a procedure to sort streams of objects far exceeding available memory. The only assumption is that as little as four objects can fit in memory. The algorithm has O(N * log N) complexity, and as efficient as a quick sort.

## Introduction

The simplest example (streaming from a file):

```js

```

## Installation

```
npm install stream-sort
```

## Documentation

## Release History

- 1.0.0 *the initial release.*

[npm-image]:      https://img.shields.io/npm/v/stream-sort.svg
[npm-url]:        https://npmjs.org/package/stream-sort
[deps-image]:     https://img.shields.io/david/uhop/stream-sort.svg
[deps-url]:       https://david-dm.org/uhop/stream-sort
[dev-deps-image]: https://img.shields.io/david/dev/uhop/stream-sort.svg
[dev-deps-url]:   https://david-dm.org/uhop/stream-sort#info=devDependencies
[travis-image]:   https://img.shields.io/travis/uhop/stream-sort.svg
[travis-url]:     https://travis-ci.org/uhop/stream-sort
