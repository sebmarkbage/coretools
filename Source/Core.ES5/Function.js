if (!Function.prototype.bind)
	Function.prototype.bind = function(bind){
		var fn = this, args = Array.prototype.slice.call(arguments, 1);
		return args.length ? function(){ return fn.apply(bind, args); } : function(){ return fn.call(bind); };
	};