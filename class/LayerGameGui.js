(function(){
	var global = (1,eval)('this');
	var LayerGameHUD = function (options) {
		this.options        = options;
		this.name           = options.name  || 'unknown';
		this.depth          = 0x10000;
		this.type			= options.type;
		this.debug 			= false;
		this.initialize();
	} ;
	var p = LayerGameHUD.prototype = new createjs.Container();

	p.destroyed = false;

	/**
	 * remove references
	 */
	p.destroy = function () {
		this.destroyed = true;

		delete this.options;
		delete this.tileLayers;
		delete this.stage;
		delete this.tilesService;
	};

	global.LayerGameHUD = LayerGameHUD;
}());