'use strict';

const fs = require('fs');
const zlib = require('zlib');
const {Duplex, Transform} = require('stream');

const {parser} = require('stream-json');
const {streamValues} = require('stream-json/streamers/StreamValues');

const defaultStreams = ['$-stream-sort-$-0', '$-stream-sort-$-1', '$-stream-sort-$-2'];

const defaultGetReadStream = stream => {
  return fs
    .createReadStream(stream)
    .pipe(zlib.createGunzip())
    .pipe(parser({streamValues: false}))
    .pipe(streamValues());
};

const defaultGetWriteStream = stream => {
  const t = new Transform({
    writableObjectMode: true,
    readableObjectMode: false,
    transform(chunk, encoding, callback) {
      this.push(JSON.stringify(chunk));
      callback(null);
    }
  });
  t.pipe(zlib.createGzip()).pipe(fs.createWriteStream(stream));
  return t;
};

class Sort extends Duplex {
  constructor(options) {
    super(Object.assign({writableObjectMode: true, readableObjectMode: true}, options));
    // get options
    this._less = options.less;
    this._streams = options.streams || defaultStreams;
    if (isNaN(this._streams.length) || this._streams.length < 3) {
      this._streams = defaultStreams;
    }
    this._getReadStream = options.getReadStream || defaultGetReadStream;
    this._getWriteStream = options.getWriteStream || defaultGetWriteStream;
    this._batchSize = !isNaN(options.batchSize) ? Math.max(1, options.batchSize) : 1024;
    // set internals
    this._comp = (a, b) => (this._less(a, b) ? -1 : this._less(b, a) ? 1 : 0);
    this._batches = this._streams.map((_, index) => ({real: 0, target: index ? 0 : 1}));
    this._batchStreams = this._batches.map(() => null);
    this._totalTarget = 1;
    this._totalReal = 0;
    this._index = 0;
    this._batch = [];
  }

  _write(chunk, encoding, callback) {
    this._batch.push(chunk);
    if (this._batch.length >= this._batchSize) {
      return this._saveBatch(callback);
    }
    callback(null);
  }

  _final(callback) {
    if (this._batch.length) {
      return this._saveBatch(callback);
    }
    callback(null);
  }

  _read() {}

  _saveBatch(callback) {
    this._batch.sort(this._comp);
    // save
    this._batch = [];
    callback(null);
  }

  static sort(options) {
    return new Sort(options);
  }
}

module.exports = Sort;
