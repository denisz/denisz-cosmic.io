(function(){
	var global = (1,eval)('this');
	var HUD = function () {

	};

	var p = HUD.prototype = {};

	p.addEventListener = null;
	p.removeEventListener = null;
	p.removeAllEventListeners = null;
	p.dispatchEvent = null;
	p.hasEventListener = null;
	p._listeners = null;
	createjs.EventDispatcher.initialize(p); // inject EventDispatcher methods.

	p.initializeHUD = function (options) {
		assert(options.layer, "Layer is not define for HUD");
		this.resources 	= global.Resources.getInstance();
		this.layer 		= options.layer;
		this.options 	= options;
		this.service 	= options.service;

		if (!options.transform) {
			options.transform = {};
		}
		this.setSize();
	};

	p.setSize = function () {
		this.size = this.service.game.getSize();
	};

	p.transformObject = null;

	p.setTransform = function (transform) {
		var obj = this.transformObject;
		if (transform && obj) {
			for (var i in transform) {
				if (transform.hasOwnProperty(i)) {
					obj[i] = transform[i];
				}
			}
		}
	};

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

	p.addToLayer = function (displayObject) {
		this.layer.addChild(displayObject);
	};

	p.addToLayerAt = function (displayObject, index) {
		this.layer.addChildAt(displayObject, index);
	};

	p.removeFromLayer = function (displayObject) {
		this.layer.removeChild(displayObject);
	};

	p._name = 'name';

	p.getName = function () {
		return this._name;
	};

	/**
	 * remove references
	 */
	p.destroy = function () {
		delete this.resources;
		delete this.layer;
		delete this.options;
		delete this.transformObject;

		this.service.rmHUD(this);
		delete this.service;
	};

	global.HUD = HUD;
}());