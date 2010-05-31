var Class;

(function(){

var defaultInit = function(){},

	defaultCast = function(obj){
		return obj == null ? null : obj instanceof this ? obj : new this(obj);
	},

	slice = Array.prototype.slice;

Class = function(inherits){

	var mixins = arguments;

	if (typeof inherits == 'function'){
		var konstructor = inherits;
		inherits = Object.create(inherits.prototype);
		inherits.initialize = konstructor;
		mixins = slice(mixins, 1);
	} else {
		inherits = {
			initialize: defaultInit,
			cast: defaultCast
		};
	}

	var klass = inherits.constructor = function(){
		return this instanceof klass ? this.initialize.apply(this, arguments) : klass.prototype.cast.apply(klass, arguments);
	};

	Core.append(klass, Class.prototype);

	klass.prototype = inherits;

	Object.keys(inherits).forEach(generalize, klass);

	klass.implement.apply(klass, mixins);
	klass.constructor = Class;

	return klass;

};

Class.implement = Class.prototype.implement = Core.overloadSetter(function(key, value){
	this.prototype[key] = value;
});

})();