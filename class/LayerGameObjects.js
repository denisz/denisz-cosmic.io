(function(){
	var global = (1,eval)('this');
	var LayerGameObjects = function(options){
		this.options    = options;
		this.type 		= options.type;
		this.name 		= options.name;

		this.initialize();
		this.mouseEnabled = false;
	};

	var p = LayerGameObjects.prototype = new createjs.Container;

	p.name = null;
	p.type = null;

	global.LayerGameObjects = LayerGameObjects;
}());