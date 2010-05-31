(function(){

var inserters = {

	before: function(context, element){
		var parent = element.parentNode;
		if (parent) parent.insertBefore(context, element);
	},

	after: function(context, element){
		var parent = element.parentNode;
		if (parent) parent.insertBefore(context, element.nextSibling);
	},

	bottom: function(context, element){
		element.appendChild(context);
	},

	top: function(context, element){
		element.insertBefore(context, element.firstChild);
	}

};

inserters.inside = inserters.bottom;

DOM.Node.implement({

	grab: function(target, where){
		// TODO
	},

	inject: function(target, where){
		// TODO
	},

	getParent: function(){
		return Node(this.self.parentNode, this.root);
	}

});

Node.implement({

	eject: function(){
		var self = this.self, parent = this.self.parentNode;
		if (parent) parent.removeChild(self);
		return this;
	},

	adopt: function(){
		Array.flatten(arguments).each(function(element){
			if ((element = document.id(element))) this.appendChild(element);
		}, this);
		return this;
	},

	appendText: function(text, where){
		return this.grab(document.newTextNode(text), where);
	},

	grab: function(el, where){
		inserters[where || 'bottom'](document.id(el), this);
		return this;
	},

	inject: function(el, where){
		inserters[where || 'bottom'](this, document.id(el));
		return this;
	},

	replaces: function(el){
		el = document.id(el);
		el.parentNode.replaceChild(this, el);
		return this;
	},

	wraps: function(el, where){
		el = document.id(el);
		return this.replaces(el).grab(el, where);
	}

});

var methods = {};

['Top', 'Bottom', 'Before', 'After', 'Inside'].each(inserters, function(name){

	var where = name.toLowerCase();

	methods['inject' + name] = function(el){
		return this.inject(el, where);
	};

	methods['grab' + name] = function(el){
		return this.grab(el, where);
	};

});

DOM.Node.implement(methods);

})();