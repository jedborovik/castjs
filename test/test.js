var assert = require('assert');
var cast = require('..');

describe('cast', function() {
	describe('from binary string char', function() {
		describe('to number', function() {
			it('should handle negative inputs', function() {
				var result = cast('10011100').from('char').to('number');
				assert.equal(result, -100);
			});
		});
	});
});
