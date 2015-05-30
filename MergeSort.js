'use strict';


var os = require('os'), path = require('path');

var qsort = require('heya-ctr/algos/quickSort');


function MergeSort (options) {
	// parse options

	options = options || {};

	this.unitSize = Math.max(isNaN(options.unitSize) ? 1024 : Math.round(options.unitSize), 1);

	if (options.streams instanceof Array && options.streams.length >= 3) {
		this.buckets = new Array(options.streams.length);
		this.buckets.forEach(function (_, i, a) {
			a[i] = {
				expected: i === a.length - 1,
				actual:   0,
				fileName: options.stream[i],
				stream:   null
			};
		});
	} else {
		var streams = Math.max(isNaN(options.streams) ? 3 : Math.round(options.streams), 3);
		this.buckets = new Array(this.streams);
		this.buckets.forEach(function (_, i, a) {
			a[i] = {
				expected: i === a.length - 1,
				actual:   0,
				fileName: path.join(os.tempdir(), "stream-sort-" + i),
				stream:   null
			};
		});
	}

	this.less = options.less || 'a < b';
	if (!(typeof options.less == 'string' || typeof options.less == 'function' || options.less instanceof Array)) {
		throw Error('Option "less" should be a string, a function, or an array of strings.');
	}

	this.unit = [];

	this.buckets = new Array(this.streams - 1);
	this.buckets.forEach(function (_, i, a) {
		a[i] = {
			expected: 1,
			actual:   0,
			fileName: '',
			stream:   null
		};
	});

	this.activeBucket = 0;

	this.qs = qsort(this.less).compile();
}


MergeSort.prototype = {
	add: function (item) {
		this.unit.push(item);
		if (this.unit.length >= this.unitSize) {
			this.qs(this.unit);
			this.saveUnit();
		}
	}
	done: function () {
		if (this.unit.length) {
			this.qs(this.unit);
			this.saveUnit();
		}
	}
	add1: function (item) {

	},
	saveUnit: function () {
		this.unit = [];
	},
	sort: function (output) {

	},
	makeNextPass: function () {
		var m = this.buckets[0].expected;
		this.buckets.forEach(function (_, i, a) {
			a[i] = i + 1 >= a.length ? m : a[i + 1] + m;
		});
	},
	destroy: function () {

	}
};


module.exports = MergeSort;
