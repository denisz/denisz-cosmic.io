(function(){
	var global = (1,eval)('this');
	var Ads = function () {};
	var p = Ads.prototype = {};

	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	createjs.EventDispatcher.initialize(p); // inject EventDispatcher methods.

	/**
	 * @param options
	 * @param obj
	 */
	p.initializeEventsFromOptions = function (options, obj) {
		obj = obj || this;
		for (var i in options) {
			if (options.hasOwnProperty(i)) {
				var event = i.match(/^on([A-Za-z]*)/);
				if (event) {
					obj.addEventListener(event[0],options[i]);
				}
			}
		}
	};

	p.initialize = function (options) {
		this.resources 	= global.Resources.getInstance();
		this.game 		= global.Game.getInstance();
		this.app 		= global.App.getInstance();
		this.layer 		= this.game.layerHUD;
		this.options 	= options;

		this.setSize();
	};

	p.setSize = function () {
		this.size = this.game.getSize();
	};


	p.createContainer = function () {
		this.container = new createjs.Container();
		return this;
	};

	p.addToContainer = function(obj){
		this.container.addChild(obj);
	};

	p.addToLayer = function () {
		this.layer.addChild(this.container);
		return this;
	};

	p.show = function () {
		this.container.visible = true;
		return this;
	};

	p.hide = function () {
		this.container.visible = false;
		return this;
	};

	p.start = function () {
		this.dispatchEvent({type:'onStart'});
	};

	p.finish = function () {
		this.dispatchEvent({type:'onFinish'});
		this.destroy();
	};

	p.destroy = function () {
		this.layer.removeChild(this.container);
		delete this.layer;
		delete this.game;
		delete this.app;
		delete this.resources;
		delete this.options;
	};

	global.Ads = Ads
}());