'use strict';


var util = require('util');
var Transform = require('stream').Transform;

var MergeSort = require('./MergeSort');


function Sort (options) {
	Transform.call(this, options);
	this._writableState.objectMode = true;
	this._readableState.objectMode = true;

	this._msort = new MergeSort(options);
}
util.inherits(Sort, Transform);

Sort.prototype._transform = function transform (chunk, _, callback) {
	try {
		this._msort.add(chunk.value);
	} catch (err) {
		callback(err);
		return;
	}
	callback();
};

Sort.prototype._flush = function flush (callback) {
	this._msort.done();
	this._msort.sort(this);
	callback();
};
