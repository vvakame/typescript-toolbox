/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/assert/assert.d.ts" />

import assert = require("power-assert");

import compilerTest = require("./compilerTest");
compilerTest.exec();

describe('Array#indexOf()', function () {
	beforeEach(function () {
		this.ary = [1,2,3];
	});
	it('should return index when the value is present', function () {
		var who = 'ariya', two = 2;
		assert(this.ary.indexOf(who) === two);
	});
	it('should return -1 when the value is not present', function () {
		var minusOne = -1, two = 2;
		assert.ok(this.ary.indexOf(two) === minusOne, 'THIS IS AN ASSERTION MESSAGE');
	});
});
