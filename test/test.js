var assert = require('assert');
var cast = require('..');

describe('cast', function() {
	describe('from binary string char', function() {
		describe('to number', function() {
			it('should handle negative inputs', function() {
				var result = cast('10011100').from('char').to('number');
				assert.equal(-100, result);
			});
      it('should handle 0', function() {
        var result = cast('00000000').from('char').to('number');
        assert.equal(0, result);
      });
      it('should handle positive inputs', function() {
        var result = cast('01100100').from('char').to('number');
        assert.equal(100, result);
      })
		});
	});
});

describe('fromCharToNumber', function() {
  it('should handle negative inputs', function() {
    assert.equal(-100, cast.fromCharToNumber('10011100'));
  });
})
