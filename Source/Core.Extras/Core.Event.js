Core.Event = new Class({

	preventDefault: function(){
		this.returnValue = false;
	},

	stopPropagation: function(){
		this.cancelBubble = true;
	},

	stop: function(){
		return this.preventDefault().stopPropagation();
	}

});