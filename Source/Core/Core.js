var Core = {
	version: '0.1experimental'	
};

(function(){

// IE enum workaround

var fix = function(fn){
	var failed = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'],

		find = /for\s*\(\s*(?:var\s+)?(\w+)\s+in\s+([^\s\)]+)\s*\)([^\{\s][^;]*\;)/,

		replace = function(enumeration, key, obj, block){
			var check = 'if (' + obj + '.KEY !== o.KEY){ var ' + key + ' = \'KEY\'; ' + block + ' }',
				result = [enumeration];
			for (var i = 0, l = failed.length; i < l; i++) result.push(check.replace(/KEY/g, failed[i]));
			return result.join('\n');
		};

	return Function('var o = Object.prototype; return ' + fn.toString().replace(find, replace))();
};

for (var key in { toString: 1 }) fix = function(fn){ return fn; };

Core.append = fix(function(original){
	for (var i = 1, l = arguments.length; i < l; i++){
		var extended = arguments[i] || {};
		for (var key in extended) original[key] = extended[key];
	}
	return original;
});

Core.fillIn = fix(function(original){
	for (var i = 1, l = arguments.length; i < l; i++){
		var extended = arguments[i] || {};
		for (var key in extended) if (!original[key]) original[key] = extended[key];
	}
	return original;
});

Core.each = fix(function(obj, fn, bind){
	for (var key in obj) fn.call(bind, obj[key], key);
	return obj;
});

Core.overloadSetter = fix(function(fn){
	return function(obj){
		if (obj instanceof Object){
			for (var i = 0, l = arguments.length; i < l; i++){
				obj = arguments[i];
				for (var key in obj) fn.call(this, key, obj[key]);
			}
		} else {
			fn.apply(this, arguments);
		}
		return this;
	};
});

})();