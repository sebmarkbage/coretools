(function(){

var capitalize = function(str){
	str = String(str);
	return str.substr(0, 1).toUpperCase() + str.substr(1);
};

var specificElement = {

	initialize: function(element){
		this.self = element;
		this.children = new DOM.Nodes(element.childNodes);
	}

};

var Element = DOM.Element.implement({

	initialize: function(element){
		if (element instanceof Element) element = element.self;
		var name = element.nodeName;
		if (!name) element = document.createElement(name = element);
		name = capitalize(name);
		var type = Element[name] || (Element[name] = new Class(Element, specificElement));
		return new type(element);
	},

	getFirst: function(){ return walk(this.self.firstChild, 'nextSibling'); },

	getLast: function(){ return walk(this.self.lastChild, 'previousSibling'); },

	getPrevious: function(){ return walk(this.self.previousSibling, 'previousSibling'); },

	getNext: function(){ return walk(this.self.nextSibling, 'nextSibling'); },

	getAllPrevious: function(){ return new Walker(this.self, 'previousSibling'); },

	getAllNext: function(){ return new Walker(this.self, 'nextSibling'); },

	getElement: function(tag){ return tag ? Element(this.self.getElementsByTagName(tag)[0]) : this.getFirst(); },

	getElements: function(tag){ return tag ? Elements(this.self.getElementsByTagName(tag)) : Elements(this.self.childNodes); }

});

var Elements = DOM.Elements = new Class(Enumerable, {

	initialize: function(collection){
		this.collection = collection;
	},

	each: function(fn, bind){
		if (!bind) bind = this;
		var collection = this.collection;
		for (var i = 0, l = collection.length; i < l; i++){
			var node = collection[i];
			if (node && node.nodeType == 1 && fn.call(bind, Element(node)) === false) break;
		}
	}

});

var walk = function(element, direction){
	var node = element;
	while (node){
		if (node.nodeType == 1) return Element(node);
		node = node[direction];
	}
	return null;
};

var Walker = new Class(DOM.Elements, {

	initialize: function(element, direction){
		this.element = element;
		this.direction = direction;
	},

	each: function(fn, bind){
		if (!bind) bind = this;
		var dir = this.direction, node = this.element[dir];
		while (node){
			if (node.nodeType == 1 && fn.call(bind, Element(node)) === false) break;
			node = node[dir];
		}
	}

});

})();