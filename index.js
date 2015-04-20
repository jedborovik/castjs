exports = module.exports = cast;

exports.fromCharToNumber = function(val) {
  return cast(val).from('char').to('number');
}

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
          throw Error('Not implemented');
        }
      }
    }
  }
}

function rangeAssert(val, min, max) {
  if (val < min || val > max) throw Error(val + ' out of bounds');
}
