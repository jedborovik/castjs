var assert = require('assert');
var cast = require('..');

describe('cast', function() {
	describe('from binary string char', function() {
		describe('to number', function() {
			it('should handle negative inputs', function() {
				var result = cast('10011100').from('char').to('number');
				assert.equal(result, -100);
			});
      it('should handle 0', function() {
        var result = cast('00000000').from('char').to('number');
        assert.equal(result, 0);
      });
      it('should handle positive inputs', function() {
        var result = cast('01100100').from('char').to('number');
        assert.equal(result, 100);
      })
		});
	});
});

describe('charToNumber', function() {
  it('should handle negative inputs', function() {
    assert.equal(cast.charToNumber('10011100'), -100);
  });
});

describe('toChar', function() {
  it('should handle negative inputs', function() {
    assert.equal(cast.toChar(-100), '10011100');
  });
});

describe('toByte', function() {
  it('should handle positive inputs', function() {
    assert.equal(cast.toByte(100), '01100100');
  });
});

describe('floatToBinary', function() {
  it('should handle floats greater than 1', function() {
    var input = 123.45;
    var output = '01000010111101101110011001100110';
    assert.equal(cast.floatToBinary(input), output);
  });
  it('should handle floats less than -1', function() {
    var input = -12.375;
    var output = '11000001010001100000000000000000';
    assert.equal(cast.floatToBinary(input), output);
  });
});

describe('reverseBytes', function() {
  it('should work for four bytes', function() {
    var input = '000102030405060708090a0b0c0d0e0f';
    var output = '0c0d0e0f08090a0b0405060700010203';
    assert.equal(cast.reverseBytes(input), output);
  });
});