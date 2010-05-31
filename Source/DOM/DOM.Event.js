(function(){

var capitalize = function(str){
	str = String(str);
	return str.substr(0, 1).toUpperCase() + str.substr(1);
};

var Event = DOM.Event.implement({

});

var UI = Event.UI = new Class(Event),
	Mouse = Event.UI = new Class(UI),
	Drag = Event.Drag = new Class(Mouse);

var eventTypes = {
	'mousemove': Mouse,
	'mouseover': Mouse,
	'mouseout': Mouse,
	'mouseenter': Mouse,
	'mouseleave': Mouse,
	'drag': Drag,
	'drop': Drop,
	'dragenter': Drag,
	'dragleave': Drag,
	'dragover': Drag,
	'dragstart': Drag
};

})();