(function(){

var slice = Array.prototype.slice,

	reset = function(value){
		return (value instanceof Array) ? slice.call(value) : Object.create(value);
		// TODO: nested reset
	},

	bind = function(fn){
		return fn.bind(this);
	},

	mixin = Class.prototype.implement;

Class.implement = Class.prototype.implement = Core.overloadSetter(function(key, value){
	var proto = this.prototype;
	if (mutators.hasOwnProperty(key)){
		value = mutators[key].call(this, value);
		if (value == null){
			delete proto[key];
			return;
		}
	}
	proto[key] = value;

	var klass = this;
	if (!(key in klass) && typeof klass.prototype[key] == 'function')
		klass[key] = function(self){
			klass.prototype[key].apply(self, slice.call(arguments, 1));
		};
});

var mutators = Class.Mutators = {

	Extends: function(inherits){
		inherits = inherits.prototype;

		var proto = this.prototype = Object.create(inherits);
		proto.constructor = this;

		this.Mutators['*'] = function(fn, key){

			if (typeof fn != 'function' || typeof inherits[key] != 'function') return fn;
			var parent = function(){
				return inherits[key].apply(this, arguments);
			};
			return function(){
				this.parent = parent;
				var result = fn.apply(this, arguments);
				this.parent = null;
				return result;
			};

		};
	},

	Implements: function(args){
		this.implement.apply(this, args instanceof Array ? args : [args]);
	},

	initialize: function(initialize){
		var wrappers = {}, proto = this.prototype;

		this.implementWrappers = function(properties){
			Object.append(wrappers, properties);
		};

		proto.initialize = function(){
			for (var key in wrappers) this[key] = wrappers[key](this[key]);
			return initialize.apply(this, arguments);
		};

		for (var key in proto) if (typeof proto[key] == 'object') wrappers[key] = reset;
	},

	Binds: function(properties){
		var obj = {};
		properties.forEach(function(key){ obj[key] = bind; });
		this.implementWrappers(obj);
	}

};

})();