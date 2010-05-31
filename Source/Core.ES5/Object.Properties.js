(function(){

// Limited Support in IE - IE8 supports this API on DOM prototypes only

if (!Object.defineProperty && !Object.prototype.__defineGetter__) return;

var noop = function(obj){ return obj; },
	nope = function(){ return false; };

Core.fillIn(Object, {

	defineProperty = function(obj, key, attributes){
		var getter = attributes.get, setter = attributes.set;
		if (!getter && !setter){
			if (!('value' in attributes || 'writable' in attributes)) return obj;
			var value = attributes.value;
			if (attributes.writable){
				delete obj[key];
				obj[key] = value;
				return obj;
			}
			getter = function(){ return value; };
			setter = noop;
		}
		if (getter) obj.__defineGetter__(key, getter);
		if (setter) obj.__defineSetter__(key, settter);
		return obj;
	};

	getOwnPropertyDescriptor: function(obj, key){			
		if (!obj.hasOwnProperty(key)) return undefined;

		var getter = obj.__lookupGetter__(key),
			setter = obj.__lookupSetter__(key);

		return ((getter || setter) && setter !== noop) ? {
				get: getter,
				set: setter,
				enumerable: true,
				configurable: true
			} : {
				writable: setter !== noop,
				value: obj[key],
				configurable: true,
				enumerable: true
			};
	},

	defineProperties = function(obj, properties){
		for (var key in properties) Object.defineProperty(obj, key, properties[key]);
	},

	preventExtensions: noop,

	seal: function(obj){
		for (var key in obj){
			var desc = Object.getOwnPropertyDescriptor(obj, key);
			if (desc){
				desc.configurable = false;
				Object.defineProperty(obj, key, desc);
			}
		}
		return obj;
	},

	freeze: function(obj){
		for (var key in obj){
			var desc = Object.getOwnPropertyDescriptor(obj, key);
			if (desc){
				desc.configurable = false;
				if (!desc.set && !desc.get) desc.writable = false;
				Object.defineProperty(obj, key, desc);
			}
		}
		return obj;
	},

	isSealed: nope,
	isFrozen: nope,
	isExtensible: nope

});

})();