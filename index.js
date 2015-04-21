exports = module.exports = cast;

exports.charToNumber = function(val) {
  return cast(val).from('char').to('number');
}

exports.floatToBinary = function(val) {
  return cast(val).from('float').to('binary');
}

exports.reverseBytes = reverseBytes;

function cast(value) {
  var intValue = ('string' == typeof value) ? parseInt(value, 2) : value;
  return {
    from: function from(fromType) {
      if (fromType == 'char') rangeAssert(intValue, 0, 255);
      return {
        to: function to(toType) {
          if (fromType == 'char' && toType == 'number') {
            return (intValue > 127) ? intValue - 256 : intValue;
          }
          if (fromType == 'float' && toType == 'binary') {
            return _fromFloatToBinary(value);
          }
          throw Error('Not implemented');
        }
      }
    }
  }
}

function rangeAssert(val, min, max) {
  if (val < min || val > max) throw Error(val + ' out of bounds');
}

function _fromFloatToBinary(float) {
  var i = float | 0;
  var otz = otzToBinary(Math.abs(float - i));
  var fraction = (Math.abs(i).toString(2) + otz).slice(1, 24);
  var exponent = float32exponent(float);
  var sign = float < 0 ? '1' : '0';
  return sign + exponent + fraction;

}

function otzToBinary(otz, precision) {
  if (!precision) precision = 23;
  function itr(otz, str, depth) {
    if (depth == precision) return str;
    var shifted = otz * 2;
    var d = (shifted >= 1) ? shifted - 1 : shifted;
    var s = (shifted >= 1) ? str + '1' : str + '0';
    return itr(d, s, depth + 1);
  }
  return itr(otz, '', 0);
}

function float32exponent(float) {
  var i = Math.abs(float | 0);
  var e = i.toString(2).length - 1;
  var adjusted = e + 127;
  return padWithZeros(adjusted.toString(2), 8);
}

function padWithZeros(str, length) {
  while (str.length<length) {
    str = '0' + str;
  }
  return str;
}

function reverseBytes(binaryString) {
  if (binaryString.length % 8 !== 0) throw Error('Bad binary string length');
  var bytes = binaryString.match(/.{8}/g);
  var reordered = bytes.reduce(function(acc, value) {
    acc.unshift(value);
    return acc;
  }, []);
  return reordered.join('');
}