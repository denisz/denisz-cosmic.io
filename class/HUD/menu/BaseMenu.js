(function(){
	var global = (1,eval)('this');
	var BaseMenu = function () {};

	var p = BaseMenu.prototype = {};

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

	p.initialize = function (service, options) {
		this.service 	= service;
		this.options 	= options || {};
		this.layer 		= this.service.layer;
		this.resources 	= global.Resources.getInstance();
		this.sfxService = global.SfxService.getInstance();
		this.initializeEventsFromOptions(options);
		return this;
	};


	p.createContainer = function () {
		this.container = new createjs.Container();
		return this;
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

	p.destroy = function () {
		this.layer.removeChild(this.container);
		delete this.layer;
		delete this.resources;
		delete this.options;
		delete this.service;
	};

	global.BaseMenu = BaseMenu;
}());