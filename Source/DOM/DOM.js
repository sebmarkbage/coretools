var DOM = {};

(function(){

var uid = 0,
	wrapkey = '_domwrap_',
	gc = window && window.attachEvent ? [] : null;

DOM.Event = new Class(Core.Event, {

	cast: function(event){
		if (event instanceof Event) return event;
		if (wrapkey in node) return event[wrapkey];
		return new DOM.Event(event);
	}

});

var Node = DOM.Node = new Class(DOM, {

	initialize: function(node){
		this.self = node;
		this.nodeType = node.nodeType;
		if (gc) gc.push(this);
	},

	cast: function(node, context){
		if (node instanceof Node) return node;
		
		if (wrapkey in node) return node[wrapkey];
		node = node[wrapkey] = new nodeTypes[node.nodeType](node);
		if (gc) gc.push(node);
		return node;
	}

});

var nodeTypes = {
	1: DOM.Element = new Class(Node),
	2: DOM.Attribute = new Class(Node),
	3: DOM.Text = new Class(Node),
	4: DOM.Text,
	5: DOM.Node,
	6: DOM.Node,
	7: DOM.Node,
	8: DOM.Comment = new Class(Node),
	9: DOM.Document = new Class(Node),
	10: DOM.DocType = new Class(Node),
	11: DOM.Fragment = new Class(Node),
	12: DOM.Notation = new Class(Node)
};

if (gc){

	var collectGarbage = function(){
			gc.each(collectWrap);
		},
		collectWrap = function(wrap){
			if (wrap.removeEvents) wrap.removeEvents();
			if (wrap.self[wrapkey] === wrap) delete wrap.self[wrapkey];
			// TODO - Memory leaks are such a mess...
		};

	window.attachEvent('onunload', function(){
		collectGarbage();
		gc = null;
	});

	setInterval(collectGarbage, 120000);

}

});