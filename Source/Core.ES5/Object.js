(function(){

var konstruktor = function(){},

	hazProp = Object.prototype.hasOwnProperty;

Core.fillIn(Object, {

	create: function(proto, properties){
		konstruktor.prototype = proto;
		var obj = new konstruktor();
		if (!obj.__proto__) obj.__proto__ = proto;
		if (properties && Object.defineProperties) Object.defineProperties(obj, properties);
		return obj;
	},

	getPrototypeOf: function(obj){
		return obj.__proto__;
	},

	getOwnPropertyNames: function(obj){
		return Object.keys(obj).filter(hazProp.bind(obj));
	},

	keys: function(obj){
		var result = [];
		Core.each(obj, function(v, key){ result.push(key); });
		//for (var key in obj) result.push(key);
		return result;
	}

});

})();