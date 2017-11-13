(function(){
	var global = (1,eval)('this');
	var PREFIX_NAMESPACE = 'scriptsEffect';
	var ScreenEffects = function (stage) {
		this.stage 		= stage;
		this._effects 	= [];
	};
	var p = ScreenEffects.prototype = {};

	p._effects = null;

	/**
	 *
	 * @param effectName
	 * @param data
	 * @returns {*}
	 */
	p.addEffect = function (effectName, data) {
		if (this.stopped) return false;

		var obj = global[PREFIX_NAMESPACE][effectName];
		if (obj) {
			var effect = Object.create(obj);
			if (effect.initialize) {
				effect.initialize(this,data || {});
			}
			effect.name = effectName;
			this._effects.push(effect);
			return effect;
		}

		return false;
	};

	p.getEffectsByName = function (name) {
		var effects = [];
		for (var i = 0 , l = this._effects.length; i < l; i++) {
			if (this._effects[i].name === name) {
				effects.push(this._effects[i])
			}
		}
		return effects;
	};

	p.removeEffectsByName = function () {
		var effects = [], effect;
		for (var i = 0 , l = this._effects.length; i < l; i++) {
			if (this._effects[i].name === name) {
				effects.push(this._effects[i])
			}
		}

		while (effect = effects.pop()) {
			this.rmEffect(effect);
		}

		return effects;
	};

	p.rmEffect = function (effect) {
		effect.remove && effect.remove(this);
		this._effects.splice(this._effects.indexOf(effect),1);
	};

	p.removeALLEffect = function () {
		var effect;
		while (effect = this._effects.pop()) {
			effect.remove && effect.remove(this)
		}
	};

	p.stopped = false;

	p.stop = function () {
		this.stopped = true;
	};

	p.start = function () {
		this.stopped = false;
	};

	global.ScreenEffects = ScreenEffects;
	global.scriptsEffect = {};
}());