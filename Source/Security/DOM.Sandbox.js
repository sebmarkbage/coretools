// Provides a sandboxed Node instances that can't access nodes outside it's root node.

(function(){

var blocked = function(){ return null; },

	sandbox = function(node, root){
		var self = node.self;
		Object.forEach(node, function(fn, key){
			if (typeof fn == 'function')
				node[key] = function(){
					this.self = self;
					var result = fn.apply(this, arguments);
					this.self = null;
					return result;
				};
		});
		if (self === root) node.getParent = blocked;
		node.self = null;
		return node;
	};

var Node = DOM.Node.implement({

	cast: function(node, context){
		if (node instanceof Node) return node;
		if (wrapkey in node) return node[wrapkey];
		node = node[wrapkey] = new nodeTypes[node.nodeType](node);
		return context ? sandbox(node, context) : node;
	}

});

})();