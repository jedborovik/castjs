exports = module.exports = function cast(value) {
	var intValue = ('string' == typeof value) ? parseInt(value, 2) : value;
	return {
		from: function from(fromType) {
			return {
				to: function to(toType) {
					if (fromType == 'char' && toType == 'number') {
						return intValue - 256;
					}
          throw Error('Not implemented');
				}
			}
		}
	}
}