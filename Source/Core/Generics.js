(function(){

var generalize = function(key){
		var klass = this;
		if (!(key in klass) && typeof klass.prototype[key] == 'function')
			klass[key] = function(self){
				klass.prototype[key].apply(self, slice.call(arguments, 1));
			};
	},

	force = function(type, methods){
		for (var key in type.protoype) generalize.call(type, key);
		methods.forEach(generalize, type);
	},
	
	mixin = Class.implement;

Class.implement = Class.prototype.implement = function(){
	mixin.apply(this, arguments);
	Object.keys(this.prototype).forEach(generalize, this);
	return this;
};

force(Array, [
	'pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift', 'concat', 'join', 'slice',
	'indexOf', 'lastIndexOf', 'filter', 'forEach', 'every', 'map', 'some', 'reduce', 'reduceRight'
]);

force(String, [
	'charAt', 'charCodeAt', 'concat', 'indexOf', 'lastIndexOf', 'match', 'quote', 'replace', 'search',
	'slice', 'split', 'substr', 'substring', 'toLowerCase', 'toUpperCase'
]);

force(Number, ['toExponential', 'toFixed', 'toLocaleString', 'toPrecision']);

force(Function, ['apply', 'call']);

force(RegExp, ['exec', 'test']);

force(Date, ['now']);

})();