(function () {
	var global = (1,eval)('this');
	var HUDService = function (stage) {
		this.stage 	= stage;
		this._HUDs 	= [];
		this.game 	= global.Game.getInstance();
	};

	var p = HUDService.prototype = {};

	/**
	 *
	 * @param HUD
	 * @param options
	 * @param layer
	 * @returns {HUD}
	 */
	p.addHUD = function (HUD, options, layer) {
		options = options || {};

		assert(global[HUD], _.substitute('class "{name}" not found', {name : HUD}));

		if ( layer === HUDService.LAYERS.HUD_GAME) {
			layer = this.game.layerHUD;
		} else if (layer === HUDService.LAYERS.HUD_STAGE) {
			layer = this.stage.layerHUD;

		}

		options.layer 	= layer;
		options.service = this;
		try{
			var hud = new global[HUD](options);
			hud._name = HUD;
			this._HUDs.push(hud);

			options.align && this.align(hud, options.align);

			return hud;
		}catch(e){
			console.log(e.message);
		}

		return null;
	};

	p.align = function (hud, align) {
		if (align === 'center') {
			hud.setTransform({
				x : this.stage.getWidth() 	>> 1,
				y : this.stage.getHeight() 	>> 1
			});
		}

	};

	p.findHUDByName = function (name) {
		var obj	= this._HUDs,
			res = [];

		for (var i = 0, j = obj.length; i !== j; i++) {
			if (obj[i]._name === name) res.push(obj[i])
		}

		return res;
	};

	/**
	 *
	 * @param hud
	 */
	p.rmHUD = function (hud) {
		if (hud) {
			hud.destroy();
			this._HUDs.splice(this._HUDs.indexOf(hud),1);
		}
	};

	p.getAllHUDs = function () {
		return this._HUDs;
	};

	/**
	 *
	 */
	p.update = function () {

	};

	p.destroy = function () {
		var HUDs = this._HUDs;

		while(HUDs.length) {
			HUDs[0] && HUDs[0].destroy();
		}

		this._HUDs.length = 0;

		delete this.game;
		delete this.stage;
	};

	/**
	 * @description constant
	 * @type {{HUD_GAME: number, HUD_STAGE: number}}
	 */
	HUDService.LAYERS = {
		'HUD_GAME' : 1,
		'HUD_STAGE': 2
	};

	global.HUDService = HUDService;
}());