Core.fillIn(Array.prototype, {

	some: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if ((i in this) && fn.call(bind, this[i], i, this)) return true;
		}
		return false;
	},

	every: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if ((i in this) && !fn.call(bind, this[i], i, this)) return false;
		}
		return true;
	},

	filter: function(fn, bind){
		var result = [];
		for (var i = 0, l = this.length; i < l; i++)
			if (i in this && fn.call(bind, this[i], i, this))
				result.push(this[i]);
		return result;
	},

	forEach: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++)
			if (i in this)
				fn.call(bind, this[i], i, this);
	},

	map: function(fn, bind){
		var results = [];
		for (var i = 0, l = this.length; i < l; i++){
			if (i in this) results[i] = fn.call(bind, this[i], i, this);
		}
		return results;
	},

	indexOf: function(item, index){
		var l = this.length;
		if (!index) index = 0;
		if (index < 0) index += l;
		for (; index < l; index++) if (this[index] === item) return index;
		return -1;
	},

	lastIndexOf: function(item, index){
		var l = this.length;
		if (index < 0) index += l;
		if (index == null || index >= l) index = l;
		else index++;
		while (index--) if (this[index] === item) return index;
		return -1;
	},

	reduce: function(fn, value){
		for (var i = 0, l = this.length; i < l; i++)
			if (i in this)
				value = value === undefined ? this[i] : fn.call(null, value, this[i], i, this);
		return value;
	},

	reduceRight: function(fn, value){
		var i = this.length;
		while (i--)
			if (i in this)
				value = value === undefined ? this[i] : fn.call(null, value, this[i], i, this);
		return value;
	}

});